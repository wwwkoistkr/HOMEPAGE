-- v39.11: 팝업2/팝업3 배경색 → #0a1628 + 팝업2 auto-fit (롤백 재적용)
-- 사용자 요청 값:
--   팝업2(id=2, KCMVP):  bg_color=#0a1628, card_height_cm=NULL
--   팝업3(id=1, CC평가): bg_color=#0a1628, card_height_cm=6

-- 팝업2 (id=2, KCMVP 민간시험 기관 지정)
UPDATE popups SET
  bg_color = '#0a1628',
  card_height_cm = NULL
WHERE id = 2;

-- 팝업3 (id=1, CC평가 대기기간 안내) — card_height_cm=6 유지(명시)
UPDATE popups SET
  bg_color = '#0a1628',
  card_height_cm = 6
WHERE id = 1;
