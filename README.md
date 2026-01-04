# FinalProject-TPM-Kel9 — Landing page (back-end)

Quick start
```bash
git clone https://github.com/SoniaRY-15/FinalProject-TPM-Kel9.git
cd FinalProject-TPM-Kel9/backend
npm install
npm install prisma@5.10 @prisma/client@5.10 
npx prisma migrate dev
npm run dev
# open:
# http://localhost:3000/api/landing
```

API
- GET /api/landing — returns JSON used by the landing page
- POST /api/contact — receives JSON { "name", "email", "message" } and returns status 200/201
- POST /api/team/register (with validation)
- POST /api/team/login ((with validation)
- POST /api/leader (bagian create leader/form leader dan with validation)
- GET /images/cv/:filename
- GET /images/flazz/:filename
- GET /images/idcard/:filename

Registers a new team
Body (JSON):
```bash
{
  "name": "string",
  "password": "string",
  "type": "BINUSIAN | NON_BINUSIAN"
}
```
setelah register nanti muncul token

Authenticates team and returns JWT token
Body (JSON):
```bash
{
  "name": "string",
  "password": "string",
}
```

Creates leader data for authenticated team
Headers: Authorization: Bearer <token>
Body (form-data):
fullName (text)

```bash
fullname (text)
email (text)
whatsapp (text)
lineId (text)
github (text)
birthPlace (text)
birthDate (text, YYYY-MM-DD)
cv (file, required)
flazz (file, required for BINUSIAN)
idCard (file, required for NON_BINUSIAN)
```
Config
- PORT (optional, default 3000)

# Text me your email or username to be added as a collaborator 👍

# Ini bagian FE

Quick start
```bash
git clone https://github.com/SoniaRY-15/FinalProject-TPM-Kel9.git
cd FinalProject-TPM-Kel9/frontend
npm install
npm run dev
# open:
# http://localhost:5173
```


