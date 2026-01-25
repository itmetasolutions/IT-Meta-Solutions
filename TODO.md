# TODO: Fix 404 Issues for Case Study Pages

## Completed Tasks
- [x] Analyzed the project structure and identified the issue: 404 errors when accessing case study pages directly or via links from the work page.
- [x] Verified that the _redirects file in public/ and dist/ is correctly configured for SPA routing.
- [x] Updated src/pages/Work.jsx to use React Router's Link component instead of anchor tags for client-side navigation.
- [x] Rebuilt the project to ensure changes are reflected in the dist folder.

## Summary
The 404 errors were occurring because:
1. Direct access to case study URLs (e.g., /case-study/halla-gulla) was not handled by the server, as it doesn't recognize client-side routes.
2. The _redirects file is correctly set up to redirect all routes to index.html for SPA handling.
3. However, using <a href> tags in the Work page caused full page reloads, which triggered the 404 before the SPA could handle the routing.
4. By replacing <a href> with <Link to>, navigation now uses React Router's client-side routing, preventing full reloads and 404 errors.

The fix ensures that:
- Clicking "View full case study" from the work page uses client-side navigation.
- Direct access to case study URLs is handled by the _redirects file, serving index.html and letting React Router manage the routing.
