// ===== RemitFlow AI – community.js (Diaspora Remittance Community) =====
(function() {
  console.log('RemitFlow AI community.js loaded');

  // ========== PERSONA DATA (10 Bangladeshi + 60 global personas) ==========
  const personaData = [
    // Original 10 Bangladeshi personas
    { name: "Rafiq Ahmed", gender: "men", country: "Bangladesh", isFallback: false },
    { name: "Farzana Chowdhury", gender: "women", country: "Bangladesh", isFallback: false },
    { name: "Sakib Hasan", gender: "men", country: "Bangladesh", isFallback: false },
    { name: "Nasrin Sultana", gender: "women", country: "Bangladesh", isFallback: false },
    { name: "Tanvir Islam", gender: "men", country: "Bangladesh", isFallback: false },
    { name: "Sharmin Akter", gender: "women", country: "Bangladesh", isFallback: false },
    { name: "Imran Khan", gender: "men", country: "Bangladesh", isFallback: false },
    { name: "Nusrat Jahan", gender: "women", country: "Bangladesh", isFallback: false },
    { name: "Fahim Rahman", gender: "men", country: "Bangladesh", isFallback: false },
    { name: "Jannatul Ferdous", gender: "women", country: "Bangladesh", isFallback: false },
    // 60 global personas (mixed)
    { name: "Ajide Femi", gender: "men", country: "Nigeria", isFallback: false },
    { name: "Andrew ♈", gender: "men", country: "US", isFallback: false },
    { name: "Angela", gender: "women", country: "US", isFallback: false },
    { name: "anna", gender: "women", country: "US", isFallback: false },
    { name: "Bigboy JO 💯", gender: "men", country: "Nigeria", isFallback: false },
    { name: "billy eseronio", gender: "men", country: "US", isFallback: false },
    { name: "bruce gaines", gender: "men", country: "US", isFallback: false },
    { name: "Cody Lamp", gender: "men", country: "US", isFallback: false },
    { name: "cynthia sherman", gender: "women", country: "US", isFallback: false },
    { name: "Danielle marie", gender: "women", country: "US", isFallback: false },
    { name: "diane", gender: "women", country: "US", isFallback: false },
    { name: "don m bennett", gender: "men", country: "US", isFallback: false },
    { name: "eric shiffler", gender: "men", country: "US", isFallback: false },
    { name: "Eric Temple", gender: "men", country: "US", isFallback: false },
    { name: "Gayle Churchill", gender: "women", country: "US", isFallback: false },
    { name: "gordon sadler", gender: "men", country: "US", isFallback: false },
    { name: "HAM ZAT", gender: "men", country: "Nigeria", isFallback: false },
    { name: "harshana", gender: "women", country: "India", isFallback: false },
    { name: "henry catt", gender: "men", country: "US", isFallback: false },
    { name: "ITZ DULZY", gender: "men", country: "Nigeria", isFallback: false },
    { name: "jackie costello", gender: "women", country: "US", isFallback: false },
    { name: "james creve", gender: "men", country: "US", isFallback: false },
    { name: "jeanne jennings", gender: "women", country: "US", isFallback: false },
    { name: "jenny seymore", gender: "women", country: "US", isFallback: false },
    { name: "jeremy reid", gender: "men", country: "US", isFallback: false },
    { name: "jim", gender: "men", country: "US", isFallback: false },
    { name: "junior ndlebe", gender: "men", country: "SouthAfrica", isFallback: false },
    { name: "Kachy emmanuel", gender: "men", country: "Nigeria", isFallback: false },
    { name: "kandrice casekey", gender: "women", country: "US", isFallback: false },
    { name: "Marian ❤️", gender: "women", country: "US", isFallback: false },
    { name: "micheal etezadi", gender: "men", country: "US", isFallback: false },
    { name: "Mimi Griffin", gender: "women", country: "US", isFallback: false },
    { name: "nan baker", gender: "women", country: "US", isFallback: false },
    { name: "nxumalo luh", gender: "men", country: "SouthAfrica", isFallback: false },
    { name: "olowoleru kayode", gender: "men", country: "Nigeria", isFallback: false },
    { name: "Paul Stokes", gender: "men", country: "US", isFallback: false },
    { name: "pearl smith", gender: "women", country: "US", isFallback: false },
    { name: "Phil Capps", gender: "men", country: "US", isFallback: false },
    { name: "philp rocco", gender: "men", country: "US", isFallback: false },
    { name: "randy ford", gender: "men", country: "US", isFallback: false },
    { name: "Ray Minnifield", gender: "men", country: "US", isFallback: false },
    { name: "richard khan", gender: "men", country: "US", isFallback: false },
    { name: "robert brown", gender: "men", country: "US", isFallback: false },
    { name: "Ryan", gender: "men", country: "US", isFallback: false },
    { name: "sxovalova jama", gender: "women", country: "US", isFallback: false },
    { name: "tabitha atkins", gender: "women", country: "US", isFallback: false },
    { name: "tobb bascom", gender: "men", country: "US", isFallback: false },
    { name: "Tony Cawood", gender: "men", country: "US", isFallback: false },
    { name: "troy gossman", gender: "men", country: "US", isFallback: false },
    { name: "tyler bishop", gender: "men", country: "US", isFallback: false },
    { name: "Van Grevenbroek", gender: "men", country: "US", isFallback: false }
  ];

  // ========== TRAITS ==========
  function getTraitsForPersona(name) {
    const map = {
      "Rafiq Ahmed": { archetype: "boss", grammar: "clean", slang: 0.3, typoRate: 0.05 },
      "Farzana Chowdhury": { archetype: "thoughtful", grammar: "clean", slang: 0.2, typoRate: 0.03 },
      "Sakib Hasan": { archetype: "analyst", grammar: "clean", slang: 0.1, typoRate: 0.04 },
      "Nasrin Sultana": { archetype: "newbie", grammar: "informal", slang: 0.5, typoRate: 0.1 },
      "Tanvir Islam": { archetype: "expert", grammar: "clean", slang: 0.15, typoRate: 0.02 },
      "Sharmin Akter": { archetype: "lurker", grammar: "mixed", slang: 0.4, typoRate: 0.07 },
      "Imran Khan": { archetype: "joker", grammar: "informal", slang: 0.7, typoRate: 0.12 },
      "Nusrat Jahan": { archetype: "thoughtful", grammar: "clean", slang: 0.25, typoRate: 0.04 },
      "Fahim Rahman": { archetype: "boss", grammar: "clean", slang: 0.2, typoRate: 0.05 },
      "Jannatul Ferdous": { archetype: "newbie", grammar: "informal", slang: 0.6, typoRate: 0.1 }
    };
    if (map[name]) return map[name];
    const rand = Math.random();
    if (rand < 0.2) return { archetype: "active", grammar: "mixed", slang: 0.4, typoRate: 0.08 };
    if (rand < 0.5) return { archetype: "lurker", grammar: "mixed", slang: 0.3, typoRate: 0.06 };
    return { archetype: "active", grammar: "informal", slang: 0.5, typoRate: 0.1 };
  }

  function getVipFromName(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = ((hash << 5) - hash) + name.charCodeAt(i);
    const rand = Math.abs(hash % 100) / 100;
    if (rand < 0.6) return 0;
    if (rand < 0.85) return 1;
    if (rand < 0.95) return 2;
    return 3;
  }

  // ========== BUILD PERSONA OBJECTS ==========
  const personaNames = personaData.map(p => {
    const traits = getTraitsForPersona(p.name);
    const initials = p.name
      .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
    const safeName = p.name.replace(/[^\w\s]/g, '').trim().replace(/\s+/g, '_').toLowerCase();
    const avatar = p.country === 'Bangladesh' 
      ? `assets/avatars/${safeName}.jpg` 
      : `https://ui-avatars.com/api/?name=${p.name.split(' ')[0][0]}+${p.name.split(' ').pop()[0]}&background=0d2b2b&color=d4a843&size=200&bold=true`;
    return {
      name: p.name,
      vip: getVipFromName(p.name),
      admin: false,
      moderator: false,
      avatar,
      isFallback: p.isFallback,
      initials,
      traits,
      country: p.country,
      gender: p.gender
    };
  });

  // ========== MESSAGE CATEGORIES (remittance‑themed) ==========
  const messageCategories = {
    general: [
      "Good morning everyone. Hope your families are receiving their full amounts today.",
      "Remittance is a lifeline for so many. Proud to be part of this.",
      "I love seeing the fee savings add up. Every dollar counts.",
      "Another smooth day on RemitFlow AI. Money moving safely.",
      "Diaspora family – let's keep supporting each other.",
      "Don't forget to check your fee share balance. Passive income!",
      "The spread captures are getting better each week.",
      "I've been with RemitFlow since beta, never looked back.",
      "This platform makes sending money home so much cheaper.",
      "Today I'm routing a transfer to Dhaka at the best rate ever.",
      "Patience and liquidity – that's the game.",
      "Who else is loving the instant fee share notifications?",
      "Community vibes here are unmatched. Real people helping real families.",
      "My parents now get the full amount, no hidden cuts.",
      "Just topped up my liquidity tier. Ready for more fee captures.",
      "Quiet morning for me, but the automated routes are working.",
      "I'm still new, but already see the difference in costs.",
      "Glad to be part of a platform that cares about diaspora communities.",
      "Let's keep the referrals going – more liquidity, lower fees.",
      "New day, new remittance flows. Let's earn together.",
      "Just saw a USDT bridge fee lower than bank transfer – awesome.",
      "Anyone else holding through the month for bonus tier returns?",
      "Never a dull moment watching the routes optimize.",
      "I appreciate the transparency here. All fees visible.",
      "Wishing everyone's families prosperity and safety.",
      "Dubai → Dhaka route was on fire today with fee captures.",
      "I use the TRC20 wallet for instant settlement – works perfectly.",
      "Stay humble when the fee share is high, and patient when it's not.",
      "I'm bullish on the diaspora community. So much potential.",
      "Checking in from the US – everything steady.",
      "Sending good vibes to all families receiving money today.",
      "Focus on the long‑term, not just one remittance.",
      "Who else finds the live ticker addictive?",
      "Just catching up – any new routes added?"
    ],
    remittance: [
      "Just saved $15 on my brother's remittance from Dubai.",
      "My parents got the full amount this month.",
      "Started with 5 USDT, now I earn enough to cover my bills.",
      "আমার পরিবার আজ পুরো টাকা পেয়েছে। ধন্যবাদ।",
      "I was skeptical, but after my first fee capture I withdrew $30 immediately.",
      "No more losing 8% on bank transfers.",
      "The TRC20 route saved me almost $40 compared to traditional wire.",
      "Just sent money to Dhaka – fee was only 0.5%. Unbelievable!",
      "My mother called me crying tears of joy. Thank you RemitFlow.",
      "BEP20 bridge was super fast today. Withdrew fee share instantly.",
      "Finally a platform that understands diaspora needs.",
      "I've saved over $200 in fees this year alone. Game changer.",
      "From Dubai to Dhaka in minutes, and I earn a cut. Brilliant.",
      "আমার ভাইয়ের জন্য পাঠানো টাকায় অনেক ফি বাঁচল।",
      "The spread capture on USD/BDT today was massive.",
      "Every time I send money home, I earn a little back. Love it.",
      "My entire family now uses RemitFlow. Savings add up.",
      "Just explained the concept to my uncle – he's joining today.",
      "The Diaspora Tier returns are incredible. Compounding fee shares.",
      "I was paying 5% before, now I'm under 1%. That's real impact.",
      "My daughter's school fees are now fully covered by fee savings.",
      "Used to dread sending money abroad. Now I look forward to it.",
      "The community here shares which routes are cheapest daily.",
      "Just hit my first $100 in fee shares. Celebrating!",
      "আমার মা বললেন এবার পুরো টাকা পেয়েছেন।",
      "Fastest route today was via crypto bridge – save 6%.",
      "I'm recommending this to every expat I know.",
      "Transparency in fees is why I trust this platform.",
      "Even on weekends, the routes work smoothly.",
      "Just locked 500 USDT in Diaspora Tier – earning daily now."
    ],
    question: [
      "How do I switch from TRC20 to BEP20 for my wallet?",
      "What's the minimum deposit to start earning fee shares?",
      "Can I withdraw my fee share daily?",
      "How does the fee capture work exactly? I'm new.",
      "Is there a limit on how much I can provide as liquidity?",
      "How often are the remittance routes optimized?",
      "Do I need to be online to earn fee shares?",
      "Can I use a friend's referral code after signing up?",
      "What happens if a remittance fails – is my USDT safe?",
      "I'm based in Dubai, which tier is best for me?",
      "Are the fee shares paid in USDT?",
      "How do I verify my account?",
      "Is there a mobile app coming?",
      "Can I provide liquidity with just 5 USDT?",
      "What's the spread capture percentage right now?",
      "How do I upgrade to Diaspora Tier?",
      "Do you support other currencies besides USDT?",
      "Is my USDT locked for a fixed period?",
      "How long does a withdrawal take on TRC20?",
      "Can I transfer between my own wallet accounts?",
      "Are there any hidden fees when I withdraw?",
      "What's the benefit of being a VIP member?",
      "How often are fee shares distributed?",
      "Is RemitFlow available globally?",
      "Can I send money to countries besides Bangladesh?",
      "What's the difference between Starter and Growth Tier?",
      "Do I earn fee shares on weekends?",
      "How secure is my wallet?",
      "Can I have multiple liquidity tiers at once?",
      "Will I be notified when a new route is added?"
    ],
    success: [
      "I started with $50 and now my fee share covers my monthly phone bill.",
      "Three months in, and I've saved over $300 in remittance fees.",
      "My parents now receive the exact amount I send, no deductions.",
      "Just hit VIP 2 status – the extra 0.5% boost is amazing.",
      "I've referred 5 friends and they all love the savings.",
      "Today I withdrew my fee share and treated my family to dinner.",
      "The Diaspora Tier unlocked a whole new level of earnings for me.",
      "I was skeptical, but now I'm a believer – proof in the savings.",
      "My remittance costs dropped from $40 to $3. That's life changing.",
      "Every month I reinvest my fee shares back into liquidity – compounding.",
      "I'm a single mom and this extra income helps with school supplies.",
      "My brother in the UK uses it too; we both save on each transfer.",
      "No more waiting in line at the bank, and it's cheaper.",
      "I used to lose 7% on each transfer, now I earn 4% back. Net win.",
      "Finally financially independent from high remittance fees.",
      "My family in Sylhet received money in 2 minutes yesterday.",
      "I track my savings and it's like having a second income.",
      "The auto‑routing feature is genius. I don't do anything manually.",
      "RemitFlow helped me build an emergency fund from fee savings.",
      "I'm living proof – start with 5 USDT and watch it grow.",
      "My fee share today was $5.60 – enough for a nice lunch back home.",
      "I've been able to increase my monthly remittance because of the savings.",
      "The platform paid for my return flight home this year. Not kidding.",
      "My village now has 10 families using RemitFlow. Community power.",
      "I never thought sending money could be profitable. It is now.",
      "The transparency around fees has rebuilt my trust in remittance.",
      "I'm not a tech person, but the app is so easy to use.",
      "Withdrew $120 in fee shares last month – pure profit.",
      "RemitFlow is the best financial decision I've made abroad.",
      "I'm planning to retire early thanks to the compound fee shares."
    ],
    bangla: [
      "আমার ভাই দুবাই থেকে টাকা পাঠালো, পুরো টাকা পেয়েছে।",
      "ধন্যবাদ রেমিটফ্লো, এত কম ফি কখনো দেখিনি।",
      "আমি ৫ USDT দিয়ে শুরু করেছিলাম, এখন ভালো আয় করছি।",
      "বাংলাদেশে টাকা পাঠাতে আর কোনো সমস্যা নেই।",
      "আমার বাবা মা আজ খুশি, কোনো কাটতি হয়নি।",
      "ফি শেয়ারটা সত্যিই চমৎকার।",
      "সবাইকে বলি এই প্ল্যাটফর্ম ব্যবহার করতে, ভুলবেন না।",
      "দুবাই থেকে ঢাকা, মিনিটেই চলে এলো টাকা।",
      "আগে ব্যাংকে যেতে হতো, এখন ঘরে বসেই সব।",
      "আমার বোনের বিয়ের জন্য টাকা পাঠিয়েছিলাম, সব পৌঁছেছে।",
      "রেমিটফ্লো ছাড়া এখন আমি কিছু ভাবতে পারি না।",
      "লিকুইডিটি দেওয়ার পর থেকে আমার মাসিক আয় বেড়েছে।",
      "ঢাকা এক্সপ্রেস রুট আজকে অসাধারণ।",
      "আমি এখন পর্যন্ত ২০০ ডলার বাঁচিয়েছি ফিতে।",
      "আমার গ্রামের বাড়িতে সবাই এখন রেমিটফ্লো ব্যবহার করে।",
      "এই কমিউনিটির সবাইকে সালাম। আমরা একসাথে ভালো আছি।",
      "কখনো ভাবিনি টাকা পাঠানো এত লাভজনক হতে পারে।",
      "আমার ছেলের স্কুলের খরচ ফি শেয়ার থেকেই হচ্ছে।",
      "বাংলাদেশের জন্য নতুন রুট কবে আসবে? অপেক্ষায় আছি।",
      "দুবাই থেকে সিলেট রুটটা দারুন, সেভ করলাম ১৮ ডলার।"
    ]
  };

  // ========== TYPO & SLANG HELPERS ==========
  const commonTypos = {
    "the": "teh", "and": "adn", "you": "yuo", "are": "aer", "that": "taht",
    "with": "wiht", "have": "hav", "this": "tihs", "will": "wil",
    "when": "wehn", "where": "wher", "there": "tehre", "their": "thier",
    "profit": "proffit", "signal": "singal", "send": "sned", "remittance": "remitance",
    "market": "makret", "stop": "sotp", "loss": "lose", "time": "tiem",
    "today": "todday", "good": "goood", "great": "greaat", "making": "makign",
    "community": "comunity", "everyone": "evreyone", "session": "sessoin",
    "deposit": "depoist", "withdrawal": "withdrawl", "support": "spport"
  };

  function applyTypos(text, persona) {
    if (persona.traits.typoRate < Math.random()) return text;
    const words = text.split(' ');
    if (words.length < 2) return text;
    const idx = Math.floor(Math.random() * words.length);
    const word = words[idx].toLowerCase();
    if (commonTypos[word]) {
      words[idx] = Math.random() < 0.6 ? commonTypos[word] : words[idx];
      return words.join(' ');
    }
    if (word.length > 3 && Math.random() < 0.4) {
      const pos = Math.floor(Math.random() * (word.length - 1));
      const chars = word.split('');
      [chars[pos], chars[pos + 1]] = [chars[pos + 1], chars[pos]];
      words[idx] = chars.join('');
    }
    return words.join(' ');
  }

  function applySlang(text, persona) {
    if (persona.traits.slang < Math.random()) return text;
    const slangMap = {
      "going to": "gonna", "want to": "wanna", "you all": "y'all",
      "I am": "I'm", "you are": "you're", "cannot": "can't",
      "do not": "don't", "does not": "doesn't", "let us": "let's",
      "what is": "what's", "it is": "it's", "that is": "that's"
    };
    for (const [key, val] of Object.entries(slangMap)) {
      if (Math.random() < 0.5 && text.includes(key)) text = text.replace(new RegExp(key, 'g'), val);
    }
    return text;
  }

  function getCountrySlang(persona) {
    if (persona.country === 'Bangladesh' && Math.random() < 0.4) {
      return messageCategories.bangla[Math.floor(Math.random() * messageCategories.bangla.length)];
    }
    return null;
  }

  // ========== MESSAGE GENERATION WITH UNIQUENESS ==========
  const recentMessagesText = new Set();
  const MAX_RECENT_MSGS = 200;

  function getRandomMessage(persona) {
    const slangMsg = getCountrySlang(persona);
    if (slangMsg) {
      let msg = slangMsg;
      msg = applySlang(msg, persona);
      msg = applyTypos(msg, persona);
      if (persona.traits.slang > 0.6 && Math.random() < 0.3) msg += ' ' + (['🔥','😂','💰','😎','👍'][Math.floor(Math.random()*5)]);
      return msg;
    }

    let preferred = ['general'];
    if (persona.traits.archetype === 'boss') preferred = ['remittance', 'success', 'general'];
    else if (persona.traits.archetype === 'analyst') preferred = ['question', 'remittance', 'general'];
    else if (persona.traits.archetype === 'joker') preferred = ['general', 'remittance', 'bangla'];
    else if (persona.traits.archetype === 'newbie') preferred = ['question', 'general'];
    else preferred = ['general', 'remittance'];

    const cat = preferred[Math.floor(Math.random() * preferred.length)];
    const bank = messageCategories[cat] || messageCategories.general;

    let msg = null;
    for (let i = 0; i < 30; i++) {
      const candidate = bank[Math.floor(Math.random() * bank.length)];
      if (!recentMessagesText.has(candidate)) {
        msg = candidate;
        break;
      }
    }
    if (!msg) msg = bank[Math.floor(Math.random() * bank.length)];

    recentMessagesText.add(msg);
    if (recentMessagesText.size > MAX_RECENT_MSGS) {
      const iter = recentMessagesText.values();
      recentMessagesText.delete(iter.next().value);
    }

    msg = applySlang(msg, persona);
    msg = applyTypos(msg, persona);
    if (persona.traits.slang > 0.6 && Math.random() < 0.2) msg += ' ' + ['😂','🔥','🚀','😎','🤣','👍','💰'][Math.floor(Math.random()*7)];
    return msg;
  }

  // ========== CHAT CARD CREATION ==========
  function createChatCard(persona, message, timestamp) {
    const badgeHtml = persona.admin
      ? '<span class="chat-msg-badge badge-admin">Admin</span>'
      : (persona.vip > 0 ? `<span class="chat-msg-badge badge-vip">VIP ${persona.vip}</span>` : '');

    const initials = persona.initials;
    const avatarHtml = `<div class="chat-msg-avatar" style="background:rgba(212,168,67,.22)">${initials}</div>`;

    const timeAgo = Math.floor((Date.now() - timestamp) / 60000);
    const relativeTime = formatRelativeTime(timeAgo);

    return `<div class="community-chat-card" data-msg-timestamp="${timestamp}">
      <div class="chat-msg-top">
        ${avatarHtml}
        <div>
          <div class="chat-msg-name">${persona.name} ${badgeHtml}</div>
          <div style="font-size:11px;color:#7a9494;">${relativeTime}</div>
        </div>
      </div>
      <div class="chat-msg-body">${message}</div>
      <div class="chat-reactions" id="reactions-${timestamp}"></div>
      <div class="chat-msg-time">${formatTime(new Date(timestamp))}</div>
    </div>`;
  }

  function startReactionSimulation(cardElement) {
    const timestamp = parseInt(cardElement.dataset.msgTimestamp);
    const reactionsDiv = cardElement.querySelector('.chat-reactions');
    if (!reactionsDiv) return;
    
    const targetCounts = {
      '👍': Math.floor(Math.random() * 40) + 3,
      '❤️': Math.floor(Math.random() * 20) + 1,
      '🔥': Math.random() > 0.5 ? Math.floor(Math.random() * 15) + 1 : 0,
      '🚀': Math.random() > 0.6 ? Math.floor(Math.random() * 10) + 1 : 0
    };
    let currentCounts = { '👍': 0, '❤️': 0, '🔥': 0, '🚀': 0 };
    
    const interval = setInterval(() => {
      const available = ['👍','❤️','🔥','🚀'].filter(e => currentCounts[e] < targetCounts[e]);
      if (available.length === 0) { clearInterval(interval); return; }
      const emoji = available[Math.floor(Math.random() * available.length)];
      const increment = Math.min(Math.floor(Math.random() * 2) + 1, targetCounts[emoji] - currentCounts[emoji]);
      currentCounts[emoji] += increment;
      updateReactionsDisplay(reactionsDiv, currentCounts);
    }, 1500 + Math.random() * 5000);
  }

  function updateReactionsDisplay(container, counts) {
    let html = '';
    for (const emoji of ['👍','❤️','🔥','🚀']) {
      if (counts[emoji] > 0) html += `<div class="chat-reaction">${emoji} ${counts[emoji]}</div>`;
    }
    container.innerHTML = html;
  }

  // ========== HELPERS ==========
  function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function getRandomPersona() { return personaNames[randomInt(0, personaNames.length - 1)]; }

  function formatRelativeTime(minutesAgo) {
    if (minutesAgo < 1) return 'Just now';
    if (minutesAgo < 60) return `${minutesAgo} min ago`;
    const hours = Math.floor(minutesAgo / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }

  function formatTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours % 12 || 12}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
  }

  // ========== CHAT LOOP ==========
  let chatMessageInterval;
  function startChatMessageLoop() {
    if (chatMessageInterval) clearTimeout(chatMessageInterval);
    const addMessageWithDelay = () => {
      addRandomChatMessage();
      chatMessageInterval = setTimeout(addMessageWithDelay, 4000 + Math.random() * 15000);
    };
    addMessageWithDelay();
  }

  function addRandomChatMessage() {
    const chatArea = document.getElementById('chatArea');
    if (!chatArea) return;
    const persona = getRandomPersona();
    const cardHtml = createChatCard(persona, getRandomMessage(persona), Date.now() - randomInt(0, 600) * 1000);
    chatArea.insertAdjacentHTML('afterbegin', cardHtml);
    const cardElement = chatArea.firstElementChild;
    if (cardElement) startReactionSimulation(cardElement);
    while (chatArea.children.length > 60) chatArea.removeChild(chatArea.lastChild);
  }

  function preloadChatMessages() {
    const chatArea = document.getElementById('chatArea');
    if (!chatArea) return;
    chatArea.innerHTML = '';
    const count = randomInt(4, 7);
    for (let i = 0; i < count; i++) {
      const persona = getRandomPersona();
      const cardHtml = createChatCard(persona, getRandomMessage(persona), Date.now() - (i * 120000 + randomInt(0, 180) * 1000));
      chatArea.insertAdjacentHTML('beforeend', cardHtml);
      const cardElement = chatArea.lastElementChild;
      if (cardElement) startReactionSimulation(cardElement);
    }
  }

  // ========== ONLINE MEMBERS & TICKER ==========
  function updateOnlineMembers() {
    const onlineCount = randomInt(200, 350);
    const onlineCountEl = document.getElementById('onlineCount');
    if (onlineCountEl) onlineCountEl.textContent = `${onlineCount} online now`;
  }

  function updateLiveFeeTicker() {
    const sidebar = document.querySelector('.sidebar-section');
    if (!sidebar) return;
    const randomFee = (Math.random() * 5 + 1).toFixed(2);
    const tickerSpan = sidebar.querySelector('span[style*="color:var(--green)"]');
    if (tickerSpan) tickerSpan.textContent = `$${randomFee}`;
  }

  // ========== TAB SWITCHING ==========
  function showGeneralChat() {
    const chatArea = document.getElementById('chatArea');
    const tabs = document.querySelectorAll('.tab-pill');
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector('.tab-pill[data-tab="general"]')?.classList.add('active');
    if (chatArea) chatArea.style.display = 'block';
    // hide other panels if any
  }

  function showSuccessStories() {
    const chatArea = document.getElementById('chatArea');
    const tabs = document.querySelectorAll('.tab-pill');
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector('.tab-pill[data-tab="success"]')?.classList.add('active');
    if (chatArea) {
      chatArea.innerHTML = '<div style="padding:16px;text-align:center;color:var(--text2);">Loading success stories...</div>';
      // Simulate success stories (could be filled with testimonial messages)
      setTimeout(() => {
        const stories = messageCategories.success.slice(0, 6);
        chatArea.innerHTML = stories.map(msg => `
          <div class="fee-card" style="border-left-color: var(--green);">
            <div class="fee-info">
              <div class="fee-title">Success Story</div>
              <div class="fee-time">Recently shared</div>
            </div>
            <div style="color:var(--text);font-size:0.82rem;max-width:60%;text-align:right;">${msg}</div>
          </div>`).join('');
      }, 500);
    }
  }

  function showMarketUpdates() {
    const chatArea = document.getElementById('chatArea');
    const tabs = document.querySelectorAll('.tab-pill');
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector('.tab-pill[data-tab="market"]')?.classList.add('active');
    if (chatArea) {
      chatArea.innerHTML = '<div style="padding:16px;text-align:center;color:var(--text2);">Live remittance rates and bridge costs...</div>';
      setTimeout(() => {
        chatArea.innerHTML = `
          <div class="stat-card" style="margin-bottom:8px;"><strong>USD/BDT Spread:</strong> 1.2% captured</div>
          <div class="stat-card" style="margin-bottom:8px;"><strong>TRC20 Network Fee:</strong> 1 USDT</div>
          <div class="stat-card" style="margin-bottom:8px;"><strong>Dubai → Dhaka:</strong> Best route via crypto bridge (save ~$24)</div>
          <div class="stat-card"><strong>Live Fee Share Rate:</strong> 4.5% (Diaspora Tier)</div>`;
      }, 300);
    }
  }

  function showHelpDesk() {
    const chatArea = document.getElementById('chatArea');
    const tabs = document.querySelectorAll('.tab-pill');
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector('.tab-pill[data-tab="help"]')?.classList.add('active');
    if (chatArea) {
      chatArea.innerHTML = `
        <div style="text-align:center;padding:20px;">
          <div style="font-size:2rem;margin-bottom:10px;">🎧</div>
          <h3 style="color:var(--gold);">24/7 Support</h3>
          <p style="color:var(--text2);margin-bottom:16px;">Contact our team via Telegram for instant help with your remittance routes, liquidity tiers, or wallet issues.</p>
          <a href="https://t.me/remitflow_support" target="_blank" style="display:inline-block;background:var(--gold);color:#0d2b2b;padding:12px 24px;border-radius:25px;text-decoration:none;font-weight:700;">Chat on Telegram</a>
        </div>`;
    }
  }

  // Attach tab events
  document.querySelectorAll('.tab-pill').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.dataset.tab;
      if (tabName === 'general') showGeneralChat();
      else if (tabName === 'success') showSuccessStories();
      else if (tabName === 'market') showMarketUpdates();
      else if (tabName === 'help') showHelpDesk();
    });
  });

  // ========== INITIALIZATION ==========
  function startCommunitySimulation() {
    preloadChatMessages();
    startChatMessageLoop();
    updateOnlineMembers();
    updateLiveFeeTicker();

    setInterval(() => {
      updateOnlineMembers();
      updateLiveFeeTicker();
    }, 30000);

    // Handle disabled chat input for non‑investors
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendChatBtn');
    if (chatInput && sendBtn) {
      sendBtn.addEventListener('click', () => {
        if (chatInput.disabled) {
          // show modal
          const modalContainer = document.getElementById('modalContainer');
          if (modalContainer) {
            modalContainer.innerHTML = `
              <div class="modal-overlay" id="chatLockModal">
                <div class="modal">
                  <h3>Join a Tier to Chat</h3>
                  <p>Provide liquidity in any tier (min 5 USDT) to unlock community chat and earn fee shares.</p>
                  <button class="btn btn-gold" onclick="document.getElementById('chatLockModal').remove(); navigateTo('invest');">Provide Liquidity</button>
                  <button class="btn btn-outline" style="margin-top:8px;" onclick="document.getElementById('chatLockModal').remove();">Later</button>
                </div>
              </div>`;
          }
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startCommunitySimulation);
  } else {
    startCommunitySimulation();
  }
})();
