const $ = (id) => document.getElementById(id);
const keys = Object.keys(WAFERS);
const SIZE = 17;
const FADE_MS = 190;

let current = keys[0];
let switching = false;
let lastFocus = null;
let zoomed = false;
let zoomUsed = false;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const FIT_PARTS = ['.die-title', '.die-code', '.die-sub'];

function setText() {
  document.title = `${SITE.name} | ${SITE.role}`;
  $('brand-name').textContent = SITE.brand;
  $('hero-name').textContent = `Hi, I'm ${SITE.name}.`;
  $('hero-headline').textContent = SITE.headline;
  $('hero-summary').textContent = SITE.summary;
  $('hero-photo').src = SITE.photo;
  $('email-value').textContent = SITE.email;
  $('linkedin-value').textContent = SITE.linkedin.replace(/^https?:\/\//, '');
  $('linkedin-row').href = SITE.linkedin;
}

function buildWafer() {
  let html = '';
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) html += `<div class="cell" id="cell-${r}-${c}" data-pos="${r},${c}"></div>`;
  }
  $('grid').innerHTML = html;
  $('layers').innerHTML = keys
    .map((k) => `<div class="sheen sheen-${k}" data-wafer="${k}"></div>`)
    .join('');
}

function buildDock() {
  $('tabs').innerHTML = '<span class="thumb" id="tab-pill"></span>' + keys
    .map((k) => `
      <button class="tab" data-wafer="${k}">
        <span class="mini mini-${k}"><span class="sheen sheen-${k}"></span><span class="mini-cells">${'<i></i>'.repeat(9)}</span></span>
        <span class="tab-label" data-t="${WAFERS[k].label}">${WAFERS[k].label}</span>
      </button>`)
    .join('');
}

function applyTabs(key) {
  document.querySelectorAll('.tab').forEach((el) => el.classList.toggle('on', el.dataset.wafer === key));
  $('dock-count').textContent = `${keys.indexOf(key) + 1} of ${keys.length}`;
  $('controls').dataset.wafer = key;
  movePill();
}

function moveScopePill() {
  const btn = document.querySelector('.scope-btn.on');
  const pill = $('scope-pill');
  if (!btn || !pill) return;
  pill.style.setProperty('--x', `${btn.offsetLeft}px`);
  pill.style.setProperty('--w', `${btn.offsetWidth}px`);
}

function movePill() {
  const tab = document.querySelector('.tab.on');
  const pill = $('tab-pill');
  if (!tab || !pill) return;
  pill.style.setProperty('--x', `${tab.offsetLeft}px`);
  pill.style.setProperty('--w', `${tab.offsetWidth}px`);
}

function applyTheme(key) {
  document.querySelectorAll('#layers [data-wafer]').forEach((el) => el.classList.toggle('on', el.dataset.wafer === key));
  $('stage').dataset.aura = key;
}

function fillDies(key, animate) {
  document.querySelectorAll('.cell').forEach((cell) => (cell.innerHTML = ''));
  WAFERS[key].dies.forEach((die, i) => {
    const cell = $(`cell-${die.row}-${die.col}`);
    if (!cell) {
      console.warn(`${die.code}: row ${die.row}, col ${die.col} is not on the grid`);
      return;
    }
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'die' + (die.logo ? ' has-logo' : '') + (animate ? ' entering' : '');
    btn.style.animationDelay = `${i * 30}ms`;
    btn.title = die.title;
    btn.setAttribute('aria-label', `Inspect ${die.title}`);
    const logo = die.logo ? `<img class="die-logo" src="${die.logo}" alt="" loading="lazy" onerror="this.remove()">` : '';
    btn.innerHTML = `
      <span class="die-inner"><span class="die-body">
        <span class="die-top"><span class="die-code">${die.code}</span>${logo}</span>
        <span class="die-text"><span class="die-title">${die.title}</span><span class="die-sub">${die.subtitle || ''}</span></span>
      </span></span>`;
    btn.addEventListener('click', () => (zoomed ? openProject(die) : setZoom(true)));
    cell.appendChild(btn);
  });
  fitText();
}

function updateHint() {
  const noun = WAFERS[current].label.toLowerCase();
  const text = zoomed ? `Click any chip to inspect my ${noun}.` : `Zoom in to inspect my ${noun}!`;
  const hint = $('scope-hint');
  hint.classList.toggle('can-zoom', !zoomed);
  if (hint.textContent === text) return;
  hint.textContent = text;
  hint.classList.remove('swap');
  void hint.offsetWidth;
  hint.classList.add('swap');
}

function fitText() {
  document.querySelectorAll('.die').forEach((die) => {
    FIT_PARTS.forEach((sel) => {
      const el = die.querySelector(sel);
      if (!el) return;
      el.style.removeProperty('--fit');
      let fit = 1;
      while (fit > 0.45 && (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1)) {
        fit -= 0.04;
        el.style.setProperty('--fit', fit.toFixed(2));
      }
    });
  });
}

function setZoom(on) {
  zoomed = on;
  if (on) zoomUsed = true;
  $('stage').classList.toggle('zoomed', on);
  $('scope').classList.toggle('nudge', !zoomUsed);
  updateHint();
  document.querySelectorAll('.scope-btn').forEach((btn) => {
    const active = (btn.dataset.zoom === '1') === on;
    btn.classList.toggle('on', active);
    btn.setAttribute('aria-pressed', active);
  });
  moveScopePill();
}

async function switchWafer(key, step) {
  if (key === current || switching) return;
  switching = true;
  $('dock').classList.remove('nudge');
  const dir = step || (keys.indexOf(key) > keys.indexOf(current) ? 1 : -1);
  const quick = reduceMotion();
  applyTabs(key);
  if (zoomed) {
    setZoom(false);
    await wait(quick ? 0 : 720);
  }
  const flipper = $('flipper');
  const halo = document.querySelector('.halo');
  const stage = $('stage');
  const AXIS = 'rotate3d(1, -1, 0,';
  stage.classList.add('flipping');
  if (!quick) {
    halo.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: 'forwards' });
    await flipper.animate(
      [{ transform: `${AXIS} 0deg)` }, { transform: `${AXIS} ${90 * dir}deg)` }],
      { duration: 250, easing: 'cubic-bezier(.5, 0, .9, .6)', fill: 'forwards' }
    ).finished;
  }
  current = key;
  updateHint();
  applyTheme(key);
  fillDies(key, false);
  if (!quick) {
    halo.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 340 });
    await flipper.animate(
      [{ transform: `${AXIS} ${-90 * dir}deg)` }, { transform: `${AXIS} 0deg)` }],
      { duration: 340, easing: 'cubic-bezier(.1, .5, .25, 1)' }
    ).finished;
  }
  flipper.getAnimations().forEach((a) => a.cancel());
  halo.getAnimations().forEach((a) => a.cancel());
  stage.classList.remove('flipping');
  switching = false;
}

function cycle(step) {
  switchWafer(keys[(keys.indexOf(current) + step + keys.length) % keys.length], step);
}

function placeholderDie(seed) {
  let s = seed * 97 + 13;
  const rand = () => (s = (s * 16807) % 2147483647) / 2147483647;
  let svg = '<svg viewBox="0 0 720 405" preserveAspectRatio="xMidYMid slice"><rect width="720" height="405" fill="#d3d6da"/><rect x="14" y="26" width="692" height="354" rx="46" fill="#e4e6e9" stroke="#2c2f33" stroke-width="3"/>';
  for (let i = 0; i < 10; i++) svg += `<rect x="${70 + i * 62}" y="36" width="20" height="26" rx="2" fill="#d9a85c"/><rect x="${70 + i * 62}" y="344" width="20" height="26" rx="2" fill="#d9a85c"/>`;
  for (let i = 0; i < 7; i++) svg += `<rect x="26" y="${80 + i * 38}" width="26" height="20" rx="2" fill="#d9a85c"/><rect x="668" y="${80 + i * 38}" width="26" height="20" rx="2" fill="#d9a85c"/>`;
  for (let b = 0; b < 2; b++) for (let r = 0; r < 9; r++) for (let c = 0; c < 26; c++) svg += `<rect x="${96 + c * 19}" y="${90 + b * 130 + r * 12}" width="14" height="8" fill="${rand() > .25 ? '#7a7d82' : '#9a9da2'}"/>`;
  for (let i = 0; i < 24; i++) svg += `<path d="M${90 + rand() * 500} ${80 + rand() * 240}h${30 + rand() * 80}v${10 + rand() * 30}" fill="none" stroke="#3a3d42" stroke-width="1.5"/>`;
  for (let i = 0; i < 60; i++) svg += `<rect x="${560 + rand() * 100}" y="${100 + rand() * 200}" width="${4 + rand() * 10}" height="${4 + rand() * 8}" fill="#5a5d62"/>`;
  return svg + '</svg>';
}

const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function richText(text) {
  const out = [];
  let list = null;
  String(text || '').split('\n').forEach((raw) => {
    const line = raw.trim();
    const bullet = line.match(/^[-*•]\s+(.*)/);
    if (bullet) {
      if (!list) out.push((list = ['<ul>']));
      list.push(`<li>${esc(bullet[1])}</li>`);
    } else {
      list = null;
      if (line) out.push(`<p>${esc(line)}</p>`);
    }
  });
  return out.map((x) => (Array.isArray(x) ? x.join('') + '</ul>' : x)).join('');
}

function openProject(die) {
  $('p-title').textContent = die.heading || die.title;
  const isSkill = current === 'skills';
  $('p-meta').textContent = [die.role || die.subtitle, isSkill ? '' : die.period].filter(Boolean).join(' // ');
  const sections = current === 'projects';
  const parts = [die.what, die.how, die.why].filter(Boolean);
  const joiner = parts.some((t) => t.includes('\n')) ? '\n' : ' ';
  const text = die.description || parts.join(joiner);
  $('p-desc').hidden = sections || !text;
  $('p-fields').hidden = !sections || !parts.length;
  $('p-desc').innerHTML = richText(text);
  ['what', 'how', 'why'].forEach((k) => {
    $(`p-${k}`).innerHTML = richText(die[k]);
    $(`p-${k}`).parentElement.hidden = !die[k];
  });
  $('p-tags-title').textContent = isSkill ? 'Skills' : 'Skills used';
  $('p-tags-wrap').hidden = !(die.tags || []).length;
  $('p-tags').innerHTML = (die.tags || []).map((t) => `<span>${t}</span>`).join('');
  const photo = $('p-photo');
  if (die.image) {
    photo.innerHTML = '';
    const img = new Image();
    img.alt = die.title;
    img.src = die.image;
    img.onerror = () => (photo.innerHTML = placeholderDie(die.row * 9 + die.col));
    photo.appendChild(img);
  } else {
    photo.innerHTML = placeholderDie(die.row * 9 + die.col);
  }
  openOverlay('project');
}

function openOverlay(id) {
  lastFocus = document.activeElement;
  const el = $(id);
  el.classList.add('open');
  el.querySelector('.close').focus({ preventScroll: true });
}

function closeOverlays() {
  document.querySelectorAll('.overlay.open').forEach((el) => el.classList.remove('open'));
  if (lastFocus) lastFocus.focus({ preventScroll: true });
}

async function copyEmail() {
  const label = $('email-label');
  try {
    await navigator.clipboard.writeText(SITE.email);
    label.textContent = 'Copied to clipboard';
  } catch {
    location.href = `mailto:${SITE.email}`;
  }
  setTimeout(() => (label.textContent = 'Email'), 1800);
}

function bind() {
  $('prev').addEventListener('click', () => cycle(-1));
  $('next').addEventListener('click', () => cycle(1));
  $('tabs').addEventListener('click', (e) => {
    const tab = e.target.closest('.tab');
    if (tab) switchWafer(tab.dataset.wafer);
  });
  $('to-wafer').addEventListener('click', () => $('stage').scrollIntoView({ behavior: 'smooth', block: 'center' }));
  document.querySelectorAll('[data-open]').forEach((el) => el.addEventListener('click', () => openOverlay(el.dataset.open)));
  document.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', closeOverlays));
  document.querySelectorAll('.overlay').forEach((el) => el.addEventListener('click', (e) => e.target === el && closeOverlays()));
  document.querySelectorAll('.scope-btn').forEach((btn) => btn.addEventListener('click', () => setZoom(btn.dataset.zoom === '1')));
  $('scope-hint').addEventListener('click', () => !zoomed && setZoom(true));
  $('email-row').addEventListener('click', copyEmail);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeOverlays();
    if (document.querySelector('.overlay.open')) return;
    if (e.key === 'ArrowLeft') cycle(-1);
    if (e.key === 'ArrowRight') cycle(1);
  });
}

setText();
buildWafer();
buildDock();
applyTabs(current);
applyTheme(current);
fillDies(current, false);
updateHint();
bind();
document.fonts.ready.then(() => {
  fitText();
  movePill();
  moveScopePill();
});
moveScopePill();
requestAnimationFrame(() => document.querySelectorAll('.thumb').forEach((t) => t.classList.add('ready')));
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  movePill();
  moveScopePill();
  resizeTimer = setTimeout(fitText, 150);
});
if (new URLSearchParams(location.search).has('grid')) $('grid').classList.add('grid-debug');
