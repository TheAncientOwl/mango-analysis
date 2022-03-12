function Write-Info {
  param ([string] $Info)
  
  Write-Host "[" -ForegroundColor DarkGray -NoNewline
  Write-Host "Info" -ForegroundColor DarkCyan -NoNewline
  Write-Host "] " -ForegroundColor DarkGray -NoNewline
  Write-Host $Info -ForegroundColor DarkCyan
}

function Write-Error {
  param ([string] $Err)
  
  Write-Host "[" -ForegroundColor DarkGray -NoNewline
  Write-Host "Error" -ForegroundColor DarkRed -NoNewline
  Write-Host "] " -ForegroundColor DarkGray -NoNewline
  Write-Host $Err -ForegroundColor DarkRed
}

Write-Info "Building mango server..."
Set-Location server
./build.ps1
Set-Location ..
if (-not(Test-Path -Path "./server/dist/mango-server.exe")) {
  Write-Error "Mango server executable not found. Building process stopped!"
  Exit
}
Write-Info "Mango server successfully built!"

Write-Info "Removing old server build..."
Remove-Item -Recurse -Force "./app/src/main/python-build" -ErrorAction SilentlyContinue

Write-Info "Creating new server directory (app/src/main/python-build)..."
New-Item -Path "./app/src/main" -Name "python-build" -ItemType "directory"

Write-Info "Copying mango server executable into app/src/main/python-build..."
Copy-Item "./server/dist/mango-server.exe" "./app/src/main/python-build/."

Write-Info "Mango server executable copyed successfully!"

Write-Info "Building mango app..."
Set-Location app
./build.ps1
Set-Location ..
Write-Info "Mango app successfully built!"
Write-Info "Build location .\app\out\MangoAnalysis-win32-x64\Data analysis tool.exe"

Write-Info "Creating shortcut..."
Remove-Item "Mango.lnk" -ErrorAction SilentlyContinue
New-Item -ItemType SymbolicLink -Path . -Name "Mango.lnk" -Value "C:\Users\TheAncientOwl\Code\data-analysis-tool\app\out\MangoAnalysis-win32-x64\Data analysis tool.exe"
