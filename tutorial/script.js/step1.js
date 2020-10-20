
/**
 * Instantiate a new Peer, passing to it an alphanumeric string as an ID and options obj
 * @type {Peer}
 */

/*1a. First we want to create the peer with an id. If an ID isn't given, one will be generated
* however, we absolutely need an ID to connect two peers together. Here' we're generating an ID. We also
* need to pass some options such as the host of the peer, the debug level and the path to the where the peer code
* is. */
const peer = new Peer(''+Math.floor(Math.random()*2**18).toString(36).padStart(4,0), {
    host: location.hostname,
    debug: 1,
    path: '/myapp'
});

/*1b. We then need to assign the peer to the window's peer, so that it's attached to the window. */
window.peer = peer;
