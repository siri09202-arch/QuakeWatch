# QuakeWatch - System Architecture

## Overview

QuakeWatch is a comprehensive web-based earthquake monitoring and early warning system built with modern web technologies. The system integrates data from multiple sources (JMA, Kyoshin Network, DM-D.S.S) to provide real-time earthquake information, early warning alerts, and seismic data visualization.

## Technology Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand
- **Styling**: Tailwind CSS + ShadcnUI
- **Maps**: Leaflet.js + Mapbox GL
- **Charts**: ECharts, D3.js
- **Real-time**: Socket.io Client
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL 14+
- **Cache**: Redis 7+
- **Real-time**: Socket.io
- **Validation**: Zod
- **Logging**: Pino

### DevOps
- **Containerization**: Docker & Docker Compose
- **Reverse Proxy**: Nginx
- **CI/CD**: GitHub Actions
- **Package Manager**: npm (monorepo)

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CDN / Static Assets                   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      Nginx Reverse Proxy                      │
│              (Load Balancing, SSL/TLS, Caching)              │
└─────────────────────────────────────────────────────────────┘
         ↓                                          ↓
    ┌────────────────┐                    ┌─────────────────┐
    │   Frontend     │                    │   API Server    │
    │  (React SPA)   │─────────────────→  │  (Express.js)   │
    │                │                    │                 │
    │ • Components   │ ←─────────────────│ • Controllers   │
    │ • Pages        │    REST API        │ • Services      │
    │ • Stores       │    WebSocket       │ • Models        │
    │ • Hooks        │                    │ • Parsers       │
    └────────────────┘                    └─────────────────┘
                                                  ↓
                            ┌─────────────────────┴──────────────────┐
                            ↓                                        ↓
                    ┌──────────────────┐              ┌──────────────────────┐
                    │   PostgreSQL     │              │      Redis Cache     │
                    │   Database       │              │   Session & Real-time│
                    │                  │              │                      │
                    │ • Earthquakes    │              │ • Active Sessions    │
                    │ • Stations       │              │ • Subscription Cache │
                    │ • Intensity Data │              │ • Rate Limiting      │
                    │ • Users          │              │ • Waveform Cache     │
                    │ • Notifications  │              │ • Event Streams      │
                    └──────────────────┘              └──────────────────────┘
```

## Data Flow Architecture

### Real-time Earthquake Detection Flow

```
External Data Sources
├── JMA (気象庁)
│   └── XML API
├── Kyoshin Network
│   └── Real-time Sensors
└── DM-D.S.S
    └── Disaster Information

        ↓
┌───────────────────────────────────────┐
│   Data Parsers & Processors           │
│ ├── JMA XML Parser                    │
│ ├── Kyoshin Data Processor            │
│ └── DM-D.S.S Parser                   │
└───────────────────────────────────────┘
        ↓
┌───────────────────────────────────────┐
│   Data Validation & Enrichment        │
│ ├── Schema Validation (Zod)           │
│ ├── Geolocation Enrichment            │
│ └── Intensity Calculation             │
└───────────────────────────────────────┘
        ↓
┌───────────────────────────────────────┐
│   Storage & Caching                   │
│ ├── PostgreSQL Database               │
│ └── Redis Cache                       │
└───────────────────────────────────────┘
        ↓
┌───────────────────────────────────────┐
│   Event Broadcasting                  │
│ ├── WebSocket Events                  │
│ ├── Push Notifications                │
│ └── Email Alerts                      │
└───────────────────────────────────────┘
        ↓
Frontend Application
├── Real-time Map Updates
├── Alert Notifications
├── Waveform Visualization
└── User Notifications
```

## Component Architecture

### Frontend Component Hierarchy

```
App
├── Layout
│   ├── Header
│   │   ├── Logo
│   │   ├── Navigation
│   │   ├── UserMenu
│   │   └── NotificationBell
│   ├── Sidebar
│   │   ├── MenuItems
│   │   └── Settings
│   └── Footer
├── Pages
│   ├── Home
│   │   ├── DashboardMap
│   │   ├── RecentEarthquakes
│   │   ├── EEWAlerts
│   │   └── Statistics
│   ├── Earthquakes
│   │   ├── EarthquakeList
│   │   ├── Filters
│   │   ├── Pagination
│   │   └── DetailModal
│   ├── Waveforms
│   │   ├── WaveformChart
│   │   ├── StationSelector
│   │   └── DataExport
│   ├── Settings
│   │   ├── NotificationSettings
│   │   ├── LocationSettings
│   │   └── PreferenceSettings
│   ├── Auth
│   │   ├── Login
│   │   ├── Register
│   │   └── PasswordReset
│   └── Profile
│       ├── UserInfo
│       ├── ActivityLog
│       └── NotificationHistory
└── Common Components
    ├── Modal
    ├── Toast
    ├── LoadingSpinner
    ├── ErrorBoundary
    └── MapComponent
```

### Backend Route Structure

```
API Server (Express)
├── /api/auth
│   ├── POST /login
│   ├── POST /register
│   ├── POST /logout
│   └── POST /refresh
├── /api/earthquakes
│   ├── GET / (list with filters)
│   ├── GET /:id (detail)
│   ├── GET /:id/intensity (intensity data)
│   └── GET /:id/waveform (waveform data)
├── /api/eew-alerts
│   ├── GET / (latest alerts)
│   └── GET /:id (alert detail)
├── /api/stations
│   ├── GET / (station list)
│   ├── GET /:id (station detail)
│   └── GET /:id/waveform (station waveform)
├── /api/users/me
│   ├── GET / (profile)
│   ├── PUT / (update profile)
│   ├── GET /notification-settings
│   └── PUT /notification-settings
└── /api/users/me/notifications
    ├── GET / (notification list)
    └── POST /:id/read (mark as read)

WebSocket Events
├── subscribe:earthquakes
├── subscribe:eew
├── subscribe:stations
├── subscribe:notifications
├── earthquake:detected
├── eew:alert
├── intensity:update
└── notification:new
```

## Database Schema

### Core Tables

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  username VARCHAR(16) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Earthquakes
CREATE TABLE earthquakes (
  id UUID PRIMARY KEY,
  event_id VARCHAR(50) UNIQUE NOT NULL,
  magnitude DECIMAL(3, 1) NOT NULL,
  depth DECIMAL(5, 1) NOT NULL,
  latitude DECIMAL(9, 6) NOT NULL,
  longitude DECIMAL(9, 6) NOT NULL,
  location_name VARCHAR(255),
  origin_time TIMESTAMP NOT NULL,
  event_type VARCHAR(20),
  data_source VARCHAR(20),
  is_processed BOOLEAN DEFAULT FALSE,
  intensity_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Stations
CREATE TABLE stations (
  id UUID PRIMARY KEY,
  station_code VARCHAR(50) UNIQUE NOT NULL,
  station_name VARCHAR(255) NOT NULL,
  latitude DECIMAL(9, 6) NOT NULL,
  longitude DECIMAL(9, 6) NOT NULL,
  network VARCHAR(20),
  depth DECIMAL(5, 1),
  station_type VARCHAR(50),
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Intensity Data
CREATE TABLE intensity_data (
  id UUID PRIMARY KEY,
  earthquake_id UUID REFERENCES earthquakes(id),
  station_id UUID REFERENCES stations(id),
  intensity DECIMAL(3, 1),
  acceleration DECIMAL(7, 2),
  velocity DECIMAL(7, 2),
  displacement DECIMAL(7, 2),
  recorded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- EEW Alerts
CREATE TABLE eew_alerts (
  id UUID PRIMARY KEY,
  alert_id VARCHAR(50) UNIQUE NOT NULL,
  report_num INT,
  status VARCHAR(20),
  magnitude DECIMAL(3, 1),
  depth DECIMAL(5, 1),
  latitude DECIMAL(9, 6),
  longitude DECIMAL(9, 6),
  origin_time TIMESTAMP,
  announced_at TIMESTAMP,
  data_source VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Notification Settings
CREATE TABLE notification_settings (
  id UUID PRIMARY KEY,
  user_id UUID UNIQUE REFERENCES users(id),
  intensity_threshold DECIMAL(3, 1) DEFAULT 3,
  magnitude_threshold DECIMAL(3, 1) DEFAULT 3.0,
  location_latitude DECIMAL(9, 6),
  location_longitude DECIMAL(9, 6),
  location_radius_km INT DEFAULT 100,
  notify_via_email BOOLEAN DEFAULT TRUE,
  notify_via_push BOOLEAN DEFAULT TRUE,
  notify_via_sound BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  earthquake_id UUID REFERENCES earthquakes(id),
  title VARCHAR(255),
  message TEXT,
  type VARCHAR(50),
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## State Management Flow (Frontend)

### Zustand Stores

```
useUserStore
├── user: UserData | null
├── isAuthenticated: boolean
├── login()
├── logout()
└── setUser()

useEarthquakeStore
├── earthquakes: EarthquakeData[]
├── selectedEarthquake: EarthquakeData | null
├── pagination: PaginationState
├── setEarthquakes()
├── selectEarthquake()
└── updatePagination()

useEEWStore
├── alerts: EEWAlertData[]
├── latestAlert: EEWAlertData | null
├── addAlert()
├── updateAlert()
└── clear()

useNotificationStore
├── notifications: NotificationData[]
├── unreadCount: number
├── addNotification()
├── markAsRead()
└── removeNotification()

useUIStore
├── sidebarOpen: boolean
├── theme: 'light' | 'dark'
├── language: 'en' | 'ja'
├── toggleSidebar()
├── setTheme()
└── setLanguage()
```

## WebSocket Real-time Architecture

```
Client                          Server
  ↓                               ↓
[Subscribe to earthquakes]  →  [Add to subscriber list]
  ↓                               ↓
[Subscribe to EEW]          →  [Add to subscriber list]
  ↓                               ↓
                            [New earthquake detected]
  ↓  ←  [earthquake:detected]  ←
[Update UI Map]             
  ↓                               ↓
[Update Store]              [Process new data]
  ↓                               ↓
[Notify User]               [Broadcast to all subscribers]
```

## Error Handling Strategy

```
┌─────────────────────────────┐
│    Error Occurrence         │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│  Error Classification       │
├─────────────────────────────┤
│ • Network Error             │
│ • Validation Error          │
│ • Authentication Error      │
│ • Server Error              │
│ • Not Found Error           │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│  Error Handler              │
├─────────────────────────────┤
│ • Log Error                 │
│ • Set Error State           │
│ • Show User Message         │
│ • Trigger Retry Logic       │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│    User Notification        │
├─────────────────────────────┤
│ • Toast Message             │
│ • Error Modal               │
│ • Error Boundary Recovery   │
└─────────────────────────────┘
```

## Performance Optimization

### Frontend
- **Code Splitting**: Lazy loading for pages and heavy components
- **Memoization**: React.memo, useMemo, useCallback
- **Image Optimization**: WebP format, lazy loading
- **Bundle Analysis**: Vite plugin for size monitoring
- **Caching Strategy**: HTTP caching headers, localStorage

### Backend
- **Database Indexing**: On frequently queried columns
- **Query Optimization**: Prepared statements, pagination
- **Redis Caching**: Hot data caching
- **API Rate Limiting**: DDoS and abuse prevention
- **Compression**: Gzip/Brotli response compression

## Security Architecture

```
┌──────────────────────────────────────┐
│       Authentication Layer           │
│ (JWT Tokens, Password Hashing)       │
└────────────┬─────────────────────────┘
             ↓
┌──────────────────────────────────────┐
│    Authorization Layer               │
│ (Role-based Access Control)          │
└────────────┬─────────────────────────┘
             ↓
┌──────────────────────────────────────┐
│    Input Validation Layer            │
│ (Zod Validation, Sanitization)       │
└────────────┬─────────────────────────┘
             ↓
┌──────────────────────────────────────┐
│    Business Logic Layer              │
│ (Safe Data Processing)               │
└────────────┬─────────────────────────┘
             ↓
┌──────────────────────────────────────┐
│    Data Persistence Layer            │
│ (Parameterized Queries)              │
└──────────────────────────────────────┘
```

## Deployment Architecture

```
┌─────────────────────────────────────────┐
│        GitHub Actions CI/CD             │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│    Build & Test Pipeline                │
├─────────────────────────────────────────┤
│ • Unit Tests                            │
│ • Integration Tests                     │
│ • Linting & Type Checking               │
│ • Build Frontend & Backend              │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│    Docker Image Build                   │
├─────────────────────────────────────────┤
│ • Frontend Image                        │
│ • Backend Image                         │
│ • Push to Registry                      │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│    Docker Compose Deployment            │
├─────────────────────────────────────────┤
│ • Pull Latest Images                    │
│ • Start Services                        │
│ • Run Database Migrations               │
│ • Health Checks                         │
└─────────────────────────────────────────┘
```

## Scalability Considerations

- **Horizontal Scaling**: Stateless API servers behind load balancer
- **Database Scaling**: Read replicas, connection pooling
- **Cache Layer**: Redis cluster for distributed caching
- **CDN**: For static assets and API response caching
- **Message Queue**: For async tasks (email, notifications)

## Monitoring & Observability

- **Logging**: Pino (structured logging)
- **Metrics**: Prometheus for system metrics
- **Tracing**: Request tracing for debugging
- **Health Checks**: Liveness and readiness probes
- **Alerting**: Performance and error alerts
