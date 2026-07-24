const express = require('express');
const path = require('path');

const app = express();
const PORT = 45604;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get(['/', '/index', '/index.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/user', (req, res) => {
  const userId = req.query.id;

  if (!userId) {
    return res.status(400).send('The id query parameter is required.');
  }

  res.send(`User ID is ${userId}`);
});


app.get('/process-get', (req, res) => {
  const { first_name, last_name } = req.query;

  if (!first_name || !last_name) {
    return res.status(400).json({
      error: 'Both first_name and last_name are required.'
    });
  }

  res.json({
    first_name,
    last_name
  });
});

// 3. POST Routes
// Process POST form submission
app.post('/process-post', (req, res) => {
  const { first_name, last_name } = req.body;

  if (!first_name || !last_name) {
    return res.status(400).json({
      error: 'Both first_name and last_name are required.'
    });
  }

  res.status(200).json({
    message: 'Form submitted successfully.',
    first_name,
    last_name
  });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});