/* global Peer */

console.log('getting code');

/**
 * VARIABLES
 */

/**
 * Instantiate a new Peer, passing to it an alphanumeric string as an ID and options obj
 * @type {Peer}
 */
const peer = new Peer(''+Math.floor(Math.random()*2**18).toString(36).padStart(4,0), {
    host: location.hostname,
    debug: 1,
    path: '/myapp'
});

peer.on('open', function () {
    console.log('ready to receive cast')
    window.caststatus.textContent = `Connected, this device is: ${peer.id}`;
});

window.peer = peer;

const callBtn = document.querySelector('.call-btn');
let peer_id;
let conn;
let code;

/**
 * FUNCTIONS
 */

/**
 * Gets connection code/peer id from caller
 * @returns {string} - the code retrieved
 */
function getStreamCode() {
    code = window.prompt('Please enter the sharing code');
    return code;
}

/**
 * Gets the local audio stream of the current caller
 * @param callbacks - an object to set the success/error behaviour
 * @returns {void}
 */

function getLocalStream() {
    const constraints = {video: false, audio: true}

    navigator.mediaDevices.getUserMedia(constraints).then( stream => {
        console.log(stream);
        window.localStream = stream;
        receiveLStream(stream);
    }).catch( err => {
        console.log("u got an error:" + err)
    });
}

/**
 * Sets the src of the HTML element on the page to the local stream
 * @param stream
 * @returns {void}
 */

function setLocalStream(stream) {
    window.audioOut.srcObject = stream;
    window.audioOut.autoplay = true;
    window.peerStream = stream;
}

/**
 * Sets the src of the HTML element on the page to the remote stream
 * @param stream
 * @returns {void}
 */
function setRemoteStream(stream) {
    window.audioOut.srcObject = stream;
    window.audioOut.autoplay = true;
    window.peerStream = stream;
}

getLocalStream();

/**
 * Connect the peers
 * @returns {void}
 */

function connectPeers() {
    conn = peer.connect(code)
}

/**
 * EVENTS
 */
callBtn.addEventListener('click', function(){
    getStreamCode();
    connectPeers()
    const call = peer.call(code, window.localStream);
    call.on('stream', function(stream) {
        console.log(peer);
        window.peerStream = stream;
        setRemoteStream(stream);
    });
})

// peer.on('open', function () {
//     console.log('ready to receive cast')
//     window.caststatus.textContent = `Connected, this device is: ${peer.id}`;
// });

peer.on('connection', function(connection){
    conn = connection;
    peer_id = connection.peer;
});

peer.on('call', function(call) {

    const answerCall = confirm("Do you want to answer?")

    if(answerCall){
        call.answer(window.localStream)
        call.on('stream', function(stream) {
            console.log('Stream Received');
            setRemoteStream(stream);
            window.peerStream = stream;
        });
        call.on('close', function (){
            alert("call ended");
        })
    } else {
        console.log("call denied");
    }
});

peer.on('error', err => console.error(err));

getLocalStream({
    success: function(stream) {
        console.log(stream)
        window.localStream = stream;
        setLocalStream(stream);
    },
    error: function(err) {
        console.log("u got an error:" + err)
    }
});
