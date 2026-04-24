-- v39.10: 팝업2/팝업3 배경색 → 팝업1과 동일(#0a1628) + 팝업2 하단 흰 여백 제거
-- 사용자 요청:
-- 1. 팝업2 "닫기" 버튼 밑 하얀부분 잘라서 없애기 → card_height_cm=NULL(auto fit)
-- 2. 팝업2, 팝업3 하얀바탕 → 팝업1 바탕색(#0a1628)으로 변경

-- 팝업2 (id=2, KCMVP 민간시험 기관 지정)
UPDATE popups SET
  bg_color = '#0a1628',
  card_height_cm = NULL
WHERE id = 2;

-- 팝업3 (id=1, CC평가 대기기간 안내)
UPDATE popups SET
  bg_color = '#0a1628'
WHERE id = 1;
