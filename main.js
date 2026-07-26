// ===== RemitFlow AI – main.js (all logic) =====
(function() {
  console.log('main.js loaded');

  // ---- STATE ----
  const state = {
    activeView: 'home',
    activeCommunityTab: 'general',
    totalEarned: 320.00,
    todayFee: 4.50,
    availableShare: 320.00,
    balance: { available: 930, locked: 320, total: 1250 },
    tier: 'Starter',
    withdraw: { method: 'trc20', address: '', amount: 0 },
    isBalanceVisible: true
  };

  // ---- DOM helpers ----
  function $(id) { return document.getElementById(id); }

  function fmt(val) { return '$' + val.toFixed(2); }

  // ---- Navigation ----
  function navigateTo(view) {
    if (state.activeView === view) return;
    document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
    $(`view-${view}`).classList.add('active');

    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelector(`.nav-item[data-view="${view}"]`).classList.add('active');

    state.activeView = view;

    if (view === 'community') {
      if (typeof window.initCommunity === 'function') window.initCommunity();
      switchCommunityTab(state.activeCommunityTab);
    }

    lucide.createIcons();
  }
  window.navigateTo = navigateTo;

  // Bottom nav event delegation
  document.getElementById('bottomNav').addEventListener('click', (e) => {
    const btn = e.target.closest('.nav-item');
    if (!btn) return;
    navigateTo(btn.dataset.view);
  });

  // ---- Community sub‑tab switching ----
  function switchCommunityTab(tab) {
    state.activeCommunityTab = tab;
    const tabs = document.querySelectorAll('#communityTabs .tab-pill');
    tabs.forEach(t => t.classList.remove('active'));
    const activeTab = document.querySelector(`#communityTabs .tab-pill[data-tab="${tab}"]`);
    if (activeTab) activeTab.classList.add('active');

    if (typeof window.renderCommunityTab === 'function') {
      window.renderCommunityTab(tab);
    }
    lucide.createIcons();
  }
  window.switchCommunityTab = switchCommunityTab;

  // Tab pills click
  document.getElementById('communityTabs').addEventListener('click', (e) => {
    const pill = e.target.closest('.tab-pill');
    if (!pill) return;
    switchCommunityTab(pill.dataset.tab);
  });

  // ---- Home: ticker & fee captures ----
  const tickerRoutes = [
    "Dubai → Dhaka: $1,200 routed, fee saved $24.00",
    "London → Lagos: $800 routed, fee saved $16.50",
    "New York → Manila: $2,000 routed, fee saved $42.00",
    "Riyadh → Cairo: $1,500 routed, fee saved $30.00",
    "Dubai → Chittagong: $950 routed, fee saved $19.80",
    "Paris → Dakar: $1,100 routed, fee saved $22.40"
  ];

  function populateTicker() {
    const track = $('#tickerTrack');
    if (!track) return;
    const doubled = [...tickerRoutes, ...tickerRoutes]
      .map(r => `<div class="ticker-item"><span class="ticker-dot"></span>${r}</div>`).join('');
    track.innerHTML = doubled;
  }

  function generateFeeCaptures() {
    const container = $('#feeCapturesContainer');
    if (!container) return;
    const samples = [
      { title: 'USD/BDT spread', amount: 3.40, time: '2 min ago' },
      { title: 'AED/BDT spread', amount: 2.80, time: '8 min ago' },
      { title: 'GBP/NGN spread', amount: 5.10, time: '14 min ago' },
      { title: 'EUR/INR spread', amount: 1.90, time: '22 min ago' }
    ];
    container.innerHTML = samples.map(f => `
      <div class="fee-card">
        <div class="fee-info"><div class="fee-title">${f.title} – captured</div><div class="fee-time">${f.time}</div></div>
        <div class="fee-amount"><i data-lucide="trending-up" style="width:14px;height:14px;"></i> $${f.amount.toFixed(2)}</div>
      </div>`).join('');
    lucide.createIcons();
  }

  // ---- Invest: tier cards ----
  const tiers = [
    { id: 'starter', name: 'Starter Tier', range: '$5–$49', rate: '3.0%', desc: 'Start small, earn fee shares from day one.', min: 5, max: 49, duration: '30 days', return30: '$1.50–$14.70' },
    { id: 'growth', name: 'Growth Tier', range: '$50–$199', rate: '3.5%', desc: 'Increased share for growing liquidity.', min: 50, max: 199, duration: '30 days', return30: '$17.50–$69.65' },
    { id: 'premium', name: 'Premium Tier', range: '$200–$499', rate: '4.0%', desc: 'Premium returns for serious providers.', min: 200, max: 499, duration: '30 days', return30: '$80–$199.60' },
    { id: 'diaspora', name: 'Diaspora Tier', range: '$500+', rate: '4.5%', desc: 'Maximum fee share for diaspora champions.', min: 500, max: Infinity, duration: '30 days', return30: '$225+' }
  ];

  function populateTiers() {
    const container = $('#tierCardsContainer');
    if (!container) return;
    container.innerHTML = tiers.map(t => `
      <div class="tier-card" data-tier="${t.id}" onclick="selectTier('${t.id}')">
        <div class="tier-badge"><i data-lucide="layers" style="width:16px;"></i> ${t.name}</div>
        <div style="font-size:0.72rem;color:var(--text3);margin-bottom:4px;">${t.desc}</div>
        <div class="tier-rate">${t.rate} <span style="font-size:0.8rem;color:var(--text2);">Fee Share</span></div>
        <div class="tier-meta">
          <span>Min ${t.range}</span>
          <span>${t.duration}</span>
          <span>30‑Day ${t.return30}</span>
        </div>
        <button class="btn-tier">Provide Liquidity</button>
      </div>`).join('');
    lucide.createIcons();
  }

  window.selectTier = function(tierId) {
    const toast = $('#toastContainer');
    const tier = tiers.find(t => t.id === tierId);
    toast.innerHTML = `<div class="toast">Selected ${tier.name} – deposit min ${tier.min} USDT</div>`;
    setTimeout(() => toast.innerHTML = '', 2500);
  };

  // ---- Withdraw ----
  function updateReceivePreview() {
    const amountInput = $('#withdrawAmount');
    let amt = parseFloat(amountInput.value) || 0;
    if (amt > state.availableShare) amt = state.availableShare;
    const receive = Math.max(0, amt - 1); // network fee 1 USDT
    $('#receivePreview').textContent = fmt(receive);
  }

  $('#withdrawAmount').addEventListener('input', updateReceivePreview);
  document.querySelectorAll('.preset-btn').forEach(btn => btn.addEventListener('click', (e) => {
    const val = e.currentTarget.dataset.amount;
    const input = $('#withdrawAmount');
    if (val === 'max') input.value = state.availableShare;
    else input.value = val;
    updateReceivePreview();
  }));

  document.querySelectorAll('#methodSelector .method-option').forEach(opt => opt.addEventListener('click', (e) => {
    document.querySelectorAll('#methodSelector .method-option').forEach(o => o.classList.remove('selected'));
    e.currentTarget.classList.add('selected');
    state.withdraw.method = e.currentTarget.dataset.method;
  }));

  window.toggleBalanceEye = function() {
    state.isBalanceVisible = !state.isBalanceVisible;
    const amt = $('#availableShare');
    const btn = $('#eyeToggleBtn');
    if (state.isBalanceVisible) {
      amt.textContent = fmt(state.availableShare);
      btn.innerHTML = '<i data-lucide="eye" style="width:14px;"></i> Hide';
    } else {
      amt.textContent = '****';
      btn.innerHTML = '<i data-lucide="eye-off" style="width:14px;"></i> Show';
    }
    lucide.createIcons();
  };

  window.collectNow = function() {
    const address = $('#walletAddress').value.trim();
    const amount = parseFloat($('#withdrawAmount').value);
    if (!address) return alert('Enter wallet address');
    if (!amount || amount < 1) return alert('Minimum withdrawal 1 USDT');
    if (amount > state.availableShare) return alert('Insufficient fee share');
    // simulate
    const receipt = `
      <div class="receipt" style="margin-top:16px;">
        <i data-lucide="check-circle" style="color:var(--green);width:40px;height:40px;"></i>
        <h3 style="color:var(--green);">Withdrawal Successful</h3>
        <div class="detail-row"><span>Amount</span><strong>${fmt(amount)}</strong></div>
        <div class="detail-row"><span>Network Fee</span><strong>$1.00</strong></div>
        <div class="detail-row"><span>You Receive</span><strong>${fmt(amount-1)}</strong></div>
        <div class="detail-row"><span>Method</span><strong>${state.withdraw.method.toUpperCase()}</strong></div>
      </div>`;
    $('#receiptArea').innerHTML = receipt;
    state.availableShare -= amount;
    $('#availableShare').textContent = fmt(state.availableShare);
    lucide.createIcons();
  };

  // ---- Wallet ----
  function populateWallet() {
    $('#totalBalance').textContent = fmt(state.balance.total);
    $('#availBalance').textContent = fmt(state.balance.available);
    $('#lockedBalance').textContent = fmt(state.balance.locked);
    $('#trc20Balance').textContent = fmt(state.balance.total * 0.7);
    $('#bep20Balance').textContent = fmt(state.balance.total * 0.3);
    $('#txList').innerHTML = [
      { type: 'Fee Capture', date: 'Jul 25, 2026', amount: 4.50, in: true },
      { type: 'Liquidity Deposit', date: 'Jul 24, 2026', amount: 200, in: true },
      { type: 'Withdrawal', date: 'Jul 22, 2026', amount: 30, in: false }
    ].map(tx => `
      <div class="tx-item">
        <div><div class="tx-type">${tx.type}</div><div class="tx-date">${tx.date}</div></div>
        <div class="tx-amount ${tx.in ? 'in' : 'out'}">${tx.in ? '+' : '-'}${fmt(tx.amount)}</div>
      </div>`).join('');
  }

  // ---- Periodic updates ----
  setInterval(() => {
    const fee = (Math.random() * 3 + 3).toFixed(2);
    state.todayFee = parseFloat(fee);
    const el = $('#todayFee');
    if (el) el.textContent = '$' + fee;
  }, 15000);

  // ---- Init ----
  function initApp() {
    populateTicker();
    generateFeeCaptures();
    populateTiers();
    populateWallet();
    updateReceivePreview();
    lucide.createIcons();
  }

  initApp();
  // icon refresh on dynamic content
  new MutationObserver(() => lucide.createIcons()).observe(document.body, { childList: true, subtree: true });
})();
