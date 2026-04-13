-- Migration 0018: Add missing original downloads from koist.kr page 2
-- These 3 items were on page 2 of the original site's download section

INSERT OR IGNORE INTO downloads (title, description, file_url, file_name, file_size, category, download_count, created_at)
VALUES 
  ('(CCEA) 정보보호제품 평가인증교육 공고문 (2015년 1차)', '한국CC평가협회(CCEA) 주관 2015년도 제1차 정보보호제품 평가인증교육 공고문', '#', 'ccea_education_2015_1.hwp', 0, 'education', 0, '2015-11-30'),
  ('(CCEA) 수습평가자 자격시험 공고문 (2015.05 1차)', '한국CC평가협회(CCEA) 주관 2015년 5월 수습평가자 자격시험 공고 (제1차)', '#', 'ccea_exam_2015_05.hwp', 0, 'education', 0, '2015-05-12'),
  ('(CCEA) 정보보호제품 평가인증교육 공고문 (2014년)', '한국CC평가협회(CCEA) 주관 2014년도 정보보호제품 평가인증교육 공고문', '#', 'ccea_education_2014.hwp', 0, 'education', 0, '2014-11-25');
