/* ADD THIS TO YOUR PREVIOUS STEPS */

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

/**
 * When the peer has connected to the server, diplay the peer ID
 */

/* 3c. When a peer is connected to the peer server, we want to make sure we're showing the peerID by default.
* So here we can use `textContent` to set the value of the HTML element `caststatus`. */
peer.on('open', function () {
    console.log('ready to receive cast')
    window.caststatus.textContent = `Your device ID is: ${peer.id}`;
});