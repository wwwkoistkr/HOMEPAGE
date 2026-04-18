-- Migration 0024: Add UNIQUE index on admin_users.username (guard against duplicates)
-- Admin user creation is now done exclusively via scripts/init-admin.cjs
-- The GET /api/init-db route and auto-creation in POST /api/admin/login have been removed.

CREATE UNIQUE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);
