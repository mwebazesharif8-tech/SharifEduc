# SharifEduc Stage 3 — Crawlable Resource Pages

This build keeps the existing SharifEduc Firebase backend and adds server-rendered public resource pages.

## What changed

- `/resources/<class>/<subject>/<slug>/` is rendered by a Firebase HTTPS function.
- Each published Firestore resource gets its own HTML page with a unique title, description, canonical URL and `LearningResource` structured data.
- The public search and class pages link to those crawlable resource pages.
- `/sitemap.xml` is generated dynamically from published resources.
- The old client-side upload passcode remains removed; publishing uses Firebase Authentication + rules.

## Before deployment

1. Replace `https://YOUR-DOMAIN.com` in `functions/index.js` and `public/robots.txt` with the final domain.
2. Replace canonical URLs in the static HTML pages with the final domain.
3. In Firebase Authentication, enable Email/Password and create the administrator account.
4. Replace `ADMIN_EMAIL@example.com` in `firestore.rules` and `storage.rules` with the exact administrator email.
5. Install Firebase CLI and run `firebase login`.
6. From this project folder run `npm install` inside `functions/` and then `firebase deploy`.
7. Verify `/sitemap.xml` and a published `/resources/.../` URL in a browser.
8. Submit the sitemap in Google Search Console and Bing Webmaster Tools.

## Firestore resource fields

- title
- slug
- classLevel
- subject
- category
- term
- year
- description
- curriculum
- fileUrl
- published
- createdAt

## Important Firebase requirement

Cloud Functions deployment may require a Firebase project billing plan that supports Cloud Functions. Check Firebase's current pricing/plan requirements before deploying functions.
