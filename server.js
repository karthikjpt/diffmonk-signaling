const { PeerServer } = require('peer');

const PORT = process.env.PORT || 9000;

// Initialize the signaling server
const peerServer = PeerServer({ 
    port: PORT, 
    path: '/telecast',
    proxied: true // Required for Render's reverse proxy to handle secure WSS connections
});

peerServer.on('connection', (client) => {
    console.log(`[+] Client connected: ${client.getId()}`);
});

peerServer.on('disconnect', (client) => {
    console.log(`[-] Client disconnected: ${client.getId()}`);
});

console.log(`🚀 DiffMonk Signaling Server running on port ${PORT}`);
