(function () {
  const PROTEIN_GOAL = 60; // grams per person per day
  const MEAL_ORDER = ["breakfast", "lunch", "dinner"];
  const LABEL = { breakfast: "Breakfast", lunch: "Lunch", dinner: "Dinner" };
  const TITLE = { breakfast: "Rise & dine.", lunch: "Lunch, sorted.", dinner: "Dinner, decided." };
  const QUIPS = [
    "Fresh options, hot off the tawa.",
    "Still thinking? Fair enough.",
    "Round 3. Mummy would've decided by now.",
    "The tawa is getting cold…",
    "Okay, okay. One more spin.",
    "Commitment issues, but make it food.",
    "At this point, just make dal chawal. (Kidding. Spin again.)",
  ];

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  // ---------- storage (never trusted to exist) ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem("akk:" + k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem("akk:" + k, JSON.stringify(v)); } catch {} },
  };
  const dayKey = (d = new Date()) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

  // Give every meal a stable id
  MEAL_ORDER.forEach((m) => MEALS[m].forEach((x, i) => (x.id = m + "-" + i)));
  const byId = (id) => {
    const [m] = id.split("-");
    return MEALS[m] && MEALS[m].find((x) => x.id === id);
  };

  const state = {
    meal: null,
    diet: store.get("diet", "veg"),
    decks: {},
    current: [],
    rerolls: 0,
  };
  let today = store.get("today", null);
  if (!today || today.date !== dayKey()) today = { date: dayKey(), locks: {} };
  let streak = store.get("streak", { last: null, count: 0 });

  // ---------- helpers ----------
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const allowed = (m) => state.diet === "all" || m.diet === "veg" || (state.diet === "egg" && m.diet === "egg");
  const dietLabel = { veg: "Veg", egg: "Egg", nonveg: "Non-veg" };

  function nowMeal() {
    const h = new Date().getHours();
    if (h >= 4 && h < 11) return "breakfast";
    if (h >= 11 && h < 16) return "lunch";
    return "dinner";
  }

  function tags(meal) {
    const keys = meal.items.map((s) => s.split("|")[1]);
    const has = (list) => keys.some((k) => list.includes(k));
    const out = [];
    if (has(TAGS.dal)) out.push("Dal / legume");
    if (keys.includes("roti") || keys.includes("paratha") || keys.includes("thepla")) out.push("Roti");
    if (keys.some((k) => ["rice", "riceYellow", "khichdi"].includes(k))) out.push("Rice");
    if (has(TAGS.veg)) out.push("Veggies");
    if (keys.some((k) => ["dahi", "raita", "milk"].includes(k))) out.push("Dairy");
    return out;
  }

  // Draw 3 options from a shuffled deck — no repeats until the deck runs out.
  function draw(meal) {
    const key = meal + ":" + state.diet;
    let deck = state.decks[key];
    if (!deck || deck.length < 3) {
      const currentIds = new Set(state.current.map((m) => m.id));
      const fresh = shuffle(MEALS[meal].filter(allowed).filter((m) => !currentIds.has(m.id)));
      deck = (deck || []).concat(fresh.filter((m) => !(deck || []).includes(m)));
      state.decks[key] = deck;
    }
    return deck.splice(0, 3).sort((a, b) => b.protein - a.protein);
  }

  // ---------- rendering ----------
  function greet() {
    const h = new Date().getHours();
    const part = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
    const day = new Date().toLocaleDateString(undefined, { weekday: "long" });
    $("#greeting").textContent = `${part} · ${day}`;
  }

  function renderDiet() {
    $$(".diet button").forEach((b) => b.setAttribute("aria-checked", String(b.dataset.diet === state.diet)));
  }

  function proteinToday() {
    return Object.values(today.locks).reduce((s, id) => s + ((byId(id) || {}).protein || 0), 0);
  }

  function renderHud(animate) {
    const p = proteinToday();
    const pct = Math.min(1, p / PROTEIN_GOAL);
    $("#ring-g").textContent = p;
    $("#ring-fill").style.strokeDashoffset = String(94.25 * (1 - pct));
    $("#today-bar").style.width = pct * 100 + "%";
    $("#today-goal").textContent = `${p} / ${PROTEIN_GOAL}g protein${p >= PROTEIN_GOAL ? " — goal hit!" : ""}`;
    const s = streak.last === dayKey() || streak.last === dayKey(new Date(Date.now() - 864e5)) ? streak.count : 0;
    $("#streak-count").textContent = s;
    if (animate) ["#ring", "#streak"].forEach((sel) => {
      const el = $(sel);
      el.classList.remove("bump");
      void el.offsetWidth;
      el.classList.add("bump");
    });

    $("#slots").innerHTML = MEAL_ORDER.map((m) => {
      const meal = today.locks[m] && byId(today.locks[m]);
      if (!meal) {
        return `<li class="slot"><span class="slot-empty-plate"></span><span>${LABEL[m]}<br/>not picked</span></li>`;
      }
      return `<li class="slot filled">${plateSVG(meal, meal.name)}<span>${LABEL[m]}</span><strong>${meal.name}</strong></li>`;
    }).join("");

    const n = nowMeal();
    $$(".meal-tile").forEach((t) => t.classList.toggle("is-now", t.dataset.meal === n));
  }

  function cardHTML(meal, i) {
    const featured = i === 0;
    const locked = today.locks[state.meal] === meal.id;
    const t = tags(meal);
    const pct = Math.min(100, Math.round((meal.protein / 25) * 100));
    return `<article class="card${featured ? " featured" : ""}" style="--i:${i}">
      <div class="card-art">
        ${featured ? `<span class="sticker">Most protein</span>` : ""}
        ${plateSVG(meal, "Illustrated thali: " + meal.items.map((s) => s.split("|")[0]).join(", "))}
      </div>
      <div class="card-body">
        <div class="meta">
          <span><i class="dot ${meal.diet}"></i> ${dietLabel[meal.diet]}</span>
          <span>${meal.time} min</span>
        </div>
        <h3>${meal.name}</h3>
        <ul class="items">${meal.items.map((s) => `<li>${s.split("|")[0]}</li>`).join("")}</ul>
        <div class="protein"><b>${meal.protein}g</b> protein
          <span class="bar"><span style="width:${pct}%"></span></span>
        </div>
        ${featured ? `<div class="tags">${t.map((x) => `<span class="tag ok">✓ ${x}</span>`).join("")}</div>` : ""}
        <button class="btn-secondary${locked ? " is-locked" : ""}" data-lock="${meal.id}">
          ${locked ? "Locked in ✓" : "Let's have this"}
        </button>
      </div>
    </article>`;
  }

  function skeletonHTML(i) {
    return `<div class="card is-skel${i === 0 ? " featured" : ""}" aria-hidden="true">
      <div class="card-art"><div class="skel skel-plate"></div></div>
      <div class="card-body">
        <div class="skel skel-line" style="width:40%"></div>
        <div class="skel skel-line" style="width:75%;height:20px"></div>
        <div class="skel skel-line" style="width:90%"></div>
        <div class="skel skel-line" style="width:55%"></div>
      </div>
    </div>`;
  }

  function generate() {
    const cards = $("#cards");
    const btn = $("#regen");
    btn.disabled = true;
    btn.classList.remove("rolling");
    void btn.offsetWidth;
    btn.classList.add("rolling");
    cards.setAttribute("aria-busy", "true");
    cards.innerHTML = [0, 1, 2].map(skeletonHTML).join("");
    $("#quip").textContent = QUIPS[Math.min(state.rerolls, QUIPS.length - 1)];

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => {
      state.current = draw(state.meal);
      if (!state.current.length) {
        cards.innerHTML = `<p class="quip">No dishes match this preference yet — try "Everything".</p>`;
      } else {
        cards.innerHTML = state.current.map(cardHTML).join("");
      }
      cards.setAttribute("aria-busy", "false");
      btn.disabled = false;
    }, reduce ? 0 : 480);
  }

  function show(view) {
    $("#home").hidden = view !== "home";
    $("#results").hidden = view !== "results";
    $("#actionbar").hidden = view !== "results";
    window.scrollTo({ top: 0 });
  }

  function openMeal(meal) {
    state.meal = meal;
    state.rerolls = 0;
    $("#results-eyebrow").textContent = LABEL[meal] + " · " + (state.diet === "veg" ? "Veg" : state.diet === "egg" ? "Veg + egg" : "Everything");
    $("#results-title").textContent = TITLE[meal];
    show("results");
    generate();
    history.replaceState(null, "", "#" + meal);
  }

  function goHome() {
    state.meal = null;
    show("home");
    renderHud();
    history.replaceState(null, "", location.pathname);
  }

  // ---------- locking ----------
  let lastLock = null;
  function lock(id, fromEl) {
    const meal = byId(id);
    if (!meal) return;
    lastLock = { meal: state.meal, prev: today.locks[state.meal] || null };
    today.locks[state.meal] = id;
    store.set("today", today);

    if (streak.last !== dayKey()) {
      const yesterday = dayKey(new Date(Date.now() - 864e5));
      streak = { last: dayKey(), count: streak.last === yesterday ? streak.count + 1 : 1 };
      store.set("streak", streak);
    }

    $$("[data-lock]").forEach((b) => {
      const on = b.dataset.lock === id;
      b.classList.toggle("is-locked", on);
      b.textContent = on ? "Locked in ✓" : "Let's have this";
    });
    renderHud(true);

    const p = proteinToday();
    const allDone = MEAL_ORDER.every((m) => today.locks[m]);
    $("#sheet-art").innerHTML = plateSVG(meal, meal.name);
    $("#sheet-eyebrow").textContent = allDone ? "Full day planned" : "Locked in for " + LABEL[state.meal].toLowerCase();
    $("#sheet-title").textContent = meal.name;
    $("#sheet-stat").textContent = allDone
      ? `All 3 meals sorted · ${p}g protein today${p >= PROTEIN_GOAL ? " — goal hit!" : ""}`
      : `+${meal.protein}g protein · ${p} / ${PROTEIN_GOAL}g today`;
    $("#sheet-tip").innerHTML = `<b>Kitchen tip:</b> ${meal.tip}`;
    $("#sheet").showModal();
    confetti(fromEl, allDone ? 160 : 90);
  }

  $("#sheet-undo").addEventListener("click", () => {
    if (lastLock) {
      if (lastLock.prev) today.locks[lastLock.meal] = lastLock.prev;
      else delete today.locks[lastLock.meal];
      store.set("today", today);
      $$("[data-lock]").forEach((b) => {
        const on = b.dataset.lock === lastLock.prev;
        b.classList.toggle("is-locked", on);
        b.textContent = on ? "Locked in ✓" : "Let's have this";
      });
      renderHud();
    }
    $("#sheet").close();
  });
  $("#sheet-ok").addEventListener("click", () => {
    $("#sheet").close();
    goHome();
  });

  // ---------- confetti (palette-matched, falls with the light) ----------
  const canvas = $("#confetti");
  const ctx = canvas.getContext("2d");
  let parts = [];
  let raf = null;
  function confetti(el, n) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const r = el ? el.getBoundingClientRect() : { left: innerWidth / 2, top: innerHeight / 2, width: 0, height: 0 };
    const ox = r.left + r.width / 2;
    const oy = r.top + r.height / 2;
    const colors = ["#c2410c", "#e4a62b", "#3f7d3a", "#f2c443", "#dcac6c", "#7fb04a"];
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.1;
      const v = 6 + Math.random() * 8;
      parts.push({
        x: ox, y: oy,
        vx: Math.cos(a) * v, vy: Math.sin(a) * v,
        w: 5 + Math.random() * 6, h: 3 + Math.random() * 4,
        rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3,
        c: colors[i % colors.length], life: 0, round: Math.random() < 0.35,
      });
    }
    if (!raf) raf = requestAnimationFrame(tick);
  }
  function tick() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    parts = parts.filter((p) => p.life < 140 && p.y < innerHeight + 20);
    parts.forEach((p) => {
      p.life++;
      p.vy += 0.28;
      p.vx *= 0.985;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.globalAlpha = Math.max(0, 1 - p.life / 140);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.c;
      if (p.round) { ctx.beginPath(); ctx.arc(0, 0, p.h, 0, Math.PI * 2); ctx.fill(); }
      else ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    raf = parts.length ? requestAnimationFrame(tick) : null;
    if (!raf) ctx.clearRect(0, 0, innerWidth, innerHeight);
  }

  // ---------- events ----------
  $$(".meal-tile").forEach((t) => t.addEventListener("click", () => openMeal(t.dataset.meal)));
  $$(".diet button").forEach((b) =>
    b.addEventListener("click", () => {
      state.diet = b.dataset.diet;
      store.set("diet", state.diet);
      renderDiet();
    })
  );
  $$('[data-action="home"]').forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); goHome(); }));
  $("#regen").addEventListener("click", () => { state.rerolls++; generate(); });
  $("#cards").addEventListener("click", (e) => {
    const b = e.target.closest("[data-lock]");
    if (b) lock(b.dataset.lock, b);
  });
  document.addEventListener("keydown", (e) => {
    if (state.meal && (e.key === "r" || e.key === "R") && !e.metaKey && !e.ctrlKey && !$("#sheet").open) {
      state.rerolls++;
      generate();
    }
  });

  // ---------- boot ----------
  greet();
  renderDiet();
  renderHud();
  const start = location.hash.slice(1);
  if (MEAL_ORDER.includes(start)) openMeal(start);
})();
