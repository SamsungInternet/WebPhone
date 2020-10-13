/* global Peer, QRCode */

console.log('getting code');

// if (location.protocol === 'http:') location.protocol = 'https:';

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

const casterBtn = document.querySelector('.caster-btn');
const connectBtn = document.querySelector('.connect-btn');
const callBtn = document.querySelector('.call-btn');
let peer_id;
let conn;
let code;
function getStreamCode() {
    code = window.prompt('Please enter the sharing code');
    return code;
}

function getLocalStream(callbacks) {
    const constraints = {video: false, audio: true}
    navigator.getUserMedia(constraints, callbacks.success, callbacks.error);
}

function receiveLStream(stream) {
    window.audioOut.srcObject = stream;
    window.audioOut.autoplay = true;
    window.peerStream = stream;
}

function receiveRStream(stream) {
    window.audioOut.srcObject = stream;
    window.audioOut.autoplay = true;
    window.peerStream = stream;
}

getLocalStream({
    success: function(stream) {
        console.log(stream)
        window.localStream = stream;
        receiveLStream(stream);
    },
    error: function(err) {
        console.log("u got an error:" + err)
    }
});


casterBtn.addEventListener('click', async function () {
    getStreamCode();
});

connectBtn.addEventListener('click', function(){
    if(code) {
        conn = peer.connect(code)
    } else {
        getStreamCode();
    }
})

callBtn.addEventListener('click', function(){
    const call = peer.call(code, window.localStream);
    call.on('stream', function(stream) {
        console.log(peer);
        window.peerStream = stream;
        receiveRStream(stream);
    });
})

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
            receiveRStream(stream);
            window.peerStream = stream;
        });
        call.on('close', function (){
            alert("call ended");
        })
    } else {
        console.log("call denied");
    }
});


// peer.on('error', err => console.error(err));
