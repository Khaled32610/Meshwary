# 🚗 Meshwary — Landing Page

> Smart trip planning & fuel-cost saving app — responsive React landing page.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite)
![CSS](https://img.shields.io/badge/Styling-Plain_CSS-1572B6?style=flat-square&logo=css3)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 📖 Overview

**Meshwary** is a fully responsive landing page built with React 19 and Vite 7. It introduces the Meshwary app — a smart trip planner that helps users save on fuel costs. The page walks visitors through the product's core value proposition, highlights key services, showcases live fuel price cards, and drives conversions through a clear download/contact call to action.

---

## ✨ Page Sections

| Section | Description |
|---|---|
| **Header** | Meshwary branding and navigation bar |
| **Hero** | Animated rotating keyword text to capture attention |
| **Services Grid** | App features — fuel tracking, AI assistant, route planning |
| **Why Meshwary** | Feature benefit cards |
| **Fuel Prices** | Live-style fuel price showcase cards |
| **About / Download CTA** | App download call to action |
| **Footer** | Logo, contact button, and social links |

---

## 🛠️ Tech Stack

- **[React 19](https://react.dev/)** — UI component library
- **[Vite 7](https://vitejs.dev/)** — Lightning-fast dev server and build tool
- **Plain CSS** — Global styling with responsive layouts (`src/styles.css`)
- **Static assets** — Images and logos served from `public/assets/`

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/meshwary-site.git
cd meshwary-site

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Opens the app at `http://localhost:5173` with hot module replacement.

### Production Build

```bash
npm run build
```

Outputs optimized static files to the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for final verification before deployment.

---

## 📁 Project Structure

```
meshwary-site/
├── public/
│   └── assets/          # Static images and logo files
├── src/
│   ├── main.jsx         # React components for the full landing page
│   └── styles.css       # Global styling and responsive layouts
├── index.html           # Vite entry HTML
└── package.json         # Scripts and dependencies
```

> All visible page content and layout styles are managed in `src/main.jsx` and `src/styles.css`.

---

## 📝 Notes & TODOs

- **Social links** — The footer currently uses placeholder links for GitHub and LinkedIn. Update them with the production profile URLs before launch.
- **Contact email** — The contact button uses `mailto:hello@meshwary.app`. Update this when the production contact address is confirmed.

---

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<p align="center">Made with ❤️ by the Meshwary Team</p>
