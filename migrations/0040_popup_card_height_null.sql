-- v39.12: 팝업2(KCMVP) + 팝업3(CC평가) card_height_cm = NULL 설정
-- 목적: 이미지 원본 비율에 맞춰 카드 높이를 자동 조정 (닫기 버튼 밑 흰 여백 제거)
-- 배경색은 v39.11 롤백 상태(#ffffff) 그대로 유지
-- 사용자 요청:
--   팝업2(id=2, KCMVP): bg_color=#ffffff, card_height_cm=NULL
--   팝업3(id=1, CC평가): bg_color=#ffffff, card_height_cm=NULL

-- 팝업2 (KCMVP): 14.5cm → NULL (auto-fit)
UPDATE popups
SET card_height_cm = NULL,
    updated_at = CURRENT_TIMESTAMP
WHERE id = 2;

-- 팝업3 (CC평가): 6cm → NULL (auto-fit)
UPDATE popups
SET card_height_cm = NULL,
    updated_at = CURRENT_TIMESTAMP
WHERE id = 1;
