# Portfolio Website (React + Vite)

A personal portfolio website built with React + Vite.

## Sections

- Loader animation + Hero
- About
- Resume
- Skills
- Projects
- Certificates
- Achievements
- Contact

## Tech Stack

- React
- Vite
- CSS (component-level styles)
- framer-motion
- react-icons
- lottie-react

## Getting Started (Local)

1) Install dependencies

```bash
npm install
```

2) Start dev server

```bash
npm run dev
```

3) Build for production

```bash
npm run build
```

4) Preview the production build

```bash
npm run preview
```

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — production build (outputs to `dist/`)
- `npm run preview` — preview `dist/`
- `npm run lint` — run ESLint

## Assets

- Static files are served from `public/`
- Profile image used in Loader/Hero: `public/myprofile.jpg`

## Deploy To Vercel

1) Push this project to GitHub
2) In Vercel: **Add New → Project → Import Git Repository**
3) Build settings (usually auto-detected):

- Build Command: `npm run build`
- Output Directory: `dist`

After deploying, every `git push` will automatically trigger a redeploy.

## Push To GitHub (Quick)

From the project folder:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```
