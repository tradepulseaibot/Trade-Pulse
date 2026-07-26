(function () {
  'use strict';

  // ==================== DOM helpers ====================
  const $ = (id) => document.getElementById(id);

  // ==================== State ====================
  const NETWORK_FEE = 1;       // 1 USDT
  let balanceHidden = false;
  let totalFeeShare = 320;     // demo balance
  let activeTier = 'starter';
  let selectedMethod = 'trc20';

  const tiers = {
    starter:  { name: 'Starter Tier',  min: 5,   max: 49,   rate: '3.0%', roi: '90%',  desc: 'Perfect for beginners dipping into diaspora savings.' },
    growth:   { name: 'Growth Tier',   min: 50,  max: 199,  rate: '3.5%', roi: '105%', desc: 'Higher returns for growing your liquidity pool.' },
    premium:  { name: 'Premium Tier',  min: 200, max: 499,  rate: '4.0%', roi: '120%', desc: 'Serious liquidity providers earn serious shares.' },
    diaspora: { name: 'Diaspora Tier', min: 500, max: Infinity, rate: '4.5%', roi: '135%', desc: 'Exclusive tier with highest fee share and priority support.' }
  };

  // ==================== Globals (for HTML onclick) ====================
  window.navigateTo = function(view) {
    document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
    const target = $(`view-${view}`);
    if (target) target.classList.add('active');

    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const navItem = document.querySelector(`.nav-item[data-view="${view}"]`);
    if (navItem) navItem.classList.add('active');

    if (view === 'invest') buildTierCards();
    if (view === 'community') initCommunity();

    if (typeof lucide !== 'undefined') lucide.createIcons();
  };

  window.selectTier = function(key) {
    if (!tiers[key]) return;
    activeTier = key;
    const name = tiers[key].name;
    const h = $('headerTier'); if (h) h.textContent = name.split(' ')[0];
    const s = $('statTier'); if (s) s.textContent = name.split(' ')[0];
    showToast(`✅ Switched to ${name}`);
  };

  window.collectNow = function() {
    const addr = ($('walletAddress')?.value || '').trim();
    const amt = parseFloat($('withdrawAmount')?.value);
    if (!addr) return showToast('⚠️ Enter wallet address');
    if (!amt || amt <= 0) return showToast('⚠️ Enter valid amount');
    if (amt > totalFeeShare) return showToast('⚠️ Insufficient balance');
    totalFeeShare -= amt;
    updateAllBalances();
    showReceipt(addr, amt);
  };

  window.toggleBalanceEye = function() {
    balanceHidden = !balanceHidden;
    updateAllBalances();
    const btn = $('eyeToggleBtn');
    if (btn) btn.innerHTML = balanceHidden
      ? '<i data-lucide="eye-off" style="width:14px;"></i> Show'
      : '<i data-lucide="eye" style="width:14px;"></i> Hide';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  };

  window.switchCommunityTab = function(tab) {
    document.querySelectorAll('.tab-pill').forEach(p => p.classList.remove('active'));
    const active = document.querySelector(`.tab-pill[data-tab="${tab}"]`);
    if (active) active.classList.add('active');
    initCommunity();
  };

  // ==================== Ticker ====================
  const remittancePairs = [
    { from: 'Dubai', to: 'Dhaka' }, { from: 'London', to: 'Sylhet' },
    { from: 'New York', to: 'Chittagong' }, { from: 'Kuala Lumpur', to: 'Dhaka' },
    { from: 'Riyadh', to: 'Comilla' }, { from: 'Toronto', to: 'Gazipur' },
    { from: 'Sydney', to: 'Noakhali' }, { from: 'Paris', to: 'Barisal' }
  ];
  function buildTicker() {
    const track = $('tickerTrack');
    if (!track) return;
    let html = '';
    for (let i = 0; i < 8; i++) {
      const p = remittancePairs[i % remittancePairs.length];
      const amt = (Math.random() * 2000 + 500).toFixed(0);
      const saved = (amt * 0.02).toFixed(2);
      html += `<span class="ticker-item"><span class="ticker-dot"></span> ${p.from} → ${p.to}: $${amt} routed, fee saved $${saved}</span>`;
    }
    track.innerHTML = html + html;
  }

  // ==================== Fee Captures ====================
  function buildFeeCaptures() {
    const c = $('feeCapturesContainer');
    if (!c) return;
    const pairs = ['USD/BDT','AED/BDT','GBP/BDT','MYR/BDT','CAD/BDT'];
    let html = '';
    for (let i=0; i<4; i++) {
      const pair = pairs[Math.floor(Math.random()*pairs.length)];
      const cap = (Math.random()*20+1).toFixed(2);
      const mins = Math.floor(Math.random()*60);
      html += `<div class="fee-card"><div class="fee-info"><div class="fee-title">${pair} spread – captured $${cap}</div><div class="fee-time">${mins} min ago</div></div><div class="fee-amount"><i data-lucide="arrow-up-right" style="width:14px;"></i> $${cap}</div></div>`;
    }
    c.innerHTML = html;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  // ==================== Tier Cards ====================
  function buildTierCards() {
    const c = $('tierCardsContainer');
    if (!c) return;
    let html = '';
    for (const [k,t] of Object.entries(tiers)) {
      const pop = k==='starter'?'Most Popular':'';
      html += `<div class="tier-card" data-tier="${k}">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div class="tier-badge"><i data-lucide="star" style="width:16px;"></i> ${t.name}</div>
          ${pop?`<span style="font-size:0.65rem;background:rgba(34,197,94,.15);color:#22c55e;padding:2px 8px;border-radius:10px;">${pop}</span>`:''}
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin:8px 0">
          <div class="tier-rate">${t.rate}</div><span style="font-size:0.7rem;color:var(--text3)">daily fee share</span>
        </div>
        <div class="tier-meta">
          <span>Min: $${t.min}</span><span>Max: ${t.max===Infinity?'Unlimited':'$'+t.max}</span><span>30d ROI: ${t.roi}</span>
        </div>
        <button class="btn-tier" onclick="window.selectTier('${k}')">Provide Liquidity</button>
      </div>`;
    }
    c.innerHTML = html;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  // ==================== Withdrawal helpers ====================
  function updateReceivePreview() {
    const amt = parseFloat($('withdrawAmount')?.value) || 0;
    const recv = Math.max(0, amt - NETWORK_FEE);
    const el = $('receivePreview');
    if (el) el.textContent = `$${recv.toFixed(2)}`;
  }
  function showReceipt(addr, amt) {
    const c = $('receiptArea');
    if (!c) return;
    const recv = (amt - NETWORK_FEE).toFixed(2);
    c.innerHTML = `<div class="receipt">
      <h3><i data-lucide="check-circle" style="width:20px;"></i> Collection Sent!</h3>
      <div class="detail-row"><span>Method</span><span>USDT (${selectedMethod.toUpperCase()})</span></div>
      <div class="detail-row"><span>Address</span><span>${addr.slice(0,8)}...</span></div>
      <div class="detail-row"><span>Amount</span><span>$${amt.toFixed(2)}</span></div>
      <div class="detail-row"><span>Network Fee</span><span>$${NETWORK_FEE.toFixed(2)}</span></div>
      <div class="detail-row" style="color:var(--green);font-weight:700"><span>You Received</span><span>$${recv}</span></div>
    </div>`;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  // ==================== Balance Updates ====================
  function updateAllBalances() {
    const h = balanceHidden;
    const set = (id, val) => { const el = $(id); if (el) el.textContent = h ? '****' : val; };
    set('totalEarned', `$${totalFeeShare.toFixed(2)}`);
    set('availableShare', `$${totalFeeShare.toFixed(2)}`);
    set('totalBalance', `$${(totalFeeShare+930).toFixed(2)}`);
    set('availBalance', `$${totalFeeShare.toFixed(2)}`);
    set('lockedBalance', '$930.00');
    set('trc20Balance', `$${(totalFeeShare*0.7).toFixed(2)}`);
    set('bep20Balance', `$${(totalFeeShare*0.3).toFixed(2)}`);
  }

  // ==================== Community ====================
  let communityReady = false;
  function initCommunity() {
    if (communityReady) return;
    communityReady = true;
    if (typeof window.addRandomRemittanceChat === 'function') {
      for (let i=0; i<6; i++) window.addRandomRemittanceChat();
    } else {
      const ca = $('chatArea');
      if (ca) ca.innerHTML = '<div style="color:var(--text3);text-align:center;padding:20px;">Join a tier to unlock the community chat.</div>';
    }
  }

  // ==================== Event Binding (after DOM ready) ====================
  function bindEvents() {
    // Bottom navigation
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => window.navigateTo(btn.dataset.view));
    });

    // Withdrawal method selector
    $('methodSelector')?.addEventListener('click', (e) => {
      const opt = e.target.closest('.method-option');
      if (!opt) return;
      document.querySelectorAll('.method-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedMethod = opt.dataset.method;
    });

    // Withdrawal preset buttons
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = $('withdrawAmount');
        if (input) {
          input.value = btn.dataset.amount === 'max' ? totalFeeShare : btn.dataset.amount;
          updateReceivePreview();
        }
      });
    });

    // Withdrawal amount input
    $('withdrawAmount')?.addEventListener('input', updateReceivePreview);

    // Community quick cards (already have onclick, no extra needed)
  }

  // ==================== Toast ====================
  function showToast(msg) {
    const container = $('toastContainer');
    if (!container) return;
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    container.appendChild(t);
    setTimeout(() => t.remove(), 2500);
  }

  // ==================== Startup ====================
  function initApp() {
    buildTicker();
    buildFeeCaptures();
    updateAllBalances();
    bindEvents(); // <--- bind after DOM is ready
    if (typeof lucide !== 'undefined') lucide.createIcons();

    setInterval(buildFeeCaptures, 30000);
    setInterval(() => {
      const el = $('todayFee');
      if (el && !balanceHidden) el.textContent = `$${(Math.random()*8+2).toFixed(2)}`;
    }, 15000);
  }

  // Ensure DOM is fully ready before binding events
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
