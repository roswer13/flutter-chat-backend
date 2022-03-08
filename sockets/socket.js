const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');

const { usuarioConectado, usuarioDesconectado } = require('../controllers/socket');

// Sockets messages
io.on('connection', client => {
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token'])

    // Verificar autenticación
    if (!valido) {
        return client.disconnect();
    }

    // Cliente auenticado
    usuarioConectado(uid);

    client.on('disconnect', () => {
        usuarioDesconectado(uid);
    });
});
