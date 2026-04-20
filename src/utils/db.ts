// KOIST - Database Helper Utilities
import type { Bindings, SettingsMap, SiteSetting, Department, DepartmentWithPages, DepPage } from '../types';

export async function getSettings(db: D1Database): Promise<SettingsMap> {
  const result = await db.prepare('SELECT key, value FROM site_settings').all<SiteSetting>();
  const map: SettingsMap = {};
  if (result.results) {
    for (const row of result.results) {
      map[row.key] = row.value;
    }
  }
  return map;
}

export async function getDepartmentsWithPages(db: D1Database): Promise<DepartmentWithPages[]> {
  const departments = (await db.prepare('SELECT * FROM departments WHERE is_active = 1 ORDER BY sort_order').all<Department>()).results || [];
  const allPages = (await db.prepare('SELECT dept_id, id, title, slug, sort_order FROM dep_pages WHERE is_active = 1 ORDER BY sort_order').all<Pick<DepPage, 'dept_id' | 'id' | 'title' | 'slug' | 'sort_order'>>()).results || [];
  
  return departments.map(d => ({
    ...d,
    pages: allPages.filter(p => p.dept_id === d.id)
  }));
}

export async function getSetting(db: D1Database, key: string): Promise<string> {
  const result = await db.prepare('SELECT value FROM site_settings WHERE key = ?').bind(key).first<{ value: string }>();
  return result?.value || '';
}

export async function updateSetting(db: D1Database, key: string, value: string): Promise<void> {
  await db.prepare('UPDATE site_settings SET value = ?, updated_at = CURRENT_TIMESTAMP WHERE key = ?').bind(value, key).run();
}

/**
 * HTML 이스케이프 - null/undefined/숫자/객체 안전 처리
 * v39.0: XSS 방어 강화 - site_settings, progress_items 등 모든 DB값 출력 시 필수 사용
 */
export function escapeHtml(str: unknown): string {
  if (str === null || str === undefined) return '';
  const s = typeof str === 'string' ? str : String(str);
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * HTML 속성(attribute) 값 전용 이스케이프
 * 속성값은 따옴표로 감싸져 있어도 공백/탭 등으로 탈출될 수 있으므로 엄격하게 처리
 */
export function escapeAttr(str: unknown): string {
  if (str === null || str === undefined) return '';
  const s = typeof str === 'string' ? str : String(str);
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/`/g, '&#096;');
}

/**
 * URL 이스케이프 + 위험 프로토콜 차단
 * href, src, action 등에 사용 - javascript:, vbscript:, data: (이미지 제외) 차단
 */
export function safeUrl(url: unknown): string {
  if (url === null || url === undefined) return '';
  const s = (typeof url === 'string' ? url : String(url)).trim();
  if (!s) return '';
  // 위험 프로토콜 차단 (대소문자 + 공백/제어문자 우회 방지)
  const normalized = s.toLowerCase().replace(/[\s\u0000-\u001f\u007f]/g, '');
  if (
    normalized.startsWith('javascript:') ||
    normalized.startsWith('vbscript:') ||
    normalized.startsWith('data:text/html') ||
    normalized.startsWith('data:text/javascript') ||
    normalized.startsWith('data:application/javascript')
  ) {
    return '';
  }
  return escapeAttr(s);
}

/**
 * CSS 값(색상, 크기 등) 안전 처리
 * 괄호, 중괄호, 세미콜론, @ 등 CSS 인젝션 문자 제거
 */
export function safeCss(value: unknown): string {
  if (value === null || value === undefined) return '';
  const s = typeof value === 'string' ? value : String(value);
  // CSS 인젝션 방지: 중괄호, @규칙, 주석, 표현식, URL() 함수 차단
  return s
    .replace(/[<>"'`\\]/g, '')
    .replace(/[{}]/g, '')
    .replace(/\/\*/g, '')
    .replace(/\*\//g, '')
    .replace(/expression\s*\(/gi, '')
    .replace(/javascript\s*:/gi, '')
    .replace(/url\s*\(/gi, '')
    .replace(/@import/gi, '')
    .replace(/@charset/gi, '')
    .trim();
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
