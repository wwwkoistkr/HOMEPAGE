-- EAL evaluation period settings (v14 - Admin-configurable bar chart values)
-- Category: evaluation

-- Overall (전체 평균)
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES ('eval_overall_general_prep', '12', 'evaluation', '전체평균 일반 준비기간(개월)');
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES ('eval_overall_general_eval', '12', 'evaluation', '전체평균 일반 평가기간(개월)');
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES ('eval_overall_koist_prep', '6', 'evaluation', '전체평균 KOIST 준비기간(개월)');
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES ('eval_overall_koist_eval', '9', 'evaluation', '전체평균 KOIST 평가기간(개월)');

-- EAL2
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES ('eval_eal2_general_prep', '8', 'evaluation', 'EAL2 일반 준비기간(개월)');
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES ('eval_eal2_general_eval', '6', 'evaluation', 'EAL2 일반 평가기간(개월)');
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES ('eval_eal2_koist_prep', '4', 'evaluation', 'EAL2 KOIST 준비기간(개월)');
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES ('eval_eal2_koist_eval', '4', 'evaluation', 'EAL2 KOIST 평가기간(개월)');

-- EAL3
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES ('eval_eal3_general_prep', '10', 'evaluation', 'EAL3 일반 준비기간(개월)');
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES ('eval_eal3_general_eval', '8', 'evaluation', 'EAL3 일반 평가기간(개월)');
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES ('eval_eal3_koist_prep', '6', 'evaluation', 'EAL3 KOIST 준비기간(개월)');
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES ('eval_eal3_koist_eval', '5', 'evaluation', 'EAL3 KOIST 평가기간(개월)');

-- EAL4
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES ('eval_eal4_general_prep', '14', 'evaluation', 'EAL4 일반 준비기간(개월)');
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES ('eval_eal4_general_eval', '12', 'evaluation', 'EAL4 일반 평가기간(개월)');
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES ('eval_eal4_koist_prep', '8', 'evaluation', 'EAL4 KOIST 준비기간(개월)');
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES ('eval_eal4_koist_eval', '7', 'evaluation', 'EAL4 KOIST 평가기간(개월)');
