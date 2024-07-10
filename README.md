# Excel DB with Express Gateway API

This repository contains the setup for an Express Gateway API that proxies requests to a backend Excel API service.

## Overview

This Express Gateway API serves as a middleware that routes requests to an Excel API backend. It provides a centralized point of access and includes basic policies for managing API traffic.

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- npm (Node Package Manager)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

### Configuration

1. **Edit `gateway.config.yml` to configure services and policies:**

   ```yaml
   http:
     port: 3001
     services:
       your_excel_api:
         url: 'http://localhost:3000'
   policies:
     - proxy:
         - action:
             serviceEndpoint: your_excel_api
             changeOrigin: true
             rewritePath: '^/api/data/(.*) /api/data/$1'
   ```

   - Replace `your_excel_api` with the name of your backend service endpoint.
   - Adjust `url` to match your backend service URL.

### Usage

1. **Start the Express Gateway server:**

   ```bash
   eg gateway start
   ```

2. **Access your gateway API at:**

   ```plaintext
   http://localhost:3001/api/data
   ```

   Ensure your backend Excel API (`http://localhost:3000/api/data`) is running and accessible.

### API Endpoints

- **GET /api/data**: Retrieves data from the Excel API.
- **POST /api/data**: Adds new data to the Excel API.
- **PUT /api/data/:id**: Updates data in the Excel API.
- **DELETE /api/data/:id**: Deletes data from the Excel API.

### Troubleshooting

- Check console logs for any errors or warnings.
- Ensure backend services are correctly configured and accessible.

## Built With

- [Express Gateway](https://www.express-gateway.io/) - API Gateway for Express.js
- [Node.js](https://nodejs.org/) - JavaScript runtime
- [npm](https://www.npmjs.com/) - Node Package Manager

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
© 2024 Ashin Varghese. All rights reserved.

## Acknowledgments

- Express Gateway community for providing a powerful API gateway solution.

