const express = require('express');
const { ExpressPeerServer } = require('peer');

const app = express();
const PORT = process.env.PORT || 9000;
const server = app.listen(PORT, () => {
    console.log(`🚀 Signaling Server running on port ${PORT}`);
});

// Initialize PeerJS on top of Express
const peerServer = ExpressPeerServer(server, {
  path: '/telecast',
  proxied: true // Crucial for Render
});

app.use('/', peerServer);

// In-Memory Trackers (Note: These reset if Render restarts your free server)
let activeUsers = 0;
let totalConnections = 0;
const countryStats = {};

peerServer.on('connection', (client) => {
    activeUsers++;
    totalConnections++;

    // Extract IP address from Render's proxy headers
    // Note: PeerJS doesn't expose the request object directly on the client, 
    // but you can log the raw connection ID. 
    console.log(`[+] User joined. Active: ${activeUsers}`);
});

peerServer.on('disconnect', (client) => {
    activeUsers--;
    console.log(`[-] User left. Active: ${activeUsers}`);
});

// Visit https://diffmonk-signaling.onrender.com/api/stats to see live data
app.get('/api/stats', (req, res) => {
    res.json({
        server_status: "Online",
        current_active_users: activeUsers,
        total_connections_since_reboot: totalConnections,
        uptime_minutes: Math.round(process.uptime() / 60)
    });
});
