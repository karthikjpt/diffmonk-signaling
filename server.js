const express = require('express');
const { ExpressPeerServer } = require('peer');

const app = express();
const PORT = process.env.PORT || 9000;

const server = app.listen(PORT, () => {
    console.log(`🚀 DiffMonk Signaling Server running on port ${PORT}`);
});

// Initialize the signaling server on the /telecast path
const peerServer = ExpressPeerServer(server, { 
    path: '/telecast',
    proxied: true // Required for Render
});

// Bind PeerJS to Express
app.use('/', peerServer);

// Serve a friendly status page for direct browser visits
app.get('/', (req, res) => {
    res.send(`
        <div style="font-family: sans-serif; padding: 40px; text-align: center;">
            <h2 style="color: #30d158;">🟢 DiffMonk Signaling Server is Online</h2>
            <p style="color: #666;">WebRTC P2P routing is active and ready for connections.</p>
        </div>
    `);
});
