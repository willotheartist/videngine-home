(() => {
  const PLANS = {
    starter: { name: 'Starter', monthly: 79, yearly: 69, annual: 828, incl: 50, extra: 1.5 },
    growth: { name: 'Growth', monthly: 249, yearly: 219, annual: 2628, incl: 250, extra: 1 },
    scale: { name: 'Scale', monthly: 599, yearly: 529, annual: 6348, incl: 750, extra: 0.8 }
  };
  const ORDER = ['starter', 'growth', 'scale'];
  const CUSTOM_FROM = 1500;
  const STOPS = [10, 20, 30, 40, 50, 60, 75, 100, 125, 150, 180, 200, 250, 300, 400, 500, 600, 750, 900, 1000, 1250, 1500, 1750, 2000];
  const TICKS = [50, 250, 750, 1500];
  const CONTACT = 'mailto:hello@videngine.io?subject=Videngine%20Custom%20plan';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const money = (v) => '$' + Math.round(v).toLocaleString('en-US');
  const money2 = (v) => '$' + v.toFixed(2);
  const count = (v) => v.toLocaleString('en-US');

  let period = 'monthly';
  const base = (key) => PLANS[key][period];
  const costFor = (key, n) => base(key) + Math.max(0, n - PLANS[key].incl) * PLANS[key].extra;

  /* ---------- Volume meters on the plan cards ---------- */
  document.querySelectorAll('.meter').forEach((meter) => {
    const lit = Number(meter.dataset.lit) || 0;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 150; i++) {
      const tile = document.createElement('i');
      tile.style.setProperty('--i', i);
      if (i < lit) tile.className = 'on';
      frag.appendChild(tile);
    }
    meter.appendChild(frag);
  });
  const lightMeters = () => document.querySelectorAll('.meter').forEach((m) => m.classList.add('is-lit'));
  if (reduced.matches) lightMeters();
  else requestAnimationFrame(() => requestAnimationFrame(lightMeters));

  /* ---------- Prices: tween when the billing period changes ---------- */
  const tweens = new WeakMap();
  function setAmount(el, target) {
    const from = Number(el.dataset.value || target);
    el.dataset.value = target;
    if (reduced.matches || from === target) { el.textContent = money(target); return; }
    cancelAnimationFrame(tweens.get(el));
    const start = performance.now();
    const dur = 520;
    const step = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - t, 4);
      el.textContent = money(from + (target - from) * e);
      if (t < 1) tweens.set(el, requestAnimationFrame(step));
    };
    tweens.set(el, requestAnimationFrame(step));
  }

  function renderPrices() {
    ORDER.forEach((key) => {
      const p = PLANS[key];
      const amount = document.querySelector(`[data-price="${key}"]`);
      if (amount) setAmount(amount, base(key));
      const billing = document.querySelector(`[data-billing="${key}"]`);
      if (billing) billing.textContent = period === 'yearly' ? `${money(p.annual)} billed yearly` : 'Billed monthly';
      const each = document.querySelector(`[data-each="${key}"]`);
      if (each) each.textContent = `About ${money2(base(key) / p.incl)} a video`;
      const th = document.querySelector(`[data-th-price="${key}"]`);
      if (th) th.textContent = period === 'yearly' ? `${money(base(key))} / mo, yearly` : `${money(base(key))} / mo`;
    });
  }
  ORDER.forEach((key) => {
    const el = document.querySelector(`[data-price="${key}"]`);
    if (el) el.dataset.value = PLANS[key].monthly;
  });

  /* ---------- Radio-style segmented controls ---------- */
  function segmented(group, onChange) {
    const buttons = [...group.querySelectorAll('[role="radio"]')];
    const select = (btn, focus) => {
      buttons.forEach((b) => {
        const on = b === btn;
        b.setAttribute('aria-checked', String(on));
        b.tabIndex = on ? 0 : -1;
      });
      if (focus) btn.focus();
      onChange(btn);
    };
    buttons.forEach((btn, i) => {
      btn.addEventListener('click', () => select(btn, false));
      btn.addEventListener('keydown', (e) => {
        const dir = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (!dir) return;
        e.preventDefault();
        select(buttons[(i + dir + buttons.length) % buttons.length], true);
      });
    });
  }

  const toggle = document.querySelector('.billing-toggle');
  if (toggle) {
    segmented(toggle, (btn) => {
      period = btn.dataset.period;
      toggle.dataset.period = period;
      document.body.dataset.period = period;
      renderPrices();
      renderFit();
    });
  }

  /* ---------- Fit finder ---------- */
  const range = document.getElementById('fit-range');
  const field = document.querySelector('.fit-field');
  const ticks = document.querySelector('.fit-ticks');
  const out = {
    count: document.getElementById('fit-count'),
    plan: document.getElementById('fit-plan'),
    price: document.getElementById('fit-price'),
    per: document.getElementById('fit-per'),
    detail: document.getElementById('fit-detail'),
    cta: document.getElementById('fit-cta'),
    at: document.getElementById('fit-at')
  };
  const bars = [...document.querySelectorAll('.fit-bars .bar')];
  const tiles = [];
  let lastUsed = 0;

  if (field) {
    const frag = document.createDocumentFragment();
    for (let t = 0; t < 200; t++) {
      const tile = document.createElement('i');
      tiles.push(tile);
      frag.appendChild(tile);
    }
    field.appendChild(frag);
  }

  if (ticks && range) {
    const max = STOPS.length - 1;
    TICKS.forEach((v) => {
      const idx = STOPS.indexOf(v);
      const span = document.createElement('span');
      span.style.left = `${(idx / max) * 100}%`;
      span.dataset.value = v;
      span.textContent = count(v);
      ticks.appendChild(span);
    });
  }

  function renderFit() {
    if (!range) return;
    const idx = Number(range.value);
    const n = STOPS[idx];
    const max = STOPS.length - 1;
    const isTop = idx === max;
    const label = isTop ? `${count(n)}+` : count(n);

    range.style.setProperty('--p', `${(idx / max) * 100}%`);
    range.setAttribute('aria-valuetext', `${label} videos a month`);
    out.count.textContent = label;
    out.at.textContent = label;

    let pick = 'custom';
    if (n < CUSTOM_FROM) {
      pick = ORDER[0];
      let best = costFor(pick, n);
      ORDER.slice(1).forEach((key) => {
        const c = costFor(key, n);
        if (c <= best) { best = c; pick = key; }
      });
    }

    const perLabel = period === 'yearly' ? 'a month, billed yearly' : 'a month';
    if (pick === 'custom') {
      out.plan.textContent = 'Custom';
      out.price.textContent = 'Let’s talk';
      out.per.textContent = '';
      out.detail.textContent = `At this volume a Custom rate works out cheaper than Scale with extra videos, which would be ${money(costFor('scale', n))} a month.`;
      out.cta.textContent = 'Talk to us';
      out.cta.href = CONTACT;
    } else {
      const p = PLANS[pick];
      const cost = costFor(pick, n);
      out.plan.textContent = p.name;
      out.price.textContent = money(cost);
      out.per.textContent = perLabel;
      if (n < p.incl) {
        out.detail.textContent = `${count(p.incl)} videos included, so ${count(p.incl - n)} to spare. About ${money2(cost / n)} a video at your volume.`;
      } else if (n === p.incl) {
        out.detail.textContent = `Exactly the ${count(p.incl)} videos included. About ${money2(cost / n)} a video.`;
      } else {
        out.detail.textContent = `${count(p.incl)} included plus ${count(n - p.incl)} extra at ${money2(p.extra)} each. About ${money2(cost / n)} a video.`;
      }
      out.cta.textContent = `Choose ${p.name}`;
      out.cta.href = '#waitlist';
    }

    const costs = ORDER.map((key) => costFor(key, n));
    const top = Math.max(...costs);
    bars.forEach((bar, i) => {
      bar.classList.toggle('is-pick', ORDER[i] === pick);
      bar.querySelector('.bar__track i').style.setProperty('--w', `${Math.max(3, (costs[i] / top) * 100)}%`);
      bar.querySelector('.bar__cost').textContent = money(costs[i]);
    });

    const used = Math.min(200, Math.ceil(n / 10));
    const included = pick === 'custom' ? used : PLANS[pick].incl / 10;
    // Tiles that change state light up in a short wave outward from where the last count ended.
    const from = Math.min(lastUsed, used);
    tiles.forEach((tile, t) => {
      let state = '';
      if (t < used && t < included) state = 'on';
      else if (t < used) state = 'extra';
      else if (t < included) state = 'spare';
      if (tile.className !== state) {
        tile.style.transitionDelay = reduced.matches ? '0ms' : `${Math.min(360, Math.abs(t - from) * 4)}ms`;
        tile.className = state;
      }
    });
    lastUsed = used;

    ticks?.querySelectorAll('span').forEach((s) => s.classList.toggle('is-current', Number(s.dataset.value) === n));
  }

  if (range) {
    range.max = String(STOPS.length - 1);
    range.addEventListener('input', renderFit);
    renderFit();
  }

  /* ---------- Compare table ---------- */
  const table = document.querySelector('.compare');
  if (table) {
    table.querySelectorAll('tbody').forEach((body) => {
      const rows = [...body.querySelectorAll('tr')].filter((r) => !r.classList.contains('group-row'));
      let same = 0;
      rows.forEach((row) => {
        const vals = [...row.querySelectorAll('td')].map((td) => td.innerHTML.replace(/\s+/g, ' ').trim());
        if (vals.every((v) => v === vals[0])) { row.classList.add('is-same'); same++; }
      });
      if (same === rows.length) body.classList.add('all-same');
    });

    document.getElementById('diff-only')?.addEventListener('change', (e) => {
      table.classList.toggle('diff-only', e.target.checked);
    });

    const picker = document.querySelector('.plan-picker');
    if (picker) segmented(picker, (btn) => { table.dataset.show = btn.dataset.show; });

    const head = table.querySelector('thead th');
    let ticking = false;
    const checkStuck = () => {
      ticking = false;
      const stickTop = parseFloat(getComputedStyle(head).top) || 0;
      const r = table.getBoundingClientRect();
      table.classList.toggle('is-stuck', r.top < stickTop && r.bottom > stickTop + 120);
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(checkStuck); } }, { passive: true });
    window.addEventListener('resize', checkStuck);
    checkStuck();
  }

  /* ---------- FAQ ---------- */
  document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      item.classList.toggle('open');
      button.setAttribute('aria-expanded', String(item.classList.contains('open')));
    });
  });
})();
