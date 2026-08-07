# 🌴 Hacker House Goa — Badge Generator (#FrameInGoa)

An interactive, premium, responsive web application for builders to generate, download, and share customized hacker badges for **Hacker House Goa**.

Built with **Next.js** (App Router), **React 19**, **Cloudinary**, and **Vanilla CSS** with a custom dark-mode design system.

---

## 🚀 Key Features

* **📷 Multi-Mode Photo Capture**:
  * Integrated web camera utility using the browser's native `MediaDevices` API.
  * Live camera stream switcher supporting front-facing (selfie) and rear-facing (environment) cameras.
  * Native center-cropping viewport selector.
  * Drag-and-drop desktop upload zone with image validation.
* **🎲 Interactive Role & Title Generator**:
  * Custom Stack/Role selection (Frontend, Backend, DevOps, AI/ML, Blockchain, and more).
  * Role-specific builder title generation (e.g., *CSS Sunset Whisperer*, *Midnight Deployer*, *Smart Contract Sailor*) with a micro-animated 3D dice roll transition.
* **🎨 High-Fidelity Rendering**:
  * Real-time scaling of the badge preview card to fit any screen resolution dynamically without losing aspect ratio.
  * Offline-capable Canvas confetti particles engine implemented directly in Vanilla JS/React.
  * High-definition asset compilation (exactly `1080px` by `1350px`) using `html-to-image` for high-quality downloads.
* **🔗 Dynamic Social Sharing & OpenGraph**:
  * Server-side Cloudinary pipeline to save badges and output dynamic, shareable routing identifiers.
  * Custom `generateMetadata` integration for platform sharing previews.
  * Automated OG image generator (`/api/og/[id]`) rendering interactive social preview banners on the fly using Next.js `@next/og` (`ImageResponse`).

---

## 🛠️ Technical Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, v16.3.0)
- **Library**: [React](https://react.dev/) (v19.2.8)
- **Hosting / Storage**: [Cloudinary](https://cloudinary.com/) (Secure Image Storage & Transformations)
- **Library for Rendering**: [html-to-image](https://www.npmjs.com/package/html-to-image) (HTML DOM node to PNG buffer)
- **Styles**: Custom Vanilla CSS with a responsive design token architecture ([globals.css](file:///d:/_Deployed_Projects_Vercel/Task1/src/app/globals.css))

---

## ⚙️ Configuration & Environment Setup

Copy `.env.example` to `.env.local` and configure your credentials:

```bash
cp .env.example .env.local
```

### Environment Variables

| Variable | Description | Example |
| :--- | :--- | :--- |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Account Identifier | `your-cloud-name` |
| `CLOUDINARY_API_KEY` | Cloudinary Credentials Key | `your-api-key` |
| `CLOUDINARY_API_SECRET` | Cloudinary Credentials Secret | `your-api-secret` |
| `NEXT_PUBLIC_BASE_URL` | Application Host (Used for constructing OG tags and sharing urls) | `https://hackerhousegoa.com` |

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) inside your web browser.

### 3. Build for Production
```bash
npm run build
npm start
```

---

## 📂 Project Architecture

```
Task1/
├── public/                  # Static assets & favicon
└── src/
    ├── app/
    │   ├── api/
    │   │   ├── og/[id]/     # Dynamic OpenGraph image generator API
    │   │   └── upload/      # Secure Cloudinary base64 uploader
    │   ├── card/[id]/       # Dynamic user-shareable page route
    │   ├── globals.css      # Custom design tokens, animations & styling
    │   ├── layout.js        # Global app layout
    │   └── page.js          # Core application wizard setup
    ├── components/
    │   ├── BadgeCard.js     # Responsive SVG-decorated SVG badge structure
    │   ├── DetailsForm.js   # Name, stack selectors & randomized titles form
    │   ├── PhotoCapture.js  # Camera/upload workspace controller
    │   └── ResultView.js    # Canvas confetti, previews & sharing actions
    └── lib/
        ├── builderTitles.js # Stack title datasets & randomize hooks
        └── cloudinary.js    # Cloudinary image builder helper functions
```

---

## 🌟 Code Design Patterns Highlighted

* **Adaptive Resolution Canvas**: The card preview shown to the user relies on a dynamic scale scale-matrix so that it looks exactly like the downloaded card, ensuring a "What You See Is What You Get" (WYSIWYG) builder experience.
* **Component Encapsulation**: Interactive elements (camera frame, form fields, and confetti animations) are completely modularized and decoupled for high code readability.
* **Zero Dependency Confetti**: Instead of loading bulky custom particle libraries, a custom requestAnimationFrame loop handles particles directly inside the component viewport and shuts off automatically to prevent memory leaks.
