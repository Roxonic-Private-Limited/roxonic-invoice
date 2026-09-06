<div align="center">

  <img src="src/assets/roxonic-logo.png" alt="Roxonic Invoice Logo" width="160" />

  # Roxonic Invoice

  **Professional, offline-first invoice maker and billing software for Windows.**

  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
  [![Platform](https://img.shields.io/badge/Platform-Windows%20x64-0078D6.svg?logo=windows&logoColor=white)](#)
  [![Electron](https://img.shields.io/badge/Electron-40.10.6-47848F.svg?logo=electron&logoColor=white)](#)
  [![Get it from Microsoft Store](https://img.shields.io/badge/Microsoft%20Store-Download-0078D6.svg?logo=windows&logoColor=white)](https://apps.microsoft.com/detail/9P0B6F65ZCQT?hl=en-us&gl=IN&ocid=pdpshare)
  [![CI](https://github.com/roxoniclimited/roxonic-invoice/actions/workflows/ci.yml/badge.svg)](https://github.com/roxoniclimited/roxonic-invoice/actions/workflows/ci.yml)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
  [![Code of Conduct](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)

</div>

---

## 📥 Get Roxonic Invoice

Choose your preferred way to install and run Roxonic Invoice on Windows:

| Installation Method | Link | Description |
|---|---|---|
| 🛍️ **Microsoft Store** | [**Get from Microsoft Store**](https://apps.microsoft.com/detail/9P0B6F65ZCQT?hl=en-us&gl=IN&ocid=pdpshare) | **Recommended.** Verified by Microsoft with seamless one-click installation and automatic background updates. |
| 🌐 **Official Website** | [**Download Standalone Installer**](https://software.roxoniclimited.com/product/roxonic-invoice) | Official direct Windows x64 setup executable (`.exe`). |
| 💻 **Build from Source** | [**Clone & Build**](#-packaging--building) | Complete open-source workflow using Electron & NSIS. |

---

## 🌟 Overview

**Roxonic Invoice** is a fast, modern desktop application created for freelancers, contractors, and small-to-medium businesses who want full control over their billing without being tied to recurring SaaS subscriptions or cloud servers.

Built with **Electron**, **Vanilla HTML5**, **CSS3**, and **JavaScript**, Roxonic Invoice operates **100% offline**, ensuring your invoices, client directory, and financial records never leave your local computer.

---

## ✨ Features

- **🎨 Live A4 Invoice Designer**: Real-time preview with customizable templates (*Neon*, *Professional*, *Classic*, *Minimal*), custom brand colors, invoice numbering sequences, and custom prefixes.
- **👥 Customer Vault**: Manage clients locally with phone numbers, emails, addresses, and GSTIN. Easily search and autofill during invoice creation.
- **📦 Products & Services Catalog**: Save reusable catalog items with pre-configured rates, SKUs, and tax percentages.
- **⚖️ Flexible Tax Treatments**:
  - Split GST (CGST + SGST)
  - CGST Only
  - SGST Only
  - Bill of Supply / Non-taxable
- **🏢 Complete Business Identity**: Store company name, logo, GSTIN, PAN, website, bank account details, and UPI ID for display on invoices.
- **💰 Financial Tracking**: Manage item-level discounts, overall invoice discounts, payment status (Paid, Partial, Unpaid), payment methods, and balance due.
- **🖨️ Direct Printing & PDF Export**: Instant direct printing to physical/virtual printers and A4 PDF export with automated filenames (`Customer_InvoiceNumber.pdf`).
- **📲 Fast Sharing**: 
  - One-click copy summary to clipboard
  - Send directly via WhatsApp
  - Launch default email client with pre-filled invoice information
- **🔒 Zero Cloud & Private**: No cloud accounts, no tracking telemetry, and no hidden subscriptions.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Runtime** | [Electron](https://www.electronjs.org/) (v40.x) |
| **Frontend UI** | Vanilla HTML5 & Modern CSS3 (CSS Grid/Flexbox) |
| **Client Logic** | Vanilla ES6+ JavaScript |
| **Packaging** | [electron-builder](https://www.electron.build/) with NSIS Target |
| **Signing Automation** | PowerShell scripts for certificate management |

---

## 📂 Project Structure

```text
Roxonic-Invoice/
├── build/                      # Build assets and icons
│   ├── icon.ico                # Windows application icon
│   └── icon.png                # High-res application icon
├── certs/                      # Local certificate folder (git-ignored)
├── electron/                   # Electron process files
│   ├── main.js                 # Electron main process & IPC handlers
│   └── preload.js              # Context isolation bridge
├── scripts/                    # PowerShell automation scripts
│   ├── build-signed.ps1        # Build and sign NSIS installer
│   ├── create-self-signed-cert.ps1 # Generate local testing certificate
│   └── verify-signature.ps1    # Inspect binary digital signature
├── src/                        # Frontend application
│   ├── assets/                 # Brand assets and graphics
│   │   └── roxonic-logo.png
│   ├── app.js                  # Core billing engine & UI logic
│   ├── index.html              # Main application shell
│   └── style.css               # Application styling & themes
├── .gitignore                  # Git ignore rules
├── CONTRIBUTING.md             # Contribution guidelines
├── LICENSE                     # MIT License
├── package.json                # Project dependencies & scripts
├── README.md                   # Project documentation
└── SECURITY.md                 # Security & vulnerability reporting
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher
- **Operating System**: Windows 10 or Windows 11 (x64)

### 1. Clone the Repository

```bash
git clone https://github.com/roxoniclimited/roxonic-invoice.git
cd roxonic-invoice
```

### 2. Install Dependencies

```bash
npm install
```

> **Note on Windows script execution:**
> If Electron scripts are blocked during installation, approve and rebuild:
> ```bash
> npm install-scripts approve electron
> npm rebuild electron --foreground-scripts
> ```

### 3. Run in Development Mode

```bash
npm start
# or
npm run dev
```

---

## 📦 Packaging & Building

### Standard NSIS Installer

To build an unsigned Windows x64 NSIS installer:

```bash
npm run dist
```
The output installer will be generated in the `release/` directory:
`release/Roxonic-Invoice-Setup-1.0.0.exe`

### Signed Build Workflow (Development / Self-Signed)

1. **Generate a local self-signed certificate**:
   ```powershell
   npm run create-cert
   ```
2. **Build and sign the installer**:
   > **Note**: Run **Command Prompt or PowerShell as Administrator** to allow symlink creation during electron-builder packaging.
   ```powershell
   npm run build:signed
   ```
3. **Verify the digital signature**:
   ```powershell
   npm run verify-signature
   ```

*Self-signed certificates are intended solely for local testing and will not suppress Windows SmartScreen warnings on other machines. For commercial releases, a trusted EV/OV Code Signing Certificate is recommended.*

---

## 🤝 Contributing

Contributions are welcome! Whether it is reporting a bug, proposing a new feature, or submitting code improvements:

1. Read our [CONTRIBUTING.md](CONTRIBUTING.md) guide.
2. Fork the repository and create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m "feat: add amazing feature"`).
4. Push to your branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🏢 Author & Maintainer

Maintained with ❤️ by **Roxonic Private Limited**.

- **Website**: [roxoniclimited.com](https://roxoniclimited.com)
- **Official Product Download**: [software.roxoniclimited.com/product/roxonic-invoice](https://software.roxoniclimited.com/product/roxonic-invoice)
- **Microsoft Store**: [Roxonic Invoice on Microsoft Store](https://apps.microsoft.com/detail/9P0B6F65ZCQT?hl=en-us&gl=IN&ocid=pdpshare)
