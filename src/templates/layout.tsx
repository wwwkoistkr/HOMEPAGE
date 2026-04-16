// KOIST - Main Layout Template (v32.0 - 2x Text, Half Line-Height, Tab Menu, 8K Ultra-Sharp)
import type { SettingsMap, DepartmentWithPages } from '../types';

export function layout(opts: {
  title?: string;
  settings: SettingsMap;
  departments?: DepartmentWithPages[];
  bodyClass?: string;
  content: string;
  headExtra?: string;
}) {
  const s = opts.settings;
  const siteName = s.site_name || '(주)한국정보보안기술원';
  const pageTitle = opts.title ? `${opts.title} - ${siteName}` : siteName;
  const deps = opts.departments || [];

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=5">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="theme-color" content="#0A0F1E">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="msapplication-TileColor" content="#0A0F1E">
  <meta name="color-scheme" content="dark light">
  <meta name="description" content="${s.meta_description || ''}">
  <meta name="keywords" content="${s.meta_keywords || ''}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${pageTitle}">
  <meta property="og:description" content="${s.meta_description || ''}">
  <meta property="og:url" content="https://koist.kr">
  ${s.naver_verification ? `<meta name="naver-site-verification" content="${s.naver_verification}">` : ''}
  <title>${pageTitle}</title>
  <link rel="icon" type="image/png" href="/static/images/logo-circle.png">

  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary:  { DEFAULT: '#0A0F1E', light: '#141B2D', lighter: '#1E293B', mid: '#1A2640', soft: '#334155' },
            accent:   { DEFAULT: '#3B82F6', dark: '#2563EB', light: '#60A5FA', pale: '#93C5FD', teal: '#06B6D4' },
            cyber:    { DEFAULT: '#06B6D4', light: '#22D3EE', dark: '#0891B2', glow: '#67E8F9' },
            emerald:  { glow: '#10B981', light: '#34D399' },
            neon:     { blue: '#4F9CF7', cyan: '#38BDF8', purple: '#A78BFA', pink: '#F472B6' },
            surface:  { DEFAULT: '#F8FAFC', warm: '#F1F5F9', card: '#FFFFFF', muted: '#E2E8F0', cool: '#EFF6FF', ice: '#F0F9FF' },
            glass:    { light: 'rgba(255,255,255,0.06)', mid: 'rgba(255,255,255,0.10)', heavy: 'rgba(255,255,255,0.16)' },
          },
          fontFamily: {
            sans: ['"Noto Sans KR"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
          },
          boxShadow: {
            'glass':      '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.06)',
            'card':       '0 1px 3px rgba(15,23,42,0.03), 0 4px 16px rgba(15,23,42,0.04)',
            'card-hover': '0 20px 48px rgba(15,23,42,0.10), 0 4px 12px rgba(15,23,42,0.04)',
            'glow-blue':  '0 0 20px rgba(59,130,246,0.20), 0 0 60px rgba(59,130,246,0.06)',
            'glow-cyan':  '0 0 20px rgba(6,182,212,0.20), 0 0 60px rgba(6,182,212,0.06)',
            'premium':    '0 1px 2px rgba(15,23,42,0.03), 0 4px 16px rgba(15,23,42,0.05), 0 12px 40px rgba(15,23,42,0.03)',
          },
        }
      }
    }
  </script>

  <!-- Google Fonts — Variable Weight for HiDPI crisp rendering -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

  <!-- FontAwesome Icons -->
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">

  <!-- AOS Animation -->
  <link href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" rel="stylesheet">

  <style>
    /* ═══════════════════════════════════════════════════════════════════
       KOIST PREMIUM DESIGN SYSTEM v15.0
       ─ Ultra HiDPI / Retina / 4K / 5K / 8K optimized
       ─ Advanced Glassmorphism + Depth Layering
       ─ CrowdStrike / Cloudflare / Palo Alto grade visuals
       ─ Micro-interactions + Particle effects
       ═══════════════════════════════════════════════════════════════════ */

    :root {
      /* ── Fluid Typography Scale (Korean-optimized, v31 enhanced) ── */
      --text-xs:   clamp(0.78rem, 0.70rem + 0.24vw, 0.92rem);
      --text-sm:   clamp(0.88rem, 0.80rem + 0.28vw, 1.05rem);
      --text-base: clamp(1.0rem, 0.90rem + 0.35vw, 1.18rem);
      --text-lg:   clamp(1.12rem, 1.0rem + 0.45vw, 1.38rem);
      --text-xl:   clamp(1.32rem, 1.12rem + 0.58vw, 1.65rem);
      --text-2xl:  clamp(1.55rem, 1.28rem + 0.78vw, 2.15rem);
      --text-3xl:  clamp(1.92rem, 1.50rem + 1.1vw, 2.80rem);
      --text-hero: clamp(2.5rem, 1.8rem + 2vw, 4.0rem);

      /* ── Fluid Spacing Scale ── */
      --space-2xs: clamp(0.15rem, 0.1rem + 0.1vw, 0.25rem);
      --space-xs:  clamp(0.25rem, 0.2rem + 0.15vw, 0.4rem);
      --space-sm:  clamp(0.5rem, 0.4rem + 0.3vw, 0.75rem);
      --space-md:  clamp(0.75rem, 0.6rem + 0.5vw, 1.25rem);
      --space-lg:  clamp(1.25rem, 1rem + 0.8vw, 2rem);
      --space-xl:  clamp(2rem, 1.5rem + 1.5vw, 3.5rem);
      --space-2xl: clamp(3rem, 2rem + 2.5vw, 5rem);

      /* ── Fluid Container ── */
      --container-pad: clamp(1rem, 0.5rem + 2vw, 2.5rem);
      --container-max: min(100% - var(--container-pad) * 2, 1320px);

      /* ── GNB (v33 - 2-tier header: top bar + gnb bar) ── */
      --gnb-top-h: clamp(62px, 54px + 2vw, 86px);
      --gnb-bar-h: clamp(48px, 42px + 1.6vw, 64px);
      --gnb-h: calc(var(--gnb-top-h) + var(--gnb-bar-h));

      /* ── Premium Shadow Scale (4-level) ── */
      --shadow-xs:  0 1px 2px rgba(10,15,30,0.03);
      --shadow-sm:  0 2px 8px rgba(10,15,30,0.04), 0 1px 2px rgba(10,15,30,0.02);
      --shadow-md:  0 4px 16px rgba(10,15,30,0.06), 0 2px 4px rgba(10,15,30,0.02);
      --shadow-lg:  0 12px 40px rgba(10,15,30,0.08), 0 4px 8px rgba(10,15,30,0.03);
      --shadow-xl:  0 24px 64px rgba(10,15,30,0.12), 0 8px 16px rgba(10,15,30,0.04);
      --shadow-glow-blue: 0 0 20px rgba(59,130,246,0.18), 0 0 60px rgba(59,130,246,0.05);
      --shadow-glow-cyan: 0 0 20px rgba(6,182,212,0.18), 0 0 60px rgba(6,182,212,0.05);

      /* ── Premium Border Radius ── */
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 16px;
      --radius-xl: 20px;
      --radius-2xl: 24px;
      --radius-full: 9999px;

      /* ── Transitions ── */
      --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
      --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
      --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);

      /* ── Premium Gradient Tokens ── */
      --grad-hero: linear-gradient(135deg, #0A0F1E 0%, #0F1B33 35%, #0C1629 70%, #0A0F1E 100%);
      --grad-accent: linear-gradient(135deg, #2563EB 0%, #3B82F6 50%, #06B6D4 100%);
      --grad-glass-dark: linear-gradient(135deg, rgba(15,23,42,0.90), rgba(15,23,42,0.96));
      --grad-surface: linear-gradient(180deg, #F0F4F8 0%, #F8FAFC 50%, #FFFFFF 100%);
      --grad-card-shine: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(255,255,255,0.02) 100%);
    }

    /* ── 4K Ultra-wide ── */
    @media (min-width: 2560px) {
      :root {
        --container-max: min(100% - 5rem, 1700px);
        --text-hero: clamp(3.0rem, 2.2rem + 1.3vw, 4.5rem);
        --gnb-top-h: 74px;
        --gnb-bar-h: 56px;
        --gnb-h: calc(var(--gnb-top-h) + var(--gnb-bar-h));
      }
    }
    /* ── 5K+ ── */
    @media (min-width: 3840px) {
      :root {
        --container-max: min(100% - 8rem, 2100px);
        --text-hero: clamp(3.6rem, 2.8rem + 1.2vw, 5.2rem);
        --gnb-top-h: 84px;
        --gnb-bar-h: 62px;
        --gnb-h: calc(var(--gnb-top-h) + var(--gnb-bar-h));
      }
    }
    /* ── 8K (7680px+) ── */
    @media (min-width: 7680px) {
      :root {
        --container-max: min(100% - 14rem, 2800px);
        --text-hero: clamp(4.5rem, 3.5rem + 1.4vw, 7rem);
        --gnb-top-h: 110px;
        --gnb-bar-h: 80px;
        --gnb-h: calc(var(--gnb-top-h) + var(--gnb-bar-h));
        --text-xs: 1.4rem;
        --text-sm: 1.65rem;
        --text-base: 1.9rem;
        --text-lg: 2.3rem;
        --text-xl: 2.8rem;
        --text-2xl: 3.5rem;
        --text-3xl: 4.4rem;
      }
      /* 8K image scaling — override inline clamp max values */
      .kolas-mark { height: 220px !important; }
      .footer-logo { height: 120px !important; }
    }
    @media (min-width: 3840px) {
      .kolas-mark { height: 140px !important; }
      .footer-logo { height: 80px !important; }
    }
    @media (min-width: 2560px) {
      .kolas-mark { height: 110px !important; }
      .footer-logo { height: 64px !important; }
    }

    /* ═══════ GLOBAL HiDPI RENDERING (v30 Windows/Mobile compat) ═══════ */
    * {
      font-family: 'Noto Sans KR', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
      box-sizing: border-box;
    }
    html {
      scroll-behavior: smooth;
      font-feature-settings: 'kern' 1, 'liga' 1;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }
    body {
      letter-spacing: -0.01em;
      line-height: 1.25;
      background: var(--grad-surface);
      -webkit-tap-highlight-color: transparent;
      overflow-x: hidden;
    }
    /* Fix: per-section overflow control instead of body-level */
    .overflow-section { overflow-x: hidden; }

    /* ── Premium Scrollbar (v30 - Firefox + WebKit) ── */
    /* Firefox scrollbar */
    html { scrollbar-width: thin; scrollbar-color: rgba(100,116,139,0.50) transparent; }
    * { scrollbar-width: thin; scrollbar-color: rgba(100,116,139,0.40) transparent; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, rgba(148,163,184,0.35), rgba(100,116,139,0.50));
      border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover { background: rgba(100,116,139,0.65); }

    /* ═══════ FLUID CONTAINER ═══════ */
    .fluid-container {
      width: var(--container-max);
      margin-left: auto;
      margin-right: auto;
      padding-left: var(--container-pad);
      padding-right: var(--container-pad);
    }

    /* ═══════ FLUID TEXT UTILITIES (v32 - ~half line-height) ═══════ */
    .f-text-xs   { font-size: var(--text-xs); line-height: 1.2; }
    .f-text-sm   { font-size: var(--text-sm); line-height: 1.2; }
    .f-text-base { font-size: var(--text-base); line-height: 1.25; }
    .f-text-lg   { font-size: var(--text-lg); line-height: 1.2; }
    .f-text-xl   { font-size: var(--text-xl); line-height: 1.15; }
    .f-text-2xl  { font-size: var(--text-2xl); line-height: 1.1; letter-spacing: -0.02em; }
    .f-text-3xl  { font-size: var(--text-3xl); line-height: 1.05; letter-spacing: -0.025em; }
    .f-text-hero { font-size: var(--text-hero); line-height: 1.05; letter-spacing: -0.03em; }

    /* ═══════ FLUID SPACING UTILITIES ═══════ */
    .f-section-y    { padding-top: var(--space-2xl); padding-bottom: var(--space-2xl); }
    .f-section-y-sm { padding-top: var(--space-xl); padding-bottom: var(--space-xl); }
    .f-gap          { gap: var(--space-lg); }
    .f-gap-sm       { gap: var(--space-md); }
    .f-gap-xs       { gap: var(--space-sm); }
    .f-mb           { margin-bottom: var(--space-lg); }
    .f-mb-sm        { margin-bottom: var(--space-md); }
    .f-mb-xs        { margin-bottom: var(--space-sm); }
    .f-p            { padding: var(--space-lg); }
    .f-p-sm         { padding: var(--space-md); }

    /* ═══════════════════════════════════════════════
       GLASSMORPHISM COMPONENTS (Multi-level)
       ═══════════════════════════════════════════════ */

    /* Dark glass for dark backgrounds */
    .glass {
      background: rgba(255,255,255,0.04);
      backdrop-filter: blur(24px) saturate(180%);
      -webkit-backdrop-filter: blur(24px) saturate(180%);
      border: 1px solid rgba(255,255,255,0.07);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.12);
    }

    /* Light glass for light backgrounds */
    .glass-light {
      background: rgba(255,255,255,0.72);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid rgba(255,255,255,0.60);
      box-shadow: 0 4px 24px rgba(15,23,42,0.04), inset 0 1px 0 rgba(255,255,255,0.50);
    }

    /* ═══ Windows backdrop-filter fallback (Intel UHD / disabled GPU accel) ═══ */
    @supports not (backdrop-filter: blur(1px)) {
      .glass { background: rgba(15,23,42,0.95); border: 1px solid rgba(255,255,255,0.10); }
      .glass-light { background: rgba(255,255,255,0.95); border: 1px solid rgba(226,232,240,0.60); }
      .glass-card { background: rgba(255,255,255,0.98); border: 1px solid rgba(226,232,240,0.50); }
      #gnb.gnb-scrolled { background: rgba(10,15,30,0.97) !important; }
      .gnb-nav-bar { background: linear-gradient(90deg, #0C2D6B, #1E40AF, #0C2D6B) !important; }
      .popup-overlay { background: rgba(0,0,0,0.65) !important; }
      .btn-ghost { background: rgba(255,255,255,0.08); }
      .hero-contact-card { background: rgba(10,15,30,0.90) !important; border: 1px solid rgba(255,255,255,0.10) !important; }
    }

    /* ═══ DPI scaling: intermediate resolution (1440–2559px) ═══ */
    @media (min-width: 1440px) and (max-width: 2559px) {
      :root { --container-max: min(100% - 4rem, 1440px); }
    }

    /* ═══ Touch device enhancements (mobile/tablet) ═══ */
    @media (hover: none) and (pointer: coarse) {
      /* Ensure min 48px touch targets */
      a, button { min-height: 44px; }
      .gnb-link { min-height: 48px; display: inline-flex; align-items: center; }
      /* Disable hover-only transforms */
      .card-premium:hover { transform: none; }
      .card-service:hover { transform: none; }
      .card-service::after { opacity: 1; }
    }
    /* ═══ Hover-only interactions guard ═══ */
    @media (hover: hover) and (pointer: fine) {
      .gnb-mega-trigger:hover { color: #FFFFFF; text-shadow: 0 0 16px rgba(96,165,250,0.50); }
    }
    @media (hover: none) {
      .mega-menu-panel { display: none; }
    }

    /* ═══ body:has() fallback for popup scroll lock ═══ */
    .popup-body-lock { overflow: hidden !important; height: 100vh; height: 100dvh; }

    /* Card glass (elevated white) */
    .glass-card {
      background: rgba(255,255,255,0.88);
      backdrop-filter: blur(16px) saturate(150%);
      -webkit-backdrop-filter: blur(16px) saturate(150%);
      border: 1px solid rgba(226,232,240,0.50);
      box-shadow: var(--shadow-md), inset 0 1px 0 rgba(255,255,255,0.60);
    }

    /* ═══════════════════════════════════════════════
       PREMIUM CARD SYSTEM
       ═══════════════════════════════════════════════ */
    .card-premium {
      background: #FFFFFF;
      border: 1px solid rgba(226,232,240,0.60);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
      transition: all 0.4s var(--ease-out);
      position: relative;
      overflow: hidden;
    }
    .card-premium::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--grad-card-shine);
      opacity: 0;
      transition: opacity 0.4s ease;
      pointer-events: none;
    }
    .card-premium:hover {
      transform: translateY(-6px) scale(1.005);
      box-shadow: var(--shadow-xl);
      border-color: rgba(59,130,246,0.15);
    }
    .card-premium:hover::before {
      opacity: 1;
    }

    /* Service card with top border accent */
    .card-service {
      background: #FFFFFF;
      border: 1px solid rgba(226,232,240,0.50);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-xs);
      transition: all 0.4s var(--ease-out);
      position: relative;
      overflow: hidden;
    }
    .card-service::after {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: var(--card-accent, #3B82F6);
      opacity: 0;
      transition: opacity 0.35s ease;
    }
    .card-service:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
      border-color: rgba(226,232,240,0.80);
    }
    .card-service:hover::after {
      opacity: 1;
    }

    /* ═══════════════════════════════════════════════
       GNB PREMIUM v33 — 2-Tier Header
       Top: Logo bar (dark navy)
       Bottom: GNB navigation bar (gradient accent, eye-catching)
       ═══════════════════════════════════════════════ */
    #gnb {
      transition: box-shadow 0.45s var(--ease-smooth);
    }
    #gnb.gnb-scrolled {
      box-shadow: 0 4px 24px rgba(0,0,0,0.30);
    }

    /* ── Top bar (KOLAS + Logo + Phone) ── */
    .gnb-top-bar {
      height: var(--gnb-top-h);
      background: rgba(10,15,30,0.95);
      backdrop-filter: blur(24px) saturate(180%);
      -webkit-backdrop-filter: blur(24px) saturate(180%);
      display: flex;
      align-items: center;
      padding: 0 clamp(12px, 1vw, 24px);
      border-bottom: 1px solid rgba(255,255,255,0.04);
    }

    /* ── GNB Navigation Bar (eye-catching accent bar) ── */
    .gnb-nav-bar {
      height: var(--gnb-bar-h);
      background: linear-gradient(90deg, #0C2D6B 0%, #1E40AF 25%, #1D4ED8 50%, #1E40AF 75%, #0C2D6B 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      border-bottom: 2px solid rgba(96,165,250,0.30);
    }
    /* Subtle animated shimmer overlay */
    .gnb-nav-bar::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg,
        transparent 0%,
        rgba(255,255,255,0.03) 25%,
        rgba(255,255,255,0.06) 50%,
        rgba(255,255,255,0.03) 75%,
        transparent 100%
      );
      pointer-events: none;
    }
    /* Bottom glow line */
    .gnb-nav-bar::after {
      content: '';
      position: absolute;
      bottom: 0; left: 10%; right: 10%;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(96,165,250,0.40), rgba(6,182,212,0.40), transparent);
    }

    /* GNB Link — v33 Full-Width Centered, 40% enlarged, high-contrast */
    .gnb-link {
      padding: 0.35rem clamp(0.2rem, 0.5vw, 0.7rem);
      font-size: clamp(1.05rem, 0.84rem + 0.55vw, 1.38rem);
      font-weight: 700;
      color: #FFFFFF;
      white-space: nowrap;
      transition: color 0.25s ease, text-shadow 0.3s ease, transform 0.25s ease;
      letter-spacing: 0.01em;
      position: relative;
      text-rendering: geometricPrecision;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      font-feature-settings: 'kern' 1, 'liga' 1;
      text-shadow: 0 1px 3px rgba(0,0,0,0.20);
    }
    .gnb-link::after {
      content: '';
      position: absolute;
      bottom: 0; left: 50%; width: 0; height: 2.5px;
      background: linear-gradient(90deg, #60A5FA, #22D3EE, #60A5FA);
      transition: width 0.35s var(--ease-out), left 0.35s var(--ease-out);
      border-radius: 2px;
      box-shadow: 0 0 8px rgba(96,165,250,0.50);
    }
    .gnb-link:hover {
      color: #FFFFFF;
      text-shadow: 0 0 16px rgba(96,165,250,0.50), 0 0 32px rgba(6,182,212,0.25);
      transform: translateY(-1px);
    }
    .gnb-link:hover::after { width: 85%; left: 7.5%; }

    /* GNB separator dots between items */
    .gnb-sep {
      width: 3px; height: 3px;
      border-radius: 50%;
      background: rgba(148,196,255,0.35);
      flex-shrink: 0;
      margin: 0 clamp(2px, 0.3vw, 6px);
    }

    /* 4K+ GNB scaling */
    @media (min-width: 2560px) {
      .gnb-link { font-size: clamp(1.6rem, 1.4rem + 0.35vw, 2.1rem); }
    }
    @media (min-width: 3840px) {
      .gnb-link { font-size: clamp(2.1rem, 1.7rem + 0.55vw, 2.8rem); }
    }
    @media (min-width: 7680px) {
      .gnb-link { font-size: clamp(3.2rem, 2.6rem + 0.7vw, 4.5rem); letter-spacing: 0em; }
    }

    /* ═══════════════════════════════════════════════
       MEGA DROPDOWN MENU (v38 - 2-row adaptive layout)
       ─ Content-based flex widths
       ─ Korean word-break aware
       ─ 1024px → 8K fully responsive
       ═══════════════════════════════════════════════ */
    .mega-menu-panel {
      position: fixed;
      top: var(--gnb-h);
      left: 0;
      right: 0;
      background: rgba(255,255,255,0.98);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border-top: 2px solid transparent;
      border-image: linear-gradient(90deg, #2563EB 0%, #06B6D4 50%, #3B82F6 100%) 1;
      box-shadow: 0 12px 48px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.04);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-8px);
      transition: opacity 0.3s var(--ease-out), visibility 0.3s, transform 0.3s var(--ease-out);
      z-index: 49;
      pointer-events: none;
      max-height: 80vh;
      overflow-y: auto;
    }
    .mega-menu-panel.active {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
      pointer-events: auto;
    }
    @supports not (backdrop-filter: blur(1px)) {
      .mega-menu-panel { background: rgba(255,255,255,0.99); }
    }

    /* ── Grid: flex-wrap for natural 2-row flow ── */
    .mega-menu-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0;
      padding: clamp(1.0rem, 1.5vw, 1.8rem) 0;
    }

    /* ── Row separator between top/bottom groups ── */
    .mega-menu-row {
      display: flex;
      flex-wrap: nowrap;
      width: 100%;
      padding: clamp(0.5rem, 0.8vw, 0.8rem) 0;
    }
    .mega-menu-row + .mega-menu-row {
      border-top: 1px solid rgba(226,232,240,0.50);
      margin-top: clamp(0.4rem, 0.6vw, 0.6rem);
      padding-top: clamp(0.8rem, 1vw, 1.0rem);
    }

    /* ── Columns: content-based widths ── */
    .mega-menu-column {
      flex: 1 1 0;
      min-width: clamp(100px, 8vw, 160px);
      padding: 0 clamp(0.5rem, 0.8vw, 1.0rem);
      border-right: 1px solid rgba(226,232,240,0.35);
      overflow: hidden;
    }
    .mega-menu-column:last-child { border-right: none; }

    /* Wide columns for departments with long names or many sub-items */
    .mega-menu-column.mega-col-wide {
      flex: 1.4 1 0;
      min-width: clamp(130px, 10vw, 200px);
    }
    /* Narrow columns for short-name departments */
    .mega-menu-column.mega-col-narrow {
      flex: 0.8 1 0;
      min-width: clamp(80px, 6vw, 120px);
    }

    /* ── Headings: allow wrap for long Korean titles ── */
    .mega-menu-heading {
      font-size: clamp(0.74rem, 0.65rem + 0.26vw, 0.92rem);
      font-weight: 700;
      color: #1E293B;
      margin-bottom: clamp(0.35rem, 0.5vw, 0.6rem);
      padding-bottom: 4px;
      border-bottom: 2px solid #3B82F6;
      display: block;
      white-space: normal;
      word-break: keep-all;
      overflow-wrap: break-word;
      line-height: 1.35;
      letter-spacing: -0.01em;
    }
    .mega-menu-heading a { color: inherit; text-decoration: none; transition: color 0.2s; }
    .mega-menu-heading a:hover { color: #2563EB; }

    /* ── Sub-links: allow wrap, readable spacing ── */
    .mega-menu-column ul { list-style: none; padding: 0; margin: 0; }
    .mega-menu-column li a {
      display: block;
      padding: clamp(3px, 0.3vw, 5px) 0;
      font-size: clamp(0.70rem, 0.62rem + 0.22vw, 0.85rem);
      color: #64748B;
      text-decoration: none;
      transition: color 0.2s, padding-left 0.25s var(--ease-out);
      white-space: normal;
      word-break: keep-all;
      overflow-wrap: break-word;
      line-height: 1.40;
      letter-spacing: -0.005em;
    }
    .mega-menu-column li a:hover {
      color: #2563EB;
      padding-left: 5px;
    }

    /* ── Grouped sub-section inside a column ── */
    .mega-sub-group {
      margin-top: clamp(0.5rem, 0.7vw, 0.8rem);
      padding-top: clamp(0.4rem, 0.5vw, 0.6rem);
      border-top: 1px dashed rgba(203,213,225,0.6);
    }
    .mega-sub-group-title {
      font-size: clamp(0.68rem, 0.60rem + 0.22vw, 0.82rem);
      font-weight: 600;
      color: #475569;
      margin-bottom: clamp(0.2rem, 0.3vw, 0.35rem);
      white-space: normal;
      word-break: keep-all;
      line-height: 1.35;
    }
    .mega-sub-group-title a { color: inherit; text-decoration: none; transition: color 0.2s; }
    .mega-sub-group-title a:hover { color: #2563EB; }

    /* ── Highlight the column that matches the hovered GNB link ── */
    .mega-menu-column.mega-col-active {
      background: rgba(59,130,246,0.04);
      border-radius: var(--radius-sm);
    }
    .mega-menu-column.mega-col-active .mega-menu-heading {
      border-bottom-color: #06B6D4;
    }
    /* GNB link active indicator when mega menu is open */
    .gnb-mega-trigger.gnb-link-active {
      color: #FFFFFF !important;
      text-shadow: 0 0 16px rgba(96,165,250,0.50), 0 0 32px rgba(6,182,212,0.25);
    }
    .gnb-mega-trigger.gnb-link-active::after {
      width: 85%; left: 7.5%;
    }

    /* ── Hide mega menu below lg breakpoint ── */
    @media (max-width: 1023px) {
      .mega-menu-panel { display: none !important; }
    }

    /* ── 2K (2560px) adjustments ── */
    @media (min-width: 2560px) {
      .mega-menu-heading { font-size: clamp(0.95rem, 0.82rem + 0.22vw, 1.20rem); }
      .mega-menu-column li a { font-size: clamp(0.85rem, 0.74rem + 0.20vw, 1.08rem); }
      .mega-sub-group-title { font-size: clamp(0.85rem, 0.74rem + 0.20vw, 1.05rem); }
      .mega-menu-column { padding: 0 clamp(0.7rem, 1vw, 1.3rem); }
    }
    /* ── 4K (3840px) adjustments ── */
    @media (min-width: 3840px) {
      .mega-menu-heading { font-size: clamp(1.25rem, 1.05rem + 0.28vw, 1.65rem); }
      .mega-menu-column li a { font-size: clamp(1.05rem, 0.90rem + 0.24vw, 1.40rem); }
      .mega-sub-group-title { font-size: clamp(1.10rem, 0.95rem + 0.24vw, 1.45rem); }
      .mega-menu-column { padding: 0 clamp(1.0rem, 1.2vw, 1.8rem); }
      .mega-menu-grid { padding: clamp(1.8rem, 2.5vw, 3rem) 0; }
    }
    /* ── 5K (5120px) adjustments ── */
    @media (min-width: 5120px) {
      .mega-menu-heading { font-size: clamp(1.6rem, 1.35rem + 0.30vw, 2.0rem); }
      .mega-menu-column li a { font-size: clamp(1.3rem, 1.12rem + 0.26vw, 1.70rem); }
      .mega-sub-group-title { font-size: clamp(1.4rem, 1.20rem + 0.26vw, 1.80rem); }
      .mega-menu-column { padding: 0 clamp(1.3rem, 1.5vw, 2.2rem); }
    }
    /* ── 8K (7680px) adjustments ── */
    @media (min-width: 7680px) {
      .mega-menu-heading { font-size: 2.4rem; line-height: 1.3; }
      .mega-menu-column li a { font-size: 2.0rem; padding: 8px 0; line-height: 1.35; }
      .mega-sub-group-title { font-size: 2.1rem; }
      .mega-menu-grid { padding: 3.5rem 0; }
      .mega-menu-column { padding: 0 2.5rem; }
      .mega-menu-row + .mega-menu-row { margin-top: 1.5rem; padding-top: 1.8rem; }
    }

    /* ═══════════════════════════════════════════════
       PREMIUM BUTTONS
       ═══════════════════════════════════════════════ */
    .btn-primary {
      display: inline-flex; align-items: center; gap: var(--space-xs);
      background: linear-gradient(135deg, #2563EB 0%, #3B82F6 60%, #2563EB 100%);
      background-size: 200% 200%;
      color: #fff; border-radius: var(--radius-sm); font-weight: 600;
      padding: var(--space-sm) var(--space-lg);
      font-size: var(--text-sm);
      box-shadow: 0 4px 16px rgba(37,99,235,0.25), 0 1px 3px rgba(37,99,235,0.15),
                  inset 0 1px 0 rgba(255,255,255,0.12);
      transition: all 0.35s var(--ease-out);
      position: relative; overflow: hidden;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 28px rgba(37,99,235,0.35), 0 2px 6px rgba(37,99,235,0.20),
                  inset 0 1px 0 rgba(255,255,255,0.15);
      background-position: 100% 100%;
    }
    .btn-primary::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.18), transparent 50%);
      opacity: 0; transition: opacity 0.3s ease;
    }
    .btn-primary:hover::before { opacity: 1; }

    .btn-ghost {
      display: inline-flex; align-items: center; gap: var(--space-xs);
      background: rgba(255,255,255,0.05);
      color: #fff; border: 1px solid rgba(255,255,255,0.12);
      border-radius: var(--radius-sm); font-weight: 600;
      padding: var(--space-sm) var(--space-lg);
      font-size: var(--text-sm);
      transition: all 0.35s var(--ease-out);
      backdrop-filter: blur(8px);
    }
    .btn-ghost:hover {
      background: rgba(255,255,255,0.10);
      border-color: rgba(255,255,255,0.22);
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(255,255,255,0.06);
    }

    .btn-glow {
      display: inline-flex; align-items: center; gap: var(--space-xs);
      background: linear-gradient(135deg, #2563EB, #06B6D4);
      color: #fff; border-radius: var(--radius-sm); font-weight: 700;
      padding: var(--space-sm) var(--space-lg);
      font-size: var(--text-sm);
      box-shadow: 0 0 20px rgba(37,99,235,0.30), 0 4px 16px rgba(37,99,235,0.20);
      transition: all 0.35s var(--ease-out);
      position: relative;
    }
    .btn-glow:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 32px rgba(37,99,235,0.45), 0 8px 24px rgba(37,99,235,0.30);
    }

    /* ═══════════════════════════════════════════════
       MOBILE MENU
       ═══════════════════════════════════════════════ */
    .mobile-menu {
      transform: translateX(100%);
      transition: transform 0.4s var(--ease-out);
    }
    .mobile-menu.active { transform: translateX(0); }
    .mobile-overlay { opacity: 0; visibility: hidden; transition: all 0.4s ease; }
    .mobile-overlay.active { opacity: 1; visibility: visible; }

    /* ═══════════════════════════════════════════════
       SCROLL PROGRESS BAR
       ═══════════════════════════════════════════════ */
    #scrollProgress {
      position: fixed; top: 0; left: 0; height: 2px; z-index: 100;
      background: linear-gradient(90deg, #2563EB, #06B6D4, #3B82F6);
      width: 0%; transition: width 0.1s linear;
      box-shadow: 0 0 10px rgba(59,130,246,0.40), 0 0 30px rgba(6,182,212,0.15);
    }

    /* ═══════════════════════════════════════════════
       MICRO-INTERACTIONS
       ═══════════════════════════════════════════════ */

    /* Ripple effect on buttons */
    .ripple-btn { position: relative; overflow: hidden; }
    .ripple-btn .ripple-effect {
      position: absolute; border-radius: 50%;
      background: rgba(255,255,255,0.25);
      transform: scale(0); animation: ripple-anim 0.6s ease-out;
      pointer-events: none;
    }
    @keyframes ripple-anim {
      to { transform: scale(4); opacity: 0; }
    }

    /* Floating particles */
    @keyframes float-slow {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(5deg); }
    }
    @keyframes float-medium {
      0%, 100% { transform: translateY(0) translateX(0); }
      33% { transform: translateY(-15px) translateX(8px); }
      66% { transform: translateY(-8px) translateX(-5px); }
    }
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(1.05); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes gradient-shift {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes glow-pulse {
      0%, 100% { box-shadow: 0 0 12px rgba(59,130,246,0.15); }
      50% { box-shadow: 0 0 24px rgba(59,130,246,0.30); }
    }
    @keyframes counter-up {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes slide-in-right {
      from { opacity: 0; transform: translateX(20px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes border-glow {
      0%, 100% { border-color: rgba(59,130,246,0.15); }
      50%      { border-color: rgba(59,130,246,0.35); }
    }

    .animate-float-slow   { animation: float-slow 8s ease-in-out infinite; }
    .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
    .animate-pulse-glow   { animation: pulse-glow 3s ease-in-out infinite; }
    .animate-gradient     { animation: gradient-shift 6s ease infinite; background-size: 200% 200%; }
    .animate-glow-pulse   { animation: glow-pulse 2.5s ease-in-out infinite; }
    .animate-border-glow  { animation: border-glow 3s ease-in-out infinite; }

    /* ═══════════════════════════════════════════════
       SECTION DIVIDERS
       ═══════════════════════════════════════════════ */
    .section-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(226,232,240,0.50), transparent);
    }
    .section-divider-glow {
      height: 1px;
      background: linear-gradient(90deg, transparent 5%, rgba(59,130,246,0.25) 30%, rgba(6,182,212,0.30) 50%, rgba(59,130,246,0.25) 70%, transparent 95%);
    }

    /* ═══════════════════════════════════════════════
       TABLE COMPACT (premium)
       ═══════════════════════════════════════════════ */
    .table-compact { border-collapse: separate; border-spacing: 0; }
    .table-compact th {
      padding: var(--space-sm) var(--space-sm);
      font-weight: 600;
      letter-spacing: 0.02em;
    }
    .table-compact td {
      padding: var(--space-sm) var(--space-sm);
    }
    .table-compact tr { transition: background 0.2s ease; }
    .table-compact tbody tr:hover { background: rgba(59,130,246,0.025); }
    .table-compact tbody tr {
      border-left: 3px solid transparent;
      transition: border-color 0.25s ease, background 0.2s ease;
    }
    .table-compact tbody tr:hover {
      border-left-color: #3B82F6;
    }

    /* ═══════════════════════════════════════════════
       PAGE HEADER (Sub-pages)
       ═══════════════════════════════════════════════ */
    .page-header {
      position: relative;
      overflow: hidden;
    }
    .page-header::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(59,130,246,0.20), rgba(6,182,212,0.25), rgba(59,130,246,0.20), transparent);
    }

    /* ═══════════════════════════════════════════════
       POPUP (Mobile-Responsive Modal System)
       ═══════════════════════════════════════════════ */
    .popup-overlay { backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
    #popupOverlay { -webkit-tap-highlight-color: transparent; }
    .popup-card { will-change: transform, opacity; }
    .popup-card img { display: block; max-width: 100%; height: auto; }
    /* iOS Safari: use dvh for dynamic viewport — with fallback */
    .popup-multi-container { max-height: 90vh; }
    .popup-card { max-height: 80vh; }
    @supports (max-height: 90dvh) {
      .popup-multi-container { max-height: 90dvh; }
      .popup-card { max-height: 80dvh; }
    }
    /* Prevent body scroll when popup is open — with :has() + JS fallback */
    body:has(#popupOverlay) { overflow: hidden; }

    /* ═══════════════════════════════════════════════
       HERO GRADIENT TEXT
       ═══════════════════════════════════════════════ */
    .hero-gradient-text {
      background: linear-gradient(135deg, #60A5FA 0%, #22D3EE 50%, #A78BFA 100%);
      background-size: 200% 200%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: gradient-shift 4s ease infinite;
    }

    /* ═══════════════════════════════════════════════
       SELECTION
       ═══════════════════════════════════════════════ */
    ::selection { background: rgba(59,130,246,0.15); color: inherit; }

    /* ═══════════════════════════════════════════════
       STATUS BADGES (Reusable)
       ═══════════════════════════════════════════════ */
    .badge-status {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      border-radius: var(--radius-full);
      font-weight: 600;
      font-size: var(--text-xs);
      padding: 3px 10px;
      white-space: nowrap;
      letter-spacing: 0.01em;
    }
    .badge-complete { background: rgba(16,185,129,0.08); color: #059669; border: 1px solid rgba(16,185,129,0.18); }
    .badge-progress { background: rgba(59,130,246,0.08); color: #2563EB; border: 1px solid rgba(59,130,246,0.18); }
    .badge-received { background: rgba(245,158,11,0.08); color: #D97706; border: 1px solid rgba(245,158,11,0.18); }
    .badge-status .badge-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .badge-complete .badge-dot { background: #10B981; box-shadow: 0 0 6px rgba(16,185,129,0.40); }
    .badge-progress .badge-dot { background: #3B82F6; box-shadow: 0 0 6px rgba(59,130,246,0.40); }
    .badge-received .badge-dot { background: #F59E0B; box-shadow: 0 0 6px rgba(245,158,11,0.40); }

    /* ═══════════════════════════════════════════════
       CORE VALUES SECTION (원본 koist.kr #inc01 스타일)
       ═══════════════════════════════════════════════ */
    .core-value-card {
      position: relative;
      overflow: hidden;
      background: rgba(255,255,255,0.02);
      transition: all 0.5s var(--ease-out);
    }
    .core-value-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(255,255,255,0.03);
      opacity: 0;
      transition: opacity 0.5s ease;
    }
    .core-value-card:hover::before { opacity: 1; }
    .core-value-card:hover { background: rgba(255,255,255,0.05); }
    .core-value-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.15) 100%);
      pointer-events: none;
      z-index: 0;
    }
    .core-value-desc {
      opacity: 0.7;
      max-height: 0;
      overflow: hidden;
      transition: all 0.5s var(--ease-out);
    }
    .core-value-card:hover .core-value-desc {
      opacity: 1;
      max-height: 100px;
    }
    @media (max-width: 1024px) {
      .core-value-desc { opacity: 1; max-height: 100px; }
    }
    @media (max-width: 640px) {
      .core-value-card { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06); }
    }

    /* ═══════════════════════════════════════════════
       BAR CHART COMPONENT (평가기간 비교)
       ═══════════════════════════════════════════════ */
    .bar-animate {
      transform-origin: left center;
    }
    .bar-chart-container {
      position: relative;
    }

    /* ═══════════════════════════════════════════════
       FEATURED SERVICE CARDS (원본 koist.kr #inc03 스타일)
       ═══════════════════════════════════════════════ */
    .featured-service-card {
      transition: all 0.4s var(--ease-out);
    }
    .featured-service-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 40px rgba(15,23,42,0.10), 0 4px 12px rgba(15,23,42,0.04) !important;
    }
    .featured-service-card:hover a i {
      transform: translateX(4px) !important;
    }

    /* ═══════════════════════════════════════════════
       SERVICE CARD XL (v13 - 3배 확대)
       ═══════════════════════════════════════════════ */
    .card-service-xl {
      background: #FFFFFF;
      border: 1px solid rgba(226,232,240,0.50);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-xs);
      transition: all 0.4s var(--ease-out);
      position: relative;
      overflow: hidden;
    }
    .card-service-xl::after {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: var(--card-accent, #3B82F6);
      opacity: 0;
      transition: opacity 0.35s ease;
    }
    .card-service-xl:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
      border-color: rgba(226,232,240,0.80);
    }
    .card-service-xl:hover::after {
      opacity: 1;
    }

    /* ═══════════════════════════════════════════════
       EAL INTERACTIVE TABS (v13)
       ═══════════════════════════════════════════════ */
    .eal-tab {
      background: rgba(248,250,252,0.80);
      color: #94A3B8;
      cursor: pointer;
      border: none;
      padding: 8px 0;
      font-size: var(--text-sm);
    }
    .eal-tab.active {
      background: linear-gradient(135deg, #2563EB, #06B6D4);
      color: #FFFFFF;
      box-shadow: 0 2px 8px rgba(37,99,235,0.25);
    }
    .eal-tab:hover:not(.active) {
      background: rgba(241,245,249,1);
      color: #64748B;
    }
    .eal-bar {
      transition: width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                  background 0.5s ease;
    }

    /* ═══════════════════════════════════════════════
       FOCUS RING (Accessibility)
       ═══════════════════════════════════════════════ */
    a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible {
      outline: 2px solid rgba(59,130,246,0.50);
      outline-offset: 2px;
      border-radius: 4px;
    }

    /* ═══════════════════════════════════════════════
       ENHANCED FORM INPUTS
       ═══════════════════════════════════════════════ */
    .input-premium {
      width: 100%;
      border: 1px solid rgba(226,232,240,0.70);
      border-radius: var(--radius-sm);
      background: rgba(248,250,252,0.80);
      padding: var(--space-sm) var(--space-md);
      font-size: var(--text-sm);
      transition: all 0.3s var(--ease-smooth);
      color: #334155;
    }
    .input-premium:focus {
      outline: none;
      background: #FFFFFF;
      border-color: rgba(59,130,246,0.40);
      box-shadow: 0 0 0 3px rgba(59,130,246,0.08), 0 2px 8px rgba(59,130,246,0.06);
    }
    .input-premium::placeholder {
      color: rgba(148,163,184,0.70);
    }
  </style>
  ${opts.headExtra || ''}
</head>
<body class="bg-surface text-slate-700 antialiased">

  <!-- Scroll Progress Bar -->
  <div id="scrollProgress"></div>

  <!-- ═══════════ GNB v33 (2-Tier Premium Header) ═══════════ -->
  <header id="gnb" class="fixed top-0 left-0 right-0 z-50" style="border-bottom: none;">

    <!-- ══ TOP BAR: KOLAS + Logo + Phone ══ -->
    <div class="gnb-top-bar">
      <div style="width:100%;max-width:100%;padding:0 clamp(6px,0.4vw,10px);margin:0;">
        <div class="flex items-center" style="height:100%;gap:19px;justify-content:flex-start;">

          <!-- KOLAS Mark -->
          <div class="hidden md:flex items-center shrink-0" style="padding:0;margin:0;">
            <img src="/static/images/kolas.png" alt="KOLAS 국제공인시험기관" style="height:clamp(44px, 38px + 1.4vw, 68px);" class="kolas-mark w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" title="KOLAS 국제공인시험기관 인정 (KTL-F-588)" data-admin-edit="kolas_image">
          </div>

          <!-- Logo -->
          <a href="/" class="flex items-center shrink-0 group" data-admin-edit="site_logo">
            ${s.logo_url && s.logo_url.trim() !== '' && s.logo_url !== '/static/images/logo.png' ? `
            <img src="${s.logo_url}" alt="${siteName}" style="height:clamp(48px, 40px + 1.6vw, 72px); max-width:clamp(280px, 24vw, 440px);" class="w-auto object-contain transition-transform group-hover:scale-[1.02]">
            ` : `
            <div class="flex items-center" style="gap: clamp(8px, 0.8vw, 14px)">
              <div class="relative">
                <div class="absolute inset-0 rounded-xl blur-md transition-all group-hover:blur-lg" style="background: linear-gradient(135deg, rgba(59,130,246,0.25), rgba(6,182,212,0.20));"></div>
                <div class="relative rounded-xl flex items-center justify-center" style="width:clamp(42px,4.2vw,62px); height:clamp(42px,4.2vw,62px); background: linear-gradient(135deg, #2563EB, #06B6D4);">
                  <i class="fas fa-shield-halved text-white" style="font-size:clamp(20px,2.2vw,32px)"></i>
                </div>
              </div>
              <div>
                <div class="font-bold text-white leading-tight tracking-tight" style="font-size:clamp(1.15rem, 0.95rem + 0.7vw, 1.65rem);">한국정보보안기술원</div>
                <div class="tracking-[0.18em] font-medium" style="font-size:clamp(0.72rem, 0.60rem + 0.35vw, 1.0rem); background: linear-gradient(90deg, #94A3B8, #64748B); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">KOIST</div>
              </div>
            </div>
            `}
          </a>

          <!-- Right: Phone + Mobile Menu -->
          <div class="flex items-center shrink-0" style="gap:var(--space-xs);margin-left:auto;">
            <a href="tel:${s.phone || '02-586-1230'}" class="hidden xl:inline-flex items-center text-white font-bold rounded-lg transition-all ripple-btn" style="gap: 6px; padding: clamp(0.35rem,0.5vw,0.5rem) clamp(0.6rem,0.8vw,0.9rem); font-size: clamp(0.75rem, 0.65rem + 0.30vw, 0.92rem); background: linear-gradient(135deg, rgba(59,130,246,0.85), rgba(6,182,212,0.85)); box-shadow: 0 4px 16px rgba(59,130,246,0.25), inset 0 1px 0 rgba(255,255,255,0.12); border-radius: clamp(8px,0.6vw,12px);">
              <i class="fas fa-phone" style="font-size:clamp(8px,0.6vw,11px)"></i>
              <span>${s.phone || '02-586-1230'}</span>
            </a>
            <button id="mobileMenuBtn" class="lg:hidden p-2 text-slate-400 hover:text-white transition-colors" aria-label="메뉴 열기">
              <i class="fas fa-bars" style="font-size:var(--text-lg)"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ══ GNB NAVIGATION BAR: Full-width centered, 40% enlarged ══ -->
    <div class="gnb-nav-bar hidden lg:flex">
      ${(() => {
        const activeDeps = deps.filter(d => d.is_active);
        const navLinks = [
          '<a href="/about/greeting" class="gnb-link gnb-mega-trigger" data-col="about">KOIST소개</a>'
        ].concat(
          activeDeps.map(dept =>
            '<a href="/services/' + dept.slug + '" class="gnb-link gnb-mega-trigger" data-col="dept-' + dept.slug + '">' + dept.name + '</a>'
          )
        ).concat([
          '<a href="/support/notice" class="gnb-link gnb-mega-trigger" data-col="support">고객지원</a>'
        ]);
        // Join with separator dots
        return navLinks.join('<span class="gnb-sep" aria-hidden="true"></span>');
      })()}
    </div>

    <!-- Mega Dropdown Panel (v38 - 2-row adaptive) -->
    <div id="megaMenu" class="mega-menu-panel" role="navigation" aria-label="전체 메뉴">
      <div class="fluid-container">
        <div class="mega-menu-grid">
          ${(() => {
                // Split departments into 2 rows for optimal layout
                const activeDepsWithPages = deps.filter(d => d.is_active && d.pages && d.pages.length > 0);
                // Separate single-page depts for grouping
                const multiPageDeps = activeDepsWithPages.filter(d => d.pages.length > 1);
                const singlePageDeps = activeDepsWithPages.filter(d => d.pages.length === 1);

                // Row 1: KOIST소개 + first ~5 departments (shorter names)
                const row1Deps = multiPageDeps.slice(0, 5);
                // Row 2: remaining departments + grouped singles + 고객지원
                const row2Deps = multiPageDeps.slice(5);

                let html = '';
                // ── ROW 1 ──
                html += '<div class="mega-menu-row">';
                // KOIST소개
                html += '<div class="mega-menu-column" data-col="about">';
                html += '<h3 class="mega-menu-heading"><a href="/about/greeting">KOIST소개</a></h3>';
                html += '<ul><li><a href="/about/greeting">인사말</a></li>';
                html += '<li><a href="/about/history">연혁</a></li>';
                html += '<li><a href="/about/business">사업소개</a></li>';
                html += '<li><a href="/about/location">오시는길</a></li></ul>';
                html += '</div>';
                // Row 1 departments
                row1Deps.forEach(dept => {
                  const wideCls = dept.name.length >= 7 ? ' mega-col-wide' : '';
                  html += '<div class="mega-menu-column' + wideCls + '" data-col="dept-' + dept.slug + '">';
                  html += '<h3 class="mega-menu-heading"><a href="/services/' + dept.slug + '">' + dept.name + '</a></h3>';
                  html += '<ul>' + dept.pages.map(p => '<li><a href="/services/' + dept.slug + '/' + p.slug + '">' + p.title + '</a></li>').join('') + '</ul>';
                  html += '</div>';
                });
                html += '</div>';

                // ── ROW 2 ──
                html += '<div class="mega-menu-row">';
                // Row 2 multi-page departments
                row2Deps.forEach(dept => {
                  const wideCls = dept.name.length >= 7 || dept.pages.some(p => p.title.length >= 8) ? ' mega-col-wide' : '';
                  html += '<div class="mega-menu-column' + wideCls + '" data-col="dept-' + dept.slug + '">';
                  html += '<h3 class="mega-menu-heading"><a href="/services/' + dept.slug + '">' + dept.name + '</a></h3>';
                  html += '<ul>' + dept.pages.map(p => '<li><a href="/services/' + dept.slug + '/' + p.slug + '">' + p.title + '</a></li>').join('') + '</ul>';
                  html += '</div>';
                });
                // Grouped single-page departments
                if (singlePageDeps.length > 0) {
                  const alsoCols = singlePageDeps.slice(1).map(d => 'dept-' + d.slug).join(',');
                  const alsoAttr = alsoCols ? ' data-col-also="' + alsoCols + '"' : '';
                  html += '<div class="mega-menu-column mega-col-wide" data-col="dept-' + singlePageDeps[0].slug + '"' + alsoAttr + '>';
                  html += '<h3 class="mega-menu-heading">기타 서비스</h3>';
                  singlePageDeps.forEach((dept, idx) => {
                    if (idx > 0) html += '<div class="mega-sub-group">';
                    else html += '<div>';
                    html += '<div class="mega-sub-group-title"><a href="/services/' + dept.slug + '">' + dept.name + '</a></div>';
                    html += '<ul>' + dept.pages.map(p => '<li><a href="/services/' + dept.slug + '/' + p.slug + '">' + p.title + '</a></li>').join('') + '</ul>';
                    html += '</div>';
                  });
                  html += '</div>';
                }
                // 고객지원
                html += '<div class="mega-menu-column" data-col="support">';
                html += '<h3 class="mega-menu-heading"><a href="/support/notice">고객지원</a></h3>';
                html += '<ul><li><a href="/support/notice">공지사항</a></li>';
                html += '<li><a href="/support/faq">FAQ</a></li>';
                html += '<li><a href="/support/downloads">자료실</a></li>';
                html += '<li><a href="/support/documents">시스템 문서</a></li>';
                html += '<li><a href="/support/inquiry">온라인 상담</a></li></ul>';
                html += '</div>';
                html += '</div>';

                return html;
              })()}
            </div>
          </div>
        </div>

  </header>

  <!-- Mobile Overlay -->
  <div id="mobileOverlay" class="mobile-overlay fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm" onclick="closeMobileMenu()"></div>

  <!-- Mobile Slide-out Menu -->
  <div id="mobileMenu" class="mobile-menu fixed top-0 right-0 bottom-0 w-[min(85vw,380px)] bg-white z-[70] overflow-y-auto" style="box-shadow: -8px 0 48px rgba(0,0,0,0.18);">
    <div class="flex justify-between items-center border-b border-slate-100" style="padding: var(--space-md) var(--space-lg)">
      <div class="flex items-center" style="gap: var(--space-sm)">
        <div class="rounded-lg flex items-center justify-center" style="width:30px; height:30px; background: linear-gradient(135deg, #2563EB, #06B6D4);">
          <i class="fas fa-shield-halved text-white" style="font-size:13px"></i>
        </div>
        <span class="font-bold text-primary f-text-lg tracking-tight">메뉴</span>
      </div>
      <button onclick="closeMobileMenu()" class="p-2 text-gray-400 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-50"><i class="fas fa-times f-text-lg"></i></button>
    </div>
    <div style="padding: var(--space-md) var(--space-md)">
      <!-- Phone CTA -->
      <a href="tel:${s.phone || '02-586-1230'}" class="flex items-center rounded-xl mb-4" style="gap: var(--space-sm); padding: var(--space-md); background: linear-gradient(135deg, rgba(59,130,246,0.05), rgba(6,182,212,0.05)); border: 1px solid rgba(59,130,246,0.08);">
        <div class="text-white rounded-full flex items-center justify-center shrink-0" style="width:38px; height:38px; background: linear-gradient(135deg, #2563EB, #06B6D4);"><i class="fas fa-phone f-text-xs"></i></div>
        <div>
          <div class="f-text-xs text-gray-500 font-medium">상담문의</div>
          <div class="f-text-base font-bold text-accent tracking-tight">${s.phone || '02-586-1230'}</div>
        </div>
      </a>
      <!-- Dept Links with sub-page accordion -->
      <div class="space-y-0.5">
        <!-- KOIST소개 -->
        <div class="mobile-acc">
          <button class="mobile-acc-btn flex items-center justify-between w-full px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-all" onclick="toggleMobileAcc(this)">
            <span class="flex items-center" style="gap: var(--space-sm)">
              <div class="rounded-md flex items-center justify-center shrink-0" style="width:28px; height:28px; background:rgba(59,130,246,0.08)">
                <i class="fas fa-building" style="color:#3B82F6; font-size: var(--text-xs)"></i>
              </div>
              <span class="f-text-sm font-medium">KOIST소개</span>
            </span>
            <i class="fas fa-chevron-down text-gray-400 transition-transform" style="font-size:10px"></i>
          </button>
          <div class="mobile-acc-sub hidden pl-10 space-y-0.5 pb-1">
            <a href="/about/greeting" class="block px-3 py-1.5 text-gray-500 hover:text-blue-600 f-text-xs rounded transition-colors" onclick="closeMobileMenu()">인사말</a>
            <a href="/about/history" class="block px-3 py-1.5 text-gray-500 hover:text-blue-600 f-text-xs rounded transition-colors" onclick="closeMobileMenu()">연혁</a>
            <a href="/about/business" class="block px-3 py-1.5 text-gray-500 hover:text-blue-600 f-text-xs rounded transition-colors" onclick="closeMobileMenu()">사업소개</a>
            <a href="/about/location" class="block px-3 py-1.5 text-gray-500 hover:text-blue-600 f-text-xs rounded transition-colors" onclick="closeMobileMenu()">오시는길</a>
          </div>
        </div>
        ${deps.filter(d => d.is_active).map(dept => `
        <div class="mobile-acc">
          ${dept.pages && dept.pages.length > 0 ? `
          <button class="mobile-acc-btn flex items-center justify-between w-full px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-all" onclick="toggleMobileAcc(this)">
            <span class="flex items-center" style="gap: var(--space-sm)">
              <div class="rounded-md flex items-center justify-center shrink-0" style="width:28px; height:28px; background:${dept.color}08">
                <i class="fas ${dept.icon}" style="color:${dept.color}; font-size: var(--text-xs)"></i>
              </div>
              <span class="f-text-sm font-medium">${dept.name}</span>
            </span>
            <i class="fas fa-chevron-down text-gray-400 transition-transform" style="font-size:10px"></i>
          </button>
          <div class="mobile-acc-sub hidden pl-10 space-y-0.5 pb-1">
            ${dept.pages.map(p => `<a href="/services/${dept.slug}/${p.slug}" class="block px-3 py-1.5 text-gray-500 hover:text-blue-600 f-text-xs rounded transition-colors" onclick="closeMobileMenu()">${p.title}</a>`).join('')}
          </div>
          ` : `
          <a href="/services/${dept.slug}" class="flex items-center px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-all" style="gap: var(--space-sm)" onclick="closeMobileMenu()">
            <div class="rounded-md flex items-center justify-center shrink-0" style="width:28px; height:28px; background:${dept.color}08">
              <i class="fas ${dept.icon}" style="color:${dept.color}; font-size: var(--text-xs)"></i>
            </div>
            <span class="f-text-sm font-medium">${dept.name}</span>
          </a>
          `}
        </div>
        `).join('')}
      </div>
      <div class="border-t border-slate-100 my-3 pt-3 space-y-0.5">
        <a href="/support/notice"    class="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg f-text-sm transition-colors" onclick="closeMobileMenu()"><i class="fas fa-bullhorn w-5 text-center text-gray-400 f-text-xs"></i>공지사항</a>
        <a href="/support/faq"       class="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg f-text-sm transition-colors" onclick="closeMobileMenu()"><i class="fas fa-circle-question w-5 text-center text-gray-400 f-text-xs"></i>FAQ</a>
        <a href="/support/downloads" class="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg f-text-sm transition-colors" onclick="closeMobileMenu()"><i class="fas fa-download w-5 text-center text-gray-400 f-text-xs"></i>자료실</a>
        <a href="/support/documents" class="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg f-text-sm transition-colors" onclick="closeMobileMenu()"><i class="fas fa-book w-5 text-center text-gray-400 f-text-xs"></i>시스템 문서</a>
        <a href="/support/inquiry"   class="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg f-text-sm transition-colors" onclick="closeMobileMenu()"><i class="fas fa-envelope w-5 text-center text-gray-400 f-text-xs"></i>온라인 상담</a>
      </div>
    </div>
  </div>

  <!-- ═══════════ Content ═══════════ -->
  <main style="padding-top:var(--gnb-h)">
    ${opts.content}
  </main>

  <!-- ═══════════ Footer (Premium Layered) ═══════════ -->
  <footer class="text-gray-400 mt-auto relative overflow-hidden" style="${s.footer_bg_url ? `background-image: linear-gradient(rgba(10,15,30,0.95), rgba(7,11,22,0.98)), url('${s.footer_bg_url}'); background-size:cover; background-position:center;` : 'background: linear-gradient(180deg, #0C1120 0%, #080D18 50%, #060A14 100%);'}">
    <!-- Top accent line -->
    <div style="height: 2px; background: linear-gradient(90deg, transparent 5%, #2563EB 25%, #06B6D4 50%, #3B82F6 75%, transparent 95%); opacity: 0.8;"></div>

    <!-- Decorative orbs -->
    <div class="absolute top-8 left-[15%] rounded-full blur-3xl pointer-events-none" style="width:280px; height:140px; background: radial-gradient(ellipse, rgba(59,130,246,0.04), transparent);"></div>
    <div class="absolute bottom-8 right-[15%] rounded-full blur-3xl pointer-events-none" style="width:220px; height:110px; background: radial-gradient(ellipse, rgba(6,182,212,0.04), transparent);"></div>

    <div class="relative fluid-container f-section-y">
      <div class="grid grid-cols-1 md:grid-cols-12" style="gap: clamp(1.5rem, 2.5vw, 3rem)">

        <!-- Company Info (v31 - 2.5x footer text + logo) -->
        <div class="md:col-span-5">
          <div style="margin-bottom: var(--space-lg)">
            <div class="inline-flex items-center rounded-xl" style="padding: var(--space-sm) var(--space-md); background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);">
              <img src="/static/images/logo-horizontal.png" alt="${siteName}" style="height:clamp(32px, 26px + 0.9vw, 48px)" class="footer-logo w-auto object-contain opacity-90">
            </div>
          </div>
          <p class="f-text-lg leading-relaxed text-gray-500 max-w-lg" style="margin-bottom: var(--space-md)">${s.site_slogan || '최상의 시험·인증 서비스로 정보보안 기술을 완성'}</p>
          <div class="space-y-3.5 f-text-lg">
            <div class="flex items-center" style="gap: var(--space-sm)">
              <div class="shrink-0 rounded-md flex items-center justify-center" style="width:clamp(34px,2.8vw,46px); height:clamp(34px,2.8vw,46px); background: rgba(59,130,246,0.10);"><i class="fas fa-phone text-accent/60" style="font-size:clamp(13px,1.2vw,18px)"></i></div>
              <span class="text-gray-400">${s.phone || '02-586-1230'}</span>
            </div>
            <div class="flex items-center" style="gap: var(--space-sm)">
              <div class="shrink-0 rounded-md flex items-center justify-center" style="width:clamp(34px,2.8vw,46px); height:clamp(34px,2.8vw,46px); background: rgba(59,130,246,0.10);"><i class="fas fa-fax text-accent/60" style="font-size:clamp(13px,1.2vw,18px)"></i></div>
              <span class="text-gray-400">FAX: ${s.fax || '02-586-1238'}</span>
            </div>
            <div class="flex items-center" style="gap: var(--space-sm)">
              <div class="shrink-0 rounded-md flex items-center justify-center" style="width:clamp(34px,2.8vw,46px); height:clamp(34px,2.8vw,46px); background: rgba(59,130,246,0.10);"><i class="fas fa-envelope text-accent/60" style="font-size:clamp(13px,1.2vw,18px)"></i></div>
              <a href="mailto:${s.email || 'koist@koist.kr'}" class="hover:text-white transition-colors text-gray-400">${s.email || 'koist@koist.kr'}</a>
            </div>
            <div class="flex items-start" style="gap: var(--space-sm)">
              <div class="shrink-0 rounded-md flex items-center justify-center mt-0.5" style="width:clamp(34px,2.8vw,46px); height:clamp(34px,2.8vw,46px); background: rgba(59,130,246,0.10);"><i class="fas fa-location-dot text-accent/60" style="font-size:clamp(13px,1.2vw,18px)"></i></div>
              <span class="text-gray-400" style="overflow-wrap:break-word; word-break:keep-all;">${s.address || ''}</span>
            </div>
          </div>
        </div>

        <!-- Quick Links: 사업분야 (v31 - 2.5x) -->
        <div class="md:col-span-3">
          <h4 class="text-white/90 font-bold f-text-base tracking-wide" style="margin-bottom: var(--space-md)">사업분야</h4>
          <ul class="space-y-3 f-text-base">
            ${deps.filter(d => d.is_active).slice(0, 6).map(d => `<li><a href="/services/${d.slug}" class="hover:text-white transition-colors inline-flex items-center text-gray-500 hover:translate-x-1 transform transition-all" style="gap:6px"><span class="w-1 h-1 rounded-full" style="background: linear-gradient(135deg, #3B82F6, #06B6D4);"></span>${d.name}</a></li>`).join('')}
          </ul>
        </div>

        <!-- Quick Links: 고객지원 (v31 - 2.5x) -->
        <div class="md:col-span-2">
          <h4 class="text-white/90 font-bold f-text-base tracking-wide" style="margin-bottom: var(--space-md)">고객지원</h4>
          <ul class="space-y-3 f-text-base">
            <li><a href="/support/notice" class="hover:text-white transition-colors inline-flex items-center text-gray-500 hover:translate-x-1 transform transition-all" style="gap:6px"><span class="w-1 h-1 rounded-full" style="background: linear-gradient(135deg, #3B82F6, #06B6D4);"></span>공지사항</a></li>
            <li><a href="/support/downloads" class="hover:text-white transition-colors inline-flex items-center text-gray-500 hover:translate-x-1 transform transition-all" style="gap:6px"><span class="w-1 h-1 rounded-full" style="background: linear-gradient(135deg, #3B82F6, #06B6D4);"></span>자료실</a></li>
            <li><a href="/support/documents" class="hover:text-white transition-colors inline-flex items-center text-gray-500 hover:translate-x-1 transform transition-all" style="gap:6px"><span class="w-1 h-1 rounded-full" style="background: linear-gradient(135deg, #3B82F6, #06B6D4);"></span>시스템 문서</a></li>
            <li><a href="/about/location" class="hover:text-white transition-colors inline-flex items-center text-gray-500 hover:translate-x-1 transform transition-all" style="gap:6px"><span class="w-1 h-1 rounded-full" style="background: linear-gradient(135deg, #3B82F6, #06B6D4);"></span>오시는길</a></li>
          </ul>
        </div>

        <!-- Phone Card -->
        <div class="md:col-span-2">
          <div class="rounded-xl" style="padding: var(--space-md); background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);">
            <p class="f-text-sm text-gray-600 font-medium" style="margin-bottom: 8px">빠른 상담 전화</p>
            <a href="tel:${s.phone || '02-586-1230'}" class="font-black tracking-tight hover:opacity-80 transition-opacity block" style="font-size: var(--text-2xl); background: linear-gradient(135deg, #FFFFFF, #93C5FD); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${s.phone || '02-586-1230'}</a>
          </div>
          <div class="mt-4 space-y-2.5 f-text-sm">
            <a href="/support/faq" class="hover:text-white transition-colors inline-flex items-center text-gray-500 hover:translate-x-1 transform transition-all" style="gap:6px"><span class="w-1 h-1 rounded-full" style="background: linear-gradient(135deg, #3B82F6, #06B6D4);"></span>FAQ</a>
            <a href="/support/inquiry" class="hover:text-white transition-colors inline-flex items-center text-gray-500 hover:translate-x-1 transform transition-all block" style="gap:6px"><span class="w-1 h-1 rounded-full" style="background: linear-gradient(135deg, #3B82F6, #06B6D4);"></span>온라인 상담</a>
            <a href="/about/greeting" class="hover:text-white transition-colors inline-flex items-center text-gray-500 hover:translate-x-1 transform transition-all block" style="gap:6px"><span class="w-1 h-1 rounded-full" style="background: linear-gradient(135deg, #3B82F6, #06B6D4);"></span>KOIST 소개</a>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="flex flex-col sm:flex-row justify-between items-center" style="margin-top: var(--space-xl); padding-top: var(--space-lg); border-top: 1px solid rgba(255,255,255,0.04); gap: var(--space-sm);">
        <p class="f-text-sm text-slate-600">&copy; ${new Date().getFullYear()} ${siteName}. All rights reserved.</p>
        <div class="flex items-center f-text-sm text-slate-600" style="gap:var(--space-sm)">
          <a href="/about/greeting" class="hover:text-white transition-colors">KOIST 소개</a>
          <span class="text-slate-700">|</span>
          <a href="/support/inquiry" class="hover:text-white transition-colors">문의하기</a>
          <span class="text-slate-700">|</span>
          <a href="/admin" class="hover:text-white transition-colors"><i class="fas fa-lock mr-0.5" style="font-size:8px"></i>관리자</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- ═══════════ Scripts ═══════════ -->
  <!-- AOS -->
  <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>
  <script>AOS.init({ duration: 650, once: true, offset: 40, easing: 'ease-out-cubic' });</script>

  <script>
    /* ── Mobile Menu ── */
    function openMobileMenu() {
      document.getElementById('mobileMenu').classList.add('active');
      document.getElementById('mobileOverlay').classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeMobileMenu() {
      document.getElementById('mobileMenu').classList.remove('active');
      document.getElementById('mobileOverlay').classList.remove('active');
      document.body.style.overflow = '';
    }
    document.getElementById('mobileMenuBtn')?.addEventListener('click', openMobileMenu);

    /* ── GNB Scroll Effect ── */
    (function() {
      var gnb = document.getElementById('gnb');
      var scrollProg = document.getElementById('scrollProgress');
      var ticking = false;
      function onScroll() {
        if (!ticking) {
          requestAnimationFrame(function() {
            var scrollY = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollY > 20) { gnb.classList.add('gnb-scrolled'); }
            else { gnb.classList.remove('gnb-scrolled'); }
            var docH = document.documentElement.scrollHeight - window.innerHeight;
            if (docH > 0 && scrollProg) {
              scrollProg.style.width = Math.min((scrollY / docH) * 100, 100) + '%';
            }
            ticking = false;
          });
          ticking = true;
        }
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    })();

    /* ── Mega Dropdown Menu Logic ── */
    (function() {
      var gnbNav = document.querySelector('.gnb-nav-bar');
      var mega = document.getElementById('megaMenu');
      var gnbHeader = document.getElementById('gnb');
      if (!gnbNav || !mega) return;

      var hoverTimer = null;
      var activeTrigger = null;

      function showMega(triggerEl) {
        clearTimeout(hoverTimer);
        mega.classList.add('active');
        // Highlight the matching column (supports data-col-also for grouped columns)
        var col = triggerEl ? triggerEl.getAttribute('data-col') : null;
        mega.querySelectorAll('.mega-menu-column').forEach(function(c) {
          var match = c.getAttribute('data-col') === col;
          // Also check data-col-also for grouped single-page departments
          if (!match && col) {
            var also = c.getAttribute('data-col-also');
            if (also) { match = also.split(',').indexOf(col) !== -1; }
          }
          c.classList.toggle('mega-col-active', match);
        });
        // Highlight the trigger link
        gnbNav.querySelectorAll('.gnb-mega-trigger').forEach(function(l) {
          l.classList.toggle('gnb-link-active', l === triggerEl);
        });
        activeTrigger = triggerEl;
      }

      function hideMega() {
        hoverTimer = setTimeout(function() {
          mega.classList.remove('active');
          gnbNav.querySelectorAll('.gnb-mega-trigger').forEach(function(l) {
            l.classList.remove('gnb-link-active');
          });
          mega.querySelectorAll('.mega-menu-column').forEach(function(c) {
            c.classList.remove('mega-col-active');
          });
          activeTrigger = null;
        }, 180);
      }

      // Desktop hover behavior
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        gnbNav.querySelectorAll('.gnb-mega-trigger').forEach(function(link) {
          link.addEventListener('mouseenter', function() { showMega(link); });
          link.addEventListener('mouseleave', function() { hideMega(); });
        });
        mega.addEventListener('mouseenter', function() { clearTimeout(hoverTimer); });
        mega.addEventListener('mouseleave', function() { hideMega(); });
        // Also show when hovering the GNB header area (to prevent gap issues)
        gnbHeader.addEventListener('mouseleave', function(e) {
          // Only hide if not entering the mega menu
          if (!mega.contains(e.relatedTarget)) { hideMega(); }
        });
      }

      // Touch/tablet: click toggle
      var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      if (isTouchDevice) {
        gnbNav.querySelectorAll('.gnb-mega-trigger').forEach(function(link) {
          link.addEventListener('click', function(e) {
            if (mega.classList.contains('active') && activeTrigger === link) {
              // Second tap → navigate
              return;
            }
            e.preventDefault();
            showMega(link);
          });
        });
        document.addEventListener('click', function(e) {
          if (!gnbNav.contains(e.target) && !mega.contains(e.target)) {
            clearTimeout(hoverTimer);
            mega.classList.remove('active');
            gnbNav.querySelectorAll('.gnb-mega-trigger').forEach(function(l) { l.classList.remove('gnb-link-active'); });
          }
        });
      }

      // Close mega menu on scroll (optional UX improvement)
      var scrollClosing = false;
      window.addEventListener('scroll', function() {
        if (mega.classList.contains('active') && !scrollClosing) {
          scrollClosing = true;
          requestAnimationFrame(function() {
            if (window.pageYOffset > 60) {
              mega.classList.remove('active');
              gnbNav.querySelectorAll('.gnb-mega-trigger').forEach(function(l) { l.classList.remove('gnb-link-active'); });
            }
            scrollClosing = false;
          });
        }
      }, { passive: true });
    })();

    /* ── Mobile Accordion Toggle ── */
    function toggleMobileAcc(btn) {
      var acc = btn.closest('.mobile-acc');
      var sub = acc.querySelector('.mobile-acc-sub');
      var icon = btn.querySelector('.fa-chevron-down');
      if (!sub) return;
      var isOpen = !sub.classList.contains('hidden');
      // Close all others
      document.querySelectorAll('.mobile-acc-sub').forEach(function(s) { s.classList.add('hidden'); });
      document.querySelectorAll('.mobile-acc-btn .fa-chevron-down').forEach(function(i) { i.style.transform = ''; });
      if (!isOpen) {
        sub.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    }

    /* ── body:has() JS fallback for popup scroll lock ── */
    (function() {
      var obs = new MutationObserver(function() {
        var overlay = document.getElementById('popupOverlay');
        if (overlay) { document.body.classList.add('popup-body-lock'); }
        else { document.body.classList.remove('popup-body-lock'); }
      });
      obs.observe(document.body, { childList: true, subtree: true });
    })();

    /* ── Ripple Effect for buttons ── */
    document.querySelectorAll('.ripple-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        var rect = btn.getBoundingClientRect();
        var ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        var size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        btn.appendChild(ripple);
        setTimeout(function() { ripple.remove(); }, 600);
      });
    });

    /* ── Animated Counter (for hero stats, etc.) ── */
    function animateCounter(el, target, duration) {
      var start = 0;
      var startTime = null;
      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    /* ── Intersection Observer for scroll-triggered animations ── */
    (function() {
      if (!('IntersectionObserver' in window)) return;
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (entry.target.dataset.counter) {
              animateCounter(entry.target, parseInt(entry.target.dataset.counter), 1800);
            }
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      document.querySelectorAll('.observe-scroll').forEach(function(el) {
        observer.observe(el);
      });
    })();
  </script>

  ${s.google_analytics_id ? `
  <script async src="https://www.googletagmanager.com/gtag/js?id=${s.google_analytics_id}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${s.google_analytics_id}');
    ${s.google_conversion_id ? `gtag('event', 'conversion', {'send_to': '${s.google_conversion_id}'});` : ''}
  </script>
  ` : ''}

  <!-- ═══════════════════════════════════════════════════════════
       ADMIN INLINE EDITING MODE (v25)
       P0-1: 팝업 인라인 편집 → popups 테이블 직접 저장
       P1-1: HTML 포함 텍스트 innerHTML 보존 저장
       P1-2: 저장 완료 후 "새로고침 필요" 안내
       ═══════════════════════════════════════════════════════════ -->
  <script>
  (function() {
    // Check if admin is logged in
    var token = (document.cookie.match(/koist_token=([^;]*)/) || [])[1];
    if (!token) return;

    var isAdminMode = false;
    var editableElements = [];
    var pendingChanges = {};

    // Keys that contain HTML and should preserve it (use innerHTML instead of innerText)
    var htmlKeys = ['hero_line1', 'hero_line2', 'unified_panel_title', 'unified_panel_subtitle'];

    // Create admin toolbar
    var toolbar = document.createElement('div');
    toolbar.id = 'adminToolbar';
    toolbar.innerHTML = 
      '<div style="display:flex;align-items:center;gap:12px;padding:8px 20px;background:linear-gradient(135deg,#1E293B,#0F172A);border-top:2px solid #3B82F6;box-shadow:0 -4px 20px rgba(0,0,0,0.3);position:fixed;bottom:0;left:0;right:0;z-index:9999;font-family:Noto Sans KR,sans-serif;">' +
        '<div style="display:flex;align-items:center;gap:8px;">' +
          '<i class="fas fa-shield-halved" style="color:#3B82F6;font-size:16px;"></i>' +
          '<span style="color:#E2E8F0;font-weight:700;font-size:14px;">KOIST Admin</span>' +
        '</div>' +
        '<button id="adminToggleEdit" onclick="toggleAdminEdit()" style="padding:6px 16px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:1px solid #3B82F6;background:transparent;color:#60A5FA;transition:all 0.2s;">' +
          '<i class="fas fa-edit" style="margin-right:4px;"></i>편집모드' +
        '</button>' +
        '<span id="adminChangeCount" style="color:#94A3B8;font-size:12px;display:none;">변경: <strong id="adminChangeCnt" style="color:#FBBF24;">0</strong>건</span>' +
        '<button id="adminSaveBtn" onclick="saveAdminChanges()" style="padding:6px 16px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:none;background:linear-gradient(135deg,#2563EB,#06B6D4);color:#fff;display:none;transition:all 0.2s;box-shadow:0 2px 8px rgba(37,99,235,0.3);">' +
          '<i class="fas fa-save" style="margin-right:4px;"></i>저장' +
        '</button>' +
        '<button id="adminCancelBtn" onclick="cancelAdminEdit()" style="padding:6px 12px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:1px solid #475569;background:transparent;color:#94A3B8;display:none;">' +
          '취소' +
        '</button>' +
        '<div style="flex:1;"></div>' +
        '<a href="/admin/dashboard" style="color:#94A3B8;font-size:12px;text-decoration:none;display:flex;align-items:center;gap:4px;"><i class="fas fa-cog"></i>대시보드</a>' +
        '<a href="/" onclick="document.cookie=\'koist_token=;path=/;max-age=0\'" style="color:#EF4444;font-size:12px;text-decoration:none;display:flex;align-items:center;gap:4px;margin-left:8px;"><i class="fas fa-sign-out-alt"></i>로그아웃</a>' +
      '</div>';
    document.body.appendChild(toolbar);
    document.body.style.paddingBottom = '48px';

    // Find all editable elements
    function findEditables() {
      editableElements = [];
      document.querySelectorAll('[data-admin-edit]').forEach(function(el) {
        editableElements.push(el);
      });
      return editableElements;
    }

    // Toggle admin edit mode
    window.toggleAdminEdit = function() {
      isAdminMode = !isAdminMode;
      var btn = document.getElementById('adminToggleEdit');
      var saveBtn = document.getElementById('adminSaveBtn');
      var cancelBtn = document.getElementById('adminCancelBtn');
      var countSpan = document.getElementById('adminChangeCount');

      if (isAdminMode) {
        btn.style.background = '#3B82F6';
        btn.style.color = '#fff';
        btn.innerHTML = '<i class="fas fa-edit" style="margin-right:4px;"></i>편집중';
        saveBtn.style.display = 'inline-block';
        cancelBtn.style.display = 'inline-block';
        countSpan.style.display = 'inline-block';
        activateEditables();
      } else {
        btn.style.background = 'transparent';
        btn.style.color = '#60A5FA';
        btn.innerHTML = '<i class="fas fa-edit" style="margin-right:4px;"></i>편집모드';
        saveBtn.style.display = 'none';
        cancelBtn.style.display = 'none';
        countSpan.style.display = 'none';
        deactivateEditables();
      }
    };

    // Check if key is for popup data (popup_{id}_title, popup_{id}_content, popup_{id}_image)
    function parsePopupKey(key) {
      var m = key.match(/^popup_(\d+)_(title|content|image)$/);
      if (m) return { id: m[1], field: m[2] };
      return null;
    }

    // Check if key is a HTML-preserving key
    function isHtmlKey(key) {
      return htmlKeys.indexOf(key) !== -1;
    }

    function activateEditables() {
      findEditables();
      editableElements.forEach(function(el) {
        var key = el.getAttribute('data-admin-edit');
        // Store original content
        if (!el.dataset.adminOriginal) {
          el.dataset.adminOriginal = el.innerHTML;
        }
        // Add visual edit indicator
        el.style.outline = '2px dashed rgba(59,130,246,0.4)';
        el.style.outlineOffset = '2px';
        el.style.cursor = 'pointer';
        el.style.position = 'relative';

        // Make text editable
        if (!key.includes('image') && !key.includes('logo') && !key.includes('kolas')) {
          el.contentEditable = 'true';
          el.style.outline = '2px dashed rgba(59,130,246,0.5)';
        }

        // Add edit label
        var label = document.createElement('span');
        label.className = 'admin-edit-label';
        label.style.cssText = 'position:absolute;top:-18px;left:0;background:#3B82F6;color:#fff;font-size:10px;padding:1px 6px;border-radius:4px 4px 0 0;z-index:100;pointer-events:none;font-weight:600;white-space:nowrap;line-height:1.5;';
        label.textContent = getEditLabel(key);
        el.style.position = 'relative';
        el.appendChild(label);

        // Listen for changes — P1-1: use innerHTML for HTML keys, innerText for plain text
        el.addEventListener('input', function() {
          if (isHtmlKey(key)) {
            // Strip admin-edit-labels before capturing innerHTML
            var clone = el.cloneNode(true);
            clone.querySelectorAll('.admin-edit-label').forEach(function(l) { l.remove(); });
            pendingChanges[key] = clone.innerHTML.trim();
          } else {
            pendingChanges[key] = el.innerText.trim();
          }
          updateChangeCount();
        });

        // For image elements, add click-to-change
        if (key.includes('image') || key.includes('logo') || key.includes('kolas')) {
          el.addEventListener('click', function(e) {
            if (!isAdminMode) return;
            e.preventDefault();
            e.stopPropagation();
            var img = el.querySelector('img') || el;
            var currentSrc = img.src || img.style.backgroundImage;
            var newUrl = prompt('이미지 URL을 입력하세요:', currentSrc);
            if (newUrl && newUrl.trim()) {
              if (img.tagName === 'IMG') {
                img.src = newUrl.trim();
              }
              pendingChanges[key] = newUrl.trim();
              updateChangeCount();
            }
          });
        }
      });
    }

    function deactivateEditables() {
      editableElements.forEach(function(el) {
        el.contentEditable = 'false';
        el.style.outline = '';
        el.style.outlineOffset = '';
        el.style.cursor = '';
        // Remove labels
        el.querySelectorAll('.admin-edit-label').forEach(function(l) { l.remove(); });
      });
    }

    function getEditLabel(key) {
      var labels = {
        'hero_badge_text': '배지 텍스트',
        'hero_line1': '메인 제목 (HTML)',
        'hero_line2': '부제목 (HTML)',
        'hero_btn_primary': '메인 버튼',
        'hero_btn_secondary': '보조 버튼',
        'hero_contact_label': '연락처 제목',
        'hero_contact_section': '연락처 섹션',
        'hero_contact_info': '연락처 정보',
        'phone': '전화번호',
        'fax': 'FAX',
        'email': '이메일',
        'address': '주소',
        'unified_panel_title': '시뮬레이터 제목 (HTML)',
        'unified_panel_subtitle': '시뮬레이터 부제',
        'unified_reduction_default': '기본 단축률',
        'unified_reduction_label': '단축률 라벨',
        'sim_tab_overall': '탭: 전체평균',
        'sim_tab_eal2': '탭: EAL2',
        'sim_tab_eal3': '탭: EAL3',
        'sim_tab_eal4': '탭: EAL4',
        'sim_label_prep': '사전준비 라벨',
        'sim_slider_level1': '슬라이더: 미흡',
        'sim_slider_level2': '슬라이더: 보통',
        'sim_slider_level3': '슬라이더: 양호',
        'sim_slider_level4': '슬라이더: 우수',
        'sim_label_traditional': '전통 프로세스 라벨',
        'sim_label_koist': 'KOIST 프로세스 라벨',
        'sim_panel': '시뮬레이터 패널',
        'services_badge': '서비스 배지',
        'services_title': '서비스 제목',
        'services_subtitle': '서비스 부제',
        'site_logo': '사이트 로고',
        'kolas_image': 'KOLAS 마크',
        'popup_close_all_text': '팝업 닫기 버튼',
      };
      // Dynamic popup labels
      var popupInfo = parsePopupKey(key);
      if (popupInfo) {
        var fieldNames = { title: '제목', content: '내용', image: '이미지' };
        return '팝업#' + popupInfo.id + ' ' + (fieldNames[popupInfo.field] || popupInfo.field);
      }
      return labels[key] || key;
    }

    function updateChangeCount() {
      var cnt = Object.keys(pendingChanges).length;
      var el = document.getElementById('adminChangeCnt');
      if (el) el.textContent = cnt;
    }

    // P0-1: Save popup changes to popups table, others to site_settings
    async function saveOneChange(key, value) {
      var popupInfo = parsePopupKey(key);
      if (popupInfo) {
        // Route popup edits to PUT /api/admin/popups/:id
        var body = {};
        if (popupInfo.field === 'title') body.title = value;
        else if (popupInfo.field === 'content') body.content = value;
        else if (popupInfo.field === 'image') body.image_url = value;
        var res = await fetch('/api/admin/popups/' + popupInfo.id, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
          body: JSON.stringify(body)
        });
        return res.ok;
      } else {
        // Default: save to site_settings
        var res = await fetch('/api/admin/settings/' + key, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
          body: JSON.stringify({ value: value })
        });
        return res.ok;
      }
    }

    // Save changes via API
    window.saveAdminChanges = async function() {
      var keys = Object.keys(pendingChanges);
      if (keys.length === 0) {
        alert('변경된 항목이 없습니다.');
        return;
      }

      var saveBtn = document.getElementById('adminSaveBtn');
      saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right:4px;"></i>저장중...';
      saveBtn.disabled = true;

      var errors = [];
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = pendingChanges[key];
        try {
          var ok = await saveOneChange(key, value);
          if (!ok) errors.push(key);
        } catch (e) {
          errors.push(key);
        }
      }

      saveBtn.disabled = false;
      if (errors.length === 0) {
        saveBtn.innerHTML = '<i class="fas fa-check" style="margin-right:4px;"></i>저장완료!';
        pendingChanges = {};
        updateChangeCount();
        // P1-2: Show refresh notice
        setTimeout(function() {
          saveBtn.innerHTML = '<i class="fas fa-save" style="margin-right:4px;"></i>저장';
          if (confirm('저장 완료! 변경사항을 확인하려면 페이지를 새로고침해야 합니다.\n\n지금 새로고침 하시겠습니까?')) {
            location.reload();
          }
        }, 800);
        // Update original content
        editableElements.forEach(function(el) {
          el.dataset.adminOriginal = el.innerHTML;
        });
      } else {
        saveBtn.innerHTML = '<i class="fas fa-save" style="margin-right:4px;"></i>저장';
        alert(errors.length + '개 항목 저장 실패. 다시 시도해주세요.');
      }
    };

    // Cancel edit mode
    window.cancelAdminEdit = function() {
      // Restore original content
      editableElements.forEach(function(el) {
        if (el.dataset.adminOriginal) {
          el.innerHTML = el.dataset.adminOriginal;
        }
      });
      pendingChanges = {};
      updateChangeCount();
      window.toggleAdminEdit();
    };
  })();
  </script>
</body>
</html>`;
}
