const API = 'http://localhost:5000/api';

// Populate welcome
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const welcome = document.getElementById('welcome');
if (welcome && user) welcome.textContent = `Welcome, ${user.name}`;

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) logoutBtn.addEventListener('click', () => { localStorage.removeItem('token'); localStorage.removeItem('user'); window.location.href = '../pages/index.html'; });

// Report form
const reportForm = document.getElementById('reportForm');
if (reportForm) {
  const detectBtn = document.getElementById('detectBtn');
  const locStatus = document.getElementById('locStatus');
  detectBtn.addEventListener('click', () => {
    locStatus.textContent = 'Detecting...';
    navigator.geolocation.getCurrentPosition((pos) => {
      document.getElementById('lat').value = pos.coords.latitude;
      document.getElementById('lng').value = pos.coords.longitude;
      locStatus.textContent = `✅ Location detected`;
    }, (err) => { locStatus.textContent = '❌ Location denied'; });
  });

  reportForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    // Check if user is logged in
    if (!token) {
      alert('❌ You must be logged in to report an issue. Redirecting to login...');
      window.location.href = 'login.html';
      return;
    }

    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;
    const imageInput = document.getElementById('image');
    const lat = document.getElementById('lat').value;
    const lng = document.getElementById('lng').value;
    
    if (!description) {
      alert('❌ Please enter a description');
      return;
    }

    const fd = new FormData();
    fd.append('type', type);
    fd.append('description', description);
    if (imageInput.files[0]) fd.append('image', imageInput.files[0]);
    if (lat) fd.append('lat', lat);
    if (lng) fd.append('lng', lng);

    try {
      const res = await fetch(`${API}/issues`, { 
        method: 'POST', 
        headers: { Authorization: `Bearer ${token}` }, 
        body: fd 
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        alert('❌ ' + (errorData.message || `Error: ${res.status}`));
        return;
      }
      
      const json = await res.json();
      if (json.issue) {
        alert('✅ Issue reported successfully!');
        window.location.href = 'citizen-dashboard.html';
      } else {
        alert('❌ ' + (json.message || 'Failed to report issue'));
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('❌ Connection error: ' + err.message + '\n\nMake sure the backend is running on http://localhost:5000');
    }
  });
}
