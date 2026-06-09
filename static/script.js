function appendMessage(text, sender) {
    const chatBox = document.getElementById('chatBox');
    const msg = document.createElement('div');
    msg.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    if (!message) return;

    appendMessage(message, 'user');
    input.value = '';

    const res = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    });

    const data = await res.json();
    appendMessage(data.response, 'bot');
}

document.getElementById('userInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
});