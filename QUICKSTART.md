# 🚀 InfraSafe - Quick Start Guide

## ✅ What's Fixed

- ✅ Created `uploads/` folder for image storage
- ✅ Cleared invalid data from `data.json` 
- ✅ Added auto-create uploads folder in server
- ✅ Added error handling for missing files
- ✅ Better error messages in frontend
- ✅ Graceful Google Maps API key handling

## 🏃 How to Run

### Step 1: Backend is Already Running!
The backend server is running on **http://localhost:5000**

You can see it in the terminal showing:
```
✅ InfraSafe server running on http://localhost:5000
```

### Step 2: Open the Frontend
Open this file in your browser:
```
c:\Users\wankh\OneDrive\Desktop\infrasafe\InfraSafe\frontend\pages\index.html
```

Or use a browser directly:
- Right-click on `index.html`
- Select "Open with" → Your preferred browser

### Step 3: Test the Application

**Quick Test Flow:**
1. Click **Register**
2. Fill in:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
   - Role: `Citizen`
3. Click **Register**
4. You'll be redirected to **Login**
5. Use same email/password to login
6. You should see **Citizen Dashboard**
7. Click **Report an Issue** to test the form
8. Click **Detect Location** (allow browser GPS)
9. Submit the report

## 📝 Important Notes

### Google Maps API (Optional)
To enable the map visualization:
1. Get a free API key from: https://console.cloud.google.com
2. Open `frontend/pages/issue-map.html`
3. Find this line:
   ```html
   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY"></script>
   ```
4. Replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual key
5. Restart the app - maps will now work!

### Test as Municipal User
To test the municipal dashboard:
1. Register with:
   - Role: `Municipal`
2. Login with your credentials
3. You'll see the **Municipal Dashboard** with issue management

## 🐛 Troubleshooting

### "Connection error" when registering/logging in
- Check if backend is still running (should show in terminal)
- Ensure terminal shows: `✅ InfraSafe server running on http://localhost:5000`

### Maps not showing
- You haven't added a Google Maps API key yet (see instructions above)
- Or the API key is invalid

### Issues not saving
- Check backend console for errors
- Make sure `data.json` file exists in `backend/`

## 📂 File Structure
```
InfraSafe/
├── backend/
│   ├── server.js              (Express server)
│   ├── data.json              (Database)
│   ├── package.json           (Dependencies)
│   ├── uploads/               (Image storage)
│   ├── controllers/
│   │   ├── authController.js
│   │   └── issueController.js
│   └── routes/
│       ├── auth.js
│       └── issues.js
└── frontend/
    ├── pages/                 (7 HTML pages)
    ├── js/                    (4 JS files)
    └── css/                   (Styling)
```

## 🎯 API Endpoints (for testing)
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/issues` - Create issue (Citizen only)
- `GET /api/issues` - List all issues
- `PUT /api/issues/:id/assign` - Assign worker (Municipal only)
- `PUT /api/issues/:id/resolve` - Resolve issue (Municipal only)

---

**Ready for your hackathon! 🎉**
