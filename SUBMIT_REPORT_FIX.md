# 📝 InfraSafe - Submit Report Fix Guide

## ✅ What Was Fixed

1. **Better error handling** in the submit form
2. **Token validation** - checks if user is logged in
3. **Description validation** - requires description
4. **Detailed error messages** - tells you exactly what went wrong
5. **Navbar added** to report page so you know you're logged in
6. **Map error handling** - gracefully shows message if API key not set

---

## 🧪 Step-by-Step Test

### Step 1: Make Sure Backend is Running
Check the terminal - you should see:
```
✅ InfraSafe server running on http://localhost:5000
```

If NOT running, start it:
```bash
cd c:\Users\wankh\OneDrive\Desktop\infrasafe\InfraSafe\backend
npm run dev
```

### Step 2: Open Frontend
Open in browser:
```
c:\Users\wankh\OneDrive\Desktop\infrasafe\InfraSafe\frontend\pages\index.html
```

### Step 3: Register (if not already)
1. Click **Register**
2. Fill in:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
   - Role: **Citizen** ← Important!
3. Click **Register**

### Step 4: Login
1. You'll be redirected to Login
2. Use:
   - Email: `test@example.com`
   - Password: `password123`
3. Click **Login**

You should now see **Citizen Dashboard**

### Step 5: Report an Issue (THE TEST!)
1. Click **"Report an Issue"** button
2. You'll see the Report Form with a navbar (proving you're logged in)
3. Fill in:
   - **Issue Type:** Select one (e.g., "Pothole")
   - **Description:** Type something like "Large pothole on Main Street"
   - **Image:** (Optional) Upload a photo
   - **Location:** Click "📍 Detect Location" to add GPS coords
4. Click **"✅ Submit Report"**

### Expected Results

**If it works:**
- ✅ You'll see: `✅ Issue reported successfully!`
- ✅ You'll be redirected back to Citizen Dashboard
- ✅ Check [data.json](../InfraSafe/backend/data.json) - your issue should be there

**If it fails:**
- ❌ You'll see a specific error message explaining the problem
- Common errors:
  - "You must be logged in" → Login first
  - "Connection error" → Backend not running
  - Other errors → Backend will log them

---

## 🔍 Debugging

### Check Backend Logs
Look at the terminal running `npm run dev` - any API errors will show there.

### Check Browser Console
Press `F12` in browser → **Console** tab:
- Look for red errors
- Check network requests (Network tab)
- The "Submit error" messages will appear here if there's an issue

### Common Problems

**Problem:** "Connection error"
- **Fix:** Make sure backend is running on port 5000

**Problem:** "You must be logged in"
- **Fix:** Register and login first

**Problem:** No error message, nothing happens
- **Fix:** Check browser console (F12)
- The form might have JavaScript errors

---

## 📊 Where Your Report is Saved

After submitting, your report is saved in:
```
c:\Users\wankh\OneDrive\Desktop\infrasafe\InfraSafe\backend\data.json
```

It will look like:
```json
{
  "users": [...],
  "issues": [
    {
      "id": "1769762530513",
      "type": "Pothole",
      "description": "Large pothole on Main Street",
      "image": "/uploads/timestamp-filename.png",
      "location": {
        "lat": 20.5937,
        "lng": 78.9629
      },
      "status": "Pending",
      "severity": "High",
      "reporterId": "...",
      "reporterName": "Test User",
      "createdAt": "2026-01-30T..."
    }
  ]
}
```

---

## ✨ What You Can Do Now

1. **Report Multiple Issues** - Try reporting different issue types
2. **View on Map** - After reporting, go to "View Issues on Map" (if you add Google Maps API key)
3. **Test Municipal Dashboard** - Register as "Municipal" role to see all reports and manage them
4. **Upload Images** - Try uploading a photo with each report (saves to `/uploads/`)

---

## 🎯 Next Steps

1. **Optional:** Add Google Maps API key for full map functionality
2. **Optional:** Deploy to a real server
3. **Ready:** Your hackathon project is complete!

Good luck! 🚀
