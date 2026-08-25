# SharifEduc — Free Cloudflare Pages deployment

This package is prepared for a free `*.pages.dev` deployment while keeping Firebase as the database, authentication and PDF storage backend.

## Important

Do NOT put passwords, Firebase service-account JSON files, private keys, or other secrets in this repository.

The site uses a Cloudflare Pages Advanced Mode `_worker.js` to server-render individual resource pages and generate `/sitemap.xml` from published Firestore resources. Cloudflare documents this mode and requires the `_worker.js` file to be in the Pages output directory.

## Cloudflare Pages settings

- Project name: `sharifeduc`
- Production branch: `main`
- Framework preset: `None`
- Build command: `exit 0`
- Build output directory: `public`

Connect the GitHub repository to Cloudflare Pages. Git integration automatically redeploys when changes are pushed to the production branch.

## Firebase

The Worker reads only published resources from the Firestore REST API. Keep Firestore rules configured so public users can read published resources and only authenticated admin users can create/update/delete resources.

The Firebase web configuration in the browser is not a password. Do not add service-account credentials to the project.

## Admin

The existing `/admin/` page uses Firebase Authentication. Replace the placeholder admin email in `firestore.rules` with the real admin account email before deploying rules.

## First deployment

1. Create a GitHub repository named `sharifeduc`.
2. Upload this project, preserving the `public/` directory.
3. In Cloudflare Dashboard, open Workers & Pages → Create application → Pages → Connect to Git.
4. Select the repository.
5. Use the settings above and deploy.
6. Cloudflare will provide a `sharifeduc.pages.dev` address if the project name is available.
7. Test `/`, `/p7/`, `/subjects/mathematics/`, `/robots.txt`, and `/sitemap.xml`.

## After deployment

- Create the Firebase Auth admin account.
- Replace `ADMIN_EMAIL@example.com` in `firestore.rules` with the actual admin email.
- Deploy Firestore and Storage rules through Firebase CLI or the Firebase console.
- Upload one test resource with `published: true`, a `slug`, `subject`, and `description`.
- Verify its crawlable URL under `/resources/.../`.
- Submit the sitemap to Google Search Console.

## Later: custom domain

When you decide to buy a domain such as `sharifeduc.com`, connect it to this same Cloudflare Pages project. You do not need to rebuild the site.
