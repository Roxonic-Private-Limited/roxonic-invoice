$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot
$pfxPath = Join-Path $projectRoot "certs\roxonic-limited-dev.pfx"
if (-not (Test-Path $pfxPath)) { Write-Host "Run npm run create-cert first." -ForegroundColor Red; exit 1 }
$secure = Read-Host "Enter the PFX password" -AsSecureString
$bstr=[Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
try {$plain=[Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)} finally {[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)}
$env:WIN_CSC_LINK=$pfxPath
$env:WIN_CSC_KEY_PASSWORD=$plain
$env:CSC_KEY_PASSWORD=$plain
try {
  npm run dist
  if ($LASTEXITCODE -ne 0) { throw "electron-builder failed with exit code $LASTEXITCODE" }
} finally {
  Remove-Item Env:WIN_CSC_LINK -ErrorAction SilentlyContinue
  Remove-Item Env:WIN_CSC_KEY_PASSWORD -ErrorAction SilentlyContinue
  Remove-Item Env:CSC_KEY_PASSWORD -ErrorAction SilentlyContinue
}
Write-Host "Signed build complete. See release\." -ForegroundColor Green
