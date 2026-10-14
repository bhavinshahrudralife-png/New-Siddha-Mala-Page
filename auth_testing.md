# Auth Testing Playbook — Rudralife Admin

## Credentials
- Admin: admin@rudralife.com / Rudralife@2025

## Step 1: MongoDB Verification
```
mongosh
use test_database
db.users.find({role: "admin"})
```
Verify bcrypt hash starts with `$2b$`, unique index on users.email.

## Step 2: API Testing
```
curl -c cookies.txt -X POST <BACKEND>/api/auth/login -H "Content-Type: application/json" -d '{"email":"admin@rudralife.com","password":"Rudralife@2025"}'
curl -b cookies.txt <BACKEND>/api/auth/me
curl -b cookies.txt <BACKEND>/api/admin/leads
```
Login returns user object + sets httpOnly access_token cookie (samesite=none, secure). /me and /admin/leads return data with cookie, 401 without.

## Step 3: UI Flow
1. /admin/login → sign in → lands on /admin dashboard (Leads tab)
2. Submit enquiry form on landing (name/email/phone/city/profession/message) → /thank-you page
3. Lead appears instantly in admin Leads tab; Delete button removes it
4. "Edit Page Content" tab → change hero title → Save → visible on landing page
