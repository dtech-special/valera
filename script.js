const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = "AIzaSyAoCR0dnPNHF6_aZNit7KKzC_z6fP-GWwU"; // вставь сюда свой ключ

function sendMessage() {
  const userInput = document.getElementById('user-input');
  const message = userInput.value.trim();
  if (message === "") return;

  addMessage(message, "user");
  userInput.value = "";

  // Отправляем на Gemini API
  fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: message }] }]
    })
  })
  .then(res => res.json())
  .then(data => {
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Эээ... Валера не знает, что сказать 🥴";
    addMessage(reply, "valera");
  })
  .catch(err => {
    console.error("Ошибка:", err);
    // Fallback-ответ
    const fallbackReplies = [
      "Эээ... слышь, хик... сервак лёг, я запасной Валера!",
      "Ща-ща, братан... основной я в отключке 🥴",
      "Ха-ха-ха! Даун, сервер не пашет!"
    ];
    const randomReply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
    addMessage(randomReply, "valera");
  });
}

function addMessage(text, sender) {
  const chat = document.getElementById('chat');
  const div = document.createElement('div');
  div.className = `message ${sender}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
