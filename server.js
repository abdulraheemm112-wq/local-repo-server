const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const storagePath = path.join(__dirname, 'storage');
const downloadsFile = path.join(__dirname, 'downloads.json');
const likesFile = path.join(__dirname, 'likes.json');
const wishlistFile = path.join(__dirname, 'wishlist.json');

// Utility function
function readJSON(file, defaultValue) {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify(defaultValue));
  }
  return JSON.parse(fs.readFileSync(file));
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

/* -------------------- API ROUTES -------------------- */

// Get all files
app.get('/api/files', (req, res) => {
  const downloads = readJSON(downloadsFile, {});
  const likes = readJSON(likesFile, {});

  let result = [];

  const categories = fs.readdirSync(storagePath, { withFileTypes: true })
    .filter(d => d.isDirectory());

  categories.forEach(category => {
    const files = fs.readdirSync(path.join(storagePath, category.name));

    files.forEach(file => {
      const filePath = path.join(storagePath, category.name, file);
      const size = fs.statSync(filePath).size;

      result.push({
        name: file,
        category: category.name,
        size,
        downloads: downloads[file] || 0,
        likes: likes[file] || 0
      });
    });
  });

  res.json(result);
});

// Love file
app.post('/api/love/:file', (req, res) => {
  const likes = readJSON(likesFile, {});
  const file = req.params.file;

  likes[file] = (likes[file] || 0) + 1;
  writeJSON(likesFile, likes);

  res.json({ success: true });
});

// Wishlist - Get
app.get('/api/wishlist', (req, res) => {
  const wishlist = readJSON(wishlistFile, []);
  res.json(wishlist);
});

// Wishlist - Add
app.post('/api/wishlist', (req, res) => {
  const wishlist = readJSON(wishlistFile, []);
  const { item } = req.body;

  if (item && !wishlist.includes(item)) {
    wishlist.push(item);
    writeJSON(wishlistFile, wishlist);
  }

  res.json({ success: true });
});

// Wishlist - Remove
app.delete('/api/wishlist/:item', (req, res) => {
  let wishlist = readJSON(wishlistFile, []);
  const item = decodeURIComponent(req.params.item);

  wishlist = wishlist.filter((i) => i !== item);
  writeJSON(wishlistFile, wishlist);

  res.json({ success: true });
});

// Download route
app.get('/download/:category/:filename', (req, res) => {
  const { category, filename } = req.params;
  const filePath = path.join(storagePath, category, filename);

  const downloads = readJSON(downloadsFile, {});
  downloads[filename] = (downloads[filename] || 0) + 1;
  writeJSON(downloadsFile, downloads);

  res.download(filePath);
});

/* ---------------------------------------------------- */

app.listen(5000, '0.0.0.0', () => {
  console.log('Backend API running on port 5000');
});
