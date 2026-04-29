/* ================================================================
   ONE PIECE WIKI — APP.JS
   Integração com https://api.api-onepiece.com/v2
   ================================================================ */

'use strict';

const API = 'https://api.api-onepiece.com/v2';

/* ── Estado global ─────────────────────────────────────────── */
const state = {
  characters: [],
  fruits:     [],
  crews:      [],
  sagas:      [],
  charPage:   0,
  charsPerPage: 12,
  fruitFilter: 'all',
};

/* ── Helpers de DOM ────────────────────────────────────────── */
const $ = id => document.getElementById(id);
const qs = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ── Fetch com tratamento de erro ──────────────────────────── */
async function apiFetch(path) {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${path}`);
  return res.json();
}

/* ── Formatadores ──────────────────────────────────────────── */
function formatBounty(raw) {
  if (!raw || raw === '0' || raw === 'null' || raw === null) return 'N/A';
  const n = parseInt(String(raw).replace(/\D/g, ''), 10);
  if (isNaN(n) || n === 0) return 'N/A';
  if (n >= 1_000_000_000) return `฿${(n / 1e9).toFixed(2)}B`;
  if (n >= 1_000_000)     return `฿${(n / 1e6).toFixed(0)}M`;
  return `฿${n.toLocaleString('pt-BR')}`;
}

function initials(name) {
  if (!name) return '?';
  return name.trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function fruitIcon(type) {
  const t = (type || '').toLowerCase();
  if (t === 'paramecia') return '💜';
  if (t === 'zoan')      return '🦁';
  if (t === 'logia')     return '⚡';
  return '🍎';
}

function crewEmoji(name) {
  const n = (name || '').toLowerCase();
  if (n.includes('straw hat') || n.includes('mugiwara')) return '🎩';
  if (n.includes('whitebeard'))                          return '🏴';
  if (n.includes('blackbeard'))                          return '💀';
  if (n.includes('red hair'))                            return '⚔️';
  if (n.includes('big mom'))                             return '🍭';
  if (n.includes('beast') || n.includes('kaido'))        return '🐉';
  if (n.includes('marine') || n.includes('navy'))        return '⚓';
  if (n.includes('baroque'))                             return '🌹';
  return '☠️';
}

function statusClass(status) {
  const s = (status || '').toLowerCase();
  if (s === 'alive')                 return 'alive';
  if (s === 'dead' || s === 'deceased') return 'dead';
  return 'unknown';
}

function crewStatusClass(status) {
  const s = (status || '').toLowerCase();
  if (s === 'active')   return 'active';
  if (s === 'inactive' || s === 'disbanded') return 'dead';
  return 'unknown';
}

function sanitize(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ── Skeletons ─────────────────────────────────────────────── */
function skeletonCard() {
  return `
    <div class="skeleton-card" aria-hidden="true">
      <div style="display:flex;gap:12px;align-items:center">
        <span class="skeleton" style="width:54px;height:54px;border-radius:50%;flex-shrink:0"></span>
        <div style="flex:1;display:flex;flex-direction:column;gap:8px">
          <span class="skeleton" style="height:16px;width:65%"></span>
          <span class="skeleton" style="height:12px;width:45%"></span>
        </div>
      </div>
      <span class="skeleton" style="height:11px;width:90%"></span>
      <span class="skeleton" style="height:11px;width:75%"></span>
    </div>`;
}

function renderSkeletons(container, count = 8) {
  container.innerHTML = Array.from({ length: count }, skeletonCard).join('');
}

function sagaSkeleton() {
  return `
    <li class="saga-item" aria-hidden="true" style="display:flex;gap:16px;padding-bottom:24px">
      <span class="skeleton" style="width:40px;height:40px;border-radius:50%;flex-shrink:0"></span>
      <div style="flex:1;display:flex;flex-direction:column;gap:10px;padding:16px;border-radius:12px;background:var(--clr-surface-2);border:1px solid var(--clr-border)">
        <span class="skeleton" style="height:18px;width:55%"></span>
        <div style="display:flex;gap:8px">
          <span class="skeleton" style="height:22px;width:90px;border-radius:9999px"></span>
          <span class="skeleton" style="height:22px;width:90px;border-radius:9999px"></span>
        </div>
      </div>
    </li>`;
}

/* ── Fade-in via Intersection Observer ─────────────────────── */
let fadeObserver;

function setupFadeObserver() {
  fadeObserver = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('fade-in--visible');
        fadeObserver.unobserve(e.target);
      }
    }),
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );
}

function observeFadeIn() {
  document.querySelectorAll('.fade-in:not(.fade-in--visible)')
    .forEach(el => fadeObserver.observe(el));
}

/* ════════════════════════════════════════════════════════════
   RENDERS
   ════════════════════════════════════════════════════════════ */

/* ── Personagens ─────────────────────────────────────────── */
function buildCharCard(char) {
  const sc   = statusClass(char.status);
  const bou  = formatBounty(char.bounty);
  const init = initials(char.name);
  const hasFruit = char.fruit && char.fruit !== 'null';

  return `
    <article class="char-card fade-in" role="listitem">
      <div class="char-card__header">
        <div class="char-card__avatar" aria-hidden="true">${sanitize(init)}</div>
        <div class="char-card__info">
          <div class="char-card__name">${sanitize(char.name || 'Desconhecido')}</div>
          <div class="char-card__job">${sanitize(char.job || '—')}</div>
        </div>
        <span class="char-card__status char-card__status--${sc}">${sanitize(char.status || '?')}</span>
      </div>

      <div class="char-card__stats">
        <div class="char-card__stat">
          <span class="char-card__stat-label">Recompensa</span>
          <span class="char-card__stat-value">${bou}</span>
        </div>
        <div class="char-card__stat">
          <span class="char-card__stat-label">Tripulação</span>
          <span class="char-card__stat-value">${sanitize(char.crew || 'N/A')}</span>
        </div>
        ${char.age ? `<div class="char-card__stat">
          <span class="char-card__stat-label">Idade</span>
          <span class="char-card__stat-value">${sanitize(char.age)}</span>
        </div>` : ''}
        ${char.size ? `<div class="char-card__stat">
          <span class="char-card__stat-label">Altura</span>
          <span class="char-card__stat-value">${sanitize(char.size)}</span>
        </div>` : ''}
      </div>

      ${hasFruit ? `
        <div class="char-card__fruit">
          <span aria-hidden="true">🍎</span>
          <span>${sanitize(char.fruit)}</span>
        </div>` : ''}
    </article>`;
}

function renderCharacters(list) {
  const grid = $('characters-grid');
  if (!list.length) {
    grid.innerHTML = `<div class="state-empty"><div class="state-empty__icon">🔍</div><p>Nenhum personagem encontrado.</p></div>`;
    return;
  }
  grid.innerHTML = list.map(buildCharCard).join('');
  observeFadeIn();
}

/* ── Akuma no Mi ─────────────────────────────────────────── */
function buildFruitCard(fruit) {
  const type  = fruit.type || 'unknown';
  const tLow  = type.toLowerCase();
  const icon  = fruitIcon(type);

  return `
    <article class="fruit-card fruit-card--${tLow} fade-in" role="listitem">
      <div class="fruit-card__glow" aria-hidden="true"></div>
      <div class="fruit-card__header">
        <div>
          <div class="fruit-card__name">${sanitize(fruit.name || 'Desconhecida')}</div>
          ${fruit.roman_name ? `<div class="fruit-card__roman">${sanitize(fruit.roman_name)}</div>` : ''}
        </div>
        <span class="fruit-badge fruit-badge--${tLow}">${sanitize(type)}</span>
      </div>
      <div class="fruit-card__icon" aria-hidden="true">${icon}</div>
      ${fruit.description ? `<p class="fruit-card__desc">${sanitize(fruit.description)}</p>` : ''}
    </article>`;
}

function renderFruits(list) {
  const grid = $('fruits-grid');
  if (!list.length) {
    grid.innerHTML = `<div class="state-empty"><div class="state-empty__icon">🍎</div><p>Nenhuma fruta encontrada.</p></div>`;
    return;
  }
  grid.innerHTML = list.map(buildFruitCard).join('');
  observeFadeIn();
}

/* ── Tripulações ─────────────────────────────────────────── */
function buildCrewCard(crew) {
  const isYonko = ['true', '1', 1, true].includes(crew.is_yonko);
  const sc      = crewStatusClass(crew.status);
  const emoji   = crewEmoji(crew.name);

  return `
    <article class="crew-card ${isYonko ? 'crew-card--yonko' : ''} fade-in" role="listitem">
      <div class="crew-card__top">
        <div class="crew-card__emblem" aria-hidden="true">${emoji}</div>
        <div>
          <div class="crew-card__name">${sanitize(crew.name || 'Desconhecida')}</div>
          ${crew.roman_name ? `<div class="crew-card__roman">${sanitize(crew.roman_name)}</div>` : ''}
        </div>
      </div>

      ${crew.description ? `<p class="crew-card__desc">${sanitize(crew.description)}</p>` : ''}

      <div class="crew-card__meta">
        <div class="crew-card__meta-item">
          <span class="crew-card__meta-label">Membros</span>
          <span class="crew-card__meta-value">${sanitize(crew.number || 'N/A')}</span>
        </div>
        <div class="crew-card__meta-item">
          <span class="crew-card__meta-label">Recompensa total</span>
          <span class="crew-card__meta-value">${formatBounty(crew.total_prime)}</span>
        </div>
      </div>

      <span class="crew-status crew-status--${sc}">${sanitize(crew.status || 'Desconhecido')}</span>
    </article>`;
}

function renderCrews(list) {
  const grid = $('crews-grid');
  if (!list.length) {
    grid.innerHTML = `<div class="state-empty"><div class="state-empty__icon">🏴</div><p>Nenhuma tripulação encontrada.</p></div>`;
    return;
  }
  grid.innerHTML = list.map(buildCrewCard).join('');
  observeFadeIn();
}

/* ── Sagas ───────────────────────────────────────────────── */
function buildSagaItem(saga, idx) {
  const title = sanitize(saga.tittle || saga.title || 'Saga desconhecida');

  return `
    <li class="saga-item fade-in">
      <div class="saga-item__dot" aria-hidden="true">${idx + 1}</div>
      <div class="saga-item__body">
        <h3 class="saga-item__title">${title}</h3>
        <div class="saga-item__badges">
          ${saga.saga_chapitre ? `<span class="saga-badge">📖 Cap. ${sanitize(saga.saga_chapitre)}</span>` : ''}
          ${saga.saga_episode  ? `<span class="saga-badge">🎬 Ep. ${sanitize(saga.saga_episode)}</span>`  : ''}
          ${saga.saga_volume   ? `<span class="saga-badge">📚 Vol. ${sanitize(saga.saga_volume)}</span>`   : ''}
        </div>
      </div>
    </li>`;
}

function renderSagas(list) {
  const tl = $('sagas-timeline');
  if (!list.length) {
    tl.innerHTML = `<li class="state-empty"><div class="state-empty__icon">📖</div><p>Nenhuma saga encontrada.</p></li>`;
    return;
  }
  tl.innerHTML = list.map(buildSagaItem).join('');
  observeFadeIn();
}

/* ── Hero stats ──────────────────────────────────────────── */
async function loadHeroStats() {
  try {
    const [cRes, fRes, crRes, sRes] = await Promise.allSettled([
      apiFetch('/characters/en/count'),
      apiFetch('/fruits/en/count'),
      apiFetch('/crews/en/count'),
      apiFetch('/sagas/en/count'),
    ]);

    const num = r => {
      if (r.status !== 'fulfilled') return '—';
      const v = r.value;
      if (typeof v === 'number') return v;
      if (v && typeof v === 'object') return v.count ?? v.total ?? Object.values(v)[0] ?? '—';
      return v ?? '—';
    };

    $('hero-stats').innerHTML = `
      <div class="stat-item">
        <span class="stat-item__number">${num(cRes)}</span>
        <span class="stat-item__label">Personagens</span>
      </div>
      <div class="stat-item">
        <span class="stat-item__number">${num(fRes)}</span>
        <span class="stat-item__label">Akuma no Mi</span>
      </div>
      <div class="stat-item">
        <span class="stat-item__number">${num(crRes)}</span>
        <span class="stat-item__label">Tripulações</span>
      </div>
      <div class="stat-item">
        <span class="stat-item__number">${num(sRes)}</span>
        <span class="stat-item__label">Sagas</span>
      </div>`;
  } catch {
    $('hero-stats').innerHTML = '';
  }
}

/* ════════════════════════════════════════════════════════════
   LOADERS — buscam da API e atualizam a UI
   ════════════════════════════════════════════════════════════ */

async function loadCharacters() {
  const grid = $('characters-grid');
  renderSkeletons(grid, 8);
  try {
    const data = await apiFetch('/characters/en');
    state.characters = Array.isArray(data) ? data : (data.characters ?? []);
    state.charPage   = 1;

    const first = state.characters.slice(0, state.charsPerPage);
    renderCharacters(first);

    const btn = $('load-more-characters');
    btn.hidden = state.characters.length <= state.charsPerPage;
  } catch (err) {
    grid.innerHTML = `
      <div class="state-error">
        <div class="state-error__icon">⚠️</div>
        <p>Erro ao carregar personagens.<br><small>${err.message}</small></p>
      </div>`;
  }
}

async function loadFruits() {
  const grid = $('fruits-grid');
  renderSkeletons(grid, 8);
  try {
    const data = await apiFetch('/fruits/en');
    state.fruits = Array.isArray(data) ? data : (data.fruits ?? []);
    renderFruits(state.fruits);
  } catch (err) {
    grid.innerHTML = `
      <div class="state-error">
        <div class="state-error__icon">⚠️</div>
        <p>Erro ao carregar Akuma no Mi.<br><small>${err.message}</small></p>
      </div>`;
  }
}

async function loadCrews() {
  const grid = $('crews-grid');
  renderSkeletons(grid, 6);
  try {
    const data = await apiFetch('/crews/en');
    state.crews = Array.isArray(data) ? data : (data.crews ?? []);
    renderCrews(state.crews);
  } catch (err) {
    grid.innerHTML = `
      <div class="state-error">
        <div class="state-error__icon">⚠️</div>
        <p>Erro ao carregar tripulações.<br><small>${err.message}</small></p>
      </div>`;
  }
}

async function loadSagas() {
  const tl = $('sagas-timeline');
  tl.innerHTML = Array.from({ length: 4 }, sagaSkeleton).join('');
  try {
    const data = await apiFetch('/sagas/en');
    state.sagas = Array.isArray(data) ? data : (data.sagas ?? []);
    renderSagas(state.sagas);
  } catch (err) {
    tl.innerHTML = `
      <li class="state-error">
        <div class="state-error__icon">⚠️</div>
        <p>Erro ao carregar sagas.<br><small>${err.message}</small></p>
      </li>`;
  }
}

/* ════════════════════════════════════════════════════════════
   EVENT LISTENERS
   ════════════════════════════════════════════════════════════ */

function setupEvents() {
  /* ── Hamburger ── */
  const hamburger = $('hamburger');
  const nav       = $('nav');

  hamburger?.addEventListener('click', () => {
    const open = hamburger.classList.toggle('hamburger--open');
    nav.classList.toggle('nav--open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });

  qsa('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('hamburger--open');
      nav?.classList.remove('nav--open');
      hamburger?.setAttribute('aria-expanded', 'false');
    });
  });

  /* Fecha nav ao clicar fora */
  document.addEventListener('click', e => {
    if (nav?.classList.contains('nav--open') &&
        !nav.contains(e.target) &&
        !hamburger?.contains(e.target)) {
      hamburger?.classList.remove('hamburger--open');
      nav.classList.remove('nav--open');
      hamburger?.setAttribute('aria-expanded', 'false');
    }
  });

  /* ── Scroll: header + back-to-top + nav ativo ── */
  const header    = $('header');
  const backToTop = $('back-to-top');
  const sections  = ['characters', 'fruits', 'crews', 'sagas'];

  window.addEventListener('scroll', () => {
    const y = window.scrollY;

    header?.classList.toggle('header--scrolled', y > 40);

    if (backToTop) {
      const show = y > 400;
      backToTop.classList.toggle('back-to-top--visible', show);
      backToTop.hidden = !show;
    }

    const current = sections.find(id => {
      const el = $(id);
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top <= 90 && r.bottom > 90;
    });

    qsa('.nav__link').forEach(a => {
      a.classList.toggle('nav__link--active', a.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });

  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── Busca de personagens ── */
  $('character-search')?.addEventListener('input', e => {
    const q = e.target.value.trim().toLowerCase();
    const btn = $('load-more-characters');

    if (!q) {
      renderCharacters(state.characters.slice(0, state.charsPerPage));
      state.charPage = 1;
      if (btn) btn.hidden = state.characters.length <= state.charsPerPage;
      return;
    }

    const filtered = state.characters.filter(c =>
      (c.name  || '').toLowerCase().includes(q) ||
      (c.job   || '').toLowerCase().includes(q) ||
      (c.crew  || '').toLowerCase().includes(q)
    );
    renderCharacters(filtered);
    if (btn) btn.hidden = true;
  });

  /* ── Load more personagens ── */
  $('load-more-characters')?.addEventListener('click', () => {
    const start = state.charPage * state.charsPerPage;
    const slice = state.characters.slice(start, start + state.charsPerPage);
    const grid  = $('characters-grid');

    const frag = document.createDocumentFragment();
    slice.forEach(char => {
      const div = document.createElement('div');
      div.innerHTML = buildCharCard(char);
      frag.appendChild(div.firstElementChild);
    });
    grid.appendChild(frag);

    state.charPage++;
    observeFadeIn();

    const btn = $('load-more-characters');
    if (btn) btn.hidden = state.charPage * state.charsPerPage >= state.characters.length;
  });

  /* ── Filtros de frutas ── */
  qsa('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      qsa('.filter-btn').forEach(b => b.classList.remove('filter-btn--active'));
      btn.classList.add('filter-btn--active');

      const f = btn.dataset.filter;
      state.fruitFilter = f;
      const list = f === 'all' ? state.fruits : state.fruits.filter(fr => fr.type === f);
      renderFruits(list);
    });
  });
}

/* ════════════════════════════════════════════════════════════
   INIT
   ════════════════════════════════════════════════════════════ */

async function init() {
  setupFadeObserver();
  setupEvents();

  /* Carrega tudo em paralelo para melhor performance */
  await Promise.all([
    loadHeroStats(),
    loadCharacters(),
    loadFruits(),
    loadCrews(),
    loadSagas(),
  ]);
}

document.addEventListener('DOMContentLoaded', init);
