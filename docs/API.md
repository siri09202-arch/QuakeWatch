# QuakeWatch API & WebSocket Reference

## REST API Endpoints

### Authentication

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "user123",
  "email": "user@example.com",
  "password": "securepass123",
  "fullName": "John Doe"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "id": "uuid",
    "username": "user123",
    "email": "user@example.com",
    "token": "jwt_token"
  }
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepass123"
}

Response: 200 OK
{
  "success": true,
  "data": {
    "token": "jwt_token",
    "user": { ... }
  }
}
```

### Earthquakes

#### Get All Earthquakes
```
GET /api/earthquakes?page=1&limit=20&minMagnitude=3.0&days=7

Query Parameters:
- page: number (default: 1)
- limit: number (default: 20, max: 100)
- minMagnitude: number (default: 0)
- days: number (default: 1)
- region: string (optional)
- sortBy: 'time' | 'magnitude' (default: 'time')
- order: 'asc' | 'desc' (default: 'desc')

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "eventId": "20260511123456",
      "magnitude": 5.8,
      "depth": 10.5,
      "latitude": 37.5,
      "longitude": 138.0,
      "locationName": "Niigata Prefecture",
      "originTime": "2026-05-11T12:34:56.000Z",
      "eventType": "earthquake",
      "dataSource": "jma",
      "createdAt": "2026-05-11T12:35:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "hasMore": true
  }
}
```

#### Get Earthquake by ID
```
GET /api/earthquakes/{id}

Response: 200 OK
{
  "success": true,
  "data": { ... }
}
```

#### Get Earthquake Intensity Data
```
GET /api/earthquakes/{id}/intensity

Response: 200 OK
{
  "success": true,
  "data": {
    "earthquakeId": "uuid",
    "observations": [
      {
        "stationId": "uuid",
        "stationCode": "N.NGTH01",
        "stationName": "Niigata City",
        "intensity": 5.2,
        "acceleration": 612.5,
        "velocity": 45.8,
        "displacement": 12.3
      }
    ]
  }
}
```

### Earthquake Early Warning (EEW)

#### Get Latest EEW Alerts
```
GET /api/eew-alerts?limit=10&status=active

Query Parameters:
- limit: number (default: 10)
- status: 'initial' | 'update' | 'final' (optional)

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "alertId": "20260511_123456_01",
      "reportNum": 1,
      "status": "initial",
      "magnitude": 5.8,
      "depth": 10.5,
      "latitude": 37.5,
      "longitude": 138.0,
      "originTime": "2026-05-11T12:34:56.000Z",
      "announcedAt": "2026-05-11T12:34:58.000Z"
    }
  ]
}
```

### Seismic Stations

#### Get All Stations
```
GET /api/stations?limit=100&network=K-NET

Query Parameters:
- limit: number (default: 100)
- network: string (optional: 'K-NET', 'KiK-net', etc.)
- region: string (optional)

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "stationCode": "N.NGTH01",
      "stationName": "Niigata City",
      "latitude": 37.9,
      "longitude": 139.1,
      "network": "K-NET",
      "depth": 0
    }
  ]
}
```

#### Get Station Details
```
GET /api/stations/{id}

Response: 200 OK
{
  "success": true,
  "data": { ... }
}
```

#### Get Station Waveform Data
```
GET /api/stations/{id}/waveform?earthquakeId={earthquakeId}

Query Parameters:
- earthquakeId: string (required for specific event)

Response: 200 OK
{
  "success": true,
  "data": {
    "stationId": "uuid",
    "earthquakeId": "uuid",
    "channels": [
      {
        "name": "Z (Vertical)",
        "data": [0.1, 0.2, -0.1, ...]
      },
      {
        "name": "NS (North-South)",
        "data": [...]
      },
      {
        "name": "EW (East-West)",
        "data": [...]
      }
    ]
  }
}
```

### User Settings

#### Get Notification Settings
```
GET /api/users/me/notification-settings
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "data": {
    "id": "uuid",
    "intensityThreshold": 3,
    "magnitudeThreshold": 3.0,
    "locationRadiusKm": 100,
    "locationLatitude": 35.6762,
    "locationLongitude": 139.6503,
    "notifyViaEmail": true,
    "notifyViaPush": true,
    "notifyViaSound": true
  }
}
```

#### Update Notification Settings
```
PUT /api/users/me/notification-settings
Authorization: Bearer {token}
Content-Type: application/json

{
  "intensityThreshold": 4,
  "magnitudeThreshold": 4.0,
  "locationLatitude": 35.6762,
  "locationLongitude": 139.6503,
  "locationRadiusKm": 50
}

Response: 200 OK
{
  "success": true,
  "data": { ... }
}
```

### Notifications

#### Get User Notifications
```
GET /api/users/me/notifications?unreadOnly=false&limit=20
Authorization: Bearer {token}

Query Parameters:
- unreadOnly: boolean (default: false)
- limit: number (default: 20)

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Earthquake Alert",
      "message": "Magnitude 5.8 earthquake detected near Tokyo",
      "type": "earthquake",
      "read": false,
      "createdAt": "2026-05-11T12:35:00.000Z"
    }
  ]
}
```

#### Mark Notification as Read
```
POST /api/users/me/notifications/{id}/read
Authorization: Bearer {token}

Response: 200 OK
```

## WebSocket Events

### Client → Server

#### Subscribe to Earthquakes
```json
{
  "type": "subscribe:earthquakes",
  "data": {
    "minMagnitude": 3.0,
    "region": "japan"
  }
}
```

#### Subscribe to EEW Alerts
```json
{
  "type": "subscribe:eew",
  "data": {}
}
```

#### Subscribe to Station Updates
```json
{
  "type": "subscribe:stations",
  "data": {
    "stationCodes": ["N.NGTH01", "N.NGTH02"]
  }
}
```

#### Subscribe to Personal Notifications
```json
{
  "type": "subscribe:notifications",
  "data": {
    "token": "jwt_token"
  }
}
```

### Server → Client

#### Earthquake Detected
```json
{
  "type": "earthquake:detected",
  "data": {
    "id": "uuid",
    "eventId": "20260511123456",
    "magnitude": 5.8,
    "depth": 10.5,
    "latitude": 37.5,
    "longitude": 138.0,
    "locationName": "Niigata Prefecture",
    "originTime": "2026-05-11T12:34:56.000Z"
  },
  "timestamp": "2026-05-11T12:35:00.000Z"
}
```

#### EEW Alert Received
```json
{
  "type": "eew:alert",
  "data": {
    "alertId": "20260511_123456_01",
    "reportNum": 1,
    "status": "initial",
    "magnitude": 5.8,
    "depth": 10.5,
    "latitude": 37.5,
    "longitude": 138.0,
    "originTime": "2026-05-11T12:34:56.000Z"
  },
  "timestamp": "2026-05-11T12:34:58.000Z"
}
```

#### Intensity Update
```json
{
  "type": "intensity:update",
  "data": {
    "earthquakeId": "uuid",
    "stationCode": "N.NGTH01",
    "intensity": 5.2,
    "acceleration": 612.5,
    "velocity": 45.8,
    "displacement": 12.3
  },
  "timestamp": "2026-05-11T12:35:05.000Z"
}
```

#### User Notification
```json
{
  "type": "notification:new",
  "data": {
    "id": "uuid",
    "title": "Strong Earthquake Alert",
    "message": "A strong earthquake has been detected near you",
    "type": "earthquake",
    "createdAt": "2026-05-11T12:35:00.000Z"
  },
  "timestamp": "2026-05-11T12:35:00.000Z"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Invalid request parameters",
  "message": "Parameter 'limit' must be a number"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "Authentication token is missing or invalid"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Not found",
  "message": "Earthquake with id 'xyz' not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "An unexpected error occurred"
}
```

## Authentication

All protected endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

Tokens expire after 7 days. Refresh tokens can be used to obtain new tokens.

## Rate Limiting

API requests are rate limited:
- General endpoints: 10 requests/second
- API endpoints: 100 requests/second
- Authentication: 5 requests/minute per IP

Exceeding limits returns 429 Too Many Requests.

## CORS

CORS is enabled for configured origins. For local development, requests from `http://localhost:3000` are allowed.
