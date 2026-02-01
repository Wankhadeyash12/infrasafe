const API = 'http://localhost:5000/api';

function severityColor(sev) {
  if (!sev) return 'green';
  if (sev.toLowerCase() === 'high') return 'red';
  if (sev.toLowerCase() === 'medium') return 'yellow';
  return 'green';
}

async function initMap() {
  // Check if Google Maps is loaded
  if (typeof google === 'undefined') {
    document.getElementById('map').innerHTML = '<div class="alert alert-warning" style="margin-top:20px; width:100%; height:80vh; display:flex; align-items:center; justify-content:center;"><div style="text-align:center;"><h5>⚠️ Google Maps Not Configured</h5><p>To enable maps, add your API key to issue-map.html</p></div></div>';
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const focusLat = parseFloat(urlParams.get('lat')) || null;
  const focusLng = parseFloat(urlParams.get('lng')) || null;

  const center = focusLat && focusLng ? { lat: focusLat, lng: focusLng } : { lat: 20.5937, lng: 78.9629 };
  const map = new google.maps.Map(document.getElementById('map'), { center, zoom: focusLat ? 15 : 5 });

  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API}/issues`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (!res.ok) {
      console.error('Failed to fetch issues:', res.status);
      return;
    }
    
    const json = await res.json();
    if (!json.issues) return;
    
    json.issues.forEach(issue => {
      if (!issue.location) return;
      const color = severityColor(issue.severity);
      const marker = new google.maps.Marker({
        position: issue.location,
        map,
        title: issue.type,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: color,
          fillOpacity: 0.8,
          strokeWeight: 1,
        }
      });
      const content = `<div style="max-width:250px"><h6>${issue.type}</h6><p><strong>Status:</strong> ${issue.status}</p><p>${issue.description}</p>${issue.image ? `<img src="${'http://localhost:5000'+issue.image}" class="issue-img" style="margin-top:10px; max-width:200px;"/>` : ''}</div>`;
      const info = new google.maps.InfoWindow({ content });
      marker.addListener('click', () => info.open(map, marker));
    });

    if (focusLat && focusLng) {
      new google.maps.Marker({ 
        position: { lat: focusLat, lng: focusLng }, 
        map,
        title: 'Selected Location'
      });
    }
  } catch (err) {
    console.error('Map error:', err);
  }
}

window.addEventListener('load', initMap);
