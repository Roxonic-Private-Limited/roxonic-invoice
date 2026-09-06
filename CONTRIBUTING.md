# Contributing to Roxonic Invoice

Thank you for your interest in contributing to **Roxonic Invoice**! As an open-source, offline-first invoice solution, we welcome community feedback, bug reports, and code contributions.

---

## Code of Conduct

We are committed to providing a welcoming, inclusive, and respectful environment for everyone. Please treat fellow contributors with courtesy, respect, and professionalism.

---

## How Can I Contribute?

### 1. Reporting Bugs
Before submitting an issue, please search existing issues to see if it has already been reported.

When opening a bug report:
- Use a clear and descriptive title.
- Detail the steps to reproduce the bug.
- Include the expected behavior vs. actual behavior.
- Mention your environment (Windows version, Node.js version).
- Attach screenshots if applicable.

### 2. Suggesting Features
Enhancement ideas are warmly welcomed!
- Check existing issues or discussions to ensure your idea hasn't already been suggested.
- Clearly describe the use case and why this feature would benefit users.
- Outline how the proposed feature should work visually and logically.

### 3. Submitting Pull Requests (PRs)

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/<your-username>/roxonic-invoice.git
   cd roxonic-invoice
   ```
3. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bugfix-name
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Make your changes**:
   - Keep your changes focused and minimal.
   - Test your changes thoroughly by launching the Electron app (`npm start`).
   - Validate JS syntax with `node -c <file>`.
6. **Commit your changes**:
   - Follow standard semantic commit messages (e.g., `feat: add export format`, `fix: correct invoice date picker`).
7. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Open a Pull Request** targeting the `main` branch of the upstream repository.

---

## Development Guidelines

- **Zero Cloud Dependence**: Roxonic Invoice is built with an offline-first architecture. Any feature that requires external cloud connectivity must be strictly optional and preserve user privacy.
- **Code Style**:
  - Keep JavaScript vanilla, readable, and well-structured.
  - Maintain styling consistency within `src/style.css`.
  - Do not introduce heavy dependencies unless necessary.
- **Security & Secrets**:
  - **Never commit `.pfx`, `.p12`, or private key files.**
  - Sensitive files should always be ignored via `.gitignore`.

---

## License

By contributing to Roxonic Invoice, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
