-- Migration 0028: Complete admin-editable settings for Floors 1-3
-- v38.3 - Full Admin Mode for all homepage content

-- ═══ A. Hero gradient colors (used in code but missing from DB) ═══
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
  ('hero_gradient_color1', '#070B14', 'background', '히어로 그라디언트 색상 1 (0%)'),
  ('hero_gradient_color2', '#0A1128', 'background', '히어로 그라디언트 색상 2 (25%)'),
  ('hero_gradient_color3', '#0F1E3D', 'background', '히어로 그라디언트 색상 3 (45%)'),
  ('hero_gradient_color4', '#162D5A', 'background', '히어로 그라디언트 색상 4 (70%)'),
  ('hero_gradient_color5', '#1A3A6E', 'background', '히어로 그라디언트 색상 5 (100%)');

-- ═══ B. KOLAS mark image URL (currently hardcoded) ═══
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
  ('kolas_image_url', '/static/images/kolas.png', 'content', 'KOLAS 마크 이미지 URL');

-- ═══ C. Badge logo image URL (currently hardcoded koist-circle-logo.png) ═══
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
  ('hero_badge_logo_url', '/static/images/koist-circle-logo.png', 'content', '히어로 배지 로고 이미지 URL');

-- ═══ D. CTA button URLs and icons ═══
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
  ('hero_btn_primary_url', '/support/inquiry', 'content', 'CTA 버튼 1 링크 URL'),
  ('hero_btn_secondary_url', '#services', 'content', 'CTA 버튼 2 링크 URL'),
  ('hero_btn_primary_icon', 'fa-paper-plane', 'content', 'CTA 버튼 1 아이콘 (FontAwesome 클래스)'),
  ('hero_btn_secondary_icon', 'fa-th-large', 'content', 'CTA 버튼 2 아이콘 (FontAwesome 클래스)');

-- ═══ E. Site identity (used in layout fallback text) ═══
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
  ('site_name', '한국정보보안기술원', 'general', '사이트 공식 명칭'),
  ('site_slogan', 'KOIST', 'general', '사이트 슬로건/약자');

-- ═══ F. Top bar / GNB bar background colors ═══
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
  ('topbar_bg_color', '', 'theme', '탑바 배경 색상 (빈값=기본 그라디언트)'),
  ('gnb_bar_bg_color', '', 'theme', 'GNB 바 배경 색상 (빈값=기본 그라디언트)');

-- ═══ G. CTA section settings (already referenced in code) ═══
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
  ('cta_bg_url', '', 'background', 'CTA 섹션 배경 이미지 URL'),
  ('cta_title', '지금 바로 상담하세요', 'content', 'CTA 섹션 제목'),
  ('cta_subtitle', '전문 컨설팅', 'content', 'CTA 섹션 부제'),
  ('cta_description', '국가 공인 시험·평가 기관의 전문 상담 서비스를 이용하세요.', 'content', 'CTA 섹션 설명');

-- ═══ H. Services section settings ═══
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
  ('services_title', '사업분야', 'content', '사업분야 섹션 제목'),
  ('services_subtitle', '다양한 보안 서비스를 제공합니다', 'content', '사업분야 섹션 부제');

-- ═══ I. Footer background ═══
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
  ('footer_bg_url', '', 'background', '푸터 배경 이미지 URL');

-- ═══ J. Logo URL (ensure it exists) ═══
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
  ('logo_url', '', 'general', '사이트 로고 이미지 URL (빈값=텍스트 로고 fallback)');

-- ═══ K. SEO / Analytics ═══
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
  ('meta_description', 'IT제품 보안성 평가·인증의 원스톱 서비스, 한국정보보안기술원', 'seo', 'SEO 메타 설명'),
  ('meta_keywords', '정보보안, CC평가, 보안인증, KOIST, 한국정보보안기술원', 'seo', 'SEO 메타 키워드'),
  ('google_analytics_id', '', 'analytics', 'Google Analytics ID'),
  ('google_conversion_id', '', 'analytics', 'Google Conversion ID'),
  ('naver_verification', '', 'seo', '네이버 사이트 인증 코드');
