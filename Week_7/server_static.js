const express = require('express');
const app = express();

const PORT = 45845;


app.use(express.static('public'));


app.get('/', (req, res) => {
  res.send('You have successfully created the app!');
});


app.get('/profile', (req, res) => {
  res.send(`
    <h1>User Profile</h1>
    <p><strong>Name:</strong> John Doe</p>
    <p><strong>Role:</strong> Web Developer</p>
    <p><strong>Bio:</strong> Learning Express.js and building awesome web apps!</p>
  `);
});

// Start the server
const server = app.listen(PORT, () => {
  const addr = server.address();
  
  if (!addr) {
    console.log('Server is running, but address details are unavailable.');
    return;
  }

  const host = addr.address === '::' ? 'localhost' : addr.address;
  const port = addr.port;

  console.log(`Server running at http://${host}:${port}/`);
});

// Handle port conflict errors cleanly
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use.`);
  } else {
    console.error('Server error:', err);
  }
});