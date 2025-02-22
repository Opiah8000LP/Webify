const socket = io();

// Generate a random anonymous username
function generateAnonymousName() {
    const randomNumber = Math.floor(Math.random() * 10000);
    return `ANONYMOUS#${randomNumber}`;
}

// Set username
const username = generateAnonymousName();
document.getElementById('username').innerText = `You are logged in as: ${username}`;

// Fetch chat history and display messages
fetch('/messages')
    .then(response => response.json())
    .then(messages => {
        const chatArea = document.getElementById('chat-area');
        messages.forEach(msg => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            messageElement.innerHTML = `<strong>${msg.username}</strong>: ${msg.message}`;
            chatArea.appendChild(messageElement);
        });
        chatArea.scrollTop = chatArea.scrollHeight;
    });

// Send message
document.getElementById('send-button').addEventListener('click', () => {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    if (message) {
        const messageObject = { username, message };
        socket.emit('chat message', messageObject);
        messageInput.value = '';
    }
});

// Receive message
socket.on('chat message', (msg) => {
    const chatArea = document.getElementById('chat-area');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${msg.username}</strong>: ${msg.message}`;
    chatArea.appendChild(messageElement);
    chatArea.scrollTop = chatArea.scrollHeight;
});
