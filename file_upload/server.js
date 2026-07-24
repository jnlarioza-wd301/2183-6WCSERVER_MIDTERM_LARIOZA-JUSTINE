const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    callback(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

app.post('/uploads', upload.single('myFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file was uploaded.');
  }

  res.status(201).send(
    `File uploaded successfully: ${req.file.filename}`
  );
});

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).send(`Upload error: ${error.message}`);
  }

  console.error(error);
  res.status(500).send('An unexpected server error occurred.');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});