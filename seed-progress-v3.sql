-- ══════════════════════════════════════════════════════
-- KOIST 평가현황 시드 데이터 v3.0
-- 원본 koist.kr 사이트에서 직접 추출한 실제 데이터
-- 
-- 원본 사이트 구조 분석 (2026-04-11):
--   CC평가        → /cc_progress       (10페이지, 142건) 컬럼: 제품명, 보증등급, 인증구분, 신청구분, 진행상태
--   보안기능시험   → /test1_progress    (5페이지, 69건)  컬럼: 제품명, 제품유형, 발급유형, 신청구분, 진행상태
--   암호모듈검증   → /test3_progress    (1건+)           컬럼: 암호모듈, 개발사, 모듈형태, 보안수준, 진행현황
--   성능평가       → /test2_progress    (6건)            컬럼: 제품유형, 제품명, 운영체제, 개발사, 발급일
--
-- DB 매핑:
--   product_name   = 제품명
--   assurance_level = 보증등급 / 제품유형 / 보안수준 / 제품유형  (카테고리별 의미 상이)
--   cert_type       = 인증구분 / 발급유형 / 모듈형태 / 운영체제
--   eval_type       = 신청구분 / 신청구분 / 알고리즘  / 개발사
--   status          = 진행상태 (평가진행, 평가완료, 평가접수, 발급완료, 시험접수 등)
--   company         = 개발사 (CC평가에서는 원본에 없으므로 빈값)
-- ══════════════════════════════════════════════════════

-- 기존 데이터 초기화
DELETE FROM progress_items;

-- ═══════════════════════════════════════════
-- 1. CC평가 (142건 - 원본 koist.kr/cc_progress 전체)
-- 컬럼: 제품명 | 보증등급 | 인증구분 | 신청구분 | 진행상태
-- ═══════════════════════════════════════════

-- Page 1 (15건)
INSERT INTO progress_items (category, product_name, company, status, assurance_level, cert_type, eval_type, sort_order) VALUES
('CC평가', 'NetSpliter V4.0', '', '평가진행', 'EAL2', '최초평가', '국내평가', 1),
('CC평가', 'Chakra Max SAC v4.5', '', '평가완료', 'EAL3', '최초평가', '국내평가', 2),
('CC평가', 'TESS TMS Plus V1.0', '', '평가완료', 'EAL4', '최초평가', '국내평가', 3),
('CC평가', 'Alpha DBGuard V2.1', '', '평가완료', 'EAL1+', '최초평가', '국제평가', 4),
('CC평가', 'Chakra Max v4.5', '', '평가완료', 'EAL4', '최초평가', '국내평가', 5),
('CC평가', 'TESS AIRTMS V5.0', '', '평가완료', 'EAL4', '최초평가', '국내평가', 6),
('CC평가', 'TA-PRS(Top Aegis Patch and Remediation System) V6.1', '', '평가완료', 'EAL2', '최초평가', '국내평가', 7),
('CC평가', 'AxioVPN V2.0', '', '평가완료', 'EAL4', '최초평가', '국내평가', 8),
('CC평가', 'LANKeeper V4.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 9),
('CC평가', 'DBSAFER AM V7.0', '', '평가완료', 'EAL3', '최초평가', '국내평가', 10),
('CC평가', 'ACRA Point V3', '', '평가완료', 'EAL2', '최초평가', '국내평가', 11),
('CC평가', 'SpamSniper V6.2', '', '평가완료', 'EAL2', '최초평가', '국내평가', 12),
('CC평가', 'DBSAFER Enterprise V5.0 R2', '', '평가완료', 'EAL4', '최초평가', '국내평가', 13),
('CC평가', 'DBSAFER AM V5.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 14),
('CC평가', 'WeGuardia™ ITM V1.0', '', '평가완료', 'EAL4', '최초평가', '국내평가', 15);

-- Page 2 (15건)
INSERT INTO progress_items (category, product_name, company, status, assurance_level, cert_type, eval_type, sort_order) VALUES
('CC평가', 'PRIBIT Connect 2.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 16),
('CC평가', 'ReceiveGUARD V1.1', '', '평가완료', 'EAL2', '최초평가', '국내평가', 17),
('CC평가', 'Smart NAC V5.1.5', '', '평가완료', 'EAL2', '최초평가', '국내평가', 18),
('CC평가', 'eWalker WAF V10', '', '평가완료', 'EAL4', '최초평가', '국내평가', 19),
('CC평가', 'Zenius SIEM V2.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 20),
('CC평가', 'TESS AIRTMS V4.0', '', '평가완료', 'EAL4', '최초평가', '국내평가', 21),
('CC평가', 'TESS TAS V7.5', '', '평가완료', 'EAL4', '최초평가', '국내평가', 22),
('CC평가', 'SKbroadhand SODA NGF v3.0', '', '평가완료', 'EAL4', '최초평가', '국내평가', 23),
('CC평가', 'SECUI MF2 V4.7', '', '평가완료', 'EAL4', '최초평가', '국내평가', 24),
('CC평가', 'DB-i V6.1', '', '평가완료', 'EAL4', '최초평가', '국내평가', 25),
('CC평가', 'SNIPER TMS-Plus V4.1', '', '평가완료', 'EAL4', '최초평가', '국내평가', 26),
('CC평가', 'SPiDER ExD V1.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 27),
('CC평가', 'SNIPER NGFW V2.1', '', '평가완료', 'EAL4', '최초평가', '국내평가', 28),
('CC평가', 'Chakra Max v4.0', '', '평가완료', 'EAL4', '최초평가', '국내평가', 29),
('CC평가', 'Top Aegis Patch and Remediation System V5.1', '', '평가완료', 'EAL2', '최초평가', '국내평가', 30);

-- Page 3 (15건)
INSERT INTO progress_items (category, product_name, company, status, assurance_level, cert_type, eval_type, sort_order) VALUES
('CC평가', 'Privacy-i V7.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 31),
('CC평가', 'SECUI MA V1.6', '', '평가완료', 'EAL3', '최초평가', '국내평가', 32),
('CC평가', 'ASM 5.0', '', '평가완료', 'EAL3', '최초평가', '국내평가', 33),
('CC평가', 'NetSpliter V3.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 34),
('CC평가', 'SNIPER APTX-T V5.1', '', '평가완료', 'EAL4', '최초평가', '국내평가', 35),
('CC평가', 'ssBridge V5.0', '', '평가완료', 'EAL4', '최초평가', '국내평가', 36),
('CC평가', 'SERVERFILTER V2.1', '', '평가완료', 'EAL2', '최초평가', '국내평가', 37),
('CC평가', 'OfficeKeeper V4.1', '', '평가완료', 'EAL2', '최초평가', '국내평가', 38),
('CC평가', 'TESS CTMX V2.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 39),
('CC평가', 'DBSAFER OS V7.0 for AIX 7.2', '', '평가완료', 'EAL2', '최초평가', '국내평가', 40),
('CC평가', 'DBSAFER Enterprise V7.0', '', '평가완료', 'EAL4', '최초평가', '국내평가', 41),
('CC평가', 'DBSAFER OS V7.0 for Windows Server 2019', '', '평가완료', 'EAL2', '최초평가', '국내평가', 42),
('CC평가', 'NexG ESM V1.2', '', '평가완료', 'EAL4', '최초평가', '국내평가', 43),
('CC평가', 'LOG CATCH V2.0', '', '평가완료', 'EAL3', '최초평가', '국내평가', 44),
('CC평가', 'TESS TAS V7.0', '', '평가완료', 'EAL4', '최초평가', '국내평가', 45);

-- Page 4 (15건)
INSERT INTO progress_items (category, product_name, company, status, assurance_level, cert_type, eval_type, sort_order) VALUES
('CC평가', 'DBSAFER OS V7.0 for RHEL 7', '', '평가완료', 'EAL2', '최초평가', '국내평가', 46),
('CC평가', 'BLUEMAX LMS V1.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 47),
('CC평가', 'CODEMIND v3.6', '', '평가완료', 'EAL2', '최초평가', '국내평가', 48),
('CC평가', 'SG-6000 FW V5.5', '', '평가접수', 'EAL2', '최초평가', '국내평가', 49),
('CC평가', 'PCFILTER V3.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 50),
('CC평가', '알약 패치관리(PMS) 2.0', '', '평가완료', 'EAL3', '최초평가', '국내평가', 51),
('CC평가', 'DB-i V6.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 52),
('CC평가', 'WatchLog V12.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 53),
('CC평가', 'AhnLab V3 Net for Windows Server 9.0 SP1', '', '평가완료', 'EAL3', '최초평가', '국내평가', 54),
('CC평가', 'AhnLab EPP Patch Management 5.0', '', '평가완료', 'EAL3', '최초평가', '국내평가', 55),
('CC평가', 'SecuwaySSL U V2.0', '', '평가완료', 'EAL4', '최초평가', '국내평가', 56),
('CC평가', 'SNIPER ONE-i V3.1', '', '평가완료', 'EAL4', '최초평가', '국내평가', 57),
('CC평가', 'IEUM V1.0', '', '평가완료', 'EAL3', '최초평가', '국내평가', 58),
('CC평가', 'Smart NAC V5.5', '', '평가완료', 'EAL2', '최초평가', '국내평가', 59),
('CC평가', 'Hancom xDB V2.8', '', '평가완료', 'EAL 1+', '최초평가', '국제평가', 60);

-- Page 5 (15건)
INSERT INTO progress_items (category, product_name, company, status, assurance_level, cert_type, eval_type, sort_order) VALUES
('CC평가', 'TESS TAS V6.0', '', '평가완료', 'EAL4', '최초평가', '국내평가', 61),
('CC평가', 'NEPYX NetworkBridge Suite V4', '', '평가완료', 'EAL4', '최초평가', '국내평가', 62),
('CC평가', 'Cloud X V1.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 63),
('CC평가', 'KT Wizbox v1.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 64),
('CC평가', 'SNIPER TMS-Plus V4.0', '', '평가완료', 'EAL4', '최초평가', '국내평가', 65),
('CC평가', 'GuardCom V1.1', '', '평가완료', 'EAL2', '재평가', '국내평가', 66),
('CC평가', 'Blue X-ray DLP V2.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 67),
('CC평가', 'VForce V4.6 R1', '', '평가완료', 'EAL4', '재평가', '국내평가', 68),
('CC평가', 'SABER-VS V1.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 69),
('CC평가', 'SecureGuard VPN V2.0', '', '평가완료', 'EAL4', '최초평가', '국내평가', 70),
('CC평가', 'INFOSAFER V1.1', '', '평가완료', 'EAL3', '최초평가', '국내평가', 71),
('CC평가', 'SecureGuard AM V8.0', '', '평가완료', 'EAL3', '최초평가', '국내평가', 72),
('CC평가', 'SNIPER TMS-Plus V2.1', '', '평가완료', 'EAL4', '최초평가', '국내평가', 73),
('CC평가', 'OfficeGuard V4.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 74),
('CC평가', 'TESS TMS V6.0', '', '평가완료', 'EAL4', '최초평가', '국내평가', 75);

-- Page 6 (15건)
INSERT INTO progress_items (category, product_name, company, status, assurance_level, cert_type, eval_type, sort_order) VALUES
('CC평가', 'SNIPER NGFW V2.0', '', '평가완료', 'EAL4', '최초평가', '국내평가', 76),
('CC평가', 'SafePC Enterprise V5.1', '', '평가완료', 'EAL2', '최초평가', '국내평가', 77),
('CC평가', 'BigEye V1.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 78),
('CC평가', 'UTMP V3.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 79),
('CC평가', 'ReceiveGUARD V1.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 80),
('CC평가', 'SpamSniper V5.3.1', '', '평가완료', 'EAL2', '최초평가', '국내평가', 81),
('CC평가', 'LOG-MON V1.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 82),
('CC평가', 'SECUI SCAN V3.1', '', '평가완료', 'EAL2', '재평가', '국내평가', 83),
('CC평가', 'BitSentry V1.0', '', '평가완료', 'EAL3', '최초평가', '국내평가', 84),
('CC평가', 'ssBridge v4.1', '', '평가완료', 'EAL4', '최초평가', '국내평가', 85),
('CC평가', 'Chakra Max V3.0', '', '평가완료', 'EAL4', '최초평가', '국내평가', 86),
('CC평가', 'ASM 4.0', '', '평가완료', 'EAL3', '최초평가', '국내평가', 87),
('CC평가', 'SafePC Enterprise V4.1', '', '평가완료', 'EAL2', '최초평가', '국내평가', 88),
('CC평가', 'SPiDER TM V5.0 for AIX', '', '평가완료', 'EAL2', '재평가', '국내평가', 89),
('CC평가', 'SNIPER TMS-Plus V3.0', '', '평가완료', 'EAL4', '최초평가', '국내평가', 90);

-- Page 7 (15건)
INSERT INTO progress_items (category, product_name, company, status, assurance_level, cert_type, eval_type, sort_order) VALUES
('CC평가', 'NetSpliter V2.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 91),
('CC평가', 'NexG ESM V1.1', '', '평가완료', 'EAL4', '최초평가', '국내평가', 92),
('CC평가', '알약 4.0 서버', '', '평가완료', 'EAL3', '최초평가', '국내평가', 93),
('CC평가', '알약 4.0', '', '평가완료', 'EAL3', '최초평가', '국내평가', 94),
('CC평가', 'Server-i V3.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 95),
('CC평가', 'WebKeeper V10.1', '', '평가완료', 'EAL3', '최초평가', '국내평가', 96),
('CC평가', 'ACRA Point V2.4', '', '평가완료', 'EAL3', '최초평가', '국내평가', 97),
('CC평가', 'SecuwaySSL U V1.0', '', '평가완료', 'EAL4', '최초평가', '국내평가', 98),
('CC평가', 'Privacy-i V6.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 99),
('CC평가', 'SPAMOUT V8.2', '', '평가완료', 'EAL2', '최초평가', '국내평가', 100),
('CC평가', 'SNIPER ONE-d V3.0', '', '평가완료', 'EAL4', '최초평가', '국내평가', 101),
('CC평가', 'netcruz Security Information Event Management nSIEM V1.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 102),
('CC평가', '알약3.5 and ALYac Security Manager 3.5', '', '평가완료', 'EAL3', '최초평가', '국내평가', 103),
('CC평가', 'SNIPER ONE-i V3.0', '', '평가완료', 'EAL4', '최초평가', '국내평가', 104),
('CC평가', 'eNMS V1.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 105);

-- Page 8 (15건)
INSERT INTO progress_items (category, product_name, company, status, assurance_level, cert_type, eval_type, sort_order) VALUES
('CC평가', 'ssbridge V3.5', '', '평가완료', 'EAL2', '최초평가', '국내평가', 106),
('CC평가', 'WeGuardia™ T-Mover V2.0', '', '평가완료', 'EAL3', '최초평가', '국내평가', 107),
('CC평가', 'AhnLab TSM V2.2', '', '평가완료', 'EAL4', '재평가', '국내평가', 108),
('CC평가', 'NexG FW V1.2', '', '평가완료', 'EAL4', '최초평가', '국내평가', 109),
('CC평가', '알약 3.5 Server', '', '평가완료', 'EAL3', '최초평가', '국내평가', 110),
('CC평가', 'NEPYX FileBridge 3.0.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 111),
('CC평가', 'SECUI MF2 V4.3', '', '평가완료', 'EAL4', '최초평가', '국내평가', 112),
('CC평가', 'SEEKurity SIEM V1.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 113),
('CC평가', 'nTreeV V1.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 114),
('CC평가', 'Z-BLOCK V3.0.0', '', '평가완료', 'EAL3', '최초평가', '국내평가', 115),
('CC평가', 'SNIPER APTX-T V4.0', '', '평가완료', 'EAL3', '최초평가', '국내평가', 116),
('CC평가', 'APPLICATION INSIGHT SWG V2.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 117),
('CC평가', 'AhnLab TSM V2.1', '', '평가완료', 'EAL4', '최초평가', '국내평가', 118),
('CC평가', 'SPiDER TM V5.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 119),
('CC평가', 'nProtect Enterprise V3.5', '', '평가완료', 'EAL2', '최초평가', '국내평가', 120);

-- Page 9 (15건)
INSERT INTO progress_items (category, product_name, company, status, assurance_level, cert_type, eval_type, sort_order) VALUES
('CC평가', 'Mail-i V8.0 HyBoost', '', '평가완료', 'EAL2', '최초평가', '국내평가', 121),
('CC평가', 'GuardCom V1.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 122),
('CC평가', 'NexG ESM V1.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 123),
('CC평가', 'Server-i V2.0 Hyboost', '', '평가완료', 'EAL2', '최초평가', '국내평가', 124),
('CC평가', 'DB-i V3.3 HyBoost', '', '평가완료', 'EAL4', '최초평가', '국내평가', 125),
('CC평가', 'ComVoy 2.2', '', '평가완료', 'EAL2', '최초평가', '국내평가', 126),
('CC평가', 'VForce V4.6 R0', '', '평가완료', 'EAL4', '최초평가', '국내평가', 127),
('CC평가', 'nProtect Anti-Virus/Spyware V4.0', '', '평가완료', 'EAL3', '최초평가', '국내평가', 128),
('CC평가', 'EDGENAC V1.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 129),
('CC평가', 'SpamSniper V5.1.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 130),
('CC평가', 'SECUI SCAN V3.0', '', '평가완료', 'EAL2', '재평가', '국내평가', 131),
('CC평가', 'SECUI MF2 V4.0', '', '평가완료', 'EAL4', '재평가', '국내평가', 132),
('CC평가', 'FireGUARD™ Switch V1.0', '', '평가완료', 'EAL3', '최초평가', '국내평가', 133),
('CC평가', 'VIPER-S V2.0', '', '평가완료', 'EAL3', '최초평가', '국내평가', 134),
('CC평가', 'NoAD V3.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 135);

-- Page 10 (7건)
INSERT INTO progress_items (category, product_name, company, status, assurance_level, cert_type, eval_type, sort_order) VALUES
('CC평가', 'netcruz Log Manager LogSee V3.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 136),
('CC평가', 'NetSpliter V1.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 137),
('CC평가', 'DB-i V3.2', '', '평가완료', 'EAL4', '최초평가', '국내평가', 138),
('CC평가', 'Privacy-i V5.0 HyBoost', '', '평가완료', 'EAL2', '최초평가', '국내평가', 139),
('CC평가', 'AhnLab TSM V2.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 140),
('CC평가', 'Vforce V4.6', '', '평가완료', 'EAL4', '최초평가', '국내평가', 141),
('CC평가', 'SECUI MFD V1.0', '', '평가완료', 'EAL4', '최초평가', '국내평가', 142);


-- ═══════════════════════════════════════════
-- 2. 보안기능시험 (69건 - 원본 koist.kr/test1_progress 전체)
-- 컬럼: 제품명 | 제품유형 | 발급유형 | 신청구분 | 진행상태
-- assurance_level → 제품유형, cert_type → 발급유형, eval_type → 신청구분
-- ═══════════════════════════════════════════

-- Page 1 (15건)
INSERT INTO progress_items (category, product_name, company, status, assurance_level, cert_type, eval_type, sort_order) VALUES
('보안기능시험', 'SubGATE V5.2 N', '', '시험접수', '네트워크장비', '기본시험', '최초신청', 1),
('보안기능시험', 'OS6870 Series_8.10.112.R02', '', '발급완료', '네트워크장비', '기본시험', '최초신청', 2),
('보안기능시험', 'OS6560/6560E Series_8.10.105.R02', '', '발급완료', '네트워크장비', '기본시험', '최초신청', 3),
('보안기능시험', 'OS9900 Series_8.10.106.R02', '', '발급완료', '네트워크장비', '기본시험', '최초신청', 4),
('보안기능시험', 'OS6900 Series_8.10.105.R02', '', '발급완료', '네트워크장비', '기본시험', '최초신청', 5),
('보안기능시험', 'SecureDesk v3.5', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 6),
('보안기능시험', 'Privacy-i V8.0', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 7),
('보안기능시험', 'TA-FDM V2.2', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 8),
('보안기능시험', '지오티_보안스위치_시리즈_V7.0.3', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 9),
('보안기능시험', 'ETK-5000 Series (v2.dev-250928.23.2257)', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 10),
('보안기능시험', 'NUC92B_Series_V100R006B07D002-r111', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 11),
('보안기능시험', 'UBI SAFER-PSM V3.0', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 12),
('보안기능시험', 'Red Hat OpenShift Virtualization Engine 4', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 13),
('보안기능시험', 'Logsaver v4.0', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 14),
('보안기능시험', 'NUC90A_Series_V1.6.7.3-r112', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 15);

-- Page 2 (15건)
INSERT INTO progress_items (category, product_name, company, status, assurance_level, cert_type, eval_type, sort_order) VALUES
('보안기능시험', 'RUCKUS ICX 7850 Series Switch 10.0.10g_cd2_kcc', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 16),
('보안기능시험', 'ARAD2000-48T (ANOS 2.1.6.2)', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 17),
('보안기능시험', 'ARA1000-48T (ANOS 2.1.6.2)', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 18),
('보안기능시험', 'RUCKUS ICX 8200 Series Switch 10.0.10g_cd2_kcc', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 19),
('보안기능시험', 'CloudiA / SynergiA v1.0', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 20),
('보안기능시험', 'SCP nuri stack Ver 1.0', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 21),
('보안기능시험', 'RUCKUS ICX 7550 Series Switch 10.0.10g_cd1_kcc', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 22),
('보안기능시험', 'VES-MG24B V1.0', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 23),
('보안기능시험', 'FALCON AUTOMATION PLATFORM v2.16', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 24),
('보안기능시험', 'SHIELDGate V2.0', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 25),
('보안기능시험', '실시간 암호화 보안제품 V1.1', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 26),
('보안기능시험', 'SR Linux 24.10.1 for 7000 Series', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 27),
('보안기능시험', 'TA-STR V2.1', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 28),
('보안기능시험', 'OS6870 Series_8.10.112.R02 (2)', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 29),
('보안기능시험', 'PacketGo ZTNA 3.0', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 30);

-- Page 3 (15건)
INSERT INTO progress_items (category, product_name, company, status, assurance_level, cert_type, eval_type, sort_order) VALUES
('보안기능시험', 'F5 BIG-IP r5000 & r10000 제품군', '', '발급완료', '네트워크장비', '간소화 발급', '변경·재승인', 31),
('보안기능시험', 'TgateSDP V2.0', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 32),
('보안기능시험', 'zenIE V2.0', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 33),
('보안기능시험', 'ETK-4000B Series (v2.dev-241211.25.1980)', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 34),
('보안기능시험', 'SaferZone USB V10', '', '발급완료', '정보보호시스템', '간소화 발급', '변경·재승인', 35),
('보안기능시험', 'OS9900 Series_8.10.106.R02 (2)', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 36),
('보안기능시험', 'Summit_arm-33.1.100.133 for Edge Series', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 37),
('보안기능시험', 'onie-33.1.100.133 for Core Series', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 38),
('보안기능시험', 'XGS2220 시리즈 ZyNOS V4.90 20240916-KR', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 39),
('보안기능시험', 'OS6570M Series_8.10.102.R01', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 40),
('보안기능시험', 'Privacy-i V7.0', '', '발급완료', '정보보호시스템', '간소화 발급', '변경·재승인', 41),
('보안기능시험', 'UQ-KDS-100-A01', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 42),
('보안기능시험', '이노스마트플랫폼 v11 랜섬웨어탐지/차단보안솔루션', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 43),
('보안기능시험', 'ATTO ACCESS v2.0', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 44),
('보안기능시험', 'NetMarshal EPL1000 v1.0', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 45);

-- Page 4 (15건)
INSERT INTO progress_items (category, product_name, company, status, assurance_level, cert_type, eval_type, sort_order) VALUES
('보안기능시험', 'INFOSAFER V5.0', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 46),
('보안기능시험', 'NHM-2408 Series for 3.14.1.1-S', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 47),
('보안기능시험', 'Alteon U22 series (standalone) - 34.0.4.0', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 48),
('보안기능시험', 'ETK-5000B Series (v2.dev-240422.23.1696)', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 49),
('보안기능시험', 'TnD-MIBS v2.0', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 50),
('보안기능시험', 'Q Care Connect-N N1000 v1.0.0', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 51),
('보안기능시험', 'TiMOS-24.3.R1 for 7x50 Series', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 52),
('보안기능시험', 'OS9900 Series_8.9.91.R04', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 53),
('보안기능시험', 'U-PRIVACY SAFER V4.0', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 54),
('보안기능시험', 'Hancome xDB V2.8', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 55),
('보안기능시험', 'SecureGate CDS V1.0', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 56),
('보안기능시험', 'Alteon DPDK series (standalone) - 34.0.3.0', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 57),
('보안기능시험', 'CLOUD& v2.5', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 58),
('보안기능시험', 'VDeX for Virtualization V1.0', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 59),
('보안기능시험', 'OS6560 Series', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 60);

-- Page 5 (9건)
INSERT INTO progress_items (category, product_name, company, status, assurance_level, cert_type, eval_type, sort_order) VALUES
('보안기능시험', 'SafeCon V3.0', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 61),
('보안기능시험', 'F5 BIGIP r5000 & r10000 제품군', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 62),
('보안기능시험', 'F5 BIGIP r2000 & r4000 제품군', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 63),
('보안기능시험', 'nNetTrust V2.0', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 64),
('보안기능시험', 'OS9900 Series', '', '발급완료', '네트워크장비', '간소화 발급', '최초신청', 65),
('보안기능시험', 'ssBridge V5.0', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 66),
('보안기능시험', 'SafePC Enterprise V7.0', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 67),
('보안기능시험', 'TgateSDP V2.0 (2)', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 68),
('보안기능시험', 'IEUM V2.0', '', '발급완료', '정보보호시스템', '간소화 발급', '최초신청', 69);


-- ═══════════════════════════════════════════
-- 3. 암호모듈검증 (KCMVP) (원본 koist.kr/test3_progress)
-- 컬럼: 암호모듈 | 개발사 | 모듈형태 | 보안수준 | 진행현황
-- product_name → 암호모듈, company → 개발사
-- assurance_level → 보안수준, cert_type → 모듈형태, eval_type → (없음)
-- ═══════════════════════════════════════════
INSERT INTO progress_items (category, product_name, company, status, assurance_level, cert_type, eval_type, sort_order) VALUES
('암호모듈검증', 'AlphaCrypto V1.0', '(주)알파비트', '발급완료', '1', '소프트웨어', '', 1);


-- ═══════════════════════════════════════════
-- 4. 성능평가 (6건 - 원본 koist.kr/test2_progress)
-- 컬럼: 제품유형 | 제품명(모델명) | 운영체제 | 개발사 | 발급일
-- assurance_level → 제품유형, cert_type → 운영체제, eval_type → 개발사
-- ═══════════════════════════════════════════
INSERT INTO progress_items (category, product_name, company, status, assurance_level, cert_type, eval_type, start_date, sort_order) VALUES
('성능평가', 'Fortify Enterprise v3.1 (Linux)', '(주)하로스', '발급완료', '소스코드 보안약점 분석도구', '-', '(주)하로스', '2022-12-22', 1),
('성능평가', 'Fortify Enterprise v3.1 (Windows)', '(주)하로스', '발급완료', '소스코드 보안약점 분석도구', '-', '(주)하로스', '2022-12-22', 2),
('성능평가', 'AhnLab V3 Net for Linux Server 3.6 (Linux)', '(주)안랩', '발급완료', '안티바이러스제품(Linux)', '-', '(주)안랩', '2022-12-16', 3),
('성능평가', 'OnAV v1.0 (Andriod)', '(주)시큐리온', '발급완료', '안티바이러스 제품 (Mobile)', '-', '(주)시큐리온', '2022-12-12', 4),
('성능평가', 'SecuwaySSL U V2.0', '(주)시큐위즈', '발급완료', 'SSL VPN', 'U3000S', '(주)시큐위즈', '2021-05-26', 5),
('성능평가', 'ViRobot SDK 1.5 (Windows)', '(주)하우리', '발급완료', '모듈형 안티바이러스 제품', '-', '(주)하우리', '2021-08-25', 6);
