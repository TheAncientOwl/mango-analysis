./setup.ps1

$RemovePaths = @('.\build\', '.\dist\', '.\mango-server.spec')

foreach ($path in $RemovePaths) {
  Remove-Item -Recurse -Force $path -ErrorAction SilentlyContinue
}

pyinstaller --onefile .\mango-server.py
