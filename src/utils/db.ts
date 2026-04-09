// KOIST - Database Helper Utilities
import type { Bindings, SettingsMap, SiteSetting } from '../types';

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

export async function getSetting(db: D1Database, key: string): Promise<string> {
  const result = await db.prepare('SELECT value FROM site_settings WHERE key = ?').bind(key).first<{ value: string }>();
  return result?.value || '';
}

export async function updateSetting(db: D1Database, key: string, value: string): Promise<void> {
  await db.prepare('UPDATE site_settings SET value = ?, updated_at = CURRENT_TIMESTAMP WHERE key = ?').bind(value, key).run();
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
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
