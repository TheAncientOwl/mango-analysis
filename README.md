<h1>⚡️ MangoAnalysis</h1>

<h2>🕸 Description</h2>
<div>
  <p>&nbsp;MangoAnalysis is a comprehensive data analysis tool designed specifically for working with CSV databases. This project was developed as a degree paper project during 2021-2022, showcasing the power of data analysis in various domains. The project aimed to address the growing need for efficient and user-friendly solutions for exploring, visualizing, and interpreting data in various domains.</p>
  <p>&nbsp;With MangoAnalysis, you can delve into the depths of your data, uncovering valuable insights and patterns that can drive informed decision-making. Whether you are a researcher, data scientist, or business analyst, this tool provides a user-friendly interface to perform a wide range of analysis techniques.</p>
<hr>

<h2>🌟 Modules</h2>
<ul>
  <li><b>Principal Components Analysis:</b> Explore the underlying structure of your data and reduce its dimensionality.
</li>
  <li><b>Factor Analysis:</b> Identify latent factors that influence your dataset and extract meaningful information.</li>
  <li><b>Linear Regression:</b> Uncover relationships and predict outcomes using linear regression modeling.</li>
  <li><b>Logistic Regression:</b> Analyze categorical outcomes and estimate probabilities using logistic regression.</li>
  <li><b>Correspondence Analysis:</b> Visualize associations between categorical variables through graphical representations.</li>
  <li><b>K-Means:</b> Group data points into clusters based on similarity and uncover hidden patterns.</li>
  <li><b>K Nearest Neighbors:</b> Utilize proximity-based classification or regression algorithms to make predictions.</li>
  <li><b>Self Organizing Maps:</b> Apply unsupervised learning to visualize and cluster complex data structures.</li>
  <li><b>Support Vector Machines:</b> Build classification and regression models using powerful machine learning techniques</li>
</ul>
<hr>

<h2>🛠️ Tech Stack</h2>
<ul>
  <li><h3><b>Client: </b> React, Redux, MaterialUI v5</h3></li>
  <li><h3><b>Server</b> Python, Flask</h3></li>
  <li><h3><b>Client + Server Integration:</b> Electron JS</h3></li>
</ul>
<hr>

<h2>✨ Features</h2>
<ul>
  <li>Fullscreen mode (F11 / FN + F11)</li>
  <li>Cross platform</li>
  <li>Zoom in / Zoom out images + download</li>
  <li>Import CSV data</li>
  <li>Modern UI</li>
</ul>
<hr>

<h2>💫 Demo</h2>

<h3>🪶 Data Manager module</h3>

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/0GK35d1vrgY/0.jpg)](https://www.youtube.com/watch?v=0GK35d1vrgY)

<h3>📊 Principal Components module</h3>

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/nG_zG08gqsY/0.jpg)](https://www.youtube.com/watch?v=nG_zG08gqsY)

<h2>🐆 How to run</h2>

<h3>[ Windows PowerShell ]</h3>

```
// clone repository
$ git clone https://github.com/TheAncientOwl/data-analysis-tool.git

// install dependencies
$ cd .\data-analysis-tool\app
$ yarn Install

$ cd ..\server
$ conda create --name mango-backend --file .\requirements.txt

// change $Env:PYTHONPATH to server directory absolute path in setup.ps1 script

$ $Env:PYTHONPATH = "server-directory-absolute-path"
$ conda activate mango-backend
$ conda env list

// run build command
  .\build.ps1
```
<hr>
