const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/chatApp', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for chat messages
const messageSchema = new mongoose.Schema({
  username: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// Serve static files
app.use(express.static('public'));

// Endpoint to fetch chat history
app.get('/messages', async (req, res) => {
  const messages = await Message.find().sort({ timestamp: 1 });
  res.json(messages);
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // Broadcast new messages to all clients
  socket.on('chat message', async (msg) => {
    const message = new Message(msg);
    await message.save();
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
http.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
