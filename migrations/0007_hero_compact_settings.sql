-- Migration: Add hero compact 2-line settings and services tag layout settings
-- v22.0 - Compact Hero + Enlarged Tags

-- Hero line 1 (compact first line)
INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('hero_line1', '정보보안 시험·인증 전문기관', 'content', '히어로 첫번째 줄 (컴팩트 2줄 버전)');

-- Hero line 2 (compact second line with gradient text)
INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('hero_line2', 'IT제품 보안성 평가·인증의 원스톱 서비스, <span class="hero-gradient-text">한국정보보안기술원</span>', 'content', '히어로 두번째 줄 (컴팩트 2줄 버전, HTML 허용)');

-- Services tag font size multiplier (default 2x = "2")
INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('services_tag_font_scale', '2', 'content', '사업분야 태그 글자 크기 배율 (기본 2배)');

-- Services tag gap scale (default 0.7 = 30% reduced)
INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('services_tag_gap_scale', '0.7', 'content', '사업분야 태그 간격 비율 (기본 0.7 = 30% 축소)');

-- Services grid columns for different breakpoints
INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('services_grid_cols', '5', 'content', '사업분야 그리드 열 수 (데스크탑, 기본 5)');
