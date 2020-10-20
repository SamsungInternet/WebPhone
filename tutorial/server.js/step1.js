// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const http = require('http');
const path = require('path');
const app = express();
const server = http.createServer(app);
/* 1a. We need to require our PeerServer */
const { ExpressPeerServer } = require('peer');
const port = process.env.PORT || "8000";

/* 1b. We want to make sure we've created our peer server, which will
* handle the signalling between peers. */
const peerServer = ExpressPeerServer(server, {
    proxied: true,
    debug: true,
    path: '/myapp',
    ssl: {}
});

/* 1c. We want to ensure that we're using the peerServer in our app.*/
app.use(peerServer);

app.use(express.static(path.join(__dirname)));

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
});

server.listen(port);
console.log('Listening on: ' + port);