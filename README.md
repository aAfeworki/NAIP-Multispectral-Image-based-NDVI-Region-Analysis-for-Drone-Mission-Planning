This project provides a Google Earth Engine (GEE) workflow for:
Performing NDVI (Normalized Difference Vegetation Index) analysis using NAIP imagery
Selecting a region of interest (ROI) for vegetation analysis
Identifying and marking sub-regions requiring drone inspection
Exporting those sub-regions as KML files for mission planning
The primary goal is to reduce drone flight time by pre-identifying vegetation stress zones from satellite NDVI analysis before field deployment.
This approach enables:
Precision agriculture workflows
Targeted crop health inspection
Efficient UAV mission planning
Reduced operational cost and energy consumption

🚀 Why This Workflow?
Traditional drone scouting requires full-area coverage, which:
Increases flight time
Consumes more battery cycles
Requires multiple sorties
Raises operational costs
This workflow allows us to:
Use satellite NDVI to detect vegetation variability
Mark only suspicious or stressed zones
Export those zones to KML
Upload them into drone mission software (e.g., DJI, QGroundControl)
The drone then flies only where needed.

🛰️ Data Source
NAIP Surface Imagery
Resolution: 0.6 - 1.0 meters
Bands used:
R → Red
N → Near Infrared (NIR)
NDVI formula:
NDVI = (N - R)/(N + R)

🧠 How the Code Works
The workflow is divided into clear stages:

1️⃣ Define Analysis Parameters
You specify:
Start date
End date
Run the Script

2️⃣ Draw Region of Interest (ROI)
Draw a single polygon or rectangle
This defines the NDVI analysis boundary.
![image alt](https://github.com/aAfeworki/NAIP-Multispectral-Image-based-NDVI-Region-Analysis-for-Drone-Mission-Planning/blob/45556594b2a506d4d7db0ebf8b2f30bdf57e6877/ROI%20Selection%20for%20NDVI%20analysis.png)

3️⃣ NDVI Computation
Click the "Run NDVI analysis" button
NDVI is computed using N and R
NDVI is clipped to the ROI
Visualization includes:
True color NAIP image
NDVI color palette
![image alt](https://github.com/aAfeworki/Sentinel-2-Multispectral-Image-based-NDVI-Region-Analysis-for-Drone-Mission-Planning/blob/main/NDVI%20analysis%20and%20Visualization%20inside%20ROI.png?raw=true)

4️⃣ Mark Drone Inspection Zones
After NDVI appears:
Draw one or more polygons
These represent areas requiring drone inspection
Examples:
Low NDVI patches
Crop stress areas
Irrigation anomalies
Pest suspicion zones
![image alt](https://github.com/aAfeworki/Sentinel-2-Multispectral-Image-based-NDVI-Region-Analysis-for-Drone-Mission-Planning/blob/main/Drone%20Mission%20Planning%20Polygons%20are%20exported%20as%20KML.png?raw=true)

5️⃣ Export KML for Drone Software
Click the "Export Digitized Polygon" button
Export format:
KML


🛠️ Step-by-Step Usage Guide
Step 1 — Open Google Earth Engine
Go to:
https://code.earthengine.google.com/

Step 2 — Paste the Script
Copy NAIP_ndvi_script.js into a new script file.

Step 3 — Draw ROI
Use the polygon or rectangle tool
Rename geometry as geometry

Step 4 — Press Run
NDVI will be calculated and displayed.

Step 5 — Draw Inspection Polygons
After NDVI appears:
Draw one or more polygons
These define drone flight targets

Step 6 — Export KML
In the console, run:
exportDrawnPolygons();

Then:
Open Tasks
Click Run
The KML will be saved to Google Drive.

🎯 Practical Workflow in Agriculture
Satellite NDVI screening
Identify vegetation stress clusters
Export inspection polygons
Upload to the drone mission planner
Conduct focused UAV scouting
Apply localized treatment
This approach can reduce:
Flight time by more than 80%
Battery cycles
Field scouting labor
Fuel/energy consumption


🤝 Contribution
Contributions are welcome:
Algorithm improvements
UI enhancements
Statistical automation
Drone workflow integration
Precision agriculture extensions


👤 Author
Afework Alemu
Robotics & Precision Agriculture Research
Mechatronics Engineer
