const jwt = require('jsonwebtoken');

module.exports = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('Authentication error'));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    const { role, id: userId } = socket.user;

    socket.on('joinWorkspace', ({ workspaceId }) => {
      socket.join(workspaceId);
    });

    socket.on('editDoc', ({ workspaceId, changes }) => {
      if (role === 'viewer') {
        socket.emit('error', 'Permission denied: Viewers cannot edit documents');
        return;
      }
      io.to(workspaceId).emit('docEdited', changes);
    });

    socket.on('sendChat', ({ workspaceId, message }) => {
      if (role === 'viewer') {
        socket.emit('error', 'Permission denied: Viewers cannot send messages');
        return;
      }
      io.to(workspaceId).emit('receiveChat', { userId, message });
    });
  });
};
