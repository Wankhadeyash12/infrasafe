const API = 'http://localhost:5000/api';

async function postJSON(url, data) {
  try {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    return res.json();
  } catch (err) {
    console.error('Fetch error:', err);
    return { message: 'Connection error. Is the backend running on http://localhost:5000?' };
  }
}

// Register
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const res = await postJSON(`${API}/auth/register`, { name, email, password, role });
    if (res.message && res.message.includes('already')) {
      alert('❌ ' + res.message);
    } else if (res.message && res.message.includes('success')) {
      alert('✅ Registered successfully! Redirecting to login...');
      window.location.href = 'login.html';
    } else {
      alert('✅ ' + (res.message || 'Registered. Please login.'));
      window.location.href = 'login.html';
    }
  });
}

// Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const res = await postJSON(`${API}/auth/login`, { email, password });
    if (res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      alert('✅ Login successful!');
      if (res.user.role === 'Citizen') window.location.href = 'citizen-dashboard.html';
      else window.location.href = 'municipal-dashboard.html';
    } else {
      alert('❌ ' + (res.message || 'Login failed'));
    }
  });
}
