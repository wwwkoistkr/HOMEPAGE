-- Migration 0027: Update hero_line2 to remove '한국정보보안기술원'
-- v38.2 - Hero H1 title simplified to 'IT제품 보안성 평가·인증의 원스톱 서비스'

UPDATE site_settings
SET value = 'IT제품 보안성 평가·인증의 원스톱 서비스',
    updated_at = CURRENT_TIMESTAMP
WHERE key = 'hero_line2';
