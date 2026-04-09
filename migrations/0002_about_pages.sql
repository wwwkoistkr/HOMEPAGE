-- KOIST Website Database Schema - Migration 0002: About Pages + Downloads Update
-- Add about_pages table for editable introduction pages

CREATE TABLE IF NOT EXISTS about_pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_about_pages_slug ON about_pages(slug);
