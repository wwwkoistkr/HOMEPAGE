-- Migration 0015: 구 홈페이지(koist.kr) 자료실 18건 이전
-- 크롤링 데이터 기준 2015~2022년 자료실 전체
-- 첨부파일은 구 홈페이지 nonce 인증 URL이므로 관리자가 수동 업로드 후 file_url 수정 필요

-- #1 (원본 ID 7) - 정보보호 준비도 평가 신청서
INSERT OR IGNORE INTO downloads (title, description, file_url, file_name, file_size, category, created_at) VALUES (
  '정보보호 준비도 평가 신청서',
  '정보보호 준비도 평가를 위한 신청서 양식입니다.',
  '#', '준비도평가_신청서.hwp', 0, 'form',
  '2016-04-12 09:00:00'
);

-- #2 (원본 ID 8) - 정보보호 준비도 평가 자가진단 점검표
INSERT OR IGNORE INTO downloads (title, description, file_url, file_name, file_size, category, created_at) VALUES (
  '정보보호 준비도 평가, 자가진단 점검표',
  '정보보호 준비도 평가를 위한 자가진단 점검표입니다.',
  '#', '준비도평가_자가진단점검표.hwp', 0, 'form',
  '2016-04-12 09:00:00'
);

-- #3 (원본 ID 9) - 수습평가자 자격시험 공고문 (2016.01)
INSERT OR IGNORE INTO downloads (title, description, file_url, file_name, file_size, category, created_at) VALUES (
  '(CCEA) 수습평가자 자격시험 공고문 (2016.01)',
  'CC평가 수습평가자 자격시험 관련 공고문입니다.',
  '#', 'CCEA_수습평가자시험_공고문_201601.hwp', 0, 'education',
  '2016-01-05 09:00:00'
);

-- #4 (원본 ID 7 download page) - 수습평가자 자격시험 공고문 (2015.05)
INSERT OR IGNORE INTO downloads (title, description, file_url, file_name, file_size, category, created_at) VALUES (
  '(CCEA) 수습평가자 자격시험 공고문 (2015.05)',
  'CC평가 수습평가자 자격시험 관련 공고문입니다.',
  '#', 'CCEA_수습평가자시험_공고문_201505.hwp', 0, 'education',
  '2015-05-12 09:00:00'
);

-- #5 (원본 ID 8 download page) - 정보보호제품 평가인증교육 공고문 (2016년 1차)
INSERT OR IGNORE INTO downloads (title, description, file_url, file_name, file_size, category, created_at) VALUES (
  '(CCEA) 정보보호제품 평가인증교육 공고문 (2016년 1차)',
  '정보보호제품 평가·인증 교육공고(2016년 1차)입니다. 공고문 및 교육장약도 포함.',
  '#', 'CCEA_평가인증교육_16년_1차_공고문.hwp', 39500, 'education',
  '2015-11-30 09:00:00'
);

-- #6 (원본 ID 10) - 정보보호 준비도 평가 신청서
INSERT OR IGNORE INTO downloads (title, description, file_url, file_name, file_size, category, created_at) VALUES (
  '소프트웨어 검증시험 신청서, 신청자 제시 규격 및 기준확인서',
  '소프트웨어 검증시험 신청 시, 신청서 작성과 함께 규격 및 기준확인서를 준비하여 주시기 바랍니다. 시험이 필요한 시험항목(정량적 지표)에 대한 정의(목적, 방법, 시험 방향, 기준 등)를 포함합니다.',
  '#', 'QP-10-01_소프트웨어시험_신청서.hwp', 14000, 'form',
  '2016-04-15 09:00:00'
);

-- #7 (원본 ID 11) - 정보보호 준비도 자가진단 점검표
INSERT OR IGNORE INTO downloads (title, description, file_url, file_name, file_size, category, created_at) VALUES (
  '정보보호 준비도 평가, 자가진단 점검표 (상세)',
  '정보보호 준비도 평가를 위한 자가진단 점검표 상세 버전입니다.',
  '#', '준비도평가_자가진단점검표_상세.hwp', 0, 'form',
  '2016-04-12 10:00:00'
);

-- #8 (원본 ID 13) - 2016년 제2회 평가인증교육 공고문
INSERT OR IGNORE INTO downloads (title, description, file_url, file_name, file_size, category, created_at) VALUES (
  '(CCEA) 2016년 제2회 정보보호제품 평가인증교육 공고문',
  'CC평가 수습평가자 양성을 위한 2016년 제2회 정보보호제품 평가인증교육 공고문입니다.',
  '#', 'CCEA_평가인증교육_16년_2차_공고문.hwp', 0, 'education',
  '2016-06-13 09:00:00'
);

-- #9 (원본 ID 14) - 2017년 제1회 평가인증교육 취소 안내
INSERT OR IGNORE INTO downloads (title, description, file_url, file_name, file_size, category, created_at) VALUES (
  '(CCEA) 2017년 제1회 정보보호제품 평가인증교육 취소 안내',
  '예정되어 있던 2017년 제1회 정보보호제품 평가인증교육이 신청자 미달로 인해 불가피하게 취소 되었습니다.',
  '#', '', 0, 'education',
  '2016-12-06 09:00:00'
);

-- #10 (원본 ID 15) - 2017년 제2회 평가인증교육 공고문
INSERT OR IGNORE INTO downloads (title, description, file_url, file_name, file_size, category, created_at) VALUES (
  '(CCEA) 2017년 제2회 정보보호제품 평가인증교육 공고문',
  '2017년 제2회 정보보호제품 평가인증교육 공고문입니다. 공고문 및 교육장약도 포함.',
  '#', 'CCEA_평가인증교육_17년_2차_공고문.hwp', 18500, 'education',
  '2017-06-19 09:00:00'
);

-- #11 (원본 ID 17) - 평가 서비스 고객 만족도 설문조사 서식
INSERT OR IGNORE INTO downloads (title, description, file_url, file_name, file_size, category, created_at) VALUES (
  '평가 서비스 고객 만족도 설문조사 서식',
  '한국정보보안기술원의 평가 서비스에 대한 고객 만족도 설문조사 양식입니다.',
  '#', '고객만족도_설문조사서식.hwp', 0, 'form',
  '2019-02-22 09:00:00'
);

-- #12 (원본 ID 23) - 개인정보 수집이용 및 제3자 제공 동의서
INSERT OR IGNORE INTO downloads (title, description, file_url, file_name, file_size, category, created_at) VALUES (
  '개인정보 수집이용 및 제3자 제공 동의서',
  '평가 서비스 신청 시 필요한 개인정보 수집·이용 및 제3자 제공 동의서 양식입니다.',
  '#', '개인정보_수집이용_동의서.hwp', 0, 'form',
  '2019-02-22 10:00:00'
);

-- #13 (원본 ID 24) - 정보보호제품 성능평가 신청서
INSERT OR IGNORE INTO downloads (title, description, file_url, file_name, file_size, category, created_at) VALUES (
  '정보보호제품 성능평가 신청서',
  '정보보호제품 성능평가 신청 시, 신청서 작성과 함께 다음의 제출물을 준비하여 주시길 바랍니다: 1. 성능평가 신청서 2. 제품설명서 3. 사용자 취급설명서 4. 성능평가 신청 제품. 평가 준비 및 성능평가와 관련하여 문의사항이 있으시면 언제든지 편하게 연락주시길 바랍니다.',
  '#', '성능평가_신청서.hwp', 0, 'form',
  '2019-02-13 09:00:00'
);

-- #14 (원본 ID 27) - [CC평가] 공통평가기준 CC v3.1 R2 한글
INSERT OR IGNORE INTO downloads (title, description, file_url, file_name, file_size, category, created_at) VALUES (
  '[CC평가] 공통평가기준 (CC v3.1 R2) - 한글',
  '공통평가기준(CC V3.1 R2) 한글판입니다. 1부, 2부, 3부 및 공통평가방법론(CEM V3.1 R2) 한글판이 포함되어 있습니다.',
  '#', '공통평가기준_CC_v3.1_R2_한글.zip', 4300000, 'cc-standard',
  '2021-06-11 09:00:00'
);

-- #15 (원본 ID 28) - [CC평가] 공통평가기준 CC v3.1 R5 한글
INSERT OR IGNORE INTO downloads (title, description, file_url, file_name, file_size, category, created_at) VALUES (
  '[CC평가] 공통평가기준 (CC v3.1 R5) - 한글',
  '공통평가기준(CC V3.1 R5) 한글판입니다. 1부, 2부, 3부 및 공통평가방법론(CEM V3.1 R5) 한글판이 포함되어 있습니다.',
  '#', 'CC_CEM_V3.1_R5_한글.zip', 4600000, 'cc-standard',
  '2021-06-11 10:00:00'
);

-- #16 (원본 ID 29) - 이력서 양식
INSERT OR IGNORE INTO downloads (title, description, file_url, file_name, file_size, category, created_at) VALUES (
  '(주)한국정보보안기술원 이력서 양식',
  '한국정보보안기술원 채용 지원을 위한 이력서 양식입니다.',
  '#', '한국정보보안기술원_이력서양식.hwp', 96000, 'form',
  '2022-12-16 09:00:00'
);
