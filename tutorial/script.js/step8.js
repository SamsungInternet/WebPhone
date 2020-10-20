

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
 * When a call has been created, answer it and set the remote stream for the person being called
 */

peer.on('call', function(call) {

    const answerCall = confirm("Do you want to answer?")

    if(answerCall){
        // call.answer(window.localStream)
        // showConnectedContent();
        // call.on('stream', function(stream) {
        //     window.remoteAudio.srcObject = stream;
        //     window.remoteAudio.autoplay = true;
        //     window.peerStream = stream;
        // });

        /** 8e. When the connection has been closed, we want to show the correct HTML
        * content for the user who didn't close the connection. So we can call our `showCallContent` for
        * the remote user. */
        conn.on('close', function (){
            showCallContent();
        })
    } else {
        // console.log("call denied");
    }
});