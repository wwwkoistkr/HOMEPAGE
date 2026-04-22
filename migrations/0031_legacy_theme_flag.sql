-- Migration 0031: v39.7 KOIST Legacy Theme Flag
-- Adds a per-department toggle to enable/disable the koist.kr original design
-- Default: 1 (ON) — all existing departments render with the original KOIST design
-- Admin can set to 0 via admin UI to fall back to the previous prose-based design
-- Date: 2026-04-22

-- SQLite: add column with default value (safe to re-run if column already exists? No — use PRAGMA check pattern in app code or fresh migration).
-- This migration assumes the column does NOT yet exist.

ALTER TABLE departments ADD COLUMN use_legacy_theme INTEGER NOT NULL DEFAULT 1;

-- Optional: English subtitle for the tit_cm hero block (shown above page title)
-- e.g. "CC EVALUATION", "SECURITY FUNCTIONAL TEST", "KCMVP"
ALTER TABLE departments ADD COLUMN english_subtitle TEXT DEFAULT NULL;

-- Set sensible English subtitles based on department slug
-- (Admin can edit later via /admin/departments)
UPDATE departments SET english_subtitle = 'CC EVALUATION'              WHERE slug = 'cc';
UPDATE departments SET english_subtitle = 'SECURITY FUNCTIONAL TEST'   WHERE slug = 'security-test';
UPDATE departments SET english_subtitle = 'KCMVP'                      WHERE slug = 'kcmvp';
UPDATE departments SET english_subtitle = 'PERFORMANCE EVALUATION'     WHERE slug = 'performance';
UPDATE departments SET english_subtitle = 'CERTIFICATION'              WHERE slug = 'certificate';
UPDATE departments SET english_subtitle = 'SECURITY DIAGNOSIS'         WHERE slug = 'diagnosis';
UPDATE departments SET english_subtitle = 'CONSULTING'                 WHERE slug = 'consulting';
UPDATE departments SET english_subtitle = 'ENTERPRISE SECURITY'        WHERE slug = 'enterprise-security';
UPDATE departments SET english_subtitle = 'READINESS ASSESSMENT'       WHERE slug = 'readiness';

-- Ensure all existing departments default to legacy theme ON
UPDATE departments SET use_legacy_theme = 1 WHERE use_legacy_theme IS NULL;
