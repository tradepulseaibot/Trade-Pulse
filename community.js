(function () {
  'use strict';

  // ==================== Personas & Messages ====================
  const remittancePersonas = [
    { name: "Rafiq Ahmed", gender: "men", country: "Bangladesh", isFallback: false },
    { name: "Farzana Chowdhury", gender: "women", country: "Bangladesh", isFallback: false },
    { name: "Sakib Hasan", gender: "men", country: "Bangladesh", isFallback: false },
    { name: "Nasrin Sultana", gender: "women", country: "Bangladesh", isFallback: false },
    { name: "Tanvir Islam", gender: "men", country: "Bangladesh", isFallback: false },
    { name: "Sharmin Akter", gender: "women", country: "Bangladesh", isFallback: false },
    { name: "Imran Khan", gender: "men", country: "Bangladesh", isFallback: false },
    { name: "Nusrat Jahan", gender: "women", country: "Bangladesh", isFallback: false },
    { name: "Fahim Rahman", gender: "men", country: "Bangladesh", isFallback: false },
    { name: "Jannatul Ferdous", gender: "women", country: "Bangladesh", isFallback: false }
  ];

  // Convert to persona objects with initials for the UI
  const personas = remittancePersonas.map(p => {
    const initials = p.name.split(' ').map(n => n[0]).join('').toUpperCase();
    return {
      name: p.name,
      initials,
      country: p.country,
      gender: p.gender,
      isFallback: p.isFallback,
      avatar: `assets/avatars/${p.name.toLowerCase().replace(/\s+/g, '_')}.jpg`
    };
  });

  const remittanceMessages = [
    "Just saved $15 on my brother's remittance from Dubai. This is life‑changing.",
    "My parents got the full amount this month. No more hidden bank fees.",
    "Started with 5 USDT, now I earn enough to cover my own bills.",
    "The live ticker shows real savings every second. I'm convinced.",
    "আমার পরিবার আজ পুরো টাকা পেয়েছে। ধন্যবাদ।",
    "No more losing 8% on bank transfers. This platform is a blessing.",
    "I was skeptical, but after my first fee capture I withdrew $30 immediately.",
    "Finally a platform that helps diaspora families, not banks.",
    "Every day I see my fee share grow. Consistency wins.",
    "Sent money to Sylhet yesterday – saved $12 in fees thanks to this.",
    "My sister in London uses this to send money home without charges.",
    "The community here is amazing. Real people, real savings.",
    "I used to pay $25 per transfer. Now I pay nothing and earn instead.",
    "Just reached the Growth Tier. The returns are even better!",
    "Anyone else from Dhaka? Let's connect and share tips.",
    "Started as a test, now it's my main passive income stream.",
    "The remittance routes update automatically. Zero stress."
  ];

  // ==================== DOM references ====================
  const chatArea = document.getElementById('chatArea');
  const onlineCountEl = document.getElementById('onlineCount');
  const liveFeeValEl = document.getElementById('liveFeeVal');

  // Helper functions
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function formatTime() {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const mins = now.getMinutes().toString().padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}:${mins} ${ampm}`;
  }

  // ==================== Global function for main.js to call ====================
  window.addRandomRemittanceChat = function () {
    if (!chatArea) return;
    const persona = personas[randomInt(0, personas.length - 1)];
    const message = remittanceMessages[randomInt(0, remittanceMessages.length - 1)];
    const time = formatTime();

    const msgHTML = `
      <div class="chat-msg">
        <div class="msg-sender">${persona.name} <span style="font-size:0.6rem;color:var(--text3);">(${persona.initials})</span></div>
        <div>${message}</div>
        <div class="msg-time">${time}</div>
      </div>
    `;
    chatArea.insertAdjacentHTML('beforeend', msgHTML);
    chatArea.scrollTop = chatArea.scrollHeight;

    // Keep chat history clean
    while (chatArea.children.length > 30) {
      chatArea.removeChild(chatArea.firstChild);
    }
  };

  // ==================== Auto‑generate chat messages ====================
  setInterval(() => {
    // Only generate messages if the community tab is active (visible area)
    if (chatArea && chatArea.offsetParent !== null) {
      window.addRandomRemittanceChat();
    }
  }, 8000); // every 8 seconds

  // ==================== Simulate online count ====================
  setInterval(() => {
    if (onlineCountEl) {
      onlineCountEl.textContent = randomInt(200, 500).toString();
    }
  }, 30000);

  // ==================== Simulate live fee capture value ====================
  setInterval(() => {
    if (liveFeeValEl) {
      liveFeeValEl.textContent = `$${(Math.random() * 10 + 1).toFixed(2)}`;
    }
  }, 5000);

  console.log('RemitFlow AI community loaded');
})();
