
# MangoAnalysis

Data analysis tool for csv databases.

Degree paper project 2021-2022.

## Modules:
 - Principal Components Analysis
 - Factor Analysis
 - Linear Regression
 - Logistic Regression
 - Correspondence Analysis
 - K-Means
 - K Nearest Neighbors
 - Self Organizing Maps
 - Support Vector Machines

## Tech Stack

**Client:** React, Redux, MaterialUI v5

**Server:** Python, Flask

**Client + Server Merge:** ElectronJS



## Features

- Fullscreen mode (F11 / FN + F11)
- Cross platform
- Zoom in / Zoom out images + download
- Import CSV data
- Modern UI

## Demo

### Data Manager module
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/0GK35d1vrgY/0.jpg)](https://www.youtube.com/watch?v=0GK35d1vrgY)

### Principal Components module
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/nG_zG08gqsY/0.jpg)](https://www.youtube.com/watch?v=nG_zG08gqsY)

## Build

### [ Windows ]

- Clone repository
```
    git clone https://github.com/TheAncientOwl/data-analysis-tool.git
```

- Install dependencies
```
  cd .\data-analysis-tool\app
  yarn Install

  cd ..\server
  conda create --name mango-backend --file .\requirements.txt
```

- Change $Env:PYTHONPATH to server directory absolute path in setup.ps1 script

```
  $Env:PYTHONPATH = "server-directory-absolute-path"
  conda activate mango-backend
  conda env list
```

- Run build command
```
  .\build.ps1
```
