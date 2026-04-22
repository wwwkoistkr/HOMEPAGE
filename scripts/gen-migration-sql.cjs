#!/usr/bin/env node
/**
 * KOIST v39.6 — Generate D1 migration SQL from crawled content.
 *
 * Input: /tmp/koist_crawl/migrated_content.json
 * Output: migrations/0030_content_migration_original.sql
 */

const fs = require('fs');
const path = require('path');

const INPUT = '/tmp/koist_crawl/migrated_content.json';
const OUT = path.join(__dirname, '..', 'migrations', '0030_content_migration_original.sql');

if (!fs.existsSync(INPUT)) {
  console.error('FATAL: missing', INPUT, '(run crawl-koist-content.cjs first)');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(INPUT, 'utf-8'));

// SQL escape single quotes (D1 / SQLite uses '' to escape a literal ')
function sqlEscape(s) {
  return s.replace(/'/g, "''");
}

const header = `-- KOIST v39.6 — 원본 koist.kr 콘텐츠 마이그레이션
-- Generated: ${new Date().toISOString()}
-- Source: http://www.koist.kr/* (1회 크롤링, 자사 자산)
-- Safe to re-run (UPDATE only, no INSERT)
-- Transformation: dl.dl_cm/dt/dd → section/h3/ul, img src → /api/images/legacy/* proxy
-- Total pages: ${Object.values(data).reduce((n, d) => n + Object.keys(d).length, 0)}

`;

const statements = [];
let count = 0;

for (const deptSlug of Object.keys(data)) {
  for (const pageSlug of Object.keys(data[deptSlug])) {
    const info = data[deptSlug][pageSlug];
    const content = sqlEscape(info.content);
    const stmt = `-- [${++count}] ${deptSlug}/${pageSlug} (${info.length} bytes, ${info.sections} sections, ${info.imgs} images)
-- Source: ${info.url}
UPDATE dep_pages
   SET content = '${content}',
       updated_at = CURRENT_TIMESTAMP
 WHERE dept_id = (SELECT id FROM departments WHERE slug = '${deptSlug}')
   AND slug = '${pageSlug}';

`;
    statements.push(stmt);
  }
}

// Verification query comment (developer can run manually)
const footer = `
-- Verification:
--   SELECT d.slug AS dept, p.slug AS page, LENGTH(p.content) AS sz, p.updated_at
--     FROM dep_pages p JOIN departments d ON d.id = p.dept_id
--    ORDER BY d.sort_order, p.sort_order;
`;

fs.writeFileSync(OUT, header + statements.join('') + footer, 'utf-8');
const stat = fs.statSync(OUT);
console.log(`Generated ${OUT}`);
console.log(`  ${count} UPDATE statements, ${(stat.size / 1024).toFixed(1)} KB`);
