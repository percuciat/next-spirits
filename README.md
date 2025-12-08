# Yokai Monitoring Dashboard

Real-time spirit anomaly monitoring system for Tokyo.


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

