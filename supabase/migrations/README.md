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
| M09 | `..._M09_security_advisor_fixes.sql` | Fixes the "Unrestricted" analytics views (were bypassing RLS via implicit SECURITY DEFINER) + pins `search_path` on 5 functions per Supabase's Security Advisor |
| M10 | `..._M10_rewrite_blog_posts.sql` | Rewrites both seeded blog posts (less AI-pattern-y, no employer-specific mentions) and backdates them to real Jan 2026 dates instead of the migration run date |
| M11 | `..._M11_public_page_view_count.sql` | Public-callable `get_page_view_count(path)` — returns just a number, no raw analytics rows, so blog posts can show real view counts |
| M12 | `..._M12_migrate_case_study_to_posts.sql` | Moves the AM Health Hub case study from the old standalone `/vault` page into a real `posts` row (private, share-link, rate-limited) — the old `/vault/be411a9e5d45` URL is retired |
| M13 | `..._M13_notes.sql` | Adds a `type` column (`article` / `note`) to `posts` so short X/Threads-style posts reuse the same table, RLS, and visibility system as blog articles |
| M14 | `..._M14_fix_role_check_functions.sql` | Fixes "new row violates RLS policy" on publish — makes `is_admin`/`is_team_member`/`can_write`/`my_role` SECURITY DEFINER so they reliably see `admin_users` regardless of the caller's own row visibility into it |
| M15 | `..._M15_seed_correct_admin_email.sql` | Real root cause of the RLS error: `admin_users` only had `pranav.nairrr@gmail.com`, not the account actually used day-to-day (`ppranav18@gmail.com`) — seeds it as admin |

New migrations always go at the end with the next timestamp + next `M` number.
