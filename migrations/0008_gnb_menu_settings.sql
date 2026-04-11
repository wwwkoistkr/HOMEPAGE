-- Migration: GNB (Global Navigation Bar) admin-editable settings
-- v23.0 - 2x Font Size, 50% Gap Reduction, 8K Ultra-Sharp

-- GNB font scale (default 2x)
INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('gnb_font_scale', '1.4', 'content', 'GNB 사업분야 메뉴 글자 크기 배율 (기본 1.4배)');

-- GNB gap scale (default 0.5 = 50% of original)
INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('gnb_gap_scale', '0.5', 'content', 'GNB 사업분야 메뉴 간격 비율 (기본 0.5 = 50% 축소)');

-- GNB font weight (default 600)
INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('gnb_font_weight', '600', 'content', 'GNB 메뉴 글자 두께 (300~900)');

-- GNB text color (default rgba(220,228,240,0.92))
INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('gnb_text_color', 'rgba(220,228,240,0.92)', 'content', 'GNB 메뉴 글자 색상');

-- GNB hover text color (default #FFFFFF)
INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('gnb_hover_color', '#FFFFFF', 'content', 'GNB 메뉴 hover 글자 색상');
