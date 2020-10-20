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

//
const audioContainer = document.querySelector('.call-container');
//


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
 * @returns {string} - the code retrieved
 */

/* 4b. A convienient way of getting the relevant peerID is by using a window prompt
*  So we can use this when we want to collect the peerID needed to create the connection, encapsulating
* the code in a function to be later called when we need it. In this function we want to make sure to return
* the code so that we can use it later.
* */
function getStreamCode() {
    code = window.prompt('Please enter the sharing code');
    return code;
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
/**
 * Connect the peers
 * @returns {void}
 */

/* 5. Using the peerJS framework, we want to connect the  localPeer to the remotePeer. PeerJS gives us
* the `.connect` function which takes in a peerID to create the connection. */
function connectPeers() {
    peer.connect(code)
}
//
// /**
//  * EVENTS
//  */
//
/**
 * Get the connection code, connect peers and create a call
 */

/* 6a. Now we want to create a call. First let's get our call button from our HTML.*/
const callBtn = document.querySelector('.call-btn');

/* 6b. Next we want to add a click event listener to the call button */
callBtn.addEventListener('click', function(){
    /* 6c. When we click this button we want to get the connection code */
    getStreamCode();
    /* 6d. Then we want to connect the peers */
    connectPeers();
    /* 6c. Then we'll create a call with the code and the window's localStream. Note: the localStream will be
    * the user's localStream. So for caller A it'll be their stream &  for B their own stream. */
    const call = peer.call(code, window.localStream);
    /**
     * when the call is streaming, set the remote stream for the caller
     */

    /* 6d. When a starts streaming, we want to ensure things are set up correctly.
    *
    * */
    call.on('stream', function(stream) {
        /* 6e. We want to show the correct content, so we can call our `showConnectedContent` function we
        * created earlier. */
        showConnectedContent();
        /* 6f. This takes a `MediaStream` object as an argument which we have to set to our window's
        * HTML and properties for the remote audio. So we'll set the remote audio's src to be the stream. */
        window.remoteAudio.srcObject = stream;
        /* 6g. We'll ensure it's autoplayed so we can hear the remote audio immediately */
        window.remoteAudio.autoplay = true;
        /* 6h. And we'll set the window's peerStream to be the stream too.*/
        window.peerStream = stream;
    });
})

/**
 * Close the connection between peers
 */
/* 8a. We also want to ensure that either our users can hang up the call. So we're firstly going to
* get our hang up button from our HTML.*/
const hangUpBtn = document.querySelector('.hangup-btn');

/* 8b. Then we want to add an click event listener to that button.*/
hangUpBtn.addEventListener('click', function (){
    /* 8c. There are a few ways to end a connection with PeerJS but `.close` is the
    * safest and most graceful. This will close the connection without disconnecting
    * the peer from the peer server.*/
    conn.close();
    /* 8d. When the connection has been closed we want to show the correct HTML content,
    * so we can call our `showCallContent` function we created earlier.*/
    showCallContent();
})
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
/**
 * When a data connection between peers is open, get the connecting peer's details
 */

/* 5b. When a connection is created, using the PeerJS framework's `on('connection')`
 we should set the remote peer's ID and the open connection. Again we're instansiating the variables outside
 of the function so that we can assign them later.
 */
let remotePeerID;
let conn;
peer.on('connection', function(connection){
    conn = connection;
    remotePeerID = connection.peer;
});
//
/**
 * When a call has been created, answer it and set the remote stream for the person being called
 */

/* 7a. Using the PeerJS frame work's event `call`, we want to ensure our callers
* are able to answer the calls they recieve and get the correct streams. The anonymous function
* in this eventListener takes a `call` as an argument. Everything in this event listener is happening
* for the person being called. So even though some code is being repeated, it has to be so that
* the person answering the call can also participate. */
peer.on('call', function(call) {

    /* 7b. First, let's prompt the user to answer with a confirm prompt. This will
    * show a window on the screen which the user can select "yes" or "no", which maps to
    * a boolean value which is returned.*/
    const answerCall = confirm("Do you want to answer?")

    if(answerCall){
        /* 7c. If the user does want to answer the call then we use PeerJS `answer` function
        * and pass it the user's localStream.*/
        call.answer(window.localStream)
        /* 7d. We should show the correct HTML content. */
        showConnectedContent();
        call.on('stream', function(stream) {
            /* 7e. Similar to the `call.on('stream')` event listener from before, this also takes a
            `MediaStream` object as an argument which we have to set to our window's
            * HTML and properties for the remote audio. So we'll set the remote audio's
            src to be the stream. */
            window.remoteAudio.srcObject = stream;
            /* 7f. Again, we'll ensure it's autoplayed so we can hear the remote audio immediately */
            window.remoteAudio.autoplay = true;
            /* 7g. And we'll set the window's peerStream to be the stream too.*/
            window.peerStream = stream;
        });
        /* 8e. When the connection has been closed, we want to show the correct HTML
        * content for the user who didn't close the connection. So we can call our `showCallContent` for
        * the remote user.*/
        conn.on('close', function (){
            showCallContent();
        })
    } else {
        /* 7h. If the user doesn't want to answer the call, for now, we'll just log a message
        * to the console.*/
        console.log("call denied");
    }
});
//
// peer.on('error', err => console.error(err));
//
// getLocalStream();