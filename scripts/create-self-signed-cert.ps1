$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot
$certDir = Join-Path $projectRoot "certs"
New-Item -ItemType Directory -Force -Path $certDir | Out-Null
$securePassword = Read-Host "Enter a password for the PFX certificate" -AsSecureString
$cert = New-SelfSignedCertificate -Type CodeSigningCert -Subject "CN=Roxonic Limited" -FriendlyName "Roxonic Limited Development Code Signing" -CertStoreLocation "Cert:\CurrentUser\My" -HashAlgorithm SHA256 -KeyAlgorithm RSA -KeyLength 3072 -NotAfter (Get-Date).AddYears(3)
$pfxPath = Join-Path $certDir "roxonic-limited-dev.pfx"
$cerPath = Join-Path $certDir "roxonic-limited-dev.cer"
Export-PfxCertificate -Cert $cert.PSPath -FilePath $pfxPath -Password $securePassword | Out-Null
Export-Certificate -Cert $cert.PSPath -FilePath $cerPath | Out-Null
Write-Host "Certificate created: $pfxPath" -ForegroundColor Green
Write-Host "Publisher: Roxonic Limited" -ForegroundColor Green
Write-Host "Keep the PFX password private. Never upload the PFX." -ForegroundColor Yellow
