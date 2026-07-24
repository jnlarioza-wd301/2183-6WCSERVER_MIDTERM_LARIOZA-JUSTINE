const express = require('express');
const app = express();

const PORT = 50600;

app.get('/', (req, res) => {
    console.log("There is GET request for the homepage!");
    res.send('This is Page Listing!');
});

const server = app.listen(PORT, () => {
  const addr = server.address();

  if (!addr) {
    return;
  }

  const host = addr.address === '::' ? 'localhost' : addr.address;
  const port = addr.port;

  console.log(`Server running at http://${host}:${port}/`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use! Stop the previous server or change PORT.`);
  } else {
    console.error('Server error:', err);
  }
});