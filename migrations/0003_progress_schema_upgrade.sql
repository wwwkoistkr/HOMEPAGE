-- ══════════════════════════════════════════════════════
-- 평가현황 테이블 스키마 확장 (v5.1)
-- 기존 koist.kr 사이트의 CC평가 현황 구조와 동일하게 확장
-- 컬럼 추가: assurance_level(보증등급), cert_type(인증구분), eval_type(신청구분)
-- ══════════════════════════════════════════════════════

-- 새 컬럼 추가 (SQLite는 ALTER TABLE ADD COLUMN만 지원)
ALTER TABLE progress_items ADD COLUMN assurance_level TEXT DEFAULT '';
ALTER TABLE progress_items ADD COLUMN cert_type TEXT DEFAULT '최초평가';
ALTER TABLE progress_items ADD COLUMN eval_type TEXT DEFAULT '국내평가';

-- 검색 인덱스 추가
CREATE INDEX IF NOT EXISTS idx_progress_status ON progress_items(status);
CREATE INDEX IF NOT EXISTS idx_progress_product ON progress_items(product_name);
