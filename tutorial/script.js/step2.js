/* ADD THIS TO YOUR PREVIOUS STEP */


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
