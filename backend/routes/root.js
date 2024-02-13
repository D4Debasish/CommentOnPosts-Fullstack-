const express = require('express');
const path = require('path');
// const { fileURLToPath } = require('url');
// const { dirname } = require('path');

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const router = express.Router();

router.get('^/$|/index(.html)?', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = router;
