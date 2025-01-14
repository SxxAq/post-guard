# Post Guard API

Post Guard is a security-focused API monitoring system built with TypeScript and Express. It tracks failed API requests, alerts on suspicious activity, and provides detailed metrics for analysis.

## Features

- Request monitoring and validation
- Failure tracking with IP-based rate limiting
- Email alerts for suspicious activity
- JWT-based authentication
- Metrics endpoint for analysis
- Header validation

## Technology Stack

- **Backend**: TypeScript, Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT and Google OAuth2
- **Notifications**: Nodemailer

## Endpoints

- `POST /api/login`: Authentication
- `POST /api/submit`: Monitors API requests
- `GET /api/metrics`: Access failure metrics

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sxxaq/post-guard.git
   cd post-guard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```env
   PORT=3000
   MONGODB_URI=your-mongodb-uri
   FAILURE_THRESHOLD=5
   TIME_WINDOW_MINUTES=10
   NODE_ENV=development
   JWT_SECRET=your-jwt-secret
   JWT_EXPIRATION=24h
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GOOGLE_REFRESH_TOKEN=your-google-refresh-token
   EMAIL=your-email@example.com
   ALERT_EMAIL=alert-recipient@example.com
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## Usage

1. Get a JWT token:

   ```bash
   curl -X POST http://localhost:3000/api/login \
     -d '{"username": "admin", "password": "admin123"}'
   ```

2. Test the API:

   - Valid request:
     ```bash
     curl -X POST http://localhost:3000/api/submit \
       -H "Authorization: Bearer <valid_token>" \
       -d '{"data": "example"}'
     ```
   - Invalid request:
     ```bash
     curl -X POST http://localhost:3000/api/submit
     ```

3. View metrics:
   ```bash
   curl -X GET http://localhost:3000/api/metrics \
     -H "Authorization: Bearer <valid_token>"
   ```

## Security Features

- Rate limiting by IP address
- JWT authentication
- Required header validation
- Secure email notifications using Google OAuth2
- Persistent storage of security events in MongoDB

## License

This project is licensed under the [MIT License](LICENSE).

## Author

[Saalim Aqueel](https://github.com/SxxAq)
