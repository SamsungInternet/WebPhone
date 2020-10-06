const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

// Create an object to store all the calls
const calls = {};

io.on("connenction", socket => {
    // JOINING A CALL
    socket.on("join call", callID => {
        // Check that the calls has an array with an exsisting socket.id
        if(calls[callID]) {
            // if it does then we can assume there's already a participant
            // on the call and we can add the second socket.id to the calls array
            calls[callID].push(socket.id);
        } else {
            // if it doesn't then we can assume this is the first person to join the call
            // so we can add their socket.id as the first in the array
            calls[callID] = [socket.id];
        }
        // find the participant who is joining the call by checking calls to find the
        // id that doesn't belong to the intiatingParticipant
        const joiningParticipant = calls[callID].find(id => id != socket.id);
        if(joiningParticipant) {
            // confirm that there is another participant
            socket.emit("joining participant", joiningParticipant)
            // confirm to the joining participant that the initiatingParticipant is in the call too
            socket.to(joiningParticipant).emit("another participant has joined this call", socket.id)
        }
    });

    // When an offer is triggered it'll send the payload, the payload includes:
    // - the initiatingParticipant
    // - the offer obj
    socket.on("offer", payload => {
        // the "target" is the socket id of the participant that is being called
        // so we want to send the target to/with (??) the payload
        io.to(payload.target).emit("offer", payload);
    })

    // We recieve an answer from the offer
    socket.on("answer", payload => {
        io.to(payload.target).emit("answer", payload);
    })

    // A way for our service can handle the networking issues, decide on STUN/TURN servers, etc
    socket.on("ice-candidate", incoming => {
        io.to(incoming.target).emit("ice-candindate", incoming.candidate);
    })
})

server.listen(8000, () => console.log("hi, i'm running on 8000"));