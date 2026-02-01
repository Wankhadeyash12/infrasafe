const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const authRoutes = require('./routes/auth');
const issueRoutes = require('./routes/issues');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use('/uploads', express.static(uploadsDir));

app.use('/api/auth', authRoutes);
app.use('/api/issues', issueRoutes);

app.get('/', (req, res) => {
  res.send('InfraSafe API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ InfraSafe server running on http://localhost:${PORT}`));
