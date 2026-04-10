-- ══════════════════════════════════════════════════════
-- CC평가 현황 데이터 (기존 koist.kr에서 이전)
-- 총 142건 (10페이지 분량)
-- ══════════════════════════════════════════════════════

-- 기존 데이터 초기화
DELETE FROM progress_items;

-- Page 1 (최신)
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

-- Page 2
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

-- Page 3
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

-- Page 4
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
('CC평가', 'Hancom xDB V2.8', '', '평가완료', 'EAL1+', '최초평가', '국제평가', 60);

-- Page 5
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

-- Page 6
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

-- Page 7
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

-- Page 8
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

-- Page 9
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

-- Page 10
INSERT INTO progress_items (category, product_name, company, status, assurance_level, cert_type, eval_type, sort_order) VALUES
('CC평가', 'netcruz Log Manager LogSee V3.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 136),
('CC평가', 'NetSpliter V1.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 137),
('CC평가', 'DB-i V3.2', '', '평가완료', 'EAL4', '최초평가', '국내평가', 138),
('CC평가', 'Privacy-i V5.0 HyBoost', '', '평가완료', 'EAL2', '최초평가', '국내평가', 139),
('CC평가', 'AhnLab TSM V2.0', '', '평가완료', 'EAL2', '최초평가', '국내평가', 140),
('CC평가', 'Vforce V4.6', '', '평가완료', 'EAL4', '최초평가', '국내평가', 141),
('CC평가', 'SECUI MFD V1.0', '', '평가완료', 'EAL4', '최초평가', '국내평가', 142);
