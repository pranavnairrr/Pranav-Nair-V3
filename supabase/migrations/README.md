# Migrations

Applied via `npm run db:push`, in this order. The leading timestamp on each
filename is what Supabase's CLI actually tracks to know what's already
applied — don't rename that part. The `M01`, `M02`... marker after it is
just for readability.

| # | File | What it does |
|---|------|---------------|
| M01 | `..._M01_vault_gate.sql` | First private-post gate (superseded by M06/M08's general role + rate-limit system, kept for history) |
| M02 | `..._M02_posts_schema.sql` | Core `posts` table, visibility model (public/private/password), share tokens, `post-images` storage bucket |
| M03 | `..._M03_analytics_schema.sql` | Visitor analytics: pageviews, per-section time-in-view, admin-only read |
| M04 | `..._M04_seed_posts.sql` | Migrates the 2 original static blog posts into the `posts` table |
| M05 | `..._M05_fix_share_function_password_leak.sql` | Security fix: `get_post_by_share` was returning password-protected posts' content without ever checking the password |
| M06 | `..._M06_roles.sql` | Replaces the single hardcoded admin email with real roles: admin / content_manager / viewer |
| M07 | `..._M07_seed_admin_retry.sql` | Re-seeds the admin's `admin_users` row now that the Supabase Auth account actually exists |
| M08 | `..._M08_password_rate_limit.sql` | Locks a share token out after 10 wrong password guesses in 15 minutes |

New migrations always go at the end with the next timestamp + next `M` number.
