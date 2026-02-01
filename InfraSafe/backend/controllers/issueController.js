const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data.json');

function readData() {
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(raw || '{"users":[],"issues":[]}');
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function severityForType(type) {
  switch (type) {
    case 'Pothole': return 'High';
    case 'Water Leakage': return 'Medium';
    case 'Broken Street Light': return 'Low';
    case 'Garbage Overflow': return 'Medium';
    case 'Road Blockage': return 'High';
    default: return 'Low';
  }
}

function createIssue(req, res) {
  try {
    const data = readData();
    const { type, description, lat, lng } = req.body;
    const file = req.file;
    if (!type || !description) return res.status(400).json({ message: 'Missing fields' });
    const issue = {
      id: Date.now().toString(),
      type,
      description,
      image: file ? `/uploads/${file.filename}` : null,
      location: lat && lng ? { lat: parseFloat(lat), lng: parseFloat(lng) } : null,
      status: 'Pending',
      severity: severityForType(type),
      reporterId: req.user.id,
      reporterName: req.user.name,
      createdAt: new Date().toISOString()
    };
    data.issues.push(issue);
    writeData(data);
    res.json({ message: 'Issue reported', issue });
  } catch (err) {
    console.error('Error creating issue:', err);
    res.status(500).json({ message: 'Error creating issue', error: err.message });
  }
}

function getIssues(req, res) {
  const data = readData();
  res.json({ issues: data.issues });
}

function assignIssue(req, res) {
  const id = req.params.id;
  const data = readData();
  const issue = data.issues.find(i => i.id === id);
  if (!issue) return res.status(404).json({ message: 'Issue not found' });
  issue.status = 'Assigned';
  writeData(data);
  res.json({ message: 'Issue assigned', issue });
}

function resolveIssue(req, res) {
  const id = req.params.id;
  const data = readData();
  const issue = data.issues.find(i => i.id === id);
  if (!issue) return res.status(404).json({ message: 'Issue not found' });
  issue.status = 'Resolved';
  writeData(data);
  res.json({ message: 'Issue resolved', issue });
}

module.exports = { createIssue, getIssues, assignIssue, resolveIssue };
