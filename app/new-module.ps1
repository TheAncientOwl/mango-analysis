$moduleName = $args[0]

# >> Modules
$moduleDirectoryPath = "$($PSScriptRoot)/src/renderer/modules/$($moduleName)"

New-Item -Path $moduleDirectoryPath -ItemType Directory -ErrorAction SilentlyContinue
New-Item -Path $moduleDirectoryPath -Name "index.tsx"

New-Item -Path "$($moduleDirectoryPath)/steps" -ItemType Directory -ErrorAction SilentlyContinue
New-Item -Path "$($moduleDirectoryPath)/steps" -Name "index.tsx"

# >> Store
$storeDirectoryPath = "$($PSScriptRoot)/src/renderer/store/$($moduleName)"
New-Item -Path $storeDirectoryPath -ItemType Directory -ErrorAction SilentlyContinue
New-Item -Path $storeDirectoryPath -Name "actions.ts"
New-Item -Path $storeDirectoryPath -Name "reducer.ts"
New-Item -Path $storeDirectoryPath -Name "types.ts"