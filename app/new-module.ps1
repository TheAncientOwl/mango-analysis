$moduleDirectoryName = $args[0]
$moduleName = $args[1]

Write-Host $moduleDirectoryName
Write-Host $moduleName

$moduleDirectoryPath = "$($PSScriptRoot)/src/renderer/modules/$($moduleDirectoryName)"
New-Item -Path $moduleDirectoryPath -ItemType Directory -ErrorAction SilentlyContinue
New-Item -Path $moduleDirectoryPath -Name "$($moduleName).tsx"
New-Item -Path $moduleDirectoryPath -Name "index.ts"

$storeDirectoryPath = "$($PSScriptRoot)/src/renderer/store/$($moduleDirectoryName)"
New-Item -Path $storeDirectoryPath -ItemType Directory -ErrorAction SilentlyContinue
New-Item -Path $storeDirectoryPath -Name "actions.ts"
New-Item -Path $storeDirectoryPath -Name "reducer.ts"
New-Item -Path $storeDirectoryPath -Name "types.ts"