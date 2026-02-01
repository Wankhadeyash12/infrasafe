const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { createIssue, getIssues, assignIssue, resolveIssue } = require('../controllers/issueController');
const { authenticate, authorizeRole } = require('../controllers/authController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post('/', authenticate, authorizeRole('Citizen'), upload.single('image'), createIssue);
router.get('/', authenticate, getIssues);
router.put('/:id/assign', authenticate, authorizeRole('Municipal'), assignIssue);
router.put('/:id/resolve', authenticate, authorizeRole('Municipal'), resolveIssue);

module.exports = router;
