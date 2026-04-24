-- v39.11 롤백: 팝업 배경/높이를 v39.9 상태로 복원
-- 사용자 요청: "롤백해 줘"
-- 0038 마이그레이션 역방향 적용

-- 팝업2 (id=2, KCMVP) — 흰 배경 + 고정 높이 14.5cm 복원
UPDATE popups SET
  bg_color = '#ffffff',
  card_height_cm = 14.5
WHERE id = 2;

-- 팝업3 (id=1, CC평가) — 흰 배경 복원 (card_height_cm=6 유지)
UPDATE popups SET
  bg_color = '#ffffff',
  card_height_cm = 6
WHERE id = 1;
