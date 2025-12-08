const { WebSocketServer } = require('ws');

const PORT = process.env.WS_PORT || 8080;

const THREAT_LEVELS = ['Low', 'Medium', 'High', 'Critical'];
const LOCATIONS = ['Shibuya', 'Shinjuku', 'Akihabara', 'Roppongi', 'Ginza', 'Asakusa', 'Ikebukuro', 'Harajuku'];

// In-memory spirits database
const spirits = [
  { id: '1', name: 'Kitsune', threatLevel: 'High', location: 'Shibuya', status: 'Active', lastSeen: new Date().toISOString() },
  { id: '2', name: 'Oni', threatLevel: 'Critical', location: 'Shinjuku', status: 'Active', lastSeen: new Date().toISOString() },
  { id: '3', name: 'Tengu', threatLevel: 'Medium', location: 'Akihabara', status: 'Active', lastSeen: new Date().toISOString() },
  { id: '4', name: 'Kappa', threatLevel: 'Low', location: 'Asakusa', status: 'Captured', lastSeen: new Date().toISOString() },
  { id: '5', name: 'Yurei', threatLevel: 'High', location: 'Roppongi', status: 'Active', lastSeen: new Date().toISOString() },
  { id: '6', name: 'Nekomata', threatLevel: 'Medium', location: 'Ginza', status: 'Active', lastSeen: new Date().toISOString() },
  { id: '7', name: 'Jorogumo', threatLevel: 'Critical', location: 'Ikebukuro', status: 'Active', lastSeen: new Date().toISOString() },
  { id: '8', name: 'Tanuki', threatLevel: 'Low', location: 'Harajuku', status: 'Active', lastSeen: new Date().toISOString() },
];

const wss = new WebSocketServer({ port: PORT });

console.log(`[WS Server] Starting on port ${PORT}...`);

// Broadcast to all connected clients
function broadcast(data) {
  const message = JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client.readyState === 1) { // WebSocket.OPEN
      client.send(message);
    }
  });
}

// Randomly update a spirit's threat level every 5 seconds
setInterval(() => {
  const activeSpirits = spirits.filter(s => s.status === 'Active');
  if (activeSpirits.length === 0) return;

  const randomSpirit = activeSpirits[Math.floor(Math.random() * activeSpirits.length)];
  const currentLevelIndex = THREAT_LEVELS.indexOf(randomSpirit.threatLevel);
  
  // Change to a different threat level
  let newLevelIndex;
  do {
    newLevelIndex = Math.floor(Math.random() * THREAT_LEVELS.length);
  } while (newLevelIndex === currentLevelIndex);

  const spiritIndex = spirits.findIndex(s => s.id === randomSpirit.id);
  spirits[spiritIndex] = {
    ...randomSpirit,
    threatLevel: THREAT_LEVELS[newLevelIndex],
    lastSeen: new Date().toISOString(),
  };

  console.log(`[WS Server] ${randomSpirit.name} threat level changed: ${randomSpirit.threatLevel} → ${THREAT_LEVELS[newLevelIndex]}`);

  broadcast({
    type: 'SPIRIT_UPDATE',
    payload: spirits[spiritIndex],
  });
}, 5000);

wss.on('connection', (ws) => {
  console.log('[WS Server] Client connected');

  // Send initial state
  ws.send(JSON.stringify({
    type: 'INITIAL_STATE',
    payload: spirits,
  }));

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());
      console.log('[WS Server] Received:', data);

      if (data.type === 'CAPTURE') {
        const spiritIndex = spirits.findIndex(s => s.id === data.spiritId);
        if (spiritIndex !== -1 && spirits[spiritIndex].status === 'Active') {
          spirits[spiritIndex] = {
            ...spirits[spiritIndex],
            status: 'Captured',
            lastSeen: new Date().toISOString(),
          };
          
          broadcast({
            type: 'SPIRIT_UPDATE',
            payload: spirits[spiritIndex],
          });
        }
      }
    } catch (err) {
      console.error('[WS Server] Error parsing message:', err);
    }
  });

  ws.on('close', () => {
    console.log('[WS Server] Client disconnected');
  });
});

console.log(`[WS Server] Running on ws://localhost:${PORT}`);

