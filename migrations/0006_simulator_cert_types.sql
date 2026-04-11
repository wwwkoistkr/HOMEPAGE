-- Migration 0006: AI 인증 소요시간 시뮬레이터 데이터 테이블
-- 인증 유형별 전통 방식 vs KOIST 방식의 기간 데이터를 관리

CREATE TABLE IF NOT EXISTS sim_cert_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,                    -- 인증 유형명 (예: CC평가 (EAL2))
    slug TEXT UNIQUE NOT NULL,             -- URL 슬러그 (예: cc-eal2)
    icon TEXT DEFAULT 'fa-shield-halved',  -- FontAwesome 아이콘
    color TEXT DEFAULT '#3B82F6',          -- 대표 색상
    -- 전통(CCRA) 방식: 사전준비도 0%일 때 최대 기간(주)
    traditional_min_weeks INTEGER DEFAULT 12,  -- 사전준비 100%일 때 전통 기간(주)
    traditional_max_weeks INTEGER DEFAULT 28,  -- 사전준비 0%일 때 전통 기간(주)
    -- KOIST 방식: 사전준비도에 따른 기간(주)
    koist_min_weeks INTEGER DEFAULT 7,         -- 사전준비 100%일 때 KOIST 기간(주)
    koist_max_weeks INTEGER DEFAULT 20,        -- 사전준비 0%일 때 KOIST 기간(주)
    -- 표시 설정
    description TEXT,                      -- 간단한 설명
    sort_order INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 기본 인증 유형 데이터 삽입
INSERT OR IGNORE INTO sim_cert_types (id, name, slug, icon, color, traditional_min_weeks, traditional_max_weeks, koist_min_weeks, koist_max_weeks, description, sort_order) VALUES
(1, 'CC평가 (EAL2)', 'cc-eal2', 'fa-shield-halved', '#3B82F6', 20, 36, 10, 22, 'IT 보안제품 국제표준 CC 인증 (보증등급 EAL2)', 1),
(2, 'CC평가 (EAL3)', 'cc-eal3', 'fa-shield-halved', '#6366F1', 28, 48, 14, 30, 'IT 보안제품 국제표준 CC 인증 (보증등급 EAL3)', 2),
(3, 'CC평가 (EAL4)', 'cc-eal4', 'fa-shield-halved', '#8B5CF6', 36, 64, 18, 40, 'IT 보안제품 국제표준 CC 인증 (보증등급 EAL4)', 3),
(4, 'KCMVP', 'kcmvp', 'fa-lock', '#EC4899', 14, 28, 8, 16, '암호모듈 검증시험 (KCMVP)', 4),
(5, '보안기능확인서', 'security-cert', 'fa-file-shield', '#10B981', 8, 16, 4, 10, '보안기능 확인서 발급 시험', 5),
(6, '성능평가', 'performance', 'fa-gauge-high', '#F59E0B', 8, 20, 4, 12, '정보보호제품 성능 평가', 6);

CREATE INDEX IF NOT EXISTS idx_sim_cert_types_slug ON sim_cert_types(slug);
CREATE INDEX IF NOT EXISTS idx_sim_cert_types_active ON sim_cert_types(is_active, sort_order);
