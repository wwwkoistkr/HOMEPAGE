-- Migration 0025: Normalize defaults and data consistency
-- Sets default status for progress_items and documents FK intent.

-- Ensure all progress_items without a status get the default
UPDATE progress_items SET status = '평가접수' WHERE status IS NULL OR status = '';

-- Note: SQLite in D1 does not enforce PRAGMA foreign_keys at connection level
-- in Workers runtime. FK enforcement is documented as a future TODO.
-- The schema already declares FK constraints (dep_pages → departments);
-- we keep them for documentation purposes and future enforcement.
