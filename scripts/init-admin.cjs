#!/usr/bin/env node
/**
 * KOIST Admin User Initialisation Script
 *
 * Usage (local):
 *   ADMIN_USERNAME=myadmin ADMIN_PASSWORD='S3cure!Pass' node scripts/init-admin.cjs --local
 *
 * Usage (production):
 *   ADMIN_USERNAME=myadmin ADMIN_PASSWORD='S3cure!Pass' node scripts/init-admin.cjs
 *
 * This script:
 * 1. Reads ADMIN_USERNAME and ADMIN_PASSWORD from environment variables.
 * 2. Hashes the password with PBKDF2 (SHA-256, 100 000 iterations) — same as the app.
 * 3. Outputs the SQL INSERT and executes it via `wrangler d1 execute`.
 */

const { execSync } = require('child_process');
const crypto = require('crypto');

const DB_NAME = 'koist-website-db';

async function main() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  const isLocal = process.argv.includes('--local');

  if (!username || !password) {
    console.error('Error: ADMIN_USERNAME and ADMIN_PASSWORD environment variables are required.');
    console.error('');
    console.error('Usage:');
    console.error('  ADMIN_USERNAME=admin ADMIN_PASSWORD=YourSecurePassword node scripts/init-admin.cjs [--local]');
    process.exit(1);
  }

  if (password.length < 8) {
    console.error('Error: Password must be at least 8 characters long.');
    process.exit(1);
  }

  // Generate salt (16 random bytes, base64)
  const saltBuf = crypto.randomBytes(16);
  const salt = saltBuf.toString('base64');

  // PBKDF2 hash (matches src/utils/crypto.ts — SHA-256, 100 000 iterations, 32 bytes)
  const hashBuf = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
  const hash = hashBuf.toString('base64');

  const sql = `INSERT OR IGNORE INTO admin_users (username, password_hash, salt, must_change_password) VALUES ('${username}', '${hash}', '${salt}', 1);`;

  console.log('');
  console.log(`  Target DB : ${DB_NAME} ${isLocal ? '(local)' : '(PRODUCTION)'}`);
  console.log(`  Username  : ${username}`);
  console.log(`  Hash algo : PBKDF2-SHA256 x 100 000`);
  console.log('');

  const localFlag = isLocal ? '--local' : '';
  const cmd = `npx wrangler d1 execute ${DB_NAME} ${localFlag} --command="${sql.replace(/"/g, '\\"')}"`;

  try {
    console.log('Executing migration...');
    const out = execSync(cmd, { cwd: process.cwd(), stdio: 'pipe', encoding: 'utf-8' });
    console.log(out);
    console.log('Admin user created successfully (must_change_password = 1).');
    console.log('The user will be prompted to change password on first login.');
  } catch (err) {
    console.error('Failed to execute D1 command:', err.message || err);
    console.error('');
    console.error('Generated SQL (run manually if needed):');
    console.error(`  ${sql}`);
    process.exit(1);
  }
}

main();
