# AngularJS Employee Directory

This standalone example converts the React reference directory into plain HTML, CSS, and AngularJS 1.x. It includes local sample data for eight employees and can load and add employee records through Supabase.

## Connect Supabase

1. Create a Supabase project and run [`supabase-schema.sql`](./supabase-schema.sql) in its SQL Editor.
2. In Supabase **Authentication → Users**, create accounts for people permitted to add records. Public visitors can read the directory, but only signed-in users can add records.
3. Copy the project URL and the project's **publishable key** (or legacy `anon` key) into [`supabase-config.js`](./supabase-config.js). These browser-visible values are not secrets. Never put a `service_role` or secret key in this file.
4. Serve `index.html` through a local static web server. AngularJS, Supabase JS, and the display fonts load from CDNs, so the page needs an internet connection.

The page displays an explicit status when Supabase is configured or unavailable. Without configured credentials, it uses the original local sample data and keeps additions local. With Supabase configured, it does not silently fall back to sample data if the API request fails.

The schema enables row-level security, permits public reads, and permits inserts only to authenticated users. No account registration is exposed in the directory, so provision trusted accounts in Supabase. If directory data should not be public, remove the public read policy and add sign-in enforcement for reads before deploying.

## Use in an existing AngularJS app

1. Copy `styles.css` into your app's styles and include it in the page.
2. Copy the directory markup from `index.html` into the appropriate view/template, omitting the document wrapper and external script tags.
3. Include `supabase-config.js`, the Supabase JS CDN, and `app.js`; keep the configuration out of the service-role key. Adapt the controller if your app uses different employee fields.
4. Keep one `ng-app` on the host page. Do not nest AngularJS application roots.

The example supports text search, department/location/status filters, sorting, card/table layouts, employee details, adding employees, and CSV export. AngularJS 1.x is end-of-life; use it only where it is already required by the host project.
