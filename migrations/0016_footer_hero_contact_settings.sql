-- v29.0 — Hero contact card + Footer unified design + Services compact settings
-- Admin-editable settings for the new UI components

-- Hero Contact Card label
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
  ('hero_contact_label', '국가 시험·인증 전문기관 정보보안 기술을 완성', 'content', '히어로 연락처 카드 상단 라벨');

-- Services section compact mode (icon scale)
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
  ('services_icon_scale', '0.65', 'theme', '사업분야 아이콘 크기 배율 (0.3~2.0)');

-- Update default services font/gap scale to compact values (if still at old large defaults)
UPDATE site_settings SET value = '1' WHERE key = 'services_tag_font_scale' AND value = '2';
UPDATE site_settings SET value = '0.35' WHERE key = 'services_tag_gap_scale' AND value = '0.7';
