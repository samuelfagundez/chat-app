

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {
          // TODO: Validar jwt
          // SI el JWT No es valido, desconectar
          // TODO: Saber que el usuario esta activo mediante el UID
          // TODO: Emitir todos los usuarios conectados
          // TODO: Socket join, uid
          // TODO: Escuchar cuando el cliente manda un mensaje
          // mensaje personal
          // TODO: Disconnect
          // marcar en la base de datos que se desconecto
          // TODO: Emitir todos los usuarios conectados
        });
    }


}


module.exports = Sockets;