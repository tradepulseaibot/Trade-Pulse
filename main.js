(function () {
  'use strict';

  // ==================== DOM helpers ====================
  const $ = (id) => document.getElementById(id);

  // ==================== Currency / State ====================
  const MIN_DEPOSIT = 5;       // $5 minimum
  const NETWORK_FEE = 1;       // 1 USDT withdrawal fee
  let balanceHidden = false;
  let totalFeeShare = 320;     // demo starting balance in USDT
  let activeTier = 'starter';  // current selected tier
  let selectedMethod = 'trc20';// default withdrawal method

  // Tier definitions (name, min, max, daily fee share, 30‑day ROI, description)
  const tiers = {
    starter:  { name: 'Starter Tier',  min: 5,   max: 49,   rate: '3.0%', roi: '90%',  desc: 'Perfect for beginners dipping into diaspora savings.' },
    growth:   { name: 'Growth Tier',   min: 50,  max: 199,  rate: '3.5%', roi: '105%', desc: 'Higher returns for growing your liquidity pool.' },
    premium:  { name: 'Premium Tier',  min: 200, max: 499,  rate: '4.0%', roi: '120%', desc: 'Serious liquidity providers earn serious shares.' },
    diaspora: { name: 'Diaspora Tier', min: 500, max: Infinity, rate: '4.5%', roi: '135%', desc: 'Exclusive tier with highest fee share and priority support.' }
  };

  // ==================== Exposed global functions (used by HTML onclick) ====================
  // Navigation
  window.navigateTo = function(view) {
    document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
    const target = $(`view-${view}`);
    if (target) target.classList.add('active');
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const navItem = document.querySelector(`.nav-item[data-view="${view}"]`);
    if (navItem) navItem.classList.add('active');
    lucide.createIcons(); // refresh icons after view change
    if (view === 'invest') buildTierCards(); // rebuild in case they return
    if (view === 'community') initCommunity();
  };

  // Select liquidity tier (from tier cards & promo banner)
  window.selectTier = function(tierKey) {
    if (!tiers[tierKey]) return;
    activeTier = tierKey;
    const name = tiers[tierKey].name;
    const headerBadge = $('headerTier');
    if (headerBadge) headerBadge.textContent = name.split(' ')[0];
    const statTier = $('statTier');
    if (statTier) statTier.textContent = name.split(' ')[0];
    showToast(`✅ Switched to ${name}`);
  };

  // Collect share (withdraw) button
  window.collectNow = function() {
    const address = ($('walletAddress')?.value || '').trim();
    const amount = parseFloat($('withdrawAmount')?.value);
    if (!address) return showToast('⚠️ Please enter a wallet address');
    if (!amount || amount <= 0) return showToast('⚠️ Enter a valid amount');
    if (amount > totalFeeShare) return showToast('⚠️ Insufficient balance');

    // Process (demo)
    totalFeeShare -= amount;
    updateAllBalances();
    showReceipt(address, amount);
  };

  // Toggle balance visibility (collect share view)
  window.toggleBalanceEye = function() {
    balanceHidden = !balanceHidden;
    updateAllBalances();
    const btn = $('eyeToggleBtn');
    if (btn) btn.innerHTML = balanceHidden
      ? '<i data-lucide="eye-off" style="width:14px;"></i> Show'
      : '<i data-lucide="eye" style="width:14px;"></i> Hide';
    lucide.createIcons();
  };

  // Community tab switching
  window.switchCommunityTab = function(tab) {
    document.querySelectorAll('.tab-pill').forEach(p => p.classList.remove('active'));
    const activeTab = document.querySelector(`.tab-pill[data-tab="${tab}"]`);
    if (activeTab) activeTab.classList.add('active');
    initCommunity(); // refresh chat
  };

  // ==================== Ticker ====================
  const remittancePairs = [
    { from: 'Dubai', to: 'Dhaka' },
    { from: 'London', to: 'Sylhet' },
    { from: 'New York', to: 'Chittagong' },
    { from: 'Kuala Lumpur', to: 'Dhaka' },
    { from: 'Riyadh', to: 'Comilla' },
    { from: 'Toronto', to: 'Gazipur' },
    { from: 'Sydney', to: 'Noakhali' },
    { from: 'Paris', to: 'Barisal' }
  ];

  function buildTicker() {
    const track = $('tickerTrack');
    if (!track) return;
    let html = '';
    for (let i = 0; i < 8; i++) {
      const pair = remittancePairs[i % remittancePairs.length];
      const amount = (Math.random() * 2000 + 500).toFixed(0);
      const feeSaved = (amount * 0.02).toFixed(2);
      html += `<span class="ticker-item"><span class="ticker-dot"></span> ${pair.from} → ${pair.to}: $${amount} routed, fee saved $${feeSaved}</span>`;
    }
    // duplicate for seamless marquee effect
    track.innerHTML = html + html;
  }

  // ==================== Fee Captures ====================
  function buildFeeCaptures() {
    const container = $('feeCapturesContainer');
    if (!container) return;
    const pairs = ['USD/BDT', 'AED/BDT', 'GBP/BDT', 'MYR/BDT', 'CAD/BDT'];
    let html = '';
    for (let i = 0; i < 4; i++) {
      const pair = pairs[Math.floor(Math.random() * pairs.length)];
      const captured = (Math.random() * 20 + 1).toFixed(2);
      const minutes = Math.floor(Math.random() * 60);
      html += `<div class="fee-card">
        <div class="fee-info">
          <div class="fee-title">${pair} spread – captured $${captured}</div>
          <div class="fee-time">${minutes} min ago</div>
        </div>
        <div class="fee-amount"><i data-lucide="arrow-up-right" style="width:14px;"></i> $${captured}</div>
      </div>`;
    }
    container.innerHTML = html;
    lucide.createIcons();
  }

  // ==================== Tier Cards ====================
  function buildTierCards() {
    const container = $('tierCardsContainer');
    if (!container) return;
    let html = '';
    for (const [key, tier] of Object.entries(tiers)) {
      const isPopular = key === 'starter' ? 'Most Popular' : '';
      html += `<div class="tier-card" data-tier="${key}">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div class="tier-badge"><i data-lucide="star" style="width:16px;"></i> ${tier.name}</div>
          ${isPopular ? `<span style="font-size:0.65rem;background:rgba(34,197,94,.15);color:#22c55e;padding:2px 8px;border-radius:10px;">${isPopular}</span>` : ''}
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin:8px 0;">
          <div class="tier-rate">${tier.rate}</div>
          <span style="font-size:0.7rem;color:var(--text3);">daily fee share</span>
        </div>
        <div class="tier-meta">
          <span>Min: $${tier.min}</span>
          <span>Max: ${tier.max === Infinity ? 'Unlimited' : '$'+tier.max}</span>
          <span>30d ROI: ${tier.roi}</span>
        </div>
        <button class="btn-tier" onclick="window.selectTier('${key}')">Provide Liquidity</button>
      </div>`;
    }
    container.innerHTML = html;
    lucide.createIcons();
  }

  // ==================== Collect Share (Withdraw) ====================
  function updateReceivePreview() {
    const amount = parseFloat($('withdrawAmount')?.value) || 0;
    const receive = Math.max(0, amount - NETWORK_FEE);
    const prev = $('receivePreview');
    if (prev) prev.textContent = `$${receive.toFixed(2)}`;
  }

  function showReceipt(address, amount) {
    const container = $('receiptArea');
    if (!container) return;
    const receive = (amount - NETWORK_FEE).toFixed(2);
    container.innerHTML = `<div class="receipt">
      <h3><i data-lucide="check-circle" style="width:20px;"></i> Collection Sent!</h3>
      <div class="detail-row"><span>Method</span><span>USDT (${selectedMethod.toUpperCase()})</span></div>
      <div class="detail-row"><span>Address</span><span>${address.slice(0,8)}...</span></div>
      <div class="detail-row"><span>Amount</span><span>$${amount.toFixed(2)}</span></div>
      <div class="detail-row"><span>Network Fee</span><span>$${NETWORK_FEE.toFixed(2)}</span></div>
      <div class="detail-row" style="color:var(--green);font-weight:700;"><span>You Received</span><span>$${receive}</span></div>
    </div>`;
    lucide.createIcons();
  }

  // Method selector listener
  document.getElementById('methodSelector')?.addEventListener('click', (e) => {
    const option = e.target.closest('.method-option');
    if (!option) return;
    document.querySelectorAll('.method-option').forEach(o => o.classList.remove('selected'));
    option.classList.add('selected');
    selectedMethod = option.dataset.method;
  });

  // Preset buttons for withdrawal amount
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const amount = btn.dataset.amount;
      const input = $('withdrawAmount');
      if (input) {
        input.value = amount === 'max' ? totalFeeShare : amount;
        updateReceivePreview();
      }
    });
  });

  $('withdrawAmount')?.addEventListener('input', updateReceivePreview);

  // ==================== Wallet Balances ====================
  function updateAllBalances() {
    const hidden = balanceHidden;
    // Home hero
    const earned = $('totalEarned');
    if (earned) earned.textContent = hidden ? '****' : `$${totalFeeShare.toFixed(2)}`;
    // Withdraw view
    const availShare = $('availableShare');
    if (availShare) availShare.textContent = hidden ? '****' : `$${totalFeeShare.toFixed(2)}`;
    // Wallet hero
    const totalBal = $('totalBalance');
    if (totalBal) totalBal.textContent = hidden ? '****' : `$${(totalFeeShare + 930).toFixed(2)}`;
    const availBal = $('availBalance');
    if (availBal) availBal.textContent = hidden ? '****' : `$${(totalFeeShare).toFixed(2)}`;
    const lockedBal = $('lockedBalance');
    if (lockedBal) lockedBal.textContent = hidden ? '****' : '$930.00';
    // USDT split
    const trc20 = $('trc20Balance');
    if (trc20) trc20.textContent = hidden ? '****' : `$${(totalFeeShare * 0.7).toFixed(2)}`;
    const bep20 = $('bep20Balance');
    if (bep20) bep20.textContent = hidden ? '****' : `$${(totalFeeShare * 0.3).toFixed(2)}`;
  }

  // ==================== Community Chat (delegated to community.js) ====================
  let communityLoaded = false;
  function initCommunity() {
    if (communityLoaded) return;
    communityLoaded = true;
    // If the global addRandomRemittanceChat function exists (defined in community.js), use it
    if (typeof window.addRandomRemittanceChat === 'function') {
      for (let i = 0; i < 6; i++) window.addRandomRemittanceChat();
    } else {
      const chatArea = $('chatArea');
      if (chatArea) chatArea.innerHTML = '<div style="color:var(--text3); text-align:center;padding:20px;">Join a tier to unlock the community chat.</div>';
    }
  }

  // Listen for quick‑action cards inside community
  document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('click', () => {
      const icon = card.querySelector('i');
      if (!icon) return;
      const parent = icon.parentElement;
      if (parent.querySelector('[data-lucide="message-circle"]') || icon.dataset.lucide === 'message-circle') {
        window.switchCommunityTab('general');
      } else if (icon.dataset.lucide === 'megaphone') {
        window.switchCommunityTab('success');
      } else if (icon.dataset.lucide === 'badge-dollar-sign') {
        window.switchCommunityTab('market');
      } else if (icon.dataset.lucide === 'users') {
        window.switchCommunityTab('help');
      }
    });
  });

  // ==================== Toasts ====================
  function showToast(msg) {
    const container = $('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }

  // ==================== Initialisation ====================
  function initApp() {
    buildTicker();
    buildFeeCaptures();
    buildTierCards();
    updateAllBalances();
    initCommunity();
    lucide.createIcons();

    // Refresh fee captures every 30 seconds
    setInterval(buildFeeCaptures, 30000);
    // Simulate daily fee share change every 15 seconds
    setInterval(() => {
      const todayEl = $('todayFee');
      if (todayEl && !balanceHidden) {
        todayEl.textContent = `$${(Math.random() * 8 + 2).toFixed(2)}`;
      }
    }, 15000);
  }

  // Kick off when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
