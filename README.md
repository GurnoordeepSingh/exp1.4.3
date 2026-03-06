# Concurrent Ticket Booking System using Redis

## Aim
To implement a concurrent ticket booking system with seat locking using Redis and test it using load testing.

## Technologies Used
- Node.js
- Express.js
- Redis
- Artillery (Load Testing)

## Project Structure

```
ticket-booking-system
│
├── booking-system.js
├── load-test.yml
├── package.json
├── package-lock.json
└── README.md
```

## API Endpoint

POST /api/book

Example Response:

```json
{
  "success": true,
  "bookingId": 1718369248709,
  "remaining": 99
}
```

## Running the Project

### 1. Start Redis
```
redis-server
```

### 2. Start Node Server
```
node booking-system.js
```

### 3. Test API
```
POST http://localhost:3000/api/book
```

## Load Testing

Run the concurrency test using Artillery:

```
artillery run load-test.yml
```

This simulates multiple users booking tickets simultaneously.

## Output

The system successfully handled concurrent requests and returned HTTP 200 responses for all requests.
