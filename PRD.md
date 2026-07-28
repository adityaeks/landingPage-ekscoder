# PRD — EKSCODER Landing Page

**Product Name:** EKSCODER
**Product Type:** Creative Developer / Digital Engineering Landing Page
**Version:** 1.0
**Status:** Development Ready
**Primary Stack:** Next.js + TypeScript + Tailwind CSS + GSAP + ScrollTrigger + Lenis

---

# 1. Product Overview

## 1.1 Introduction

EKSCODER adalah sebuah personal brand / creative technology brand yang berfokus pada pengembangan website, software, cloud engineering, dan digital experiences.

Landing page EKSCODER dirancang sebagai website modern dengan pendekatan **motion-first**, menggunakan animasi sebagai bagian dari pengalaman pengguna, bukan sekadar dekorasi.

Website harus memberikan kesan:

* Modern
* Premium
* Technical
* Creative
* Futuristic
* Confident
* Developer-oriented
* Highly interactive

Visual utama menggunakan **dark theme** dengan tipografi besar, whitespace yang luas, kontras tinggi, dan animasi berbasis scroll.

Website akan menggunakan GSAP sebagai animation engine utama.

---

# 2. Goals

## 2.1 Primary Goals

1. Memperkenalkan brand EKSCODER.
2. Menampilkan kemampuan teknis dan layanan yang ditawarkan.
3. Menampilkan portfolio atau project secara visual.
4. Membangun personal branding yang kuat.
5. Memberikan pengalaman website yang memorable melalui animasi.
6. Mengarahkan pengunjung untuk menghubungi EKSCODER.
7. Menunjukkan kemampuan EKSCODER dalam membangun digital experience modern.

## 2.2 Secondary Goals

* Meningkatkan kredibilitas profesional.
* Menjadi portfolio utama.
* Menjadi landing page untuk calon klien.
* Menjadi playground untuk menunjukkan kemampuan frontend dan GSAP.
* Menjadi fondasi untuk pengembangan website dan layanan EKSCODER di masa depan.

---

# 3. Target Audience

## Primary Audience

### 1. Business Owner

Pemilik bisnis yang membutuhkan:

* Website perusahaan
* Landing page
* Sistem internal
* Digitalisasi bisnis

### 2. Startup

Startup yang membutuhkan:

* MVP
* SaaS
* Web application
* Scalable architecture

### 3. Company / Enterprise

Perusahaan yang membutuhkan:

* Custom software
* Internal dashboard
* ERP
* API integration
* Cloud infrastructure

### 4. Developer / Technology Community

Pengunjung yang tertarik melihat:

* Teknologi
* Web development
* GSAP animation
* Creative coding
* Software engineering

---

# 4. Brand Identity

## 4.1 Brand Name

**EKSCODER**

## 4.2 Brand Positioning

> Building digital experiences through code, creativity, and technology.

## 4.3 Brand Personality

EKSCODER harus terasa:

* Bold
* Technical
* Minimal
* Experimental
* Creative
* Professional
* Futuristic

## 4.4 Visual Direction

Tema utama:

**Dark Creative Technology**

Visual harus menggunakan:

* Dark background
* Large typography
* High contrast
* Minimal UI
* Subtle gradients
* Grid system
* Animated elements
* Smooth scrolling
* Large whitespace
* Motion-driven transitions

---

# 5. Color System

## Primary

```text
Background:
#0A0A0A

Surface:
#111111

Surface Secondary:
#181818

Primary Text:
#F5F5F5

Secondary Text:
#999999

Border:
#2A2A2A
```

## Accent

Gunakan satu accent color utama yang dapat digunakan secara konsisten.

Contoh:

```text
Accent:
#B8FF00
```

Accent digunakan untuk:

* CTA
* Hover
* Highlight text
* Progress indicator
* Interactive elements

Jangan menggunakan terlalu banyak warna.

---

# 6. Typography

Gunakan font sans-serif modern.

Rekomendasi:

```text
Primary:
Inter

Alternative:
Geist
Space Grotesk
Satoshi
```

Typography hierarchy:

```text
Hero Heading:
8vw – 12vw

Section Heading:
5vw – 8vw

Large Text:
3vw – 5vw

Body:
16px – 20px

Small:
12px – 14px
```

Hero heading harus memiliki karakter visual yang kuat.

Contoh:

```text
WE
BUILD
DIGITAL
EXPERIENCES.
```

Atau:

```text
CODE.
CREATE.
EVOLVE.
```

---

# 7. Website Structure

Website terdiri dari:

```text
/
├── Preloader
├── Navbar
├── Hero
├── Marquee
├── Introduction
├── Capabilities
├── Services
├── Technology
├── Selected Works
├── Process
├── CTA
└── Footer
```

---

# 8. Section Requirements

# 8.1 Preloader

## Purpose

Memberikan first impression sebelum website ditampilkan.

## Visual

Background:

```text
#0A0A0A
```

Center:

```text
EKSCODER
```

Tambahkan progress indicator:

```text
[ 000% ]
```

Progress:

```text
000%
025%
050%
075%
100%
```

## Animation

GSAP Timeline:

1. Logo muncul.
2. Progress number berjalan.
3. Progress selesai.
4. Logo scale up.
5. Preloader slide keluar.
6. Hero masuk.

Duration:

```text
2 – 3 seconds
```

Preloader harus dapat dilewati atau dipersingkat untuk returning users jika diperlukan.

---

# 8.2 Navbar

Navbar harus minimal.

Left:

```text
EKSCODER
```

Center / Right:

```text
WORK
SERVICES
ABOUT
CONTACT
```

CTA:

```text
LET'S TALK
```

## Behavior

Initial:

```text
Transparent
```

On scroll:

```text
Background blur
Border bottom
```

Navbar harus sticky.

## Animation

Menggunakan GSAP:

* Navbar masuk dari atas.
* Menu muncul stagger.
* CTA memiliki hover animation.

---

# 8.3 Hero Section

Hero merupakan bagian paling penting dari landing page.

## Content

Headline:

```text
WE BUILD
DIGITAL
EXPERIENCES.
```

Alternative:

```text
CODE
THAT
MOVES.
```

Supporting text:

```text
EKSCODER is a creative technology studio focused on building
modern digital products, scalable software, and memorable
web experiences.
```

CTA:

```text
VIEW OUR WORK
```

Secondary CTA:

```text
LET'S TALK
```

## Visual

Hero harus menggunakan:

* Large typography
* Animated text
* Abstract 3D / gradient visual
* Grid
* Floating elements
* Mouse interaction

## GSAP Animation

On page load:

```text
Hero text:
y: 100 → 0
opacity: 0 → 1
```

Animation menggunakan stagger.

Contoh sequence:

```text
EKSCODER logo
↓
Hero headline
↓
Description
↓
CTA
↓
Visual
```

## Scroll Animation

Saat user scroll:

* Hero heading scale down.
* Hero opacity berkurang.
* Background visual bergerak.
* Grid mengalami parallax.
* CTA bergerak keluar.

Gunakan:

```text
GSAP ScrollTrigger
```

---

# 8.4 Marquee Section

Horizontal scrolling text.

Contoh:

```text
WEB DEVELOPMENT
•
SOFTWARE ENGINEERING
•
CLOUD
•
UI/UX
•
DIGITAL EXPERIENCE
•
```

Animation:

* Infinite horizontal loop.
* Direction alternate.
* Pause on hover.

Teknologi:

```text
GSAP
```

---

# 8.5 Introduction Section

## Heading

```text
WE TURN
IDEAS INTO
DIGITAL PRODUCTS.
```

## Content

EKSCODER membantu bisnis dan individu mengubah ide menjadi produk digital yang cepat, scalable, dan memiliki pengalaman pengguna yang baik.

## Animation

Saat masuk viewport:

* Heading reveal per line.
* Text fade up.
* Background grid bergerak.

Gunakan:

```text
ScrollTrigger
```

---

# 8.6 Capabilities Section

Section untuk menunjukkan kemampuan utama.

Cards:

```text
01
WEB DEVELOPMENT

02
SOFTWARE ENGINEERING

03
CLOUD & INFRASTRUCTURE

04
UI/UX & DIGITAL EXPERIENCE
```

Setiap card memiliki:

* Number
* Title
* Description
* Icon / visual
* Hover animation

## Hover

Saat mouse masuk:

* Card scale up sedikit.
* Background berubah.
* Accent muncul.
* Icon bergerak.
* Cursor interaction.

---

# 8.7 Services Section

Tampilkan layanan secara visual.

Contoh:

```text
01 — Website Development

02 — Web Application

03 — Custom Software

04 — API & Backend

05 — Cloud Infrastructure

06 — UI/UX Design
```

Gunakan layout vertical list.

Setiap item memiliki:

```text
Number
Title
Description
Arrow
```

Saat hover:

* Title bergeser horizontal.
* Arrow bergerak.
* Background image muncul.
* Item lainnya sedikit meredup.

---

# 8.8 Technology Section

Section untuk menunjukkan technology stack.

Kategori:

```text
FRONTEND

React
Next.js
TypeScript
Tailwind CSS
GSAP
```

```text
BACKEND

Node.js
Laravel
PHP
REST API
```

```text
DATABASE

MySQL
PostgreSQL
MongoDB
Redis
```

```text
INFRASTRUCTURE

Docker
Linux
Nginx
Cloud
CI/CD
```

Visual:

Gunakan horizontal scrolling atau interactive technology wall.

---

# 8.9 Selected Works

Portfolio utama.

Minimal:

```text
3 – 6 projects
```

Setiap project:

```text
Project Name
Category
Year
Preview Image
Technology
```

Contoh:

```text
PROJECT 01

ERP SYSTEM
Enterprise Software

PROJECT 02

GREENORYYINN
Hospitality Platform

PROJECT 03

VPS CONTROL
Infrastructure Management
```

## Interaction

Saat hover:

* Image scale.
* Cursor berubah.
* Project title bergerak.
* Image mengikuti cursor.

## Scroll Animation

Project muncul dengan:

```text
Clip Path Reveal
Scale
Parallax
Fade
```

---

# 8.10 Process Section

Judul:

```text
HOW WE BUILD.
```

Process:

```text
01
DISCOVER

02
DESIGN

03
DEVELOP

04
DEPLOY

05
EVOLVE
```

Gunakan vertical scroll animation.

Saat user scroll:

* Progress line berjalan.
* Step aktif berubah.
* Content berganti.
* Background berubah secara halus.

---

# 8.11 CTA Section

CTA harus menjadi salah satu section paling kuat.

Headline:

```text
HAVE AN IDEA?

LET'S BUILD IT.
```

Supporting text:

```text
Have a project, product, or idea in mind?
Let's turn it into something real.
```

CTA:

```text
START A PROJECT
```

## Animation

Saat user memasuki section:

* Heading reveal.
* CTA scale.
* Background gradient bergerak.
* Cursor interaction.

---

# 8.12 Footer

Footer minimal.

Content:

```text
EKSCODER
Building digital experiences through code.

WORK
SERVICES
ABOUT
CONTACT
```

Social:

```text
GitHub
LinkedIn
Instagram
X
```

Bottom:

```text
© 2026 EKSCODER
ALL RIGHTS RESERVED.
```

---

# 9. Animation Architecture

Semua animasi harus menggunakan GSAP.

## Core

```text
GSAP
```

## Scroll

```text
ScrollTrigger
```

## Smooth Scroll

```text
Lenis
```

## Optional

```text
SplitText
```

atau library text splitting alternatif.

---

# 10. Animation Principles

Animasi harus:

* Smooth
* Intentional
* Fast enough
* Tidak mengganggu usability
* Tidak terlalu berlebihan

Gunakan easing:

```text
power2.out
power3.out
power4.out
expo.out
circ.out
```

Durasi standar:

```text
Micro interaction:
0.2 – 0.5s

Component:
0.6 – 1s

Section:
1 – 2s
```

---

# 11. Smooth Scroll

Gunakan:

```text
Lenis
```

Integrasikan dengan GSAP ticker.

Konsep:

```text
User Scroll
     ↓
Lenis
     ↓
GSAP Ticker
     ↓
ScrollTrigger
     ↓
Animation
```

Pastikan:

* ScrollTrigger sinkron dengan Lenis.
* Tidak ada scroll lag.
* Mobile tetap performant.

---

# 12. Responsive Design

Website wajib mendukung:

```text
Desktop
Tablet
Mobile
```

Breakpoint:

```text
Mobile:
< 768px

Tablet:
768px – 1024px

Desktop:
> 1024px
```

Pada mobile:

* Kurangi animasi berat.
* Matikan cursor follower.
* Kurangi parallax.
* Kurangi ScrollTrigger.
* Gunakan animasi sederhana.

---

# 13. Performance

Target:

```text
Lighthouse Performance:
> 90

Accessibility:
> 90

Best Practices:
> 90

SEO:
> 90
```

Optimasi:

* Next.js Image
* Lazy loading
* Code splitting
* Dynamic import
* Compress images
* WebP / AVIF
* Minimize JS
* Avoid unnecessary re-renders

GSAP harus digunakan secara modular.

Jangan membuat satu file animation besar.

Struktur:

```text
animations/
├── hero.ts
├── navbar.ts
├── marquee.ts
├── services.ts
├── projects.ts
└── footer.ts
```

---

# 14. Accessibility

Website harus mendukung:

* Semantic HTML
* Keyboard navigation
* ARIA label
* Visible focus state
* Alt text
* Sufficient contrast

Implementasikan:

```css
prefers-reduced-motion
```

Jika user memilih reduced motion:

```text
Disable:
- Parallax
- Complex transitions
- Cursor follower
- Excessive ScrollTrigger
```

---

# 15. SEO

Metadata:

```text
Title:
EKSCODER — Building Digital Experiences

Description:
EKSCODER builds modern digital products, scalable software,
and memorable web experiences through code and technology.
```

Open Graph:

```text
og:title
og:description
og:image
```

Tambahkan:

```text
sitemap.xml
robots.txt
favicon
```

---

# 16. Technical Architecture

## Framework

```text
Next.js
```

## Language

```text
TypeScript
```

## Styling

```text
Tailwind CSS
```

## Animation

```text
GSAP
GSAP ScrollTrigger
```

## Smooth Scroll

```text
Lenis
```

## Deployment

Recommended:

```text
Vercel
```

Alternative:

```text
VPS
Docker
Nginx
```

---

# 17. Suggested Project Structure

```text
src/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   │
│   └── components/
│
├── components/
│   │
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Preloader.tsx
│   │
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Marquee.tsx
│   │   ├── Introduction.tsx
│   │   ├── Capabilities.tsx
│   │   ├── Services.tsx
│   │   ├── Technologies.tsx
│   │   ├── Projects.tsx
│   │   ├── Process.tsx
│   │   └── CTA.tsx
│   │
│   └── ui/
│       ├── Button.tsx
│       ├── MagneticButton.tsx
│       └── Cursor.tsx
│
├── animations/
│   ├── hero.ts
│   ├── navbar.ts
│   ├── marquee.ts
│   ├── services.ts
│   └── projects.ts
│
├── data/
│   ├── projects.ts
│   ├── services.ts
│   └── technologies.ts
│
└── lib/
    ├── gsap.ts
    └── lenis.ts
```

---

# 18. Core User Journey

User flow:

```text
OPEN WEBSITE
      ↓
PRELOADER
      ↓
HERO
      ↓
"WHO IS EKSCODER?"
      ↓
CAPABILITIES
      ↓
SERVICES
      ↓
TECHNOLOGY
      ↓
SELECTED WORKS
      ↓
PROCESS
      ↓
CTA
      ↓
CONTACT
```

The website should feel like a continuous visual journey rather than a collection of disconnected sections.

---

# 19. Interaction Requirements

Minimum interactive features:

### 1. Magnetic Button

CTA mengikuti pergerakan cursor secara halus.

### 2. Custom Cursor

Cursor berubah berdasarkan elemen yang di-hover.

### 3. Image Reveal

Project image muncul menggunakan clip-path animation.

### 4. Text Reveal

Heading muncul berdasarkan:

```text
word
line
character
```

### 5. Parallax

Image dan background bergerak dengan kecepatan berbeda.

### 6. Horizontal Scroll

Technology atau project section dapat menggunakan horizontal scrolling.

### 7. Marquee

Infinite looping text.

### 8. Scroll Progress

Progress indicator menunjukkan posisi scroll halaman.

---

# 20. MVP Scope

Versi pertama harus memiliki:

```text
[ ] Next.js setup
[ ] TypeScript
[ ] Tailwind CSS
[ ] GSAP
[ ] ScrollTrigger
[ ] Lenis
[ ] Dark theme
[ ] Preloader
[ ] Navbar
[ ] Hero
[ ] Marquee
[ ] Introduction
[ ] Capabilities
[ ] Services
[ ] Technology
[ ] Projects
[ ] Process
[ ] CTA
[ ] Footer
[ ] Responsive design
[ ] Reduced motion
[ ] SEO metadata
```

---

# 21. Phase 2

Setelah MVP selesai:

```text
[ ] Project detail pages
[ ] CMS integration
[ ] Contact form
[ ] Email notification
[ ] Blog
[ ] Case studies
[ ] Admin dashboard
[ ] Analytics
```

---

# 22. Phase 3

Advanced experience:

```text
[ ] WebGL
[ ] Three.js
[ ] React Three Fiber
[ ] 3D interactive hero
[ ] Advanced cursor system
[ ] GPU-powered effects
[ ] Interactive particle system
[ ] Sound design
```

Phase 3 hanya dilakukan jika tidak mengorbankan performance.

---

# 23. Definition of Done

Landing page dianggap selesai jika:

* Semua section sudah tersedia.
* Responsive di mobile, tablet, desktop.
* GSAP animation berjalan lancar.
* ScrollTrigger sinkron dengan Lenis.
* Tidak ada console error.
* Tidak ada hydration error.
* Lighthouse score minimal 90.
* Reduced motion tersedia.
* SEO metadata tersedia.
* Semua CTA berfungsi.
* Semua project dapat diklik.
* Website dapat di-deploy ke production.

---

# 24. Final Creative Direction

EKSCODER harus terasa seperti:

> **A digital playground built by engineers who care about design.**

Website bukan hanya menampilkan informasi.

Website harus menjadi **demonstrasi kemampuan EKSCODER itu sendiri**.

Pengunjung harus merasakan:

```text
"Wow, website ini dibuat dengan serius."
```

sebelum mereka membaca seluruh isi website.

Prioritas utama:

```text
1. Visual Identity
2. User Experience
3. Motion Design
4. Performance
5. Content
6. Conversion
```

Prinsip utama:

> **The website is the portfolio.**

Setiap animasi, transisi, interaksi, dan detail visual harus menjadi bukti bahwa EKSCODER mampu membangun digital experience yang modern dan berkualitas.
