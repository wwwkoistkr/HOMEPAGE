-- KOIST Seed Data
-- 초기 관리자 비밀번호는 코드에서 PBKDF2 해싱 후 삽입됨 (seed API 사용)

-- 사이트 설정
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
('site_name', '(주)한국정보보안기술원', 'general', '사이트명'),
('site_name_en', 'KOIST - Korean Information Security Technology', 'general', '영문 사이트명'),
('site_slogan', '최상의 시험·인증 서비스로 정보보안 기술을 완성', 'general', '사이트 슬로건'),
('site_sub_slogan', '정보보안 기술은 IT제품으로 구현되고 시험·인증 서비스를 통해 완성됩니다.', 'general', '서브 슬로건'),
('phone', '02-586-1230', 'contact', '대표 전화번호'),
('phone_display', '02-586-1230', 'contact', '화면 표시용 전화번호'),
('fax', '02-586-1238', 'contact', '팩스 번호'),
('email', 'koist@koist.kr', 'contact', '대표 이메일'),
('address', '서울특별시 서초구 효령로 336 윤일빌딩 4층 한국정보보안기술원', 'contact', '주소'),
('contact_person', '담당자', 'contact', '담당자명'),
('logo_url', '/static/images/logo.png', 'theme', '로고 이미지 경로'),
('main_bg_url', '', 'theme', '메인 배경 이미지'),
('primary_color', '#0F172A', 'theme', '주요 색상'),
('accent_color', '#3B82F6', 'theme', '강조 색상'),
('meta_description', 'CC평가,CC평가기관,평가인증,소프트웨어시험,보안적합성,정보보호준비도,성능평가 등 제공(02-586-1230)', 'seo', 'SEO 메타 설명'),
('meta_keywords', 'CC평가,CC평가기관,평가인증,소프트웨어시험,보안적합성,정보보호준비도,성능평가,KOIST,한국정보보안기술원', 'seo', 'SEO 키워드'),
('google_analytics_id', 'AW-11333861621', 'seo', 'Google Analytics ID'),
('google_conversion_id', 'AW-11333861621/5mtFCJ_K1uAYEPWBtJwq', 'seo', 'Google 전환 추적 ID'),
('naver_verification', '0049ce4d83d2123396c82ba450ba8e754bad26f3', 'seo', '네이버 사이트 인증 코드');

-- 팝업 (현재 사이트 기준 2개)
INSERT OR IGNORE INTO popups (id, title, content, popup_type, width, height, position_top, position_left, is_active, sort_order) VALUES
(1, 'CC평가 대기기간 안내', '<div style="text-align:center;padding:15px;"><h3 style="font-size:16px;font-weight:bold;margin-bottom:10px;">[CC평가 대기기간]</h3><p style="font-size:13px;margin-bottom:5px;">현 시점 기준 "평가신청접수증 발급(또는 계약)" 후 대기기간 : <span style="color:#EF4444;font-weight:bold;">0</span>개월</p><p style="font-size:12px;color:#666;margin-bottom:8px;">※ 국내용 / EAL2 기준, 대기기간은 평가진행 상황에 따라 변동될 수 있음</p><p style="color:#EF4444;font-weight:bold;font-size:14px;">신청 즉시 착수 가능</p></div>', 'html', 420, 200, 180, 30, 1, 1),
(2, 'KCMVP 민간시험 기관 지정', '<div style="text-align:center;padding:20px;"><h3 style="font-size:16px;font-weight:bold;margin-bottom:10px;">국가정보원 지정</h3><h2 style="font-size:18px;font-weight:bold;margin-bottom:15px;">암호모듈 검증시험(KCMVP) 민간시험 기관</h2><p style="font-size:14px;color:#3B82F6;font-weight:bold;">KOIST는 국가정보원으로부터 지정받은 암호모듈 검증시험 민간시험 기관입니다.</p></div>', 'html', 550, 400, 100, 480, 1, 2);

-- 사업분야
INSERT OR IGNORE INTO departments (id, name, slug, description, icon, color, sort_order, is_active) VALUES
(1, 'CC평가', 'cc', 'IT 보안제품의 보안성을 국제 표준인 CC(Common Criteria)에 따라 평가하는 서비스', 'fa-shield-halved', '#3B82F6', 1, 1),
(2, '보안기능 시험', 'security-test', '정보보호제품의 보안기능에 대한 시험 및 인증을 수행하는 서비스', 'fa-flask-vial', '#8B5CF6', 2, 1),
(3, '암호모듈 검증시험', 'kcmvp', '국가정보원 지정 암호모듈 검증시험(KCMVP) 민간시험 기관', 'fa-lock', '#EC4899', 3, 1),
(4, '성능평가', 'performance', '정보보호제품의 성능을 객관적으로 평가하는 서비스', 'fa-chart-line', '#F59E0B', 4, 1),
(5, '시험성적서', 'certificate', 'R&D 과제검증, AI 성능시험, NW 성능시험 등 시험성적서 발급', 'fa-file-lines', '#10B981', 5, 1),
(6, '정보보안진단', 'diagnosis', '정보보호준비도 평가, DDoS 모의훈련, 취약점 분석 등 종합 보안진단', 'fa-magnifying-glass-chart', '#EF4444', 6, 1),
(7, '컨설팅', 'consulting', 'CC컨설팅, 검증필 암호모듈 컨설팅, ISMS-P 보안 컨설팅', 'fa-handshake', '#6366F1', 7, 1),
(8, '산업(기업)보안 컨설팅', 'enterprise-security', '기업 맞춤형 종합 보안 컨설팅 서비스', 'fa-building-shield', '#0EA5E9', 8, 1),
(9, '정보보호준비도 평가', 'readiness', '정보보호 수준을 체계적으로 진단하고 개선 방향을 제시하는 평가 서비스', 'fa-clipboard-check', '#14B8A6', 9, 1),
(10, '모의평가', 'mock-test', '본 평가 전 사전 점검을 통해 성공적인 인증 획득을 지원하는 서비스', 'fa-vial-virus', '#F97316', 10, 1);

-- 사업분야 하위 페이지 (주요 사업분야만 예시)
INSERT OR IGNORE INTO dep_pages (dept_id, title, slug, content, sort_order) VALUES
-- CC평가
(1, '평가개요', 'overview', '<h2>CC평가 개요</h2><p>CC(Common Criteria) 인증평가는 IT 보안제품(시스템)의 보안기능과 이에 대한 보증수단이 사전에 정의된 보안기능요구사항과 보증요구사항을 만족하는지를 제3의 독립된 평가기관이 평가하여 그 결과를 인증기관이 인증하는 제도입니다.</p><p>KOIST는 과학기술정보통신부로부터 지정받은 CC평가기관으로서, 국내외 최고의 평가 전문인력과 최신 평가 환경을 갖추고 있습니다.</p>', 1),
(1, '신청방법', 'apply', '<h2>CC평가 신청 방법</h2><p>CC평가 신청은 전화 또는 이메일로 사전 상담 후 진행됩니다.</p><h3>신청 절차</h3><ol><li>사전 상담 (전화/이메일)</li><li>평가 신청서 접수</li><li>평가 계약 체결</li><li>평가 수행</li><li>인증서 발급</li></ol>', 2),
(1, '평가자문', 'consulting', '<h2>CC평가 자문</h2><p>CC평가를 처음 준비하시는 업체를 위한 전문 자문 서비스를 제공합니다.</p>', 3),
(1, '평가현황', 'progress', '<h2>CC평가 현황</h2><p>현재 진행 중인 CC평가 현황입니다. 상세한 내용은 평가현황 게시판을 참조해주세요.</p>', 4),
-- 보안기능 시험
(2, '시험개요', 'overview', '<h2>보안기능 시험 개요</h2><p>정보보호제품의 보안기능에 대한 시험을 수행하여 보안적합성을 검증하는 서비스입니다.</p>', 1),
(2, '신청방법', 'apply', '<h2>보안기능 시험 신청</h2><p>보안기능 시험 신청 절차를 안내합니다.</p>', 2),
(2, '시험현황', 'progress', '<h2>보안기능 시험 현황</h2><p>현재 진행 중인 시험 현황입니다.</p>', 3),
-- 암호모듈 검증시험
(3, '시험개요', 'overview', '<h2>암호모듈 검증시험(KCMVP) 개요</h2><p>국가정보원 지정 암호모듈 검증시험 민간시험 기관으로서, 암호모듈의 안전성과 구현 적합성을 검증합니다.</p>', 1),
(3, '신청방법', 'apply', '<h2>KCMVP 시험 신청</h2><p>암호모듈 검증시험 신청 절차를 안내합니다.</p>', 2),
(3, '시험현황', 'progress', '<h2>KCMVP 시험 현황</h2><p>현재 진행 중인 암호모듈 검증시험 현황입니다.</p>', 3),
-- 성능평가
(4, '평가개요', 'overview', '<h2>성능평가 개요</h2><p>정보보호제품의 성능을 객관적이고 과학적인 방법으로 평가합니다.</p>', 1),
(4, '평가절차', 'procedure', '<h2>성능평가 절차</h2><p>성능평가 진행 절차를 안내합니다.</p>', 2),
(4, '평가현황', 'progress', '<h2>성능평가 현황</h2><p>현재 진행 중인 성능평가 현황입니다.</p>', 3),
-- 시험성적서
(5, '시험성적서 개요', 'overview', '<h2>시험성적서 발급</h2><p>R&D 과제검증, AI 성능시험, NW 성능시험 등 다양한 시험성적서를 발급합니다.</p>', 1),
(5, 'R&D 과제검증', 'rnd', '<h2>R&D 과제검증</h2><p>국가 R&D 과제의 연구개발 결과물에 대한 시험 및 검증 서비스를 제공합니다.</p>', 2),
(5, 'AI 성능시험', 'ai', '<h2>AI 성능시험</h2><p>인공지능(AI) 기반 보안 솔루션의 성능을 시험하고 평가합니다.</p>', 3),
(5, 'NW 성능시험', 'network', '<h2>NW 성능시험</h2><p>네트워크 보안 장비의 처리 성능을 객관적으로 시험합니다.</p>', 4),
-- 정보보안진단
(6, '준비도평가', 'readiness', '<h2>정보보호준비도 평가</h2><p>조직의 정보보호 수준을 체계적으로 진단하고 개선 방향을 제시합니다.</p>', 1),
(6, 'DDoS 모의훈련', 'ddos', '<h2>DDoS 모의훈련</h2><p>실제 DDoS 공격 시나리오를 기반으로 모의훈련을 실시합니다.</p>', 2),
(6, '보안성능', 'security-perf', '<h2>보안성능 평가</h2><p>보안 시스템의 성능을 종합적으로 평가합니다.</p>', 3),
(6, '취약점분석', 'vulnerability', '<h2>취약점 분석</h2><p>시스템 및 네트워크의 보안 취약점을 분석하고 대응방안을 제시합니다.</p>', 4),
(6, '보안약점진단', 'weakness', '<h2>보안약점 진단</h2><p>소프트웨어의 보안약점을 진단하고 개선방안을 제시합니다.</p>', 5),
-- 컨설팅
(7, 'CC컨설팅', 'cc', '<h2>CC컨설팅</h2><p>CC인증 획득을 위한 전문 컨설팅 서비스를 제공합니다.</p>', 1),
(7, '검증필 암호모듈 컨설팅', 'kcmvp', '<h2>검증필 암호모듈 컨설팅</h2><p>KCMVP 인증 획득을 위한 전문 컨설팅을 지원합니다.</p>', 2),
(7, 'ISMS-P 보안 컨설팅', 'isms-p', '<h2>ISMS-P 보안 컨설팅</h2><p>정보보호 및 개인정보보호 관리체계 인증(ISMS-P) 획득을 지원합니다.</p>', 3),
-- 산업(기업)보안 컨설팅
(8, '산업(기업)보안 컨설팅', 'info', '<h2>산업(기업)보안 컨설팅</h2><p>기업 환경에 최적화된 종합 보안 컨설팅 서비스를 제공합니다.</p>', 1),
-- 정보보호준비도 평가
(9, '정보보호준비도 평가', 'overview', '<h2>정보보호준비도 평가</h2><p>조직의 정보보호 수준을 체계적으로 진단하여 보안 강화 방향을 제시합니다.</p>', 1),
-- 모의평가
(10, '모의평가', 'overview', '<h2>모의평가</h2><p>본 평가 전 사전 점검을 통해 성공적인 인증 획득을 지원합니다.</p>', 1);

-- 공지사항 (샘플)
INSERT OR IGNORE INTO notices (id, title, content, is_pinned, views) VALUES
(1, 'KOIST 홈페이지가 새롭게 리뉴얼되었습니다', '<p>안녕하세요, 한국정보보안기술원(KOIST)입니다.</p><p>보다 나은 서비스 제공을 위해 홈페이지를 전면 리뉴얼하였습니다. 새로운 홈페이지에서 더욱 편리하게 정보를 확인하실 수 있습니다.</p><p>앞으로도 많은 이용 부탁드립니다.</p>', 1, 0),
(2, '암호모듈 검증시험(KCMVP) 민간시험 기관 지정', '<p>KOIST가 국가정보원으로부터 암호모듈 검증시험(KCMVP) 민간시험 기관으로 지정되었습니다.</p><p>이로써 KOIST는 CC평가, 보안기능시험에 이어 KCMVP까지 종합 시험 역량을 갖추게 되었습니다.</p>', 1, 0),
(3, 'CC평가 신청 즉시 착수 안내', '<p>현재 CC평가 대기기간이 0개월로, 신청 즉시 착수가 가능합니다.</p><p>CC평가를 준비하시는 업체는 언제든지 문의해 주시기 바랍니다.</p><p>전화: 02-586-1230 / 이메일: koist@koist.kr</p>', 0, 0);

-- 평가현황 (샘플)
INSERT OR IGNORE INTO progress_items (id, category, product_name, company, status, start_date, note) VALUES
(1, 'CC평가', '보안USB v2.0', '(주)보안테크', '진행중', '2026-01-15', 'EAL2 평가 진행'),
(2, 'CC평가', '방화벽 시스템 v3.1', '(주)네트워크보안', '완료', '2025-10-01', 'EAL4 인증 완료'),
(3, '보안기능시험', '암호화 솔루션 v1.5', '(주)크립토솔루션', '진행중', '2026-02-20', '시험 진행중'),
(4, 'KCMVP', '암호모듈 라이브러리', '(주)암호기술', '진행중', '2026-03-01', 'KCMVP 검증시험'),
(5, '성능평가', 'IPS 시스템 v4.0', '(주)침입방지', '완료', '2025-11-15', '성능평가 완료');

-- FAQ (샘플)
INSERT OR IGNORE INTO faqs (id, question, answer, category, sort_order) VALUES
(1, 'CC평가란 무엇인가요?', '<p>CC(Common Criteria) 인증평가는 IT 보안제품의 보안기능과 보증수단이 정의된 요구사항을 만족하는지 제3의 독립 평가기관이 평가하고, 인증기관이 인증하는 국제 표준(ISO/IEC 15408) 기반 제도입니다.</p>', 'general', 1),
(2, 'CC평가 비용은 얼마인가요?', '<p>CC평가 비용은 제품의 보안등급(EAL), 제품 유형, 평가 범위 등에 따라 달라집니다. 정확한 비용은 사전 상담을 통해 안내받으실 수 있습니다. 문의: 02-586-1230</p>', 'general', 2),
(3, 'CC평가 기간은 얼마나 걸리나요?', '<p>일반적으로 CC평가는 EAL2 기준 약 6~12개월이 소요됩니다. 제품의 준비 상태와 평가 등급에 따라 기간이 달라질 수 있습니다.</p>', 'general', 3),
(4, 'KCMVP 검증시험이란 무엇인가요?', '<p>KCMVP(Korea Cryptographic Module Validation Program)는 국가·공공기관 정보통신망에서 소통되는 자료 중 비밀로 분류되지 않은 중요 정보를 보호하기 위해 사용되는 암호모듈의 안전성과 구현 적합성을 검증하는 제도입니다.</p>', 'general', 4),
(5, '평가 신청은 어떻게 하나요?', '<p>전화(02-586-1230) 또는 이메일(koist@koist.kr)로 사전 상담을 받으신 후, 평가 신청서를 작성하여 제출하시면 됩니다.</p>', 'general', 5);
