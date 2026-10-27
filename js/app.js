(function () {
  const PROTEIN_GOAL = 60; // grams per person per day
  const MEAL_ORDER = ["breakfast", "lunch", "dinner"];
  const LABEL = { breakfast: "Breakfast", lunch: "Lunch", dinner: "Dinner" };
  const TITLE = { breakfast: "Rise & dine.", lunch: "Lunch, sorted.", dinner: "Dinner, decided." };
  const MOOD_TITLE = { chatpata: "Chatpata", spicy: "Spicy", light: "Light", comfort: "Comfort", quick: "Quick", protein: "Protein-packed" };
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
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  // ---------- storage (never trusted to exist) ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem("akk:" + k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem("akk:" + k, JSON.stringify(v)); } catch {} },
  };
  const dayKey = (d = new Date()) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

  // Give every meal a stable id
  MEAL_ORDER.forEach((m) => MEALS[m].forEach((x, i) => (x.id = m + "-" + i)));

  const state = {
    meal: null,
    diet: store.get("diet", "veg"),
    decks: {},
    current: [],
    rerolls: 0,
    query: { moods: [], terms: [], text: "", dietOverride: null },
  };
  let today = store.get("today", null);
  if (!today || today.date !== dayKey()) today = { date: dayKey(), locks: {} };
  let streak = store.get("streak", { last: null, count: 0 });
  let custom = store.get("custom", []); // dishes the family added: { name, meals, moods, diet }

  // ---------- helpers ----------
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const dietLabel = { veg: "Veg", egg: "Egg", nonveg: "Non-veg" };
  const dietOf = () => state.query.dietOverride || state.diet;
  const allowed = (m) => {
    const d = dietOf();
    return d === "all" || m.diet === "veg" || (d === "egg" && m.diet === "egg");
  };
  const moodsOf = (m) => m.moods.concat(m.time <= 20 ? ["quick"] : [], m.protein >= 20 ? ["protein"] : []);
  const textOf = (m) => (m.name + " " + m.items.map((s) => s.split("|")[0]).join(" ")).toLowerCase();

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

  // ---------- memory: dishes the family adds ----------
  const VISUAL_RULES = [
    [/kofta/, "kofta"], [/chil+i paneer|paneer chil+i/, "chilliPaneer"], [/chil+i chicken|manchurian|chicken 65/, "chilliChicken"],
    [/(palak|saag) paneer/, "paneerGreen"], [/paneer/, "paneerRed"], [/pav ?bhaji/, "pavBhaji"], [/misal/, "misal"],
    [/chaat|bhel|sev puri|dahi puri|pani ?puri|golgapp?a|papdi/, "chaat"], [/biryani|pulao|fried rice|tahri|tehri/, "riceYellow"],
    [/khichdi|khichri/, "khichdi"], [/poha/, "poha"], [/upma/, "upma"], [/idli/, "idli"], [/dosa|uttapam|uthappam|appam/, "dosa"],
    [/chilla|cheela/, "chilla"], [/thepla/, "thepla"], [/kulcha|naan/, "kulcha"], [/paratha|parantha|parotta/, "paratha"],
    [/puri|poori|bhatura/, "puri"], [/sandwich|toast/, "toast"], [/\bpav\b|bun/, "pav"], [/omelet/, "omelette"],
    [/egg|anda/, "eggCurry"], [/chicken|mutton|keema|gosht|meat/, "chicken"], [/fish|prawn|machli|machhi|jhinga/, "fish"],
    [/soya/, "soya"], [/rajma/, "rajma"], [/chole|chana|chickpea|lobia/, "chole"], [/kadhi/, "kadhi"], [/sambar|rasam/, "sambar"],
    [/\bdal\b|\bdaal\b|dhokli/, "dal"], [/bhindi|okra/, "bhindi"], [/baingan|brinjal|bharta/, "baingan"], [/lauki|tinda|turai/, "lauki"],
    [/aloo|gobi|potato/, "sabziYellow"], [/mushroom|matar|mix veg|sabzi|bhaji/, "sabziGreen"],
  ];
  const WELL = ["riceYellow", "khichdi", "poha", "upma", "idli", "dosa", "chilla", "paratha", "thepla", "kulcha", "puri", "toast", "pav", "omelette"];
  const BREAKFASTY = ["poha", "upma", "idli", "dosa", "chilla", "paratha", "thepla", "toast", "omelette"];
  const PROTEIN_RULES = [[/chicken|mutton|keema|gosht|meat/, 28], [/fish|prawn|machli|jhinga/, 25], [/soya/, 22], [/paneer|tofu/, 15], [/egg|anda|omelet/, 13], [/rajma|chole|chana|lobia|\bdal\b|daal|moong|sprout|misal/, 10], [/kofta/, 8]];

  const guessVisual = (n) => (VISUAL_RULES.find(([re]) => re.test(n.toLowerCase())) || [0, "curryRed"])[1];
  const guessDiet = (n) => (/chicken|mutton|keema|gosht|meat|fish|prawn|machli|machhi|jhinga/.test(n.toLowerCase()) ? "nonveg" : /egg|anda|omelet/.test(n.toLowerCase()) ? "egg" : "veg");
  function guessMoods(n) {
    const t = n.toLowerCase();
    const out = [];
    if (/chil+i|chettinad|kolhapuri|vindaloo|mirchi|\b65\b|andhra|schezwan|tikka|masala/.test(t)) out.push("spicy");
    if (/chaat|bhel|puri|pav bhaji|achari|imli|tikki|golgapp?a|chole|papdi|misal/.test(t)) out.push("chatpata");
    if (/khichdi|daliya|soup|shorba|moong|idli|upma/.test(t)) out.push("light");
    if (/malai|makhani|butter|kofta|rajma|kadhi|paratha|halwa/.test(t)) out.push("comfort");
    return out;
  }

  // Turn a saved dish into one balanced meal per chosen slot (dal + roti/rice ride along).
  function expand(d) {
    const v = guessVisual(d.name);
    const base = (PROTEIN_RULES.find(([re]) => re.test(d.name.toLowerCase())) || [0, 6])[1];
    const isDal = ["dal", "rajma", "chole", "kadhi", "sambar", "misal"].includes(v);
    return d.meals.map((meal) => {
      let items;
      let extra;
      if (meal === "breakfast") {
        items = WELL.includes(v) ? [`${d.name}|${v}`, "Dahi|dahi", "Adrak chai|chai"] : [`${d.name}|${v}`, "Toasted bread|toast", "Adrak chai|chai"];
        extra = WELL.includes(v) ? 5 : 4;
      } else if (WELL.includes(v)) {
        items = [`${d.name}|${v}`, "Raita|raita", "Dal tadka|dal", "Kachumber salad|salad"];
        extra = 11;
      } else {
        items = [`${d.name}|${v}`].concat(isDal ? ["Raita|raita"] : ["Dal tadka|dal"], ["Phulka roti|roti", "Steamed rice|rice"]);
        extra = isDal ? 8 : 11;
      }
      return {
        id: "my:" + d.name.toLowerCase().replace(/\W+/g, "-") + ":" + meal,
        name: d.name, diet: d.diet, protein: base + extra, time: 35, items, custom: true,
        moods: d.moods.slice(),
        tip: "Your family's pick. Served with dal and roti/rice so the plate stays balanced.",
      };
    });
  }

  let INDEX = new Map();
  let CUSTOM = { breakfast: [], lunch: [], dinner: [] };
  function reindex() {
    CUSTOM = { breakfast: [], lunch: [], dinner: [] };
    custom.forEach((d) => expand(d).forEach((m, i) => CUSTOM[d.meals[i]].push(m)));
    INDEX = new Map();
    MEAL_ORDER.forEach((meal) => MEALS[meal].concat(CUSTOM[meal]).forEach((m) => INDEX.set(m.id, m)));
    state.decks = {};
  }
  const byId = (id) => INDEX.get(id);
  const poolFor = (meal) => MEALS[meal].concat(CUSTOM[meal]);

  function saveDish(d) {
    custom = custom.filter((x) => x.name.toLowerCase() !== d.name.toLowerCase()).concat(d);
    store.set("custom", custom);
    reindex();
    renderMine();
  }
  function forgetDish(name) {
    const hit = custom.find((x) => x.name.toLowerCase() === name.toLowerCase()) ||
      custom.find((x) => x.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(x.name.toLowerCase()));
    if (!hit) return null;
    custom = custom.filter((x) => x !== hit);
    store.set("custom", custom);
    reindex();
    renderMine();
    return hit;
  }

  // ---------- picking ----------
  function matches(m, q, useTerms, useMoods) {
    if (!allowed(m)) return false;
    if (useMoods && q.moods.length && !q.moods.every((x) => moodsOf(m).includes(x))) return false;
    if (useTerms && q.terms.length && !q.terms.some((t) => textOf(m).includes(t))) return false;
    return true;
  }

  // Strictest filter that still finds something; reports what had to be relaxed.
  function candidates(meal) {
    const q = state.query;
    const pool = poolFor(meal);
    for (const [t, md, note] of [[true, true, ""], [false, true, "terms"], [true, false, "moods"], [false, false, "all"]]) {
      const hit = pool.filter((m) => matches(m, q, t, md));
      if (hit.length) return { list: hit, relaxed: (q.terms.length || q.moods.length) && note ? note : "" };
    }
    return { list: [], relaxed: "" };
  }

  // Draw 3 options from a shuffled deck — no repeats until the deck runs out.
  // Family-added dishes get dealt near the top so they actually come up.
  function draw(meal) {
    const { list, relaxed } = candidates(meal);
    const key = [meal, dietOf(), state.query.moods.join("+"), state.query.terms.join("+")].join(":");
    let deck = state.decks[key];
    if (!deck || deck.length < 3) {
      const currentIds = new Set(state.current.map((m) => m.id));
      let fresh = shuffle(list.filter((m) => !currentIds.has(m.id) && !(deck || []).includes(m)));
      if (!fresh.length && !(deck || []).length) fresh = shuffle(list.slice());
      fresh.filter((m) => m.custom).forEach((m) => {
        fresh.splice(fresh.indexOf(m), 1);
        fresh.splice(Math.floor(Math.random() * Math.min(5, fresh.length + 1)), 0, m);
      });
      deck = (deck || []).concat(fresh);
      state.decks[key] = deck;
    }
    return { picks: deck.splice(0, 3).sort((a, b) => b.protein - a.protein), relaxed };
  }

  // ---------- understanding what people say (English + Hinglish) ----------
  const MEAL_WORDS = {
    breakfast: ["breakfast", "nashta", "nashte", "naashta", "morning", "subah", "brunch"],
    lunch: ["lunch", "dopahar", "dopehar", "afternoon", "tiffin", "lunchbox"],
    dinner: ["dinner", "raat", "night", "supper", "tonight", "evening", "shaam"],
  };
  const FILLER = new Set(("please pls plz can could would you u add save remember yaad rakh rakho rakhna rakhlo lo karo kar karna do de dena dedo to in into your my the our memory list menu app also this it dish dishes as a an new for of " +
    "forget remove delete hata hatao hatado nikal nikalo from mein me mai main ko bhi and include put naya ek is wala wali that hey ok okay").split(" "));
  const STOP = new Set(("want something kuch khana khaana have make eat give suggest recommend today aaj kya bana banao banaye should what with without some food meal option options chahiye hai hain " +
    "like feel feeling mood need idea ideas let lets maybe more different").split(" "));

  function parse(raw) {
    const text = raw.toLowerCase().replace(/[^\p{L}\p{N}\s&']/gu, " ").replace(/\s+/g, " ").trim();
    const padded = " " + text + " ";
    const has = (w) => padded.includes(" " + w + " ");
    const meals = MEAL_ORDER.filter((m) => MEAL_WORDS[m].some(has));
    const words = text.split(" ");

    if (/\b(forget|remove|delete|hata|hatao|hatado|nikal|nikalo)\b/.test(text)) {
      return { intent: "forget", name: titleCase(words.filter((w) => !FILLER.has(w) && !MEAL_WORDS.breakfast.concat(MEAL_WORDS.lunch, MEAL_WORDS.dinner).includes(w)).join(" ")) };
    }
    if (/\b(add|save|remember|yaad|include)\b/.test(text) || has("memory")) {
      const name = titleCase(words.filter((w) => !FILLER.has(w) && !MEAL_ORDER.some((m) => MEAL_WORDS[m].includes(w))).join(" "));
      return { intent: "add", name, meals };
    }

    const moods = Object.keys(MOODS).filter((k) => MOODS[k].words.some(has));
    let dietOverride = null;
    if (/chicken|mutton|fish|keema|non ?veg|meat|prawn|machli|gosht/.test(text)) dietOverride = "all";
    else if (/\b(egg|eggs|anda|ande|omelette)\b/.test(text) && state.diet === "veg") dietOverride = "egg";

    const moodWords = new Set(Object.values(MOODS).flatMap((m) => m.words));
    const all = MEAL_ORDER.flatMap(poolFor);
    const terms = words.filter((w) => w.length >= 3 && !STOP.has(w) && !FILLER.has(w) && !moodWords.has(w) &&
      !MEAL_ORDER.some((m) => MEAL_WORDS[m].includes(w)) && all.some((m) => textOf(m).includes(w)));
    return { intent: "find", meal: meals[0] || null, moods, terms, dietOverride };
  }
  const titleCase = (s) => s.replace(/\b\p{L}/gu, (c) => c.toUpperCase()).trim();

  function handle(raw) {
    const text = raw.trim();
    if (!text) return;
    const p = parse(text);
    if (p.intent === "add") {
      if (!p.name) return toast("Which dish? Try “add Malai Kofta”.");
      return openAdd(p.name, p.meals);
    }
    if (p.intent === "forget") {
      const gone = p.name && forgetDish(p.name);
      return toast(gone ? `${gone.name} removed from your dishes.` : `Couldn't find “${p.name || text}” in your dishes.`);
    }
    if (!p.meal && !p.moods.length && !p.terms.length && !p.dietOverride) {
      toast("Didn't catch a craving. Try “something spicy” or “halka dinner”.");
      if (!state.meal) return;
    }
    state.query = { moods: p.moods, terms: p.terms, text, dietOverride: p.dietOverride };
    openMeal(p.meal || state.meal || nowMeal(), true);
  }

  // ---------- speech ----------
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  let rec = null;
  function listen() {
    if (!SR) {
      if ($("#home").hidden) goHome();
      $("#yap-input").focus();
      return toast("Voice isn't supported in this browser. Type it instead!");
    }
    if (rec) return;
    let heard = "";
    rec = new SR();
    rec.lang = "en-IN";
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    const out = $("#listen-text");
    out.textContent = "Try “kuch teekha for lunch” or “add Malai Kofta”";
    out.classList.add("is-hint");
    rec.onresult = (e) => {
      heard = [...e.results].map((r) => r[0].transcript).join("").trim();
      out.textContent = "“" + heard + "”";
      out.classList.remove("is-hint");
    };
    rec.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") toast("Mic is blocked. Allow it in browser settings, or type instead.");
      else if (e.error === "no-speech") toast("Didn't hear anything. Tap the mic and try again.");
      else if (e.error !== "aborted") toast("Voice hiccup. Try again, or type it.");
    };
    rec.onend = () => {
      rec = null;
      if ($("#listen").open) $("#listen").close();
      if (heard) {
        $("#yap-input").value = heard;
        handle(heard);
      }
    };
    $("#listen").showModal();
    try { rec.start(); } catch { rec = null; $("#listen").close(); }
  }
  $("#listen-stop").addEventListener("click", () => (rec ? rec.stop() : $("#listen").close()));
  $("#listen").addEventListener("cancel", () => rec && rec.abort());

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

  function renderMoods() {
    const active = state.meal ? state.query.moods : [];
    ["#moods-home", "#moods-results"].forEach((sel) => {
      $(sel).innerHTML = Object.keys(MOODS).map((k) =>
        `<button class="mood mood-${k}" data-mood="${k}" aria-pressed="${active.includes(k)}"><i aria-hidden="true"></i>${MOODS[k].label}</button>`
      ).join("");
    });
  }

  function renderMine() {
    $("#mine-list").innerHTML = custom.map((d) => {
      const preview = expand(d)[0];
      return `<li>${plateSVG(preview, "")}<span>${esc(d.name)} <small>${d.meals.map((m) => LABEL[m]).join(" · ")}</small></span>
        <button data-forget="${esc(d.name)}" aria-label="Remove ${esc(d.name)}">×</button></li>`;
    }).join("");
    $("#mine-empty").hidden = custom.length > 0;
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
      return `<li class="slot filled">${plateSVG(meal, meal.name)}<span>${LABEL[m]}</span><strong>${esc(meal.name)}</strong></li>`;
    }).join("");

    const n = nowMeal();
    $$(".meal-tile").forEach((t) => t.classList.toggle("is-now", t.dataset.meal === n));
  }

  function cardHTML(meal, i) {
    const featured = i === 0;
    const locked = today.locks[state.meal] === meal.id;
    const t = tags(meal);
    const pct = Math.min(100, Math.round((meal.protein / 25) * 100));
    const sticker = state.query.moods.length ? `Most protein · ${MOODS[state.query.moods[0]].label}` : "Most protein";
    return `<article class="card${featured ? " featured" : ""}" style="--i:${i}">
      <div class="card-art">
        ${featured ? `<span class="sticker">${sticker}</span>` : ""}
        ${plateSVG(meal, esc("Illustrated thali: " + meal.items.map((s) => s.split("|")[0]).join(", ")))}
      </div>
      <div class="card-body">
        <div class="meta">
          <span><i class="dot ${meal.diet}"></i> ${dietLabel[meal.diet]}</span>
          <span>${meal.time} min</span>
          ${meal.custom ? `<span class="tag-mine">★ Your dish</span>` : ""}
          ${meal.moods.slice(0, 2).map((x) => `<span>${MOODS[x].label}</span>`).join("")}
        </div>
        <h3>${esc(meal.name)}</h3>
        <ul class="items">${meal.items.map((s) => `<li>${esc(s.split("|")[0])}</li>`).join("")}</ul>
        <div class="protein"><b>${meal.custom ? "~" : ""}${meal.protein}g</b> protein
          <span class="bar"><span style="width:${pct}%"></span></span>
        </div>
        ${featured ? `<div class="tags">${t.map((x) => `<span class="tag ok">✓ ${x}</span>`).join("")}</div>` : ""}
        <button class="btn-secondary${locked ? " is-locked" : ""}" data-lock="${esc(meal.id)}">
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

  function renderHeader() {
    const q = state.query;
    const meal = state.meal;
    const mood = q.moods[0];
    const d = dietOf();
    $("#results-eyebrow").textContent = [LABEL[meal], ...q.moods.map((x) => MOODS[x].label), d === "veg" ? "Veg" : d === "egg" ? "Veg + egg" : "Everything"].join(" · ");
    $("#results-title").textContent = mood ? `${MOOD_TITLE[mood]} ${meal}, coming up.` : TITLE[meal];
    const heard = $("#heard");
    heard.hidden = !q.text;
    if (q.text) heard.innerHTML = `<span>You said “${esc(q.text)}”</span><button data-clear aria-label="Clear what you said">×</button>`;
    renderMoods();
  }

  function generate() {
    const cards = $("#cards");
    const btn = $("#regen");
    btn.disabled = true;
    btn.classList.remove("rolling");
    void btn.offsetWidth;
    btn.classList.add("rolling");
    cards.setAttribute("aria-busy", "true");
    cards.classList.remove("few");
    cards.innerHTML = [0, 1, 2].map(skeletonHTML).join("");
    $("#quip").textContent = QUIPS[Math.min(state.rerolls, QUIPS.length - 1)];

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => {
      const { picks, relaxed } = draw(state.meal);
      state.current = picks;
      if (!picks.length) {
        cards.innerHTML = `<p class="empty-note">No dishes match this preference yet. Try “Everything”, or add one: tap the mic and say “add Malai Kofta”.</p>`;
      } else {
        cards.innerHTML = picks.map(cardHTML).join("");
        cards.classList.toggle("few", picks.length < 3);
        const what = state.query.moods.map((x) => MOODS[x].label.toLowerCase()).join(" + ");
        if (relaxed === "terms") $("#quip").textContent = `Nothing with “${state.query.terms.join(", ")}” here — but these are ${what || "close"}.`;
        else if (relaxed === "moods" || relaxed === "all") $("#quip").textContent = `No ${what || "exact"} ${state.meal} matches yet — here's the closest.`;
        else if (picks.length < 3 && state.rerolls === 0) $("#quip").textContent = `Only ${picks.length} ${what} pick${picks.length > 1 ? "s" : ""} for ${state.meal}. Add more by voice!`;
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

  function openMeal(meal, keepQuery) {
    state.meal = meal;
    state.rerolls = 0;
    if (!keepQuery) state.query = { moods: [], terms: [], text: "", dietOverride: null };
    state.current = [];
    renderHeader();
    show("results");
    generate();
    history.replaceState(null, "", "#" + meal);
  }

  function goHome() {
    state.meal = null;
    $("#yap-input").value = "";
    show("home");
    renderHud();
    renderMoods();
    history.replaceState(null, "", location.pathname);
  }

  function setMood(k) {
    const on = state.meal && state.query.moods.length === 1 && state.query.moods[0] === k;
    state.query = { moods: on ? [] : [k], terms: [], text: "", dietOverride: null };
    if (!state.meal) return openMeal(nowMeal(), true);
    state.rerolls = 0;
    state.current = [];
    renderHeader();
    generate();
  }

  // ---------- add-dish sheet ----------
  function chipsHTML(type, name, opts, checked) {
    return Object.entries(opts).map(([v, label]) =>
      `<label class="chip"><input type="${type}" name="${name}" value="${v}"${checked.includes(v) ? " checked" : ""}/><span>${label}</span></label>`
    ).join("");
  }
  function addPreview() {
    const name = $("#add-name").value.trim() || "Your dish";
    const meals = $$('#add-meals input:checked').map((i) => i.value);
    $("#add-art").innerHTML = plateSVG(expand({ name, meals: [meals[0] || "lunch"], moods: [], diet: "veg" })[0], esc(name));
  }
  function openAdd(name, meals) {
    const v = guessVisual(name);
    const m = meals && meals.length ? meals : BREAKFASTY.includes(v) ? ["breakfast"] : ["lunch", "dinner"];
    $("#add-name").value = name || "";
    $("#add-meals").innerHTML = chipsHTML("checkbox", "meal", LABEL, m);
    $("#add-moods").innerHTML = chipsHTML("checkbox", "mood", { chatpata: "Chatpata", spicy: "Spicy", light: "Light", comfort: "Comfort" }, guessMoods(name || ""));
    $("#add-diet").innerHTML = chipsHTML("radio", "diet", { veg: "Veg", egg: "Egg", nonveg: "Non-veg" }, [guessDiet(name || "")]);
    addPreview();
    $("#add-sheet").showModal();
    if (!name) $("#add-name").focus();
  }
  $("#add-name").addEventListener("input", addPreview);
  $("#add-meals").addEventListener("change", addPreview);
  $("#add-cancel").addEventListener("click", () => $("#add-sheet").close());
  $("#add-open").addEventListener("click", () => openAdd("", null));
  $("#add-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = titleCase($("#add-name").value.replace(/\s+/g, " "));
    const meals = $$('#add-meals input:checked').map((i) => i.value);
    if (!name) return $("#add-name").focus();
    if (!meals.length) return toast("Pick at least one: breakfast, lunch or dinner.");
    const d = { name, meals, moods: $$('#add-moods input:checked').map((i) => i.value), diet: ($('#add-diet input:checked') || {}).value || "veg" };
    saveDish(d);
    $("#add-sheet").close();
    toast(`${name} saved! It'll come up for ${meals.join(" & ")}.`);
    confetti($("#mine-title"), 50);
    if (state.meal && meals.includes(state.meal)) { state.current = []; generate(); }
  });

  // ---------- toast ----------
  let toastTimer = null;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 3200);
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
    $("#sheet-art").innerHTML = plateSVG(meal, esc(meal.name));
    $("#sheet-eyebrow").textContent = allDone ? "Full day planned" : "Locked in for " + LABEL[state.meal].toLowerCase();
    $("#sheet-title").textContent = meal.name;
    $("#sheet-stat").textContent = allDone
      ? `All 3 meals sorted · ${p}g protein today${p >= PROTEIN_GOAL ? " — goal hit!" : ""}`
      : `+${meal.protein}g protein · ${p} / ${PROTEIN_GOAL}g today`;
    $("#sheet-tip").innerHTML = `<b>Kitchen tip:</b> ${esc(meal.tip)}`;
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
  $$("[data-mic]").forEach((b) => b.addEventListener("click", listen));
  $("#yap-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const v = $("#yap-input").value;
    if (!v.trim()) return listen();
    handle(v);
  });
  document.addEventListener("click", (e) => {
    const mood = e.target.closest("[data-mood]");
    if (mood) return setMood(mood.dataset.mood);
    const f = e.target.closest("[data-forget]");
    if (f) {
      const gone = forgetDish(f.dataset.forget);
      if (gone) toast(`${gone.name} removed from your dishes.`);
      return;
    }
    if (e.target.closest("[data-clear]")) {
      state.query = { moods: [], terms: [], text: "", dietOverride: null };
      state.current = [];
      renderHeader();
      generate();
    }
  });
  $("#regen").addEventListener("click", () => { state.rerolls++; generate(); });
  $("#cards").addEventListener("click", (e) => {
    const b = e.target.closest("[data-lock]");
    if (b) lock(b.dataset.lock, b);
  });
  document.addEventListener("keydown", (e) => {
    const typing = /input|textarea|select/i.test(e.target.tagName);
    if (typing || e.metaKey || e.ctrlKey || e.altKey || $$("dialog[open]").length) return;
    if (state.meal && (e.key === "r" || e.key === "R")) { state.rerolls++; generate(); }
    if (e.key === "m" || e.key === "M") listen();
  });

  // ---------- boot ----------
  reindex();
  greet();
  renderDiet();
  renderMoods();
  renderMine();
  renderHud();
  const start = location.hash.slice(1);
  if (MEAL_ORDER.includes(start)) openMeal(start);
})();
