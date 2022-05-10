./setup.ps1

$RemovePaths = @('.\build\', '.\dist\', '.\mango-server.spec')

foreach ($path in $RemovePaths) {
  Remove-Item -Recurse -Force $path -ErrorAction SilentlyContinue
}

pyinstaller -F --hidden-import="sklearn.utils._cython_blas" --hidden-import="sklearn.neighbors.typedefs" --hidden-import="sklearn.neighbors.quad_tree" --hidden-import="sklearn.tree._utils" --hidden-import="sklearn.utils._typedefs" --onefile .\mango-server.py
