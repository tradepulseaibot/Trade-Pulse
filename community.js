// ===== RemitFlow AI – community.js (70 personas, diaspora chat) =====
(function() {
  console.log('community.js loaded');

  // ---- Persona data ----
  const personaData = [
    // Original 10 Bangladeshi
    { name: "Rafiq Ahmed", country: "Bangladesh", gender: "men" },
    { name: "Farzana Chowdhury", country: "Bangladesh", gender: "women" },
    { name: "Sakib Hasan", country: "Bangladesh", gender: "men" },
    { name: "Nasrin Sultana", country: "Bangladesh", gender: "women" },
    { name: "Tanvir Islam", country: "Bangladesh", gender: "men" },
    { name: "Sharmin Akter", country: "Bangladesh", gender: "women" },
    { name: "Imran Khan", country: "Bangladesh", gender: "men" },
    { name: "Nusrat Jahan", country: "Bangladesh", gender: "women" },
    { name: "Fahim Rahman", country: "Bangladesh", gender: "men" },
    { name: "Jannatul Ferdous", country: "Bangladesh", gender: "women" },
    // 60 global
    { name: "Ajide Femi", country: "Nigeria", gender: "men" },
    { name: "Andrew ♈", country: "US", gender: "men" },
    { name: "Angela", country: "US", gender: "women" },
    { name: "anna", country: "US", gender: "women" },
    { name: "Bigboy JO 💯", country: "Nigeria", gender: "men" },
    { name: "billy eseronio", country: "US", gender: "men" },
    { name: "bruce gaines", country: "US", gender: "men" },
    { name: "Cody Lamp", country: "US", gender: "men" },
    { name: "cynthia sherman", country: "US", gender: "women" },
    { name: "Danielle marie", country: "US", gender: "women" },
    { name: "diane", country: "US", gender: "women" },
    { name: "don m bennett", country: "US", gender: "men" },
    { name: "eric shiffler", country: "US", gender: "men" },
    { name: "Eric Temple", country: "US", gender: "men" },
    { name: "Gayle Churchill", country: "US", gender: "women" },
    { name: "gordon sadler", country: "US", gender: "men" },
    { name: "HAM ZAT", country: "Nigeria", gender: "men" },
    { name: "harshana", country: "India", gender: "women" },
    { name: "henry catt", country: "US", gender: "men" },
    { name: "ITZ DULZY", country: "Nigeria", gender: "men" },
    { name: "jackie costello", country: "US", gender: "women" },
    { name: "james creve", country: "US", gender: "men" },
    { name: "jeanne jennings", country: "US", gender: "women" },
    { name: "jenny seymore", country: "US", gender: "women" },
    { name: "jeremy reid", country: "US", gender: "men" },
    { name: "jim", country: "US", gender: "men" },
    { name: "junior ndlebe", country: "SouthAfrica", gender: "men" },
    { name: "Kachy emmanuel", country: "Nigeria", gender: "men" },
    { name: "kandrice casekey", country: "US", gender: "women" },
    { name: "Marian ❤️", country: "US", gender: "women" },
    { name: "micheal etezadi", country: "US", gender: "men" },
    { name: "Mimi Griffin", country: "US", gender: "women" },
    { name: "nan baker", country: "US", gender: "women" },
    { name: "nxumalo luh", country: "SouthAfrica", gender: "men" },
    { name: "olowoleru kayode", country: "Nigeria", gender: "men" },
    { name: "Paul Stokes", country: "US", gender: "men" },
    { name: "pearl smith", country: "US", gender: "women" },
    { name: "Phil Capps", country: "US", gender: "men" },
    { name: "philp rocco", country: "US", gender: "men" },
    { name: "randy ford", country: "US", gender: "men" },
    { name: "Ray Minnifield", country: "US", gender: "men" },
    { name: "richard khan", country: "US", gender: "men" },
    { name: "robert brown", country: "US", gender: "men" },
    { name: "Ryan", country: "US", gender: "men" },
    { name: "sxovalova jama", country: "US", gender: "women" },
    { name: "tabitha atkins", country: "US", gender: "women" },
    { name: "tobb bascom", country: "US", gender: "men" },
    { name: "Tony Cawood", country: "US", gender: "men" },
    { name: "troy gossman", country: "US", gender: "men" },
    { name: "tyler bishop", country: "US", gender: "men" },
    { name: "Van Grevenbroek", country: "US", gender: "men" }
  ];

  function getTraits(name) {
    const map = {
      "Rafiq Ahmed": { archetype: "boss", slang: 0.3, typoRate: 0.05 },
      "Farzana Chowdhury": { archetype: "thoughtful", slang: 0.2, typoRate: 0.03 },
      "Sakib Hasan": { archetype: "analyst", slang: 0.1, typoRate: 0.04 },
      "Nasrin Sultana": { archetype: "newbie", slang: 0.5, typoRate: 0.1 },
      "Tanvir Islam": { archetype: "expert", slang: 0.15, typoRate: 0.02 },
      "Sharmin Akter": { archetype: "lurker", slang: 0.4, typoRate: 0.07 },
      "Imran Khan": { archetype: "joker", slang: 0.7, typoRate: 0.12 },
      "Nusrat Jahan": { archetype: "thoughtful", slang: 0.25, typoRate: 0.04 },
      "Fahim Rahman": { archetype: "boss", slang: 0.2, typoRate: 0.05 },
      "Jannatul Ferdous": { archetype: "newbie", slang: 0.6, typoRate: 0.1 }
    };
    if (map[name]) return map[name];
    const r = Math.random();
    return {
      archetype: r < 0.2 ? "active" : r < 0.5 ? "lurker" : "active",
      slang: r * 0.6,
      typoRate: 0.05 + r * 0.1
    };
  }

  const personas = personaData.map(p => {
    const traits = getTraits(p.name);
    const initials = p.name.replace(/[^\w\s]/g, '').split(' ').map(s => s[0]).join('').toUpperCase();
    return {
      ...p,
      initials,
      traits,
      avatar: `https://ui-avatars.com/api/?name=${initials}&background=0d2b2b&color=d4a843&size=200&bold=true`
    };
  });

  // ---- Message pools ----
  const messages = {
    general: [
      "Good morning everyone. Hope your families received full amounts today.",
      "Remittance is a lifeline. Proud to be part of this community.",
      "Fee savings are adding up. Every dollar counts.",
      "Diaspora family – let's keep supporting each other.",
      "Don't forget to check your fee share balance. Passive income!",
      "The spread captures are getting better each week.",
      "I've been with RemitFlow since beta, never looked back.",
      "This platform makes sending money home so much cheaper.",
      "Today I'm routing a transfer to Dhaka at the best rate ever.",
      "Patience and liquidity – that's the game."
    ],
    remittance: [
      "Just saved $15 on my brother's remittance from Dubai.",
      "My parents got the full amount this month.",
      "Started with 5 USDT, now I earn enough to cover my bills.",
      "আমার পরিবার আজ পুরো টাকা পেয়েছে। ধন্যবাদ।",
      "I was skeptical, but after my first fee capture I withdrew $30 immediately.",
      "No more losing 8% on bank transfers."
    ],
    success: [
      "I started with $50 and now my fee share covers my monthly phone bill.",
      "Three months in, and I've saved over $300 in remittance fees.",
      "My parents now receive the exact amount I send, no deductions.",
      "Just hit VIP 2 status – the extra 0.5% boost is amazing.",
      "I've referred 5 friends and they all love the savings.",
      "Today I withdrew my fee share and treated my family to dinner."
    ],
    bangla: [
      "আমার ভাই দুবাই থেকে টাকা পাঠালো, পুরো টাকা পেয়েছে।",
      "ধন্যবাদ রেমিটফ্লো, এত কম ফি কখনো দেখিনি।",
      "আমি ৫ USDT দিয়ে শুরু করেছিলাম, এখন ভালো আয় করছি।"
    ],
    market: [
      "USD/BDT spread: 1.2% captured today.",
      "TRC20 route fee only 1 USDT, bridges are cheaper.",
      "Dubai → Dhaka best route via crypto bridge, save ~$24."
    ],
    help: [
      "Contact our support on Telegram: @remitflow_support",
      "FAQ: Minimum deposit 5 USDT to start earning.",
      "How to switch between TRC20 and BEP20 wallets."
    ]
  };

  function getMessage(persona, cat) {
    const pool = messages[cat] || messages.general;
    let msg = pool[Math.floor(Math.random() * pool.length)];
    if (persona.traits.slang > 0.3 && Math.random() < 0.4) {
      msg = msg.replace(/\b(gonna|wanna|gotta)\b/g, m => m);
    }
    if (persona.traits.typoRate > 0.05 && Math.random() < 0.3) {
      msg = msg.replace(/\b(the)\b/g, 'teh').replace(/\b(and)\b/g, 'adn');
    }
    return msg;
  }

  function createChatHTML(persona, msg, timestamp) {
    const timeStr = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `<div class="chat-msg">
      <div class="msg-sender">${persona.name} ${persona.country === 'Bangladesh' ? '🇧🇩' : ''}</div>
      <div>${msg}</div>
      <div class="msg-time">${timeStr}</div>
    </div>`;
  }

  // ---- Render community tab ----
  function renderTab(tab) {
    const chatArea = document.getElementById('chatArea');
    if (!chatArea) return;
    let html = '';
    if (tab === 'general') {
      const shuffled = [...personas].sort(() => 0.5 - Math.random()).slice(0, 6);
      shuffled.forEach(p => {
        const cat = p.country === 'Bangladesh' && Math.random() < 0.4 ? 'bangla' : (Math.random() < 0.6 ? 'general' : 'remittance');
        html += createChatHTML(p, getMessage(p, cat), Date.now() - Math.random() * 600000);
      });
    } else if (tab === 'success') {
      messages.success.slice(0, 5).forEach(msg => {
        html += `<div class="fee-card" style="border-left-color:var(--green);margin-bottom:6px;">
          <div class="fee-info"><div class="fee-title">Success Story</div><div class="fee-time">Recently</div></div>
          <div style="font-size:0.8rem;color:var(--text);">${msg}</div></div>`;
      });
    } else if (tab === 'market') {
      messages.market.forEach(m => {
        html += `<div class="stat-card" style="margin-bottom:6px;"><i data-lucide="info" style="width:14px;color:var(--gold);margin-right:6px;"></i> ${m}</div>`;
      });
    } else if (tab === 'help') {
      html = `<div style="text-align:center;padding:20px;">
        <h3 style="color:var(--gold);">24/7 Support</h3>
        <p style="color:var(--text2);">Reach us on Telegram: @remitflow_support</p>
        <p style="color:var(--text2);">Min deposit 5 USDT, instant withdrawals, fee share daily.</p>
      </div>`;
    }
    chatArea.innerHTML = html;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  // ---- Live updates ----
  function updateOnlineCount() {
    const el = document.getElementById('onlineCount');
    if (el) el.textContent = Math.floor(Math.random() * 200 + 200) + ' online now';
  }

  function updateLiveFee() {
    const el = document.getElementById('liveFeeVal');
    if (el) el.textContent = '$' + (Math.random() * 5 + 1).toFixed(2);
  }

  // ---- Init ----
  let chatInterval;
  function initCommunity() {
    updateOnlineCount();
    updateLiveFee();
    if (chatInterval) clearInterval(chatInterval);
    chatInterval = setInterval(() => {
      if (document.getElementById('view-community')?.classList.contains('active') &&
          document.querySelector('#communityTabs .tab-pill.active')?.dataset.tab === 'general') {
        const p = personas[Math.floor(Math.random() * personas.length)];
        const msgHTML = createChatHTML(p, getMessage(p, Math.random() < 0.4 ? 'remittance' : 'general'), Date.now());
        const area = document.getElementById('chatArea');
        if (area) {
          area.insertAdjacentHTML('afterbegin', msgHTML);
          if (area.children.length > 30) area.removeChild(area.lastChild);
        }
      }
    }, 8000 + Math.random() * 12000);
  }

  // Expose to global
  window.initCommunity = initCommunity;
  window.renderCommunityTab = renderTab;

  // Auto‑init on first load if community view is present
  if (document.getElementById('chatArea')) {
    initCommunity();
    renderTab('general');
  }
})();
