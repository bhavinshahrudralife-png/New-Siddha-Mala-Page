# Custom authentication regression playbook

Use REACT_APP_BACKEND_URL from frontend/.env for every API call. Test credentials are
in /app/memory/test_credentials.md. No credentials changed during the redesign.

## MongoDB verification
- Admin bcrypt hash has `$2b$` prefix; users.email has a unique index.
- login_attempts.expires_at has a TTL index (expireAfterSeconds=0).
- Account lockout documents use a SHA256-normalized-email string `_id`; no proxy IP
  or untrusted forwarded header is used. Old IP-based documents are not used.
- Counter increments and window expiry/reset are atomic; Mongo projections omit _id.

## API checks
1. Login with the documented admin, preserve cookies, GET /api/auth/me.
2. Verify HttpOnly, Secure, SameSite=None on the existing access_token cookie.
3. Invalid credentials return 401 with a displayable error.
4. For a unique nonexistent account: attempts 1–5 return401, attempt6 returns429
   with Retry-After. Alter forwarded headers and email casing; key remains stable.
5. Concurrent failures still share one counter; only first5 may return401.
6. Expired windows restart at1 independently of the TTL cleanup interval.
7. Successful login before lockout clears the account counter.
8. Logout clears cookie; anonymous /api/auth/me and /api/admin/leads return401.
9. Authenticated lead CRUD and content editing work; restore test content and delete
   only test leads after verification.

## UI checks
Login, invalid-login error, /admin guard, logout, lead view/delete and content edit.
Use the external preview URL. Do not reset passwords or replace the admin account.

Automated API regression: /app/backend/tests/test_rudralife_api.py.