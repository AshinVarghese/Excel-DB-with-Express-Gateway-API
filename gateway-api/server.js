const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001; // The port for the gateway

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Service URLs
const serviceUrls = {
  excelApi: 'http://localhost:3000', // URL of your original Excel API server
};

// Proxy setup for the Excel API
app.use('/api/data', createProxyMiddleware({
  target: serviceUrls.excelApi,
  changeOrigin: true,
  pathRewrite: {
    '^/api/data': '/api/data', // Rewrite URL
  },
}));

// Catch-all route to handle undefined routes
app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Gateway API server listening at http://localhost:${port}`);
});
