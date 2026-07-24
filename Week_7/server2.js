const express = require('express');
const app = express();

const PORT = 50400;

// Define the root route (fixes "Cannot GET /")
app.get('/', (req, res) => {
  res.send('You have successfully created your second app');
});

// Start the server
const server = app.listen(PORT, () => {
  const addr = server.address();
  
  if (!addr) {
    console.log('Server is running, but address details are unavailable.');
    return;
  }

  // Handle IPv6 (::) formatting for clean terminal output
  const host = addr.address === '::' ? 'localhost' : addr.address;
  const port = addr.port;

  console.log(`Server running at http://${host}:${port}/`);
});

// Handle port conflict errors cleanly
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Try stopping other Node processes.`);
  } else {
    console.error('Server error:', err);
  }
});