# InfraSafe – Crowdsourced Infrastructure Reporting Platform

InfraSafe is a hackathon-ready full-stack application for crowdsourcing infrastructure repair reports with AR-style mapping and a municipal SaaS dashboard.

**Tech Stack:** Frontend (HTML, CSS, Bootstrap 5, JavaScript), Backend (Node.js + Express), Storage (JSON-based mock data), Maps (Google Maps JS API).

## Quick Start

### 1. Install dependencies:
```bash
cd InfraSafe/backend
npm install
```

### 2. Start the backend server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### 3. Open the frontend:
- Open `frontend/pages/index.html` in your browser
- Or navigate to `http://localhost:3000` if you set up a local web server

## Project Structure

```
InfraSafe/
├── backend/
│   ├── controllers/
│   │   ├── authController.js       (JWT, login, register)
│   │   └── issueController.js      (CRUD for issues)
│   ├── routes/
│   │   ├── auth.js                 (POST /api/auth/register, /login)
│   │   └── issues.js               (POST/GET/PUT /api/issues/*)
│   ├── data.json                   (mock database)
│   ├── server.js                   (Express app)
│   ├── package.json
│   └── uploads/                    (image storage)
│
├── frontend/
│   ├── pages/
│   │   ├── index.html              (Landing page)
│   │   ├── register.html           (Citizen/Municipal signup)
│   │   ├── login.html              (Login)
│   │   ├── citizen-dashboard.html  (Citizen home)
│   │   ├── report-issue.html       (Report form with GPS)
│   │   ├── issue-map.html          (AR-style map view)
│   │   └── municipal-dashboard.html (Admin dashboard)
│   ├── css/
│   │   └── style.css               (Bootstrap + custom styling)
│   └── js/
│       ├── auth.js                 (Register/Login logic)
│       ├── citizen.js              (Citizen dashboard & reporting)
│       ├── municipal.js            (Municipal dashboard & actions)
│       └── map.js                  (Google Maps with issue markers)
│
└── README.md
```

## Features

### Citizen Module
- **Register/Login** with role selection (Citizen or Municipal)
- **Report Issues** with:
  - Issue type (Pothole, Road Blockage, Water Leakage, Broken Street Light, Garbage Overflow)
  - Description & image upload
  - Auto-detect location via browser GPS
- **View Issues on Map** with color-coded severity:
  - 🔴 Red = High
  - 🟡 Yellow = Medium
  - 🟢 Green = Low
- Click markers to see issue details and images

### Municipal Module
- **Dashboard** showing all reported issues in a table
- **Assign Worker** – change issue status to "Assigned"
- **Mark as Resolved** – close out issues
- **View Location on Map** – open specific issue location

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login & get JWT token |
| POST | `/api/issues` | ✅ Citizen | Report new issue |
| GET | `/api/issues` | ✅ Any | List all issues |
| PUT | `/api/issues/:id/assign` | ✅ Municipal | Assign to worker |
| PUT | `/api/issues/:id/resolve` | ✅ Municipal | Mark resolved |

## Authentication

- Uses **JWT tokens** stored in `localStorage`
- **Role-based access control:** Citizens can only report; Municipalities can manage
- Token includes: `id`, `name`, `role`
- Tokens expire in **12 hours**

## Storage

- **Mock Database:** `backend/data.json` (in-memory JSON file)
- **Images:** Saved to `backend/uploads/` via multer
- No external database required – everything is demo-ready

## Important Setup Notes

### Google Maps API Key

1. Get a free API key from [Google Cloud Console](https://console.cloud.google.com)
2. Replace `YOUR_GOOGLE_MAPS_API_KEY` in `frontend/pages/issue-map.html`
3. Enable these APIs in your project:
   - Maps JavaScript API
   - Geolocation API

### CORS

The frontend expects the backend at `http://localhost:5000`. If you run it elsewhere, update the `API` constant in `frontend/js/auth.js` and other JS files.

## Demo Credentials

To test, register a user with:
- **Name:** Test User
- **Email:** test@example.com
- **Password:** password123
- **Role:** Citizen (or Municipal)

## Next Steps

1. Install dependencies: `npm install`
2. Run the backend: `npm run dev`
3. Open `frontend/pages/index.html` in your browser
4. Register and start reporting issues!

---

**Ready for your hackathon presentation!** Clean, comment-rich code with modern Bootstrap UI.
