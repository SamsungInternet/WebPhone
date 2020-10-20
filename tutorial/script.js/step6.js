
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