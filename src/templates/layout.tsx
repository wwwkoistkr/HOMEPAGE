// KOIST - Main Layout Template (v30.0 - 2.5x Logo, 2x GNB, Windows/Mobile Compat, 8K Ultra-Sharp)
import type { SettingsMap, Department } from '../types';

export function layout(opts: {
  title?: string;
  settings: SettingsMap;
  departments?: Department[];
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
      /* ── Fluid Typography Scale (Korean-optimized, v30 enhanced) ── */
      --text-xs:   clamp(0.75rem, 0.68rem + 0.22vw, 0.88rem);
      --text-sm:   clamp(0.85rem, 0.78rem + 0.26vw, 1.00rem);
      --text-base: clamp(0.95rem, 0.87rem + 0.32vw, 1.12rem);
      --text-lg:   clamp(1.08rem, 0.96rem + 0.42vw, 1.30rem);
      --text-xl:   clamp(1.25rem, 1.08rem + 0.52vw, 1.55rem);
      --text-2xl:  clamp(1.48rem, 1.22rem + 0.72vw, 2.00rem);
      --text-3xl:  clamp(1.82rem, 1.42rem + 1.05vw, 2.60rem);
      --text-hero: clamp(2.25rem, 1.65rem + 1.8vw, 3.60rem);

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

      /* ── GNB (v30 - taller for 2.5x logo) ── */
      --gnb-h: clamp(78px, 68px + 2.5vw, 110px);

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
        --container-max: min(100% - 5rem, 1600px);
        --text-hero: clamp(2.8rem, 2rem + 1.2vw, 4rem);
        --gnb-h: 90px;
      }
    }
    /* ── 5K+ ── */
    @media (min-width: 3840px) {
      :root {
        --container-max: min(100% - 8rem, 1920px);
        --text-hero: clamp(3.2rem, 2.5rem + 1vw, 4.5rem);
        --gnb-h: 100px;
      }
    }
    /* ── 8K (7680px+) ── */
    @media (min-width: 7680px) {
      :root {
        --container-max: min(100% - 12rem, 2400px);
        --text-hero: clamp(4rem, 3rem + 1.2vw, 6rem);
        --gnb-h: 120px;
        --text-xs: 1.2rem;
        --text-sm: 1.4rem;
        --text-base: 1.6rem;
        --text-lg: 1.9rem;
        --text-xl: 2.3rem;
        --text-2xl: 3rem;
        --text-3xl: 3.8rem;
      }
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
      line-height: 1.7;
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

    /* ═══════ FLUID TEXT UTILITIES ═══════ */
    .f-text-xs   { font-size: var(--text-xs); line-height: 1.6; }
    .f-text-sm   { font-size: var(--text-sm); line-height: 1.65; }
    .f-text-base { font-size: var(--text-base); line-height: 1.7; }
    .f-text-lg   { font-size: var(--text-lg); line-height: 1.55; }
    .f-text-xl   { font-size: var(--text-xl); line-height: 1.4; }
    .f-text-2xl  { font-size: var(--text-2xl); line-height: 1.3; letter-spacing: -0.02em; }
    .f-text-3xl  { font-size: var(--text-3xl); line-height: 1.2; letter-spacing: -0.025em; }
    .f-text-hero { font-size: var(--text-hero); line-height: 1.15; letter-spacing: -0.03em; }

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
      .gnb-item:hover .gnb-dropdown { opacity: 1; visibility: visible; transform: translateY(0); }
    }
    @media (hover: none) {
      .gnb-item .gnb-dropdown { display: none; }
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
       GNB PREMIUM (Transparent → Frosted Glass)
       ═══════════════════════════════════════════════ */
    #gnb {
      transition: background 0.45s var(--ease-smooth),
                  box-shadow 0.45s var(--ease-smooth),
                  backdrop-filter 0.45s var(--ease-smooth);
    }
    #gnb.gnb-scrolled {
      background: rgba(10,15,30,0.85) !important;
      backdrop-filter: blur(28px) saturate(180%);
      -webkit-backdrop-filter: blur(28px) saturate(180%);
      box-shadow: 0 1px 0 rgba(255,255,255,0.03),
                  0 4px 24px rgba(0,0,0,0.25),
                  inset 0 -1px 0 rgba(255,255,255,0.02);
    }

    /* GNB Link — v30 8K Ultra-Sharp (2x+ font, Windows/Mobile compat) */
    .gnb-link {
      padding: var(--gnb-link-pad-y, 0.5rem) var(--gnb-link-pad-x, clamp(0.18rem, 0.32vw, 0.40rem));
      font-size: var(--gnb-link-font, clamp(1.05rem, 0.90rem + 0.48vw, 1.30rem));
      font-weight: var(--gnb-link-weight, 600);
      color: var(--gnb-link-color, rgba(220,228,240,0.92));
      white-space: nowrap;
      transition: color 0.25s ease, text-shadow 0.25s ease;
      letter-spacing: -0.02em;
      position: relative;
      text-rendering: geometricPrecision;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      /* Windows ClearType enhancement */
      font-feature-settings: 'kern' 1, 'liga' 1;
    }
    .gnb-link::after {
      content: '';
      position: absolute;
      bottom: -3px; left: 50%; width: 0; height: 2.5px;
      background: linear-gradient(90deg, #3B82F6, #06B6D4);
      transition: width 0.35s var(--ease-out), left 0.35s var(--ease-out);
      border-radius: 1.5px;
    }
    .gnb-link:hover { color: var(--gnb-link-hover, #FFFFFF); text-shadow: 0 0 12px rgba(59,130,246,0.25); }
    .gnb-link:hover::after { width: 80%; left: 10%; }
    /* 4K+ GNB scaling */
    @media (min-width: 2560px) {
      .gnb-link { font-size: var(--gnb-link-font, clamp(1.4rem, 1.2rem + 0.3vw, 1.8rem)); }
    }
    @media (min-width: 3840px) {
      .gnb-link { font-size: var(--gnb-link-font, clamp(1.8rem, 1.5rem + 0.5vw, 2.4rem)); }
    }
    @media (min-width: 7680px) {
      .gnb-link { font-size: var(--gnb-link-font, clamp(2.6rem, 2.2rem + 0.6vw, 3.6rem)); letter-spacing: -0.01em; }
    }

    /* GNB Dropdown (v30 - touch/click accessible) */
    .gnb-item .gnb-dropdown {
      opacity: 0; visibility: hidden; transform: translateY(10px);
      transition: all 0.3s var(--ease-out);
    }
    /* Hover activation only for mouse devices */
    @media (hover: hover) {
      .gnb-item:hover .gnb-dropdown {
        opacity: 1; visibility: visible; transform: translateY(0);
      }
    }
    .gnb-item.gnb-open .gnb-dropdown {
      opacity: 1; visibility: visible; transform: translateY(0);
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

  <!-- ═══════════ GNB (Premium Frosted Glass) ═══════════ -->
  <header id="gnb" class="fixed top-0 left-0 right-0 z-50" style="${s.gnb_bg_url ? `background-image: linear-gradient(rgba(10,15,30,0.88), rgba(10,15,30,0.92)), url('${s.gnb_bg_url}'); background-size:cover; background-position:center;` : 'background: rgba(10,15,30,0.92); backdrop-filter: blur(24px) saturate(180%); -webkit-backdrop-filter: blur(24px) saturate(180%);'} border-bottom: 1px solid rgba(255,255,255,0.04);">
    <div class="fluid-container">
      <div class="flex items-center justify-between" style="height:var(--gnb-h)">

        <!-- Logo + KOLAS Mark (v30 - 2.5x enlarged logo) -->
        <div class="flex items-center shrink-0" style="gap: clamp(12px, 1.8vw, 24px); max-width: clamp(360px, 30vw, 560px);">
          <a href="/" class="flex items-center shrink-0 group" style="gap: var(--space-sm)">
            ${s.logo_url && s.logo_url.trim() !== '' && s.logo_url !== '/static/images/logo.png' ? `
            <img src="${s.logo_url}" alt="${siteName}" style="height:clamp(60px, 50px + 2vw, 90px); max-width:clamp(320px, 28vw, 520px);" class="w-auto object-contain transition-transform group-hover:scale-[1.02]">
            ` : `
            <div class="flex items-center" style="gap: clamp(8px, 0.8vw, 14px)">
              <div class="relative">
                <div class="absolute inset-0 rounded-xl blur-md transition-all group-hover:blur-lg" style="background: linear-gradient(135deg, rgba(59,130,246,0.25), rgba(6,182,212,0.20));"></div>
                <div class="relative rounded-xl flex items-center justify-center" style="width:clamp(52px,5vw,76px); height:clamp(52px,5vw,76px); background: linear-gradient(135deg, #2563EB, #06B6D4);">
                  <i class="fas fa-shield-halved text-white" style="font-size:clamp(24px,2.5vw,36px)"></i>
                </div>
              </div>
              <div>
                <div class="font-bold text-white leading-tight tracking-tight" style="font-size:clamp(1.3rem, 1.05rem + 0.8vw, 1.85rem);">한국정보보안기술원</div>
                <div class="tracking-[0.18em] font-medium" style="font-size:clamp(0.8rem, 0.68rem + 0.38vw, 1.1rem); background: linear-gradient(90deg, #94A3B8, #64748B); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">KOIST</div>
              </div>
            </div>
            `}
          </a>
          <!-- KOLAS 국제공인시험기관 마크 (v30 - 2.5x enlarged) -->
          <div class="hidden md:flex items-center" style="padding-left: clamp(8px, 1.2vw, 16px); border-left: 1px solid rgba(255,255,255,0.08);">
            <img src="/static/images/kolas.png" alt="KOLAS 국제공인시험기관" style="height:clamp(50px, 44px + 1.5vw, 78px);" class="w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" title="KOLAS 국제공인시험기관 인정 (KTL-F-588)">
          </div>
        </div>

        <!-- Desktop GNB (v30 - 2x Font, 2.5x Logo, Touch-friendly, Admin-Editable) -->
        ${(() => {
          const gnbFontScale = parseFloat(s.gnb_font_scale || '2.2') || 2.2;
          const gnbGapScale = parseFloat(s.gnb_gap_scale || '0.55') || 0.55;
          const baseFontMin = 0.70;
          const baseFontVw = 0.30;
          const baseFontMax = 0.85;
          const fMin = (baseFontMin * gnbFontScale).toFixed(2);
          const fVwCoeff = (baseFontVw * gnbFontScale).toFixed(2);
          const fMax = (baseFontMax * gnbFontScale).toFixed(2);
          const baseVwBase = 0.60;
          const fVwBase = (baseVwBase * gnbFontScale).toFixed(2);
          const padXMin = (0.30 * gnbGapScale).toFixed(2);
          const padXVw = (0.55 * gnbGapScale).toFixed(2);
          const padXMax = (0.70 * gnbGapScale).toFixed(2);
          const gapMin = (0.15 * gnbGapScale).toFixed(2);
          const gapVw = (0.10 * gnbGapScale).toFixed(2);
          const gapMax = (0.25 * gnbGapScale).toFixed(2);
          const gnbFontWeight = s.gnb_font_weight || '600';
          const gnbTextColor = s.gnb_text_color || 'rgba(220,228,240,0.92)';
          const gnbHoverColor = s.gnb_hover_color || '#FFFFFF';
          const navItems = deps.filter(d => d.is_active).map(dept =>
            '<div class="gnb-item relative">' +
            '<a href="/services/' + dept.slug + '" class="gnb-link">' + dept.name + '</a>' +
            '<div class="gnb-dropdown absolute top-full left-1/2 -translate-x-1/2 pt-2 min-w-[170px]" id="gnb-drop-' + dept.slug + '"></div>' +
            '</div>'
          ).join('');
          return '<style>:root{' +
            '--gnb-link-font:clamp(' + fMin + 'rem,' + fVwBase + 'rem + ' + fVwCoeff + 'vw,' + fMax + 'rem);' +
            '--gnb-link-pad-x:clamp(' + padXMin + 'rem,' + padXVw + 'vw,' + padXMax + 'rem);' +
            '--gnb-nav-gap:clamp(' + gapMin + 'rem,' + gapVw + 'vw,' + gapMax + 'rem);' +
            '--gnb-link-weight:' + gnbFontWeight + ';' +
            '--gnb-link-color:' + gnbTextColor + ';' +
            '--gnb-link-hover:' + gnbHoverColor + ';' +
            '}</style>' +
            '<nav class="hidden lg:flex items-center" style="gap:var(--gnb-nav-gap);margin-left:clamp(4px,0.8vw,10px);-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision;">' +
            navItems +
            '<a href="/support/notice" class="gnb-link">고객지원</a>' +
            '</nav>';
        })()}

        <!-- Right Actions -->
        <div class="flex items-center" style="gap:var(--space-sm)">
          <a href="tel:${s.phone || '02-586-1230'}" class="hidden sm:inline-flex items-center text-white font-bold rounded-lg transition-all ripple-btn" style="gap: 8px; padding: clamp(0.5rem,0.7vw,0.7rem) clamp(1rem,1.4vw,1.5rem); font-size: clamp(0.95rem, 0.82rem + 0.5vw, 1.2rem); background: linear-gradient(135deg, rgba(59,130,246,0.85), rgba(6,182,212,0.85)); box-shadow: 0 4px 16px rgba(59,130,246,0.25), inset 0 1px 0 rgba(255,255,255,0.12); border-radius: clamp(8px,0.6vw,12px);">
            <i class="fas fa-phone" style="font-size:clamp(11px,0.9vw,15px)"></i>
            <span>${s.phone || '02-586-1230'}</span>
          </a>
          <button id="mobileMenuBtn" class="lg:hidden p-2 text-slate-400 hover:text-white transition-colors" aria-label="메뉴 열기">
            <i class="fas fa-bars" style="font-size:var(--text-lg)"></i>
          </button>
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
      <!-- Dept Links -->
      <div class="space-y-0.5">
        ${deps.filter(d => d.is_active).map(dept => `
        <a href="/services/${dept.slug}" class="flex items-center px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-all" style="gap: var(--space-sm)" onclick="closeMobileMenu()">
          <div class="rounded-md flex items-center justify-center shrink-0" style="width:28px; height:28px; background:${dept.color}08">
            <i class="fas ${dept.icon}" style="color:${dept.color}; font-size: var(--text-xs)"></i>
          </div>
          <span class="f-text-sm font-medium">${dept.name}</span>
        </a>
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

        <!-- Company Info -->
        <div class="md:col-span-5">
          <div style="margin-bottom: var(--space-lg)">
            <div class="inline-flex items-center rounded-xl" style="padding: var(--space-sm) var(--space-md); background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);">
              <img src="/static/images/logo-horizontal.png" alt="${siteName}" style="height:clamp(24px, 20px + 0.6vw, 32px)" class="w-auto object-contain opacity-90">
            </div>
          </div>
          <p class="f-text-base leading-relaxed text-gray-500 max-w-sm" style="margin-bottom: var(--space-md)">${s.site_slogan || '최상의 시험·인증 서비스로 정보보안 기술을 완성'}</p>
          <div class="space-y-3 f-text-base">
            <div class="flex items-center" style="gap: var(--space-sm)">
              <div class="shrink-0 rounded-md flex items-center justify-center" style="width:clamp(28px,2.2vw,36px); height:clamp(28px,2.2vw,36px); background: rgba(59,130,246,0.08);"><i class="fas fa-phone text-accent/60" style="font-size:clamp(10px,0.9vw,14px)"></i></div>
              <span class="text-gray-400">${s.phone || '02-586-1230'}</span>
            </div>
            <div class="flex items-center" style="gap: var(--space-sm)">
              <div class="shrink-0 rounded-md flex items-center justify-center" style="width:clamp(28px,2.2vw,36px); height:clamp(28px,2.2vw,36px); background: rgba(59,130,246,0.08);"><i class="fas fa-fax text-accent/60" style="font-size:clamp(10px,0.9vw,14px)"></i></div>
              <span class="text-gray-400">FAX: ${s.fax || '02-586-1238'}</span>
            </div>
            <div class="flex items-center" style="gap: var(--space-sm)">
              <div class="shrink-0 rounded-md flex items-center justify-center" style="width:clamp(28px,2.2vw,36px); height:clamp(28px,2.2vw,36px); background: rgba(59,130,246,0.08);"><i class="fas fa-envelope text-accent/60" style="font-size:clamp(10px,0.9vw,14px)"></i></div>
              <a href="mailto:${s.email || 'koist@koist.kr'}" class="hover:text-white transition-colors text-gray-400">${s.email || 'koist@koist.kr'}</a>
            </div>
            <div class="flex items-start" style="gap: var(--space-sm)">
              <div class="shrink-0 rounded-md flex items-center justify-center mt-0.5" style="width:clamp(28px,2.2vw,36px); height:clamp(28px,2.2vw,36px); background: rgba(59,130,246,0.08);"><i class="fas fa-location-dot text-accent/60" style="font-size:clamp(10px,0.9vw,14px)"></i></div>
              <span class="text-gray-400" style="overflow-wrap:break-word; word-break:keep-all;">${s.address || ''}</span>
            </div>
          </div>
        </div>

        <!-- Quick Links: 사업분야 -->
        <div class="md:col-span-3">
          <h4 class="text-white/90 font-semibold f-text-sm tracking-wide" style="margin-bottom: var(--space-md)">사업분야</h4>
          <ul class="space-y-2.5 f-text-sm">
            ${deps.filter(d => d.is_active).slice(0, 6).map(d => `<li><a href="/services/${d.slug}" class="hover:text-white transition-colors inline-flex items-center text-gray-500 hover:translate-x-1 transform transition-all" style="gap:6px"><span class="w-1 h-1 rounded-full" style="background: linear-gradient(135deg, #3B82F6, #06B6D4);"></span>${d.name}</a></li>`).join('')}
          </ul>
        </div>

        <!-- Quick Links: 고객지원 (사업분야와 동일 스타일) -->
        <div class="md:col-span-2">
          <h4 class="text-white/90 font-semibold f-text-sm tracking-wide" style="margin-bottom: var(--space-md)">고객지원</h4>
          <ul class="space-y-2.5 f-text-sm">
            <li><a href="/support/notice" class="hover:text-white transition-colors inline-flex items-center text-gray-500 hover:translate-x-1 transform transition-all" style="gap:6px"><span class="w-1 h-1 rounded-full" style="background: linear-gradient(135deg, #3B82F6, #06B6D4);"></span>공지사항</a></li>
            <li><a href="/support/downloads" class="hover:text-white transition-colors inline-flex items-center text-gray-500 hover:translate-x-1 transform transition-all" style="gap:6px"><span class="w-1 h-1 rounded-full" style="background: linear-gradient(135deg, #3B82F6, #06B6D4);"></span>자료실</a></li>
            <li><a href="/support/documents" class="hover:text-white transition-colors inline-flex items-center text-gray-500 hover:translate-x-1 transform transition-all" style="gap:6px"><span class="w-1 h-1 rounded-full" style="background: linear-gradient(135deg, #3B82F6, #06B6D4);"></span>시스템 문서</a></li>
            <li><a href="/about/location" class="hover:text-white transition-colors inline-flex items-center text-gray-500 hover:translate-x-1 transform transition-all" style="gap:6px"><span class="w-1 h-1 rounded-full" style="background: linear-gradient(135deg, #3B82F6, #06B6D4);"></span>오시는길</a></li>
          </ul>
        </div>

        <!-- Phone Card -->
        <div class="md:col-span-2">
          <div class="rounded-xl" style="padding: var(--space-md); background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);">
            <p class="f-text-xs text-gray-600 font-medium" style="margin-bottom: 6px">빠른 상담 전화</p>
            <a href="tel:${s.phone || '02-586-1230'}" class="font-black tracking-tight hover:opacity-80 transition-opacity block" style="font-size: var(--text-xl); background: linear-gradient(135deg, #FFFFFF, #93C5FD); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${s.phone || '02-586-1230'}</a>
          </div>
          <div class="mt-4 space-y-2 f-text-xs">
            <a href="/support/faq" class="hover:text-white transition-colors inline-flex items-center text-gray-500 hover:translate-x-1 transform transition-all" style="gap:6px"><span class="w-1 h-1 rounded-full" style="background: linear-gradient(135deg, #3B82F6, #06B6D4);"></span>FAQ</a>
            <a href="/support/inquiry" class="hover:text-white transition-colors inline-flex items-center text-gray-500 hover:translate-x-1 transform transition-all block" style="gap:6px"><span class="w-1 h-1 rounded-full" style="background: linear-gradient(135deg, #3B82F6, #06B6D4);"></span>온라인 상담</a>
            <a href="/about/greeting" class="hover:text-white transition-colors inline-flex items-center text-gray-500 hover:translate-x-1 transform transition-all block" style="gap:6px"><span class="w-1 h-1 rounded-full" style="background: linear-gradient(135deg, #3B82F6, #06B6D4);"></span>KOIST 소개</a>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="flex flex-col sm:flex-row justify-between items-center" style="margin-top: var(--space-xl); padding-top: var(--space-lg); border-top: 1px solid rgba(255,255,255,0.04); gap: var(--space-sm);">
        <p class="f-text-xs text-slate-600">&copy; ${new Date().getFullYear()} ${siteName}. All rights reserved.</p>
        <div class="flex items-center f-text-xs text-slate-600" style="gap:var(--space-sm)">
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

    /* ── Touch-friendly GNB dropdown (click) for tablets ── */
    (function() {
      var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      if (isTouchDevice) {
        document.querySelectorAll('.gnb-item').forEach(function(item) {
          item.addEventListener('click', function(e) {
            var dropdown = item.querySelector('.gnb-dropdown');
            if (!dropdown || !dropdown.innerHTML.trim()) return;
            var isOpen = item.classList.contains('gnb-open');
            document.querySelectorAll('.gnb-item.gnb-open').forEach(function(el) { el.classList.remove('gnb-open'); });
            if (!isOpen) { item.classList.add('gnb-open'); e.preventDefault(); }
          });
        });
        document.addEventListener('click', function(e) {
          if (!e.target.closest('.gnb-item')) {
            document.querySelectorAll('.gnb-item.gnb-open').forEach(function(el) { el.classList.remove('gnb-open'); });
          }
        });
      }
    })();

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
</body>
</html>`;
}
