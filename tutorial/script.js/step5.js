
/**
 * Connect the peers
 * @returns {void}
 */

/* 5a. Using the peerJS framework, we want to connect the  localPeer to the remotePeer. PeerJS gives us
* the `.connect` function which takes in a peerID to create the connection. */

function connectPeers() {
    peer.connect(code)
}

/**
 * When a data connection between peers is open, get the connecting peer's details
 */

/* 5b. When a connection is created, using the PeerJS framework's `on('connection')`
 we should set the remote peer's ID and the open connection. Again we're instansiating the variables outside
 of the function so that we can assign them later.
 */

let conn;
peer.on('connection', function(connection){
    conn = connection;
});