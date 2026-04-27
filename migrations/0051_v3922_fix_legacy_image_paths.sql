-- v39.22: Fix broken legacy image paths in dep_pages
-- Problem: dep_pages content references old koist.kr filenames (p33_*, p37_*, p40_*)
--          which return 404 from current koist.kr server
-- Solution: REPLACE old filenames with new ones (p48_*, p50_*, p54_*, p55_*, kolas.png)
-- Method: SQL REPLACE() preserves all surrounding HTML/layout, no duplication
-- Idempotent: Safe to re-run (REPLACE on already-fixed strings is a no-op)
--
-- Mapping:
--   p33_img.png        -> p50_img.png            (performance/overview)
--   p37_kolas.png      -> ../sh_img/hd/top_menu/kolas.png  (certificate overview)
--   p37_step{1..4}.png -> p48_step{1..4}.png     (certificate, consulting, mock-test)
--   p40_img.png        -> p54_ctf.png            (readiness/overview)
--   p40_select{1..5}.png -> p55_icon{1..5}.png   (readiness/overview)
--
-- Affected pages:
--   id=11 performance/overview, id=14 certificate, id=15 certificate/rnd,
--   id=16 certificate/ai, id=17 certificate/network, id=19 diagnosis/ddos,
--   id=23 consulting/cc, id=24 consulting/kcmvp, id=25 consulting/isms-p,
--   id=27 readiness/overview

-- ============================================================
-- Step 1: performance/overview (id=11) - p33_img -> p50_img
-- ============================================================
UPDATE dep_pages
SET content = REPLACE(content,
  '/api/images/legacy/sh_page/img/p33_img.png',
  '/api/images/legacy/sh_page/img/p50_img.png')
WHERE id = 11;

-- ============================================================
-- Step 2: certificate overview (id=14) - p37_kolas -> top_menu/kolas
-- KOLAS image lives in /sh_img/hd/top_menu/, not /sh_page/img/
-- ============================================================
UPDATE dep_pages
SET content = REPLACE(content,
  '/api/images/legacy/sh_page/img/p37_kolas.png',
  '/api/images/legacy/sh_img/hd/top_menu/kolas.png')
WHERE id = 14;

-- ============================================================
-- Step 3: All step icons - p37_step{1..4} -> p48_step{1..4}
-- Affects: 14, 15, 16, 17, 19, 23, 24, 25
-- ============================================================
UPDATE dep_pages
SET content = REPLACE(REPLACE(REPLACE(REPLACE(content,
  '/api/images/legacy/sh_page/img/p37_step1.png',
  '/api/images/legacy/sh_page/img/p48_step1.png'),
  '/api/images/legacy/sh_page/img/p37_step2.png',
  '/api/images/legacy/sh_page/img/p48_step2.png'),
  '/api/images/legacy/sh_page/img/p37_step3.png',
  '/api/images/legacy/sh_page/img/p48_step3.png'),
  '/api/images/legacy/sh_page/img/p37_step4.png',
  '/api/images/legacy/sh_page/img/p48_step4.png')
WHERE id IN (14, 15, 16, 17, 19, 23, 24, 25);

-- ============================================================
-- Step 4: readiness/overview (id=27) - p40_img -> p54_ctf, p40_select{1..5} -> p55_icon{1..5}
-- ============================================================
UPDATE dep_pages
SET content = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(content,
  '/api/images/legacy/sh_page/img/p40_img.png',
  '/api/images/legacy/sh_page/img/p54_ctf.png'),
  '/api/images/legacy/sh_page/img/p40_select1.png',
  '/api/images/legacy/sh_page/img/p55_icon1.png'),
  '/api/images/legacy/sh_page/img/p40_select2.png',
  '/api/images/legacy/sh_page/img/p55_icon2.png'),
  '/api/images/legacy/sh_page/img/p40_select3.png',
  '/api/images/legacy/sh_page/img/p55_icon3.png'),
  '/api/images/legacy/sh_page/img/p40_select4.png',
  '/api/images/legacy/sh_page/img/p55_icon4.png'),
  '/api/images/legacy/sh_page/img/p40_select5.png',
  '/api/images/legacy/sh_page/img/p55_icon5.png')
WHERE id = 27;

-- ============================================================
-- Step 5: Audit marker - record migration completion in site_settings
-- (used to verify migration ran successfully)
-- ============================================================
INSERT OR REPLACE INTO site_settings (key, value, updated_at)
VALUES ('legacy_images_v3922_status', 'applied', CURRENT_TIMESTAMP);
