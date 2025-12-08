# Yokai Monitoring Dashboard

Real-time spirit anomaly monitoring system for Tokyo.

## Tech Stack

- **Core**: React 18+, Next.js 14 (App Router)
- **Architecture**: Feature Sliced Design (FSD)
- **State & Async**: TanStack Query
- **Styling**: SCSS Modules
- **Validation**: Zod
- **DevOps**: Docker Compose

## Getting Started

### Development (without Docker)

1. Install dependencies:
```bash
npm install
cd ws-server && npm install && cd ..
```

2. Start the WebSocket server:
```bash
npm run ws-server
```

3. In another terminal, start the Next.js dev server:
```bash
npm run dev
```

4. Open [http://localhost:3000/monitoring](http://localhost:3000/monitoring)

### Production (with Docker)

```bash
docker-compose up --build
```

The application will be available at:
- Web UI: http://localhost:3000
- WebSocket: ws://localhost:8080

## Project Structure (FSD)

```
src/
├── app/                    # Next.js App Router
│   ├── api/spirits/        # REST API routes
│   ├── monitoring/         # Monitoring page
│   ├── layout.tsx
│   └── providers.tsx       # QueryClientProvider
├── widgets/
│   └── spirits-board/      # Main dashboard widget
├── features/
│   └── capture-spirit/     # Capture spirit feature
├── entities/
│   └── spirit/             # Spirit entity (types, card, API)
└── shared/
    ├── api/                # Base API client
    ├── lib/                # WebSocket hook
    ├── ui/                 # UI components (Button, Badge, Toast)
    └── config/             # Constants, types
```

## Features

- **Real-time Updates**: Spirits' threat levels change every 5 seconds via WebSocket
- **Optimistic Updates**: Capture action updates UI immediately
- **Error Handling**: 30% capture failure rate with automatic rollback
- **Toast Notifications**: Visual feedback for all actions

