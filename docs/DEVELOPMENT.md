# QuakeWatch Development Guide

## Setup

### Prerequisites

- Node.js 20+
- Docker & Docker Compose (recommended)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/siri09202-arch/QuakeWatch.git
cd QuakeWatch

# Install dependencies
npm install
```

### Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your settings
nano .env
```

## Development Workflow

### Option 1: Docker Compose (Recommended)

```bash
# Start all services in development mode
docker-compose -f docker-compose.dev.yml up

# The app will be available at:
# - Frontend: http://localhost:3000
# - Backend: http://localhost:3001
# - PostgreSQL: localhost:5432
# - Redis: localhost:6379
# - pgAdmin: http://localhost:5050
```

### Option 2: Local Development

**Terminal 1: Backend**
```bash
cd backend
npm install
npm run dev
```

Backend will start at `http://localhost:3001`

**Terminal 2: Frontend**
```bash
cd frontend
npm install
npm run dev
```

Frontend will start at `http://localhost:3000`

## Project Structure

```
QuakeWatch/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── stores/          # Zustand state stores
│   │   ├── services/        # API and utility services
│   │   ├── types/           # TypeScript type definitions
│   │   ├── utils/           # Utility functions
│   │   ├── styles/          # Global styles
│   │   └── App.tsx
│   ├── public/              # Static assets
│   ├── Dockerfile
│   └── vite.config.ts
├── backend/                  # Express.js application
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── services/        # Business logic
│   │   ├── models/          # Database models
│   │   ├── parsers/         # Data parsers
│   │   ├── middleware/      # Express middleware
│   │   ├── routes/          # API routes
│   │   ├── websocket/       # WebSocket handlers
│   │   ├── config/          # Configuration
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Utility functions
│   │   └── index.ts
│   ├── Dockerfile
│   └── tsconfig.json
├── shared/                   # Shared code
│   └── src/
│       ├── types/           # Shared type definitions
│       └── constants/       # Shared constants
├── docs/                    # Documentation
├── .github/
│   └── workflows/          # GitHub Actions CI/CD
├── scripts/                # Utility scripts
└── docker-compose.yml      # Production compose file
```

## Frontend Development

### Key Technologies

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + ShadcnUI
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Real-time**: Socket.io
- **Maps**: Leaflet.js + Mapbox GL
- **Charts**: ECharts, D3.js

### Common Tasks

#### Creating a new component

```bash
# Create component directory
mkdir -p frontend/src/components/MyComponent

# Create component file
touch frontend/src/components/MyComponent/index.tsx
```

Example component:
```typescript
// frontend/src/components/MyComponent/index.tsx
import React from 'react'

interface MyComponentProps {
  title: string
}

export const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  )
}
```

#### Creating a custom hook

```bash
touch frontend/src/hooks/useMyHook.ts
```

Example hook:
```typescript
// frontend/src/hooks/useMyHook.ts
import { useEffect, useState } from 'react'

export const useMyHook = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Hook logic
  }, [])

  return { data, loading }
}
```

#### Creating a new store

```bash
touch frontend/src/stores/myStore.ts
```

Example store:
```typescript
// frontend/src/stores/myStore.ts
import { create } from 'zustand'

interface MyStore {
  value: string
  setValue: (value: string) => void
}

export const useMyStore = create<MyStore>((set) => ({
  value: '',
  setValue: (value) => set({ value }),
}))
```

### Frontend Testing

```bash
cd frontend

# Run tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Generate coverage report
npm run test:coverage
```

## Backend Development

### Key Technologies

- **Framework**: Express.js
- **Runtime**: Node.js 20+
- **Language**: TypeScript
- **Database**: PostgreSQL
- **Cache**: Redis
- **Real-time**: Socket.io
- **Validation**: Zod
- **Logging**: Pino

### Common Tasks

#### Creating a new route

```bash
# Create route file
touch backend/src/routes/myRoute.ts
```

Example route:
```typescript
// backend/src/routes/myRoute.ts
import { Router } from 'express'
import { MyController } from '@controllers/myController'

const router = Router()
const controller = new MyController()

router.get('/', controller.getAll)
router.post('/', controller.create)

export default router
```

#### Creating a new service

```bash
touch backend/src/services/myService.ts
```

Example service:
```typescript
// backend/src/services/myService.ts
export class MyService {
  async getData() {
    // Business logic
  }

  async saveData(data: any) {
    // Business logic
  }
}
```

#### Creating a new parser

```bash
touch backend/src/parsers/myParser.ts
```

Example parser:
```typescript
// backend/src/parsers/myParser.ts
import xml2js from 'xml2js'

export class MyParser {
  async parse(data: string) {
    const parser = new xml2js.Parser()
    return await parser.parseStringPromise(data)
  }
}
```

### Backend Testing

```bash
cd backend

# Run tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Generate coverage report
npm run test:coverage
```

## Database Management

### Database Migrations

```bash
# Create a new migration
npm run migrate:create create_my_table

# Run migrations
npm run migrate

# Rollback last migration
npm run migrate:rollback
```

### Database CLI

```bash
# Access PostgreSQL directly
docker exec -it quakewatch-postgres psql -U quakewatch -d quakewatch_db

# Useful PostgreSQL commands
\dt                 # List tables
\d table_name       # Describe table
SELECT * FROM table_name;
```

### pgAdmin (via Docker)

Access at `http://localhost:5050`
- Email: admin@quakewatch.local
- Password: admin

## Testing

### Unit Tests

```bash
# Frontend
npm run test --workspace=frontend

# Backend
npm run test --workspace=backend
```

### Integration Tests

```bash
# Run integration tests
npm run test:integration
```

### Test Coverage

```bash
# Generate coverage reports
npm run test:coverage --workspaces
```

## Code Quality

### Linting

```bash
# Lint all projects
npm run lint

# Lint specific project
npm run lint --workspace=frontend
npm run lint --workspace=backend
```

### Formatting

```bash
# Format code
npm run format

# Format specific project
npm run format --workspace=frontend
npm run format --workspace=backend
```

### Type Checking

```bash
# Check types
npm run type-check --workspaces
```

## Building

### Development Build

```bash
npm run build
```

### Docker Build

```bash
# Build all services
docker-compose build

# Build specific service
docker-compose build frontend
docker-compose build backend
```

## Debugging

### Frontend

1. Open DevTools (F12)
2. Use React DevTools browser extension
3. Set breakpoints in Sources tab

### Backend

```bash
# Run with debug flag
NODE_DEBUG=* npm run dev

# Use VS Code debugger
# Add configuration to .vscode/launch.json
{
  "type": "node",
  "request": "launch",
  "name": "Backend Debug",
  "program": "${workspaceFolder}/backend/src/index.ts",
  "preLaunchTask": "tsc: build",
  "outFiles": ["${workspaceFolder}/backend/dist/**/*"]
}
```

## Performance Profiling

### Frontend

```bash
# Build and analyze bundle
npm run build --workspace=frontend
npm install -g source-map-explorer
source-map-explorer frontend/dist/**/*.js
```

### Backend

```bash
# Profile Node.js application
node --prof backend/dist/index.js
# Generate profiling report
node --prof-process isolate-*.log > profile.txt
```

## Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes and commit: `git commit -am 'Add my feature'`
3. Push to branch: `git push origin feature/my-feature`
4. Create a pull request

## Common Issues

### Port Already in Use

```bash
# Find process using port
lsof -i :3000  # for port 3000

# Kill process
kill -9 <PID>

# Or change port in .env
PORT=3002
```

### Docker Compose Issues

```bash
# View logs
docker-compose logs -f <service_name>

# Rebuild containers
docker-compose build --no-cache

# Clean up
docker-compose down -v
```

### Database Connection Issues

```bash
# Check PostgreSQL status
docker-compose ps postgres

# Restart PostgreSQL
docker-compose restart postgres

# Reset database
docker-compose down -v
docker-compose up
```

## Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [Socket.io Documentation](https://socket.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Support

For issues and questions:
- GitHub Issues: [Issues](https://github.com/siri09202-arch/QuakeWatch/issues)
- GitHub Discussions: [Discussions](https://github.com/siri09202-arch/QuakeWatch/discussions)
