// 1. INITIAL SETUP

var naipCollection = ee.ImageCollection('USDA/NAIP/DOQQ')
  .filterDate('2021-01-01', '2026-12-31');

var naipDisplay = naipCollection.median();

// Initial Map Setup
Map.setCenter(-100, 40, 5); 
Map.addLayer(naipDisplay, {bands: ['R', 'G', 'B'], min: 0, max: 255}, 'NAIP Base Imagery');

// Configure Drawing Tools
var drawingTools = Map.drawingTools();
drawingTools.setShown(true);
drawingTools.setDrawModes(['polygon']);

// 2. NDVI ANALYSIS FUNCTION
 
var runAnalysis = function() {
  var layers = drawingTools.layers();
  
  if (layers.length() === 0 || layers.get(0).getEeObject().geometries().length() === 0) {
    print('Please draw an ROI boundary polygon first');
    return;
  }

// 1. Capture the ROI geometry
  var drawnGeom = layers.get(0).getEeObject().geometries().get(0);
  var roi = ee.Geometry(drawnGeom);

// 2. RESET DRAWING TOOLS: This removes the green ROI fill from the UI
  drawingTools.layers().reset();

// 3. DISPLAY ROI OUTLINE: Styled with zero fill to stay visible but transparent
  var roiFeature = ee.FeatureCollection([ee.Feature(roi)]);
  Map.addLayer(roiFeature.style({color: 'red', fillColor: '00000000', width: 2}), {}, 'ROI Boundary');

// 4. CALCULATE NDVI
  var ndvi = naipDisplay.clip(roi).normalizedDifference(['N', 'R']).rename('NDVI');
  var ndviVis = {
    min: -1, 
    max: 1, 
    palette: ['#FF0000', '#FF7F7F', '#FFFF00', '#90EE90', '#006400']
  };
  
  Map.addLayer(ndvi, ndviVis, 'NDVI Analysis (-1 to 1)');
  Map.centerObject(roi, 16);
  
  print('Analysis complete. You can now draw new polygons to export');
};

// 3. KML EXPORT FUNCTION

var exportPolygons = function() {
  var layers = drawingTools.layers();
  
  // Since we reset the tools after the ROI, anything here now is a NEW sketch
  if (layers.length() === 0 || layers.get(0).getEeObject().geometries().length() === 0) {
    print('No new polygons found to export. Please sketch areas inside the NDVI first.');
    return;
  }

  var exportFc = layers.get(0).getEeObject();

  Export.table.toDrive({
    collection: exportFc,
    description: 'Digitized_NDVI_Polygons',
    fileFormat: 'KML'
  });

  print('Export started! Check the "Tasks" tab in the upper right to confirm.');
};

 // 4. USER INTERFACE
 
var analysisButton = ui.Button({
  label: '1. Run NDVI Analysis',
  onClick: runAnalysis,
  style: {stretch: 'horizontal', fontWeight: 'bold', color: 'darkgreen'}
});

var exportButton = ui.Button({
  label: '2. Export Digitized Polygons',
  onClick: exportPolygons,
  style: {stretch: 'horizontal', color: 'blue'}
});

var mainPanel = ui.Panel({
  widgets: [
    ui.Label('Workflow:', {fontWeight: 'bold', fontSize: '16px'}),
    ui.Label('1. Draw one ROI boundary polygon.'),
    analysisButton,
    ui.Label('2. Sketch new polygons inside ROI.'),
    exportButton
  ],
  style: {position: 'bottom-left', padding: '10px', width: '230px'}
});

Map.add(mainPanel);