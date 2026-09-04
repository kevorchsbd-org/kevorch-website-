# 🚀 Kevorch - Premium Corporate & Agency Web Application

Welcome to the **Kevorch Official Website** project repository. This is a modern, high-performance, ultra-responsive web application designed with rich aesthetics, interactive GSAP animations, dynamic dark/light themes, and liquid smooth scrolling.

---

## 📑 Table of Contents

- [🌟 Features Overview](#-features-overview)
- [🛠️ Tech Stack & Dependencies](#%EF%B8%8F-tech-stack--dependencies)
- [📁 Project Structure](#-project-structure)
- [🧩 Components Breakdown](#-components-breakdown)
- [📄 Pages & Routes](#-pages--routes)
- [✨ Animations & Hooks](#-animations--hooks)
- [🌐 Hosting & Deployment](#-hosting--deployment)
- [🚀 Quick Start Guide](#-quick-start-guide)

---

## 🌟 Features Overview

* **Liquid Smooth Scroll**: Powered by Lenis smooth scrolling engine for a fluid desktop and mobile browsing experience.
* **GSAP & Framer Motion Animations**: High-end scroll triggers, magnetic cursor effects, text splitting, parallax scroll, and counter animations.
* **Interactive Preloader**: Pre-mount animated loading screen with progress percentage.
* **Dynamic Theme Switcher**: Full Dark Mode / Light Mode support with smooth transitions, powered by React Context and Tailwind CSS v4.
* **Responsive Architecture**: Pixel-perfect grid & flex layouts optimized for desktop, tablet, and mobile devices.
* **Firebase Hosting Ready**: Configured for single-command zero-downtime deployment to Firebase Hosting with custom domain support.

---

## 🛠️ Tech Stack & Dependencies

| Category | Technology / Library | Description |
| :--- | :--- | :--- |
| **Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) | Core UI library with strict typing |
| **Build Tool** | [Vite 8](https://vitejs.dev/) | Lightning-fast HMR and bundle optimizer |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern utility-first CSS engine |
| **Animations** | [GSAP 3](https://greensock.com/gsap/) + [Framer Motion](https://www.framer.com/motion/) | Professional timeline, scroll trigger & UI animations |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering/) | Inertial smooth scrolling |
| **Icons** | [Lucide React](https://lucide.dev/) | Modern SVG icons set |
| **Routing** | [React Router v7](https://reactrouter.com/) | Client-side page navigation |
| **Data Viz** | [Recharts](https://recharts.org/) | Data visualization graphs & charts |
| **Hosting** | [Firebase Hosting](https://firebase.google.com/docs/hosting) | Global CDN static hosting |

---

## 📁 Project Structure

```
web1/
├── .agents/                 # Workspace Agent configuration and custom skills
├── .firebase/               # Firebase hosting build cache
├── public/                  # Public static assets (favicons, logos, images)
├── src/
│   ├── animations/          # GSAP animation timeline modules
│   │   ├── hero.ts          # Hero section text & element entrance timelines
│   │   ├── navbar.ts        # Dynamic header scroll behaviors
│   │   ├── counters.ts      # Animated numerical counters
│   │   ├── services.ts      # Service card reveal triggers
│   │   ├── portfolio.ts     # Work showcase transitions
│   │   ├── contact.ts       # Contact form entrance triggers
│   │   └── loader.ts        # Preloader screen animation sequences
│   ├── components/          # Reusable UI Containers & Elements
│   │   ├── Navbar.tsx       # Main header navigation bar
│   │   ├── Footer.tsx       # Page footer with links & newsletter
│   │   ├── Preloader.tsx    # Initial splash screen preloader
│   │   ├── SmoothScroll.tsx # Lenis smooth scrolling container wrapper
│   │   ├── ScrollProgress.tsx # Top reading/scroll progress bar
│   │   ├── MagneticButton.tsx # Interactive cursor magnet wrapper
│   │   ├── Marquee.tsx      # Infinite looping logo/text ticker
│   │   ├── ThemeToggle.tsx  # Dark/Light theme mode toggle button
│   │   └── CustomCursor.tsx # Interactive cursor follower
│   ├── context/             # React Context Providers
│   │   └── ThemeContext.tsx # Global theme state (Dark/Light)
│   ├── data/                # Static data models & mock JSON payloads
│   │   ├── mockData.ts      # Services, portfolio, and testimonial data
│   │   └── executiveData.ts # Team leadership profiles & company statistics
│   ├── hooks/               # Custom React Hooks
│   │   ├── useMagnetic.ts   # Mouse tracking physics calculation
│   │   ├── useReveal.ts     # ScrollTrigger visibility observer
│   │   ├── useParallax.ts   # Scroll-based element parallax offset
│   │   ├── useCounter.ts    # Animated number increments
│   │   └── useSplitText.ts  # Typography character/word splitting
│   ├── pages/               # Top-level Page Views
│   │   ├── Home.tsx         # Main Landing Page
│   │   ├── About.tsx        # Company Profile & Team Page
│   │   ├── Services.tsx     # Solutions & Offerings Page
│   │   ├── Clients.tsx      # Portfolio & Case Studies Page
│   │   └── Contact.tsx      # Interactive Inquiry & Contact Page
│   ├── App.tsx              # Main App Component & Router Configuration
│   ├── index.css            # Custom CSS & Tailwind v4 imports
│   └── main.tsx             # Application Entry Point
├── .firebaserc              # Firebase project alias configuration
├── firebase.json            # Firebase hosting rewrites & headers
├── package.json             # Scripts & dependency definitions
├── tsconfig.json            # TypeScript compiler configuration
└── vite.config.ts           # Vite build configuration
```

---

## 🧩 Components Breakdown

### 1. 🧭 `Navbar.tsx`
* **Purpose**: Top header navigation bar.
* **Features**: Dynamic background blur on scroll, mobile responsive drawer menu, brand logo, navigation links (`Home`, `About`, `Services`, `Clients`, `Contact`), and embedded `ThemeToggle`.

### 2. 🔻 `Footer.tsx`
* **Purpose**: Comprehensive site footer container.
* **Features**: Quick links, office location addresses, interactive newsletter subscription, copyright notice, social media channels, and back-to-top button.

### 3. ⏳ `Preloader.tsx`
* **Purpose**: Initial website loading curtain.
* **Features**: Displays progress counter (0% to 100%) and smooth curtain reveal animation using GSAP before showing main page content.

### 4. 📜 `SmoothScroll.tsx`
* **Purpose**: Wrapper component for Lenis Smooth Scroll.
* **Features**: Eliminates jarring browser scrolling, delivering sleek inertial scrolling across all pages.

### 5. 📊 `ScrollProgress.tsx`
* **Purpose**: Fixed top reading bar.
* **Features**: Dynamically calculates document scroll percentage and renders a subtle highlight line at the very top of the screen.

### 6. 🧲 `MagneticButton.tsx`
* **Purpose**: Micro-interaction UI wrapper.
* **Features**: Pulls buttons slightly towards the user's cursor on hover for a tactile, futuristic feel.

### 7. 🔄 `Marquee.tsx`
* **Purpose**: Infinite sliding ticker container.
* **Features**: Seamlessly scrolls client logos, technology tags, and key highlight badges horizontally.

### 8. 🌓 `ThemeToggle.tsx`
* **Purpose**: Dark/Light mode theme switch button.
* **Features**: Smooth icon toggle between Sun and Moon, persisting user preference in `localStorage`.

---

## 📄 Pages & Routes

| Route | Page Component | Key Sections & Containers |
| :--- | :--- | :--- |
| `/` | [Home.tsx](file:///d:/company%20projects/kevorch%20documents/web%20site/web1/src/pages/Home.tsx) | Hero Section, Counter Stats, Featured Services Grid, Interactive Case Studies, Client Marquee, Testimonials, CTA Banner |
| `/about` | [About.tsx](file:///d:/company%20projects/kevorch%20documents/web%20site/web1/src/pages/About.tsx) | Company Vision & Mission, Leadership Team Profiles, Core Values, History Timeline |
| `/services` | [Services.tsx](file:///d:/company%20projects/kevorch%20documents/web%20site/web1/src/pages/Services.tsx) | Solution Offerings List, Detailed Capability Cards, Tech Stack Showcase, Delivery Process |
| `/clients` | [Clients.tsx](file:///d:/company%20projects/kevorch%20documents/web%20site/web1/src/pages/Clients.tsx) | Filterable Portfolio Gallery, Detailed Case Study Highlights, Client Impact Metrics |
| `/contact` | [Contact.tsx](file:///d:/company%20projects/kevorch%20documents/web%20site/web1/src/pages/Contact.tsx) | Interactive Inquiry Form, Global Office Locations, Direct Email/Phone Contacts, FAQ Accordion |

---

## ✨ Animations & Hooks

* **`useMagnetic`**: Uses mouse position relative to container bounding rect to apply spring physics offset.
* **`useReveal`**: Automatically attaches GSAP ScrollTrigger to elements with `.reveal` class for fading in on scroll down.
* **`useCounter`**: Animates numbers from zero to target value when scrolled into view.
* **`useParallax`**: Moves background cards or images slower than the page scroll speed to generate depth perception.

---

## 🌐 Hosting & Deployment

This project is deployed using **Firebase Hosting**.

* **Default Hosting Domains**:
  * `https://kevorch-website.web.app`
  * `https://kevorch-website.firebaseapp.com`
* **Custom Domain**: `https://kevorch.online`

### Deploying Updates to Firebase:
```bash
# 1. Build the production application
npm run build

# 2. Deploy to Firebase Hosting
firebase deploy --only hosting
```

---

## 🚀 Quick Start Guide

### 1. Installation
Clone the project directory and install node packages:
```bash
npm install
```

### 2. Development Mode
Run the Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
Compile TypeScript and bundle assets with Vite:
```bash
npm run build
```
Preview the built distribution locally:
```bash
npm run preview
```

---

*© 2026 Kevorch. All rights reserved.*
