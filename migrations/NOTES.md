# Migration Notes

## File Numbering Issues

Several historical migrations share the same number prefix. These are **not renamed** to avoid
breaking the `d1_migrations` tracking table in existing D1 databases. Instead, we document
duplicates and missing numbers here for clarity.

| Number | Files | Purpose |
|--------|-------|---------|
| 0003 | `0003_popup3_text_resize.sql`, `0003_progress_schema_upgrade.sql` | Duplicate — both applied |
| 0004 | `0004_images_and_bg_settings.sql`, `0004_popup_text_50pct_reduce.sql` | Duplicate |
| 0005 | `0005_eval_readiness_levels.sql`, `0005_popup_text_20pct_enlarge.sql` | Duplicate |
| 0006 | `0006_popup_text_40pct_enlarge.sql`, `0006_simulator_cert_types.sql` | Duplicate |
| 0007 | `0007_hero_compact_settings.sql`, `0007_popup_text_30pct_enlarge.sql` | Duplicate |
| 0008 | `0008_gnb_menu_settings.sql`, `0008_popup_card_size_cm.sql` | Duplicate |
| 0009 | *(missing)* | No migration exists for this number |

## UI Size-Adjustment Migrations (Archived)

The following migrations were one-off UI tweaks (popup font size / padding adjustments).
They have been moved to `migrations/archive/` as they are historical and should not be
re-applied to fresh databases. Their records remain in `d1_migrations` on existing environments.

| File | Purpose |
|------|---------|
| `0003_popup3_text_resize.sql` | Initial popup text resize |
| `0004_popup_text_50pct_reduce.sql` | 50% reduction |
| `0005_popup_text_20pct_enlarge.sql` | 20% enlargement |
| `0006_popup_text_40pct_enlarge.sql` | 40% enlargement |
| `0007_popup_text_30pct_enlarge.sql` | 30% enlargement |
| `0008_popup_card_size_cm.sql` | Card size in cm |

## Future Naming Convention

All new migrations use a **sequential 4-digit number** prefix:

```
NNNN_descriptive_name.sql
```

Starting from `0024_admin_seed_guard.sql`, all numbers are unique and sequential.

## Rollback Strategy

D1 does not support automatic rollbacks. To revert a migration:

1. Write a new migration that reverses the schema/data changes.
2. Test locally with `--local` flag first.
3. Apply to production after verification.

Example:
```sql
-- 0099_revert_0025.sql
ALTER TABLE progress_items DROP COLUMN IF EXISTS some_column;
```

## Environment Sync

Ensure `d1_migrations` tables match across environments:

```bash
# Check local migrations
npx wrangler d1 execute koist-website-db --local --command="SELECT * FROM d1_migrations"

# Check production
npx wrangler d1 execute koist-website-db --command="SELECT * FROM d1_migrations"
```
