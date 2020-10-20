/* ADD THIS TO YOUR PREVIOUS STEP */


/* 4a. In order to connect two peers, we'll need the peerID for one of them. Let's instansiate this here
* with a `let` because we're going to assign the variable later.
* */
let code;

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
