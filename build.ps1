function Write-Info {
  param (
    $Info
  )
  
  Write-Host "[" -ForegroundColor DarkGray -NoNewline
  Write-Host "Info" -ForegroundColor DarkCyan -NoNewline
  Write-Host "] " -ForegroundColor DarkGray -NoNewline
  Write-Host $Info -ForegroundColor DarkCyan
}

function Write-Error {
  param (
    $Err
  )
  
  Write-Host "[" -ForegroundColor DarkGray -NoNewline
  Write-Host "Error" -ForegroundColor DarkRed -NoNewline
  Write-Host "] " -ForegroundColor DarkGray -NoNewline
  Write-Host $Err -ForegroundColor DarkRed
}

Write-Info "Building mango server..."
Set-Location server
./build.ps1
Set-Location ..
if (-not(Test-Path -Path './server/dist/mango-server.exe')) {
  Write-Error "Mango server executable not found. Building process stopped!"
  Exit
}
Write-Info "Mango server successfully built!"
