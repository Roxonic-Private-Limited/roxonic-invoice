$ErrorActionPreference = "Stop"
$installer = Join-Path (Split-Path -Parent $PSScriptRoot) "release\Roxonic-Invoice-Setup-1.0.0.exe"
if (-not (Test-Path $installer)) { Write-Host "Installer not found: $installer" -ForegroundColor Red; exit 1 }
$sig=Get-AuthenticodeSignature $installer
$sig | Format-List Status,StatusMessage,SignerCertificate
Write-Host "SHA-256:" -ForegroundColor Cyan
Get-FileHash -Algorithm SHA256 $installer | Format-List
