-- v39.13: 팝업2(KCMVP) card_height_cm = 12, 팝업3(CC평가) card_height_cm = 6 설정
-- 사용자 요청:
--   팝업2(id=2, KCMVP):   bg_color=#ffffff, card_height_cm=12
--   팝업3(id=1, CC평가):  bg_color=#ffffff, card_height_cm=6
-- 배경색은 v39.11/v39.12의 #ffffff 상태 그대로 유지

-- 팝업2 (KCMVP): NULL → 12cm (고정 높이, 이미지 + 여백 포함)
UPDATE popups
SET card_height_cm = 12,
    bg_color = '#ffffff',
    updated_at = CURRENT_TIMESTAMP
WHERE id = 2;

-- 팝업3 (CC평가): NULL → 6cm (짧은 공지용)
UPDATE popups
SET card_height_cm = 6,
    bg_color = '#ffffff',
    updated_at = CURRENT_TIMESTAMP
WHERE id = 1;
