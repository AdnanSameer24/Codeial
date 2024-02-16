const app = require('../index');



module.exports.chatSockets = function(socketServer){

    

    let io = require('socket.io')(socketServer, {
        cors : {
            origin : "http://localhost:8000",
            methods : ["GET","POST"]
        }
    });

    io.sockets.on('connection', function(socket){
        console.log('New connection recieved', socket.id);

        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });

        socket.on('join_room', function(data){
            console.log('Joining request recieved', data);

            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joinded', data);
        });

        socket.on('send_message', function(data){
            io.in(data.chatroom).emit('recieve_message', data);
        });
    });
}