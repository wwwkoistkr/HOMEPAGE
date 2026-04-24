-- v39.10 롤백: 팝업 배경/높이를 v39.9 이전 값으로 복원
-- 사용자 요청: "다시 롤백해 줘"
-- 0036 마이그레이션 역방향 적용

-- 팝업2 (id=2, KCMVP 민간시험 기관 지정) — 흰 배경 + 고정 높이 14.5cm 복원
UPDATE popups SET
  bg_color = '#ffffff',
  card_height_cm = 14.5
WHERE id = 2;

-- 팝업3 (id=1, CC평가 대기기간 안내) — 흰 배경 복원
UPDATE popups SET
  bg_color = '#ffffff'
WHERE id = 1;
