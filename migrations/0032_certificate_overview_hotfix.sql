-- Migration 0032: Hotfix for certificate/overview orphan </div> tag
-- v39.6 크롤링 시 선두에 </div>가 유입되어 구조가 깨짐 → 제거
-- v39.7 시각 검증 시 발견된 유일한 데이터 이슈

UPDATE dep_pages
SET content = substr(content, length('</div>') + 1)
WHERE dept_id = (SELECT id FROM departments WHERE slug = 'certificate')
  AND slug = 'overview'
  AND substr(content, 1, 6) = '</div>';
