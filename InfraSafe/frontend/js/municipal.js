const API = 'http://localhost:5000/api';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) logoutBtn.addEventListener('click', () => { localStorage.removeItem('token'); localStorage.removeItem('user'); window.location.href = 'index.html'; });

async function loadIssues() {
  const res = await fetch(`${API}/issues`, { headers: { Authorization: `Bearer ${token}` } });
  const json = await res.json();
  const tbody = document.querySelector('#issuesTable tbody');
  tbody.innerHTML = '';
  if (!json.issues) return;
  json.issues.forEach(issue => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${issue.type}</td>
      <td>${issue.location ? issue.location.lat.toFixed(4)+', '+issue.location.lng.toFixed(4) : 'N/A'}</td>
      <td>${issue.reporterName}</td>
      <td>${issue.status}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary view-map" data-lat="${issue.location ? issue.location.lat : ''}" data-lng="${issue.location ? issue.location.lng : ''}">Map</button>
        <button class="btn btn-sm btn-success assign" data-id="${issue.id}">Assign</button>
        <button class="btn btn-sm btn-secondary resolve" data-id="${issue.id}">Resolve</button>
      </td>`;
    tbody.appendChild(tr);
  });

  document.querySelectorAll('.assign').forEach(btn => btn.addEventListener('click', async (e) => {
    const id = e.target.dataset.id;
    await fetch(`${API}/issues/${id}/assign`, { method: 'PUT', headers: { Authorization: `Bearer ${token}` } });
    loadIssues();
  }));

  document.querySelectorAll('.resolve').forEach(btn => btn.addEventListener('click', async (e) => {
    const id = e.target.dataset.id;
    await fetch(`${API}/issues/${id}/resolve`, { method: 'PUT', headers: { Authorization: `Bearer ${token}` } });
    loadIssues();
  }));

  document.querySelectorAll('.view-map').forEach(btn => btn.addEventListener('click', (e) => {
    const lat = e.target.dataset.lat;
    const lng = e.target.dataset.lng;
    if (lat && lng) {
      const url = `../pages/issue-map.html?lat=${lat}&lng=${lng}`;
      window.open(url, '_blank');
    } else alert('No location available');
  }));
}

loadIssues();
