-- Migration: 팝업 카드 크기 cm 단위 컬럼 추가 (v35.5.4)
-- 팝업 #2 (id=2): 13cm × 14.5cm
-- 팝업 #3 (id=1): 13cm × 6cm

ALTER TABLE popups ADD COLUMN card_width_cm REAL DEFAULT NULL;
ALTER TABLE popups ADD COLUMN card_height_cm REAL DEFAULT NULL;

-- 팝업 #2 (KCMVP 인증서): 13cm × 14.5cm
UPDATE popups SET card_width_cm = 13, card_height_cm = 14.5 WHERE id = 2;

-- 팝업 #3 (CC평가 대기기간): 13cm × 6cm
UPDATE popups SET card_width_cm = 13, card_height_cm = 6 WHERE id = 1;
