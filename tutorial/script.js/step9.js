/**
 * Sets the src of the HTML element on the page to the remote stream
 * @param stream
 * @returns {void}
 */

/* 9a. Since we use this block of code in multiple places we can refactor it in to a function and call it where
* neccesary. */
function setRemoteStream(stream) {
    window.remoteAudio.srcObject = stream;
    window.remoteAudio.autoplay = true;
    window.peerStream = stream;
}


/**
 * Sets the src of the HTML element on the page to the local stream
 * @param stream
 * @returns {void}
 */

/* 9b. & we can do the same thing here too.*/
function setLocalStream(stream) {
    window.localAudio.srcObject = stream;
    window.localAudio.autoplay = true;
    window.peerStream = stream;
}