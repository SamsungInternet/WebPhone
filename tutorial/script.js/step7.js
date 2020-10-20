
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
    } else {
        /* 7h. If the user doesn't want to answer the call, for now, we'll just log a message
        * to the console.*/
        console.log("call denied");
    }
});