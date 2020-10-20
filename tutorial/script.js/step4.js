/* global Peer */

console.log('getting code');

/**
 * Instantiate a new Peer, passing to it an alphanumeric string as an ID and options obj
 * @type {Peer}
 */

/*1a. First we want to instansiate the peer with an id. If an ID isn't given, one will be generated
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

// const callBtn = document.querySelector('.call-btn');
// const audioContainer = document.querySelector('.call-container');
// const hangUpBtn = document.querySelector('.hangup-btn');
// let peer_id;
// let conn;

/* 4a. In order to connect two peers, we'll need the peerID for one of them. Let's instansiate this here
* with a `let` because we're going to assign the variable later.
* */
let code;
//
// /**
//  * FUNCTIONS
//  */
//
/**
 * Gets connection code/peer id from caller
 * @returns {void} - the code retrieved
 */

/* 4b. A convienient way of getting the relevant peerID is by using a window prompt
*  So we can use this when we want to collect the peerID needed to create the connection, encapsulating
* the code in a function to be later called when we need it. In this function we want to make sure to return
* the code so that we can use it later.
* */
function getStreamCode() {
    code = window.prompt('Please enter the sharing code');
}
//
/**
 * Gets the local audio stream of the current caller
 * @param callbacks - an object to set the success/error behaviour
 * @returns {void}
 */

/* 2a. We want to get the permission from the user's browser to access their microphone
* */
function getLocalStream() {
    /* 2b. So we'll use the WebAPI `getUserMedia` endpoint, this takes a `constraints` object which tells
* then endpoint which permissions you want to request.*/
    navigator.mediaDevices.getUserMedia({video: false, audio: true}).then( stream => {
        /* 2c. This returns a `MediaStream` object which we have to set to our window's
        * HTML and properties. First we'll set it to the window's localStream */
        window.localStream = stream;
        /* 2d. Then we can set the audio element's src in our HTML to the stream */
        window.localAudio.srcObject = stream;
        /* 2e. & make sure the element autoplays */
        window.localAudio.autoplay = true;
    }).catch( err => {
        /* 2f. In our promise, we want to make sure that we catch any possible errors too. */
        console.log("u got an error:" + err)
    });
}

/* 2g. If we call `getLocalStream` we should be prompted with a permission request in our browser and see
* that our audio element is active. If you put in headphones and unmute yourself, you should be able to hear
* yourself with a slight delay. */
getLocalStream();
//
// /**
//  * Sets the src of the HTML element on the page to the local stream
//  * @param stream
//  * @returns {void}
//  */
//
// function setLocalStream(stream) {
//     window.localAudio.srcObject = stream;
//     window.localAudio.autoplay = true;
//     window.peerStream = stream;
// }
//
// /**
//  * Sets the src of the HTML element on the page to the remote stream
//  * @param stream
//  * @returns {void}
//  */
// function setRemoteStream(stream) {
//     window.remoteAudio.srcObject = stream;
//     window.remoteAudio.autoplay = true;
//     window.peerStream = stream;
// }
/**
 * Displays the call button and peer ID
 * @returns{void}
 */
/* 3a. Before a user makes a call, we want to make sure that the generated peerID from before is displayed
  on the page, as well as the call button. We can keep this in a function to be called later. We also want to hide
  the audio container if a call hasn't been made yet.
 */
function showCallContent() {
    window.caststatus.textContent = `Your device ID is: ${peer.id}`;
    callBtn.hidden = false;
    audioContainer.hidden = true;
}

/**
 * Displays the audio controls and correct copy
 * @returns{void}
 */
/* 3b. When a user is connected to a call, we want to let them know that they're connected and
* show the relevant audio controls. Again, this should be in a function so that we can call it later.
* */
function showConnectedContent() {
    window.caststatus.textContent = `You're connected`;
    callBtn.hidden = true;
    audioContainer.hidden = false;
}


//
// /**
//  * Connect the peers
//  * @returns {void}
//  */
//
// function connectPeers() {
//     peer.connect(code)
// }
//
// /**
//  * EVENTS
//  */
//
// /**
//  * Get the connection code, connect peers and create a call
//  */
// callBtn.addEventListener('click', function(){
//     getStreamCode();
//     connectPeers();
//     const call = peer.call(code, window.localStream);
//     /**
//      * when the call is streaming, set the remote stream for the caller
//      */
//     call.on('stream', function(stream) {
//         showConnectedContent();
//         console.log(peer);
//         window.peerStream = stream;
//         setRemoteStream(stream);
//     });
// })
//
// /**
//  * Close the connection between peers
//  */
// hangUpBtn.addEventListener('click', function (){
//     conn.close();
//     showCallContent();
// })
/**
 * When the peer has connected to the server, diplay the peer ID
 */

/* 3c. When a peer is connected to the peer server, we want to make sure we're showing the peerID by default.
* So here we can use `textContent` to set the value of the HTML element `caststatus`. */
peer.on('open', function () {
    console.log('ready to receive cast')
    window.caststatus.textContent = `Your device ID is: ${peer.id}`;
});
//
// /**
//  * When a data connection between peers is open, get the connecting peer's details
//  */
// peer.on('connection', function(connection){
//     conn = connection;
//     peer_id = connection.peer;
// });
//
// /**
//  * When a call has been created, answer it and set the remote stream for the person being called
//  */
// peer.on('call', function(call) {
//
//     const answerCall = confirm("Do you want to answer?")
//
//     if(answerCall){
//         call.answer(window.localStream)
//         showConnectedContent();
//         call.on('stream', function(stream) {
//             console.log('Stream Received');
//             setRemoteStream(stream);
//             window.peerStream = stream;
//         });
//         call.on('disconnected', function (){
//             alert("call ended");
//         })
//     } else {
//         console.log("call denied");
//     }
// });
//
// peer.on('error', err => console.error(err));
//
// getLocalStream();