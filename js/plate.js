// Procedural top-down thali illustrations.
// One light source (top-left): steel gradients peak top-left, shadows fall down-right.
// These are artwork colours (the "food photography grade"), not UI tokens.

(function () {
  const GARNISH = "#4f8a3a";

  // visual key -> how to draw it
  const V = {
    dal:          { kind: "bowl", fill: "#e4a62b", top: "specks", tc: "#b8401e", garnish: true },
    dalBlack:     { kind: "bowl", fill: "#4b2a1d", top: "swirl", tc: "#f1e4cc" },
    dalGreen:     { kind: "bowl", fill: "#7f8f35", top: "specks", tc: "#d1aa3a" },
    dalRed:       { kind: "bowl", fill: "#e08a2e", top: "specks", tc: "#a33a18", garnish: true },
    rajma:        { kind: "bowl", fill: "#7a2a1b", top: "beans", tc: "#4e150c" },
    chole:        { kind: "bowl", fill: "#8a4e22", top: "beans", tc: "#d6a45c", garnish: true },
    kadhi:        { kind: "bowl", fill: "#efc04a", top: "chunks", tc: "#c98a2e", garnish: true },
    sambar:       { kind: "bowl", fill: "#c2602a", top: "chunks", tc: "#e9b04a" },
    curryRed:     { kind: "bowl", fill: "#b8432a", top: "chunks", tc: "#d9b79a" },
    paneerRed:    { kind: "bowl", fill: "#c2552f", top: "cubes", tc: "#f7ecd4", garnish: true },
    paneerGreen:  { kind: "bowl", fill: "#3f6b2c", top: "cubes", tc: "#f7ecd4" },
    paneerBhurji: { kind: "bowl", fill: "#f1dea8", top: "specks", tc: "#d2552f", garnish: true },
    eggCurry:     { kind: "bowl", fill: "#b9542a", top: "halves", tc: "#fffaf0" },
    eggBhurji:    { kind: "bowl", fill: "#f2c443", top: "specks", tc: "#d2552f", garnish: true },
    chicken:      { kind: "bowl", fill: "#a2451f", top: "chunks", tc: "#d98a5a", garnish: true },
    chickenSoup:  { kind: "bowl", fill: "#d9a15a", top: "chunks", tc: "#f0d2a8", garnish: true },
    keema:        { kind: "bowl", fill: "#8e3e1e", top: "specks", tc: "#7fb04a" },
    fish:         { kind: "bowl", fill: "#d06a2a", top: "chunks", tc: "#f2d2a0" },
    soya:         { kind: "bowl", fill: "#8c4a22", top: "chunks", tc: "#b98552", garnish: true },
    sabziGreen:   { kind: "bowl", fill: "#6f8c3a", top: "chunks", tc: "#b4c46a" },
    sabziYellow:  { kind: "bowl", fill: "#d9a03e", top: "chunks", tc: "#f0cf7a", garnish: true },
    bhindi:       { kind: "bowl", fill: "#56782e", top: "stripes", tc: "#8fb04e" },
    lauki:        { kind: "bowl", fill: "#b8be74", top: "chunks", tc: "#dce0a5" },
    baingan:      { kind: "bowl", fill: "#6b4636", top: "specks", tc: "#c88a3a", garnish: true },
    raita:        { kind: "bowl", fill: "#f2eee4", top: "specks", tc: "#6c9a3a" },
    dahi:         { kind: "bowl", fill: "#f7f3ea", top: "swirl", tc: "#ffffff" },
    sprouts:      { kind: "bowl", fill: "#d9c98a", top: "beans", tc: "#8db04a" },
    fruit:        { kind: "bowl", fill: "#fff3c4", top: "rings", tc: "#e2c97a" },
    chutneyGreen: { kind: "bowl", small: true, fill: "#4f8a3a", top: "none" },
    chutneyRed:   { kind: "bowl", small: true, fill: "#c2452d", top: "none" },
    chutneyWhite: { kind: "bowl", small: true, fill: "#eee6d2", top: "specks", tc: "#5a3a1a" },
    achaar:       { kind: "bowl", small: true, fill: "#c4561f", top: "chunks", tc: "#e8a24a" },
    chai:         { kind: "cup", fill: "#b07a4f" },
    milk:         { kind: "cup", fill: "#f7f4ec" },

    roti:       { kind: "flat", fill: "#dcac6c", spots: "#9a5a2a", stack: 2 },
    paratha:    { kind: "flat", fill: "#c98b45", spots: "#7a4a1a", stack: 2, layers: true },
    thepla:     { kind: "flat", fill: "#bfa04e", spots: GARNISH, stack: 2 },
    chilla:     { kind: "flat", fill: "#e1ae48", spots: GARNISH, extra: "#c2452d" },
    dosa:       { kind: "flat", fill: "#d99a3a", spots: "#8a5a1a", layers: true, big: true },
    omelette:   { kind: "flat", fill: "#f0c43a", spots: GARNISH, extra: "#c2452d" },
    papad:      { kind: "flat", fill: "#efd9a6", spots: "#b98a4a", dots: true },
    rice:       { kind: "mound", fill: "#fbf8f0", grain: "#e6e0d0" },
    riceYellow: { kind: "mound", fill: "#f0cf7a", grain: "#f8e3a8", specks: [GARNISH, "#d2552f"] },
    khichdi:    { kind: "mound", fill: "#e9c46a", grain: "#f2d99a", specks: [GARNISH] },
    poha:       { kind: "mound", fill: "#f2d26a", grain: "#f8e4a0", specks: [GARNISH, "#8a5326"] },
    upma:       { kind: "mound", fill: "#eedfb8", grain: "#f7ecd0", specks: ["#d2552f", GARNISH] },
    daliya:     { kind: "mound", fill: "#d8b98a", grain: "#e8d2ac", specks: [GARNISH, "#d2552f"] },
    idli:       { kind: "idli" },
    toast:      { kind: "toast" },
    salad:      { kind: "salad" },
    eggs:       { kind: "eggs" },
    paneerTikka:{ kind: "tikka" },
    fishFry:    { kind: "fishFry" },
  };

  // Seeded random so the same dish always looks the same.
  function rng(seedStr) {
    let h = 1779033703 ^ seedStr.length;
    for (let i = 0; i < seedStr.length; i++) {
      h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return function () {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      return ((h ^= h >>> 16) >>> 0) / 4294967296;
    };
  }

  const f = (n) => Math.round(n * 10) / 10;

  // Points scattered inside a circle of radius r.
  function scatter(rand, n, r) {
    const pts = [];
    for (let i = 0; i < n; i++) {
      const a = rand() * Math.PI * 2;
      const d = Math.sqrt(rand()) * r;
      pts.push([Math.cos(a) * d, Math.sin(a) * d, rand()]);
    }
    return pts;
  }

  // Organic blob outline for mounds.
  function blob(rand, r, wobble) {
    const n = 10;
    const pts = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const rr = r * (1 - wobble + rand() * wobble * 2);
      pts.push([Math.cos(a) * rr, Math.sin(a) * rr]);
    }
    let d = "";
    for (let i = 0; i < n; i++) {
      const p = pts[i];
      const q = pts[(i + 1) % n];
      const mx = (p[0] + q[0]) / 2;
      const my = (p[1] + q[1]) / 2;
      if (i === 0) {
        const last = pts[n - 1];
        d += `M${f((last[0] + p[0]) / 2)} ${f((last[1] + p[1]) / 2)}`;
      }
      d += ` Q${f(p[0])} ${f(p[1])} ${f(mx)} ${f(my)}`;
    }
    return d + "Z";
  }

  function toppings(v, r, rand) {
    let s = "";
    const tc = v.tc;
    switch (v.top) {
      case "specks":
        scatter(rand, Math.round(r * 0.7), r * 0.8).forEach(([x, y, k]) => {
          s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(0.8 + k * 1.2)}" fill="${tc}" opacity="${f(0.6 + k * 0.4)}"/>`;
        });
        break;
      case "beans":
        scatter(rand, Math.round(r * 0.5), r * 0.72).forEach(([x, y, k]) => {
          s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(r * 0.13)}" ry="${f(r * 0.085)}" transform="rotate(${Math.round(k * 180)} ${f(x)} ${f(y)})" fill="${tc}"/>`;
        });
        break;
      case "cubes":
        scatter(rand, 6, r * 0.6).forEach(([x, y, k]) => {
          const w = r * 0.26;
          s += `<rect x="${f(x - w / 2)}" y="${f(y - w / 2)}" width="${f(w)}" height="${f(w)}" rx="2" fill="${tc}" transform="rotate(${Math.round(k * 90)} ${f(x)} ${f(y)})"/>`;
        });
        break;
      case "chunks":
        scatter(rand, 7, r * 0.62).forEach(([x, y, k]) => {
          s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(r * 0.17)}" ry="${f(r * 0.13)}" transform="rotate(${Math.round(k * 180)} ${f(x)} ${f(y)})" fill="${tc}" opacity="0.92"/>`;
        });
        break;
      case "stripes":
        scatter(rand, 9, r * 0.6).forEach(([x, y, k]) => {
          const a = k * Math.PI;
          const l = r * 0.22;
          s += `<line x1="${f(x - Math.cos(a) * l)}" y1="${f(y - Math.sin(a) * l)}" x2="${f(x + Math.cos(a) * l)}" y2="${f(y + Math.sin(a) * l)}" stroke="${tc}" stroke-width="${f(r * 0.14)}" stroke-linecap="round"/>`;
        });
        break;
      case "swirl": {
        const a = r * 0.55;
        s += `<path d="M${f(-a)} 0 C${f(-a)} ${f(-a)}, ${f(a)} ${f(-a)}, ${f(a * 0.6)} 0 S${f(-a * 0.2)} ${f(a * 0.5)}, ${f(-a * 0.1)} ${f(a * 0.1)}" fill="none" stroke="${tc}" stroke-width="${f(r * 0.1)}" stroke-linecap="round" opacity="0.85"/>`;
        break;
      }
      case "halves":
        [[-r * 0.3, -r * 0.1], [r * 0.32, r * 0.18]].forEach(([x, y]) => {
          s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(r * 0.3)}" ry="${f(r * 0.22)}" fill="${tc}"/><circle cx="${f(x)}" cy="${f(y)}" r="${f(r * 0.13)}" fill="#f2b522"/>`;
        });
        break;
      case "rings":
        scatter(rand, 5, r * 0.5).forEach(([x, y]) => {
          s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r * 0.2)}" fill="#fff8dc" stroke="${tc}" stroke-width="1.5"/><circle cx="${f(x)}" cy="${f(y)}" r="1.2" fill="#c9a85a"/>`;
        });
        break;
    }
    if (v.garnish) {
      scatter(rand, 5, r * 0.55).forEach(([x, y, k]) => {
        s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="2.4" ry="1.4" transform="rotate(${Math.round(k * 180)} ${f(x)} ${f(y)})" fill="${GARNISH}"/>`;
      });
    }
    return s;
  }

  function bowl(id, v, r, rand) {
    const inner = r - 4;
    return `<circle r="${r}" fill="url(#${id}-steel)" filter="url(#${id}-sh)"/>
      <circle r="${inner}" fill="${v.fill}"/>
      <g clip-path="url(#${id}-c${r})">${toppings(v, inner, rand)}</g>
      <circle r="${inner}" fill="url(#${id}-gloss)"/>
      <circle r="${inner}" fill="none" stroke="rgba(0,0,0,0.12)" stroke-width="1"/>`;
  }

  function cup(id, v, r) {
    return `<rect x="${f(r * 0.7)}" y="${f(-r * 0.18)}" width="${f(r * 0.55)}" height="${f(r * 0.36)}" rx="${f(r * 0.18)}" fill="url(#${id}-steel)" filter="url(#${id}-sh)"/>
      <circle r="${f(r * 0.9)}" fill="url(#${id}-ceramic)" filter="url(#${id}-sh)"/>
      <circle r="${f(r * 0.72)}" fill="${v.fill}"/>
      <ellipse cx="${f(-r * 0.2)}" cy="${f(-r * 0.25)}" rx="${f(r * 0.25)}" ry="${f(r * 0.12)}" fill="#fff" opacity="0.28"/>`;
  }

  function flatOne(id, v, r, rand) {
    let s = `<circle r="${r}" fill="${v.fill}" filter="url(#${id}-sh)"/>`;
    s += `<circle r="${r}" fill="url(#${id}-toast)"/>`;
    if (v.layers) {
      for (let i = 1; i <= 3; i++) {
        s += `<circle r="${f(r * (0.25 * i))}" fill="none" stroke="${v.spots}" stroke-width="1" opacity="0.25"/>`;
      }
    }
    const n = v.dots ? 26 : 12;
    scatter(rand, n, r * 0.82).forEach(([x, y, k]) => {
      if (v.dots) {
        s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(0.8 + k)}" fill="${v.spots}" opacity="0.55"/>`;
      } else {
        s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(1.5 + k * 3)}" ry="${f(1 + k * 1.5)}" transform="rotate(${Math.round(k * 180)} ${f(x)} ${f(y)})" fill="${v.spots}" opacity="${f(0.35 + k * 0.35)}"/>`;
      }
    });
    if (v.extra) {
      scatter(rand, 6, r * 0.7).forEach(([x, y]) => {
        s += `<circle cx="${f(x)}" cy="${f(y)}" r="1.8" fill="${v.extra}" opacity="0.85"/>`;
      });
    }
    return s;
  }

  function flat(id, v, r, rand) {
    if (v.stack) {
      // bottom one peeks out down-right, away from the light
      return `<g transform="translate(5 6)">${flatOne(id, v, r * 0.94, rand)}</g>${flatOne(id, v, r * 0.94, rand)}`;
    }
    return flatOne(id, v, v.big ? r * 1.05 : r * 0.95, rand);
  }

  function mound(id, v, r, rand) {
    let s = `<path d="${blob(rand, r * 0.92, 0.08)}" fill="${v.fill}" filter="url(#${id}-sh)"/>`;
    scatter(rand, Math.round(r * 1.1), r * 0.8).forEach(([x, y, k]) => {
      s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="2.4" ry="1.1" transform="rotate(${Math.round(k * 180)} ${f(x)} ${f(y)})" fill="${v.grain}"/>`;
    });
    (v.specks || []).forEach((c) => {
      scatter(rand, 8, r * 0.7).forEach(([x, y, k]) => {
        s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(1.2 + k * 1.2)}" fill="${c}"/>`;
      });
    });
    s += `<path d="${blob(rand, r * 0.92, 0)}" fill="url(#${id}-gloss)"/>`;
    return s;
  }

  function idli(id, r) {
    const rr = r * 0.46;
    return [[-r * 0.42, -r * 0.18], [r * 0.42, -r * 0.22], [0, r * 0.45]]
      .map(([x, y]) => `<g transform="translate(${f(x)} ${f(y)})"><circle r="${f(rr)}" fill="#fbf9f3" filter="url(#${id}-sh)"/><circle r="${f(rr)}" fill="url(#${id}-gloss)"/><circle r="${f(rr * 0.7)}" fill="none" stroke="#ece6d8" stroke-width="1.5"/></g>`)
      .join("");
  }

  function toast(id, r) {
    const w = r * 1.0;
    const one = (x, y, rot) =>
      `<g transform="translate(${f(x)} ${f(y)}) rotate(${rot})"><rect x="${f(-w / 2)}" y="${f(-w / 2)}" width="${f(w)}" height="${f(w)}" rx="${f(w * 0.18)}" fill="#a8642c" filter="url(#${id}-sh)"/><rect x="${f(-w / 2 + 4)}" y="${f(-w / 2 + 4)}" width="${f(w - 8)}" height="${f(w - 8)}" rx="${f(w * 0.14)}" fill="#e0a865"/><rect x="${f(-w / 2 + 4)}" y="${f(-w / 2 + 4)}" width="${f(w - 8)}" height="${f(w - 8)}" rx="${f(w * 0.14)}" fill="url(#${id}-gloss)"/></g>`;
    // the signature -6deg tilt
    return one(-r * 0.3, -r * 0.12, -6) + one(r * 0.32, r * 0.22, -6);
  }

  function salad(id, r, rand) {
    let s = `<circle r="${f(r * 0.9)}" fill="#e7efd6" opacity="0.55"/>`;
    scatter(rand, 9, r * 0.6).forEach(([x, y, k], i) => {
      const rr = r * 0.22;
      if (i % 3 === 0) {
        s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(rr)}" fill="#d9432f" filter="url(#${id}-sh)"/><circle cx="${f(x)}" cy="${f(y)}" r="${f(rr * 0.6)}" fill="#f07a5a"/>`;
      } else if (i % 3 === 1) {
        s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(rr)}" fill="#e7f0c8" stroke="#4f8a3a" stroke-width="2" filter="url(#${id}-sh)"/><circle cx="${f(x)}" cy="${f(y)}" r="${f(rr * 0.45)}" fill="#cfe0a0"/>`;
      } else {
        s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(rr * 0.9)}" fill="none" stroke="#c9849a" stroke-width="1.6" opacity="${f(0.6 + k * 0.4)}"/>`;
      }
    });
    s += `<path d="M${f(r * 0.5)} ${f(r * 0.45)} a${f(r * 0.25)} ${f(r * 0.25)} 0 0 1 ${f(r * 0.3)} ${f(-r * 0.3)} z" fill="#e8e36a" stroke="#c9c24a" stroke-width="1"/>`;
    return s;
  }

  function eggs(id, r) {
    return [[-r * 0.38, -r * 0.2], [r * 0.38, -r * 0.1], [0, r * 0.42]]
      .map(([x, y], i) => `<g transform="translate(${f(x)} ${f(y)}) rotate(${i * 35})"><ellipse rx="${f(r * 0.36)}" ry="${f(r * 0.27)}" fill="#fffaf0" filter="url(#${id}-sh)"/><circle r="${f(r * 0.15)}" fill="#f2b522"/><ellipse rx="${f(r * 0.36)}" ry="${f(r * 0.27)}" fill="url(#${id}-gloss)"/></g>`)
      .join("");
  }

  function tikka(id, r, rand) {
    let s = "";
    scatter(rand, 7, r * 0.55).forEach(([x, y, k]) => {
      const w = r * 0.3;
      s += `<g transform="translate(${f(x)} ${f(y)}) rotate(${Math.round(k * 40 - 20)})"><rect x="${f(-w / 2)}" y="${f(-w / 2)}" width="${f(w)}" height="${f(w)}" rx="3" fill="#e2893a" filter="url(#${id}-sh)"/><rect x="${f(-w / 4)}" y="${f(-w / 2)}" width="${f(w / 5)}" height="${f(w)}" fill="#6b2f12" opacity="0.45"/></g>`;
    });
    scatter(rand, 3, r * 0.6).forEach(([x, y]) => {
      s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r * 0.18)}" fill="none" stroke="#d68aa0" stroke-width="2"/>`;
    });
    return s;
  }

  function fishFry(id, r) {
    const one = (x, y, rot) =>
      `<g transform="translate(${f(x)} ${f(y)}) rotate(${rot})"><ellipse rx="${f(r * 0.62)}" ry="${f(r * 0.26)}" fill="#c9561f" filter="url(#${id}-sh)"/><ellipse rx="${f(r * 0.5)}" ry="${f(r * 0.17)}" fill="#e38a3a"/><ellipse rx="${f(r * 0.62)}" ry="${f(r * 0.26)}" fill="url(#${id}-gloss)"/></g>`;
    return one(-r * 0.05, -r * 0.3, -6) + one(r * 0.05, r * 0.25, -6) +
      `<path d="M${f(r * 0.45)} ${f(r * 0.7)} a${f(r * 0.24)} ${f(r * 0.24)} 0 0 1 ${f(r * 0.34)} ${f(-r * 0.32)} z" fill="#e8e36a" stroke="#c9c24a" stroke-width="1"/>`;
  }

  function drawItem(id, v, r, rand) {
    switch (v.kind) {
      case "bowl": return bowl(id, v, r, rand);
      case "cup": return cup(id, v, r);
      case "flat": return flat(id, v, r, rand);
      case "mound": return mound(id, v, r, rand);
      case "idli": return idli(id, r);
      case "toast": return toast(id, r);
      case "salad": return salad(id, r, rand);
      case "eggs": return eggs(id, r);
      case "tikka": return tikka(id, r, rand);
      case "fishFry": return fishFry(id, r);
      default: return "";
    }
  }

  // Slot layouts inside a 240×240 thali (centre 0,0). Bowls ride the top rim,
  // breads and rice sit in the lower well — like a real thali.
  const RIM = {
    1: [[-40, -42, 32]],
    2: [[-38, -44, 30], [38, -44, 30]],
    3: [[-52, -30, 27], [0, -60, 27], [52, -30, 27]],
  };
  const WELL = {
    1: [[0, 34, 44]],
    2: [[-34, 38, 33], [37, 40, 31]],
  };

  let counter = 0;

  window.plateSVG = function (meal, label) {
    const id = "p" + ++counter;
    const rand = rng(meal.name);
    const vis = meal.items.map((s) => V[s.split("|")[1]]).filter(Boolean);
    let bowls = vis.filter((v) => v.kind === "bowl" || v.kind === "cup").slice(0, 3);
    let well = vis.filter((v) => v.kind !== "bowl" && v.kind !== "cup").slice(0, 2);
    if (!well.length && bowls.length) well = [bowls.pop()];

    let body = "";
    const radii = new Set();
    const rim = RIM[bowls.length] || [];
    bowls.forEach((v, i) => {
      const [x, y, r] = rim[i];
      const rr = v.small ? Math.round(r * 0.8) : r;
      radii.add(rr);
      body += `<g transform="translate(${x} ${y})">${drawItem(id, v, rr, rand)}</g>`;
    });
    // single bowl: push the well item to the lower right for balance
    const wellSlots = bowls.length === 1 && well.length === 1 ? [[24, 30, 46]] : WELL[well.length] || [];
    well.forEach((v, i) => {
      const [x, y, r] = wellSlots[i];
      body += `<g transform="translate(${x} ${y})">${drawItem(id, v, r, rand)}</g>`;
    });

    const clips = [...radii, 31, 33, 44, 46]
      .map((r) => `<clipPath id="${id}-c${r}"><circle r="${r - 4}"/></clipPath>`)
      .join("");

    return `<svg class="plate" viewBox="-120 -120 240 240" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="${id}-steel" cx="32%" cy="28%" r="80%">
          <stop offset="0" stop-color="#fbfbf9"/><stop offset="0.55" stop-color="#d7dadb"/><stop offset="1" stop-color="#a9afb2"/>
        </radialGradient>
        <radialGradient id="${id}-well" cx="35%" cy="30%" r="85%">
          <stop offset="0" stop-color="#f2f3f2"/><stop offset="1" stop-color="#c9cdcf"/>
        </radialGradient>
        <radialGradient id="${id}-ceramic" cx="32%" cy="28%" r="80%">
          <stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e2ddd2"/>
        </radialGradient>
        <radialGradient id="${id}-toast" cx="40%" cy="38%" r="70%">
          <stop offset="0" stop-color="#fff" stop-opacity="0.18"/><stop offset="1" stop-color="#5a2a0a" stop-opacity="0.18"/>
        </radialGradient>
        <linearGradient id="${id}-gloss" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#fff" stop-opacity="0.32"/><stop offset="0.5" stop-color="#fff" stop-opacity="0"/>
        </linearGradient>
        <filter id="${id}-sh" x="-30%" y="-30%" width="170%" height="170%">
          <feDropShadow dx="2.5" dy="3.5" stdDeviation="2.5" flood-color="#3a2410" flood-opacity="0.28"/>
        </filter>
        <filter id="${id}-plate" x="-20%" y="-20%" width="150%" height="150%">
          <feDropShadow dx="6" dy="9" stdDeviation="8" flood-color="#3a2410" flood-opacity="0.22"/>
        </filter>
        ${clips}
      </defs>
      <circle r="110" fill="url(#${id}-steel)" filter="url(#${id}-plate)"/>
      <circle r="96" fill="url(#${id}-well)"/>
      <circle r="96" fill="none" stroke="#fff" stroke-opacity="0.6" stroke-width="1.5" stroke-dasharray="120 500" transform="rotate(170)"/>
      <g class="plate-food">${body}</g>
    </svg>`;
  };
})();
