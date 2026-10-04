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
const BADGES = {
  'Python': ['Py', '#3776ab'],
  'MATLAB': ['ML', '#e16919'],
  'French (Proficient)': 'flag',
  'CAD (SolidWorks)': ['SW', '#d4202a'],
  'Microsoft Office (Excel, Word, PowerPoint)': ['Of', '#d83b01'],
  'Power BI': ['BI', '#f2c811', '#1a1a1a'],
  'Firebase': ['Fb', '#ffa000', '#1a1a1a'],
  'Vercel': ['V', '#000000'],
  'Git': ['Git', '#f05032'],
  'KiCad': ['Ki', '#314cb6'],
  'ESP32': ['ESP', '#e7352c'],
  'React': ['Re', '#20232a', '#61dafb'],
  'C++': ['C++', '#00599c']
};

/* Outline icons for the Skills chips. The key is matched against the chip's title
   (or an optional `icon: "Materials"` field in data.js). */
const CATEGORY_ICONS = {
  'Languages': '<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>',
  'Software & Tools': '<path d="M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13"/><path d="m8 6 2-2"/><path d="m18 16 2-2"/><path d="m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17"/><path d="M21.17 6.81a1 1 0 0 0-3.99-3.99L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.62l4.35-1.32a2 2 0 0 0 .83-.5z"/><path d="m15 5 4 4"/>',
  'Circuits': '<path d="M2 12h3c1.2 0 1.8-1 2.6-4.2.8-3.2 1.7-4.3 2.6-1.4 1.3 4.3 2.2 13.2 3.6 13.2.9 0 1.3-3.4 1.8-5.8.3-1.3.8-1.8 1.6-1.8H22"/>',
  'Semiconductor': '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2"/>',
  'Microfabrication': '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  'Characterization': '<path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>',
  'Materials': '<circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/>',
  'Machining': '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>'
};
const DEFAULT_ICON = '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 16v4M17 18h4"/>';
const normKey = (s) => String(s || '').toLowerCase().replace(/&amp;/g, '&').replace(/[^a-z&]+/g, ' ').trim();

function badgeHtml(tag) {
  const b = BADGES[tag];
  if (!b) return '';
  if (b === 'flag') return '<i class="ic ic-flag" aria-hidden="true"></i>';
  const [text, bg, fg] = b;
  return `<i class="ic" aria-hidden="true" style="--bg:${bg};--fg:${fg || '#fff'};--n:${text.length}"><b>${text}</b></i>`;
}

function categoryHtml(die) {
  const names = Object.keys(CATEGORY_ICONS);
  const wants = [die.icon, die.title, die.heading, die.subtitle].map(normKey).filter(Boolean);
  let key = names.find((k) => wants.includes(normKey(k)));
  if (!key) key = names.find((k) => wants.some((w) => w.includes(normKey(k))));
  const path = key ? CATEGORY_ICONS[key] : DEFAULT_ICON;
  return `<i class="ic ic-cat" aria-hidden="true"><svg viewBox="0 0 24 24">${path}</svg></i>`;
}

function iconsHtml(items) {
  return `<span class="die-icons" data-n="${items.length}">${items.join('')}</span>`;
}

function imgHtml(src, cls) {
  return `<img class="${cls}" src="${src}" alt="" loading="lazy" onerror="this.remove()">`;
}

function dieMarks(die, wafer) {
  if (wafer === 'skills') return { kind: 'icons', html: iconsHtml([categoryHtml(die)]) };
  if (die.logo) return { kind: 'logo', html: imgHtml(die.logo, 'die-logo') };
  if (die.image) return { kind: 'photo', html: imgHtml(die.image, 'die-logo') + imgHtml(die.image, 'die-thumb') };
  return { kind: '', html: '' };
}

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
    .map((k, i) => `
      <button class="tab" data-wafer="${k}" aria-pressed="false">
        <span class="mini mini-${k}"><span class="sheen sheen-${k}"></span><span class="mini-cells">${'<i></i>'.repeat(9)}</span></span>
        <span class="slot-no">0${i + 1}</span>
        <span class="tab-label" data-t="${WAFERS[k].label}">${WAFERS[k].label}</span>
      </button>`)
    .join('');
}

function applyTabs(key) {
  document.querySelectorAll('.tab').forEach((el) => {
    el.classList.toggle('on', el.dataset.wafer === key);
    el.setAttribute('aria-pressed', el.dataset.wafer === key);
  });
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
    const marks = dieMarks(die, key);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'die' + (marks.kind ? ` has-${marks.kind}` : '') + (animate ? ' entering' : '');
    btn.style.animationDelay = `${i * 30}ms`;
    btn.title = die.title;
    btn.setAttribute('aria-label', `Inspect ${die.title}`);
    btn.innerHTML = `
      <span class="die-inner"><span class="die-body">
        <span class="die-top"><span class="die-code">${die.code}</span>${marks.html}</span>
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

function isClipped(el, maxLines) {
  if (el.scrollWidth > el.clientWidth + 1) return true;
  const line = parseFloat(getComputedStyle(el).lineHeight);
  return el.scrollHeight > line * (maxLines + 0.5);
}

function fitText() {
  document.querySelectorAll('.die').forEach((die) => {
    FIT_PARTS.forEach((sel) => {
      const el = die.querySelector(sel);
      if (!el) return;
      el.style.removeProperty('--fit');
      const maxLines = sel === '.die-title' ? (die.classList.contains('has-logo') || die.classList.contains('has-icons') || die.classList.contains('has-photo') ? 1 : 2) : 99;
      let fit = 1;
      while (fit > 0.45 && isClipped(el, maxLines)) {
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