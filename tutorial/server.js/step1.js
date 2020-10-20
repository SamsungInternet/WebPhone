
/* 1a. We need to require our PeerServer */
const { ExpressPeerServer } = require('peer');


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