'use strict';

/* ============================================================================
   ✏️  YOUR WISHLIST — edit it right here!

   To add an item: copy a { ... } block and change the text.
     name        — the gift name
     description — which exactly you want (color, size, model, where to buy)
     price       — rough price, e.g. "up to $150" (or leave "")
     links       — shop links, as many as you like:
                   links: [
                     { name: 'Ozon', url: 'https://…' },
                     { name: 'WB',   url: 'https://…' },
                   ],
                   or plain strings without names:
                   links: ['https://…', 'https://…']
                   (or leave empty: links: [])

   ⚠️ CAREFUL WITH PUNCTUATION INSIDE THE BLOCKS:
   — every line inside a block ends with a COMMA, except before a closing }
   — a long description is glued from pieces with  +  at the end of a line
     (a piece must end with a quote, then +, then the next piece in quotes)
   — objects in the links list are separated by commas

   Item background photos live in the wishlist folder (as uploaded to
   GitHub) — they are assigned to items in order and cycle around.

   The personal comment on the main page is edited in index.html —
   look for the «✏️ WRITE YOUR TEXT» mark.

   🔒 Editing is yours only: guests don't see the buttons. The owner
   password is set in ADMIN_PASSWORD below — make sure to replace it.
   Note: this hides the buttons, it's not real protection — the site code
   is public, a tech-savvy guest will find the password.

   After editing save the file and push it to GitHub.
   ⚠️ If you used the buttons on the site, the list is stored in the
   browser (localStorage) and code edits won't be visible — press
   «reset the list» in the page footer to get back to this file's version.
============================================================================ */

// 🔒 owner password — make sure to replace it with your own
const ADMIN_PASSWORD = 'reputation';

const DEFAULT_GIFTS = [
  // ── Option 1 — Jewelry ───────────────────────────────────────────────────
  {
    name: 'Option 1 — Jewelry',
    description:
      'Возвращаю эпоху змеиных украшений, тем более тут появилось много новых красивых\n' +
      'Кольца: 17.0\n' +
      'Вообще, я все из этих предложенных хочу купить — будет круто, ' +
      'если поможете сократить этот список)',
    price: '72 - 268 BYN',
    links: [
      { name: 'ORO', url: 'https://oro.by/katalog/kolca/00624-10-090401-00-silver' },
      { name: 'Ziko', url: 'https://ziko.by/catalog/koltsa/koltso-02101625/' },
      { name: 'Ziko', url: 'https://ziko.by/catalog/sergi/sergi-03101625/' },
      { name: 'ORO', url: 'https://oro.by/katalog/kolca/00011-10-090101-00-silver' },
      { name: 'Ziko', url: 'https://ziko.by/catalog/brasleti/braslet-06401625/' },
    ],
  },

  // ── Option 2 — Perfume ───────────────────────────────────────────────────
  {
    name: 'Option 2 — Perfume',
    description:
      'Я определенно стала парфюмерным маньяком и наркоманом. На данный момент ' +
      'мой любимый Dark Vinyl Musk. Полнообъемные они стоят как почка, так что ' +
      'можете любой объем подарить (можно 3, 5, 8, 10, 15, 50 мл) — на сколько не жалко\n' +
      'Я еще хотела попробовать Amouage Lyric Woman, но я вообще забылась в ' +
      'оффлайн магазине и купила 5 других. Этот точно маленький объем попробовать ' +
      '(а полный объем стоит уже как крыло самолета))\n' +
      'Вообще, я буду очень рада каким-то другим духам. Можете подобрать по моему ' +
      'вайбу — какой-нибудь набор малообъемных или одни определенные. Только ' +
      'типичные женские я не особо люблю, в основном мне нравятся унисекс или нетипичные\n' +
      'Как вариант можно еще просто сертификат. Магазин, который я прикрепила, ' +
      'очень хороший — по моему опыту, самые выгодные цены и большой выбор',
    price: '39 - 463 BYN',
    links: [
      { name: 'favorite', url: 'https://www.parfumeria.by/?id=Parfum-Bohoboco-Dark-Vinyl-Musk-Perfume' },
      { name: 'try', url: 'https://www.parfumeria.by/?id=10838' },
    ],
  },

  // ── Option 3 — Mercy ─────────────────────────────────────────────────────
  {
    name: 'Option 3 — Mercy',
    description:
      'Немного мемный пункт) Чего еще просить на 20-летие… У меня просто минимум ' +
      'три врача, к которым я хожу постоянно в клинике «Мерси». Я видела, что там ' +
      'есть сертификаты на сумму 50, 100, 150 и т.д. Очень неплохой вариант',
    price: '50 - 200 BYN',
    links: [
      { name: 'Mersy', url: 'https://mercimed.by/search/?q=%D1%81%D0%B5%D1%80%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%82&btn-search=' },
    ],
  },

  // ── Option 4 — Clothes ───────────────────────────────────────────────────
  {
    name: 'Option 4 — Clothes',
    description:
      'Одежды много не бывает, тем более я вернулась к своим любимым шоурумам. ' +
      'Сертификаты туда можно',
    price: 'ND',
    links: [
      { name: '9.22', url: 'https://922.by/' },
      { name: 'CODI', url: 'https://codi.by/' },
      { name: 'MUA', url: 'https://mua.shop/' },
    ],
  },

  // ── Option 5 — Cosmetics ─────────────────────────────────────────────────
  {
    name: 'Option 5 — Cosmetics',
    description:
      'Теперь мне нужно много и уходовой косметики, и декоративной. Можно ' +
      'сертификат в один из прикрепленных магазинов\n' +
      'А еще мне очень нужны косметички. Их много не бывает — на свой выбор ' +
      'какую-нибудь можно',
    price: 'ND',
    links: [
      { name: 'golden apple', url: 'https://goldapple.by/?srsltid=AU7gw4VgmwWpaC_uhE5P52y59VbqswIpyJySe7ZV9pqtdVml6b0JUd-r' },
      { name: 'asiashop', url: 'https://asiashop.by/spets-tsena/podarochnyj-sertifikat' },
      { name: 'missha', url: 'https://misshacosmetics.by/podarochnye_sertifikaty-23895-s/' },
    ],
  },

  // ── Option 6 — WB ────────────────────────────────────────────────────────
  {
    name: 'Option 6 — WB',
    description:
      'Тут подборка нужных вещей с WB, это примеры вещей, которые нужны: плед, ' +
      'подставка под пластинки и под все остальное на полки\n' +
      'А вот светильник-кот — не пример, это просто имба, которую я очень хочу)',
    price: 'ND - 168 BYN',
    links: [
      { name: 'Cat', url: 'https://www.wildberries.by/catalog/179233395/detail.aspx' },
      { name: 'Rack', url: 'https://www.wildberries.by/catalog/978110353/detail.aspx' },
      { name: 'Rack', url: 'https://www.wildberries.by/catalog/848499659/detail.aspx' },
      { name: 'Rug', url: 'https://www.wildberries.by/catalog/44371793/detail.aspx' },
    ],
  },

  // ── Option 7 — Vinyl ─────────────────────────────────────────────────────
  {
    name: 'Option 7 — Vinyl',
    description:
      'Хочу винил. Я заказала один — это вызывает привыкание. Если захотите, ' +
      'то именно винил, а не CD\n' +
      'Из желаемого:\n' +
      '— Taylor Swift: любой альбом после 2017 включительно, без последнего\n' +
      '— Bad Omens: «The Death Of Peace Of Mind» — уже нашла, ссылки ниже',
    price: '200+ BYN',
    links: [
      { name: 'Bad Omens — DOPOM', url: 'https://ozon.by/product/eksklyuzivnyy-vinil-bad-omens-death-of-peace-of-mind-v-serebristom-oformlenii-lpsan-5616580466/?at=1sSo1QmuzwRykESV5hRH82Vr0SBRoYaS&sh=zWMzu8rkEg' },
      { name: 'Taylor Swift — folklore', url: 'https://ozon.by/product/vinilovaya-plastinka-taylor-swift-folklore-beige-2lp-album-3695909052/?at=1sSo1S5DrmqSZFc53hfFcSuBkXE5ERpF&sh=zWMzu1Y3-w' },
    ],
  },

  // ── Option 8 — Everything for training ───────────────────────────────────
  {
    name: 'Option 8 — Everything for training',
    description:
      'Последнее, но точно не последнее по значимости (да вообще почти первое) — ' +
      'это мои тренировки. Идеальный для меня подарок — подарочный абонемент. ' +
      'Тут я уже не шарю: можно полный купить на какой-то срок, я видела еще ' +
      'абонементы со скидкой 50%. Это нужно спрашивать в тг лучше, и потом просто ' +
      'прийти по адресу, чтобы тренер подписал. Скажите, что мне) Интересно, что ' +
      'скажет. Если будете брать, то берите на 3 занятия в неделю или безлимит ' +
      'на какой-то срок (но это дороговато)\n' +
      'Еще можно мне сертификат в магазин, где именно снаряжение для единоборств ' +
      'есть. Мне, например, неплохо бы поменять перчатки и закупиться всевозможной защитой',
    price: 'ND',
    links: [
      { name: 'Personal Safety Academy', url: 'https://kravmagabelarus.by/' },
    ],
  },
];

/* ============================================================================
   The rest is site code — normally you don't need to change it.
============================================================================ */

const STORAGE_KEY = 'wishlist.gifts.v7';
const ADMIN_KEY = 'wishlist.admin'; // «owner mode» flag in the browser

// фоны пунктов — прямые ссылки на фото в хранилище репозитория
const ITEM_PHOTOS = [
  'https://raw.githubusercontent.com/Bogdanovich-Ek/other/main/wishlist/ARE%20YOU%20READY%20FOR%20IT%E2%80%A6%E2%80%A6_.jpeg',                   // кольцо-змейка
  'https://raw.githubusercontent.com/Bogdanovich-Ek/other/main/wishlist/reputation%20%E2%80%94%20taylor%20swift%20%E2%80%94%20aesthetic.jpeg',  // питон
  'https://raw.githubusercontent.com/Bogdanovich-Ek/other/main/wishlist/-%20reputation.jpeg',                                                   // газеты
  'https://raw.githubusercontent.com/Bogdanovich-Ek/other/main/wishlist/taylor%20swift%20_%20reputation%20aesthetic.jpeg',                      // конфетти
  'https://raw.githubusercontent.com/Bogdanovich-Ek/other/main/wishlist/reputation%20%E2%80%98taylor%20swift%E2%80%99%20aesthetic.jpeg',        // губы
  'https://raw.githubusercontent.com/Bogdanovich-Ek/other/main/wishlist/reputation%20_%20taylor%20swift.jpeg',                                  // котик
  'https://raw.githubusercontent.com/Bogdanovich-Ek/other/main/wishlist/cr_%20boowonie%20_%20use%20credits.%20%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D0%B9%D1%82%D0%B5%20%D0%BA%D1%80%D0%B5%D0%B4%D0%B8%D1%82%D1%8B%2C%20%D0%B5%D1%81%D0%BB%D0%B8%20%D1%80%D0%B5%D0%BF%D0%BE%D1%81%D1%82%D0%B8%D1%82%D0%B5%2C%20%D1%82%D0%BA%20%D1%84%D0%BE%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D0%B8_%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8%20%D0%BC%D0%BE%D0%B8', // винил
  'https://raw.githubusercontent.com/Bogdanovich-Ek/other/main/wishlist/eli%20king.jpeg',                                                       // боксёрский зал
];

const state = {
  gifts: [],
  editingId: null, // id of the item being edited (null = adding a new one)
  admin: false,    // true — owner mode is on, buttons are visible
};

/* ── Page elements ──────────────────────────────────────────────────────── */

const listEl        = document.getElementById('giftList');
const statsEl       = document.getElementById('stats');
const resetBtn      = document.getElementById('resetBtn');
const addBtn        = document.getElementById('addBtn');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalTitle    = document.getElementById('modalTitle');
const form          = document.getElementById('giftForm');
const fName         = document.getElementById('fName');
const fDesc         = document.getElementById('fDesc');
const fPrice        = document.getElementById('fPrice');
const linksEditor   = document.getElementById('linksEditor');
const addLinkBtn    = document.getElementById('addLinkBtn');
const cancelBtn     = document.getElementById('cancelBtn');
const ownerBtn      = document.getElementById('ownerBtn');
const ownerForm     = document.getElementById('ownerForm');
const ownerPass     = document.getElementById('ownerPass');
const ownerEnter    = document.getElementById('ownerEnter');
const toastEl       = document.getElementById('toast');

/* ── Helpers ────────────────────────────────────────────────────────────── */

const esc = (value = '') =>
  String(value).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[ch]));

const newId = () =>
  (window.crypto && crypto.randomUUID)
    ? crypto.randomUUID()
    : 'id-' + Date.now() + '-' + Math.random().toString(36).slice(2);

// allow only safe http(s) links
function safeUrl(raw) {
  try {
    const url = new URL(raw, location.href);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : null;
  } catch {
    return null;
  }
}

let toastTimer = null;
function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
}

/* ── Load and save ──────────────────────────────────────────────────────── */

function loadGifts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn('Could not read the saved list:', err);
  }
  // first visit — take the list from the code above
  return DEFAULT_GIFTS.map((gift) => ({ ...gift, id: newId() }));
}

function saveGifts() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.gifts));
  } catch (err) {
    console.warn('Could not save the list:', err);
  }
}

/* ── Rendering ──────────────────────────────────────────────────────────── */

// item links: both the new format (links array) and the old one (single link)
function normalizeLinks(gift) {
  if (Array.isArray(gift.links)) return gift.links;
  return gift.link ? [gift.link] : [];
}

function linksHTML(gift) {
  return normalizeLinks(gift).map((item) => {
    const isObject = item && typeof item === 'object';
    const url = safeUrl(isObject ? item.url : item);
    if (!url) return '';
    const label = isObject && item.name ? item.name : 'open';
    return `<a class="shop-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`;
  }).join('');
}

function rowHTML(gift, index) {
  const desc = gift.description
    ? esc(gift.description)
    : '<em>No description yet…</em>';
  // each item has its own photo backdrop; photos cycle through ITEM_PHOTOS
  const photo = ITEM_PHOTOS[index % ITEM_PHOTOS.length];

  return `
    <article class="screen item" data-id="${esc(gift.id)}" style="--photo:url('${photo}')">
      <div class="item-inner">
        <div class="row-top">
          <span class="item-no">no. ${index + 1}</span>
          <div class="row-actions">
            <button type="button" class="mini-btn" data-action="edit" title="Edit" aria-label="Edit">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
            </button>
            <button type="button" class="mini-btn" data-action="delete" title="Delete" aria-label="Delete">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14"/></svg>
            </button>
          </div>
        </div>
        <h3 class="row-name">${esc(gift.name)}</h3>
        <p class="row-desc">${desc}</p>
        <div class="row-meta">
          ${gift.price ? `<span class="price-chip">${esc(gift.price)}</span>` : ''}
          ${linksHTML(gift)}
        </div>
      </div>
    </article>`;
}

function render() {
  if (state.gifts.length === 0) {
    listEl.innerHTML = `
      <div class="empty">
        <span class="big" aria-hidden="true">///</span>
        <p>The list is empty. Add an item with the button below or edit <b>script.js</b>.</p>
        <button type="button" class="btn-gold" id="emptyAddBtn">＋ add item</button>
      </div>`;
  } else {
    listEl.innerHTML = state.gifts.map(rowHTML).join('');
  }

  statsEl.innerHTML = `items: <b>${state.gifts.length}</b>`;
}

/* ── Modal ──────────────────────────────────────────────────────────────── */

// одна строка редактора ссылок: [название] [адрес] [✕]
function addLinkRow(name = '', url = '') {
  const row = document.createElement('div');
  row.className = 'link-row';
  row.innerHTML = `
    <input class="link-name" maxlength="30" placeholder="Name (e.g. Ozon)">
    <input class="link-url" type="url" placeholder="https://…">
    <button type="button" class="link-remove" title="Remove link" aria-label="Remove link">✕</button>`;
  row.querySelector('.link-name').value = name;
  row.querySelector('.link-url').value = url;
  linksEditor.appendChild(row);
}

function buildLinksEditor(gift = null) {
  linksEditor.innerHTML = '';
  const links = gift ? normalizeLinks(gift) : [];
  const list = links.length ? links : [''];
  list.forEach((item) => {
    const isObject = item && typeof item === 'object';
    addLinkRow(isObject ? item.name || '' : '', isObject ? item.url || '' : item || '');
  });
}

function collectLinks() {
  return [...linksEditor.querySelectorAll('.link-row')]
    .map((row) => ({
      name: row.querySelector('.link-name').value.trim(),
      url: row.querySelector('.link-url').value.trim(),
    }))
    .filter((link) => link.url);
}

linksEditor.addEventListener('click', (event) => {
  const btn = event.target.closest('.link-remove');
  if (btn) btn.closest('.link-row').remove();
});

addLinkBtn.addEventListener('click', () => {
  addLinkRow();
  linksEditor.lastElementChild.querySelector('.link-url').focus();
});

function openModal(gift = null) {
  state.editingId = gift ? gift.id : null;
  modalTitle.textContent = gift ? 'edit item' : 'new item';
  fName.value = gift ? gift.name : '';
  fDesc.value = gift ? gift.description || '' : '';
  fPrice.value = gift ? gift.price || '' : '';
  buildLinksEditor(gift);
  modalBackdrop.hidden = false;
  document.body.style.overflow = 'hidden'; // keep the background from scrolling
  fName.focus();
}

function closeModal() {
  modalBackdrop.hidden = true;
  document.body.style.overflow = '';
  state.editingId = null;
  form.reset();
}

addBtn.addEventListener('click', () => openModal());
cancelBtn.addEventListener('click', closeModal);

modalBackdrop.addEventListener('click', (event) => {
  if (event.target === modalBackdrop) closeModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modalBackdrop.hidden) closeModal();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = fName.value.trim();
  if (!name) {
    fName.focus();
    return;
  }

  const data = {
    name,
    description: fDesc.value.trim(),
    price: fPrice.value.trim(),
    links: collectLinks(),
    link: '', // the old single-link field, kept empty
  };

  if (state.editingId) {
    const gift = state.gifts.find((g) => g.id === state.editingId);
    if (gift) Object.assign(gift, data);
    showToast('Changes saved ✅');
  } else {
    state.gifts.push({ id: newId(), ...data });
    showToast('Item added');
  }

  saveGifts();
  render();
  closeModal();
});

/* ── Item actions ───────────────────────────────────────────────────────── */

listEl.addEventListener('click', (event) => {
  if (event.target.closest('#emptyAddBtn')) {
    openModal();
    return;
  }

  const actionBtn = event.target.closest('[data-action]');
  if (!actionBtn) return;

  const row = actionBtn.closest('.item');
  const gift = state.gifts.find((g) => g.id === row.dataset.id);
  if (!gift) return;

  if (actionBtn.dataset.action === 'edit') {
    openModal(gift);
  } else if (actionBtn.dataset.action === 'delete') {
    if (confirm(`Delete "${gift.name}" from the list?`)) {
      state.gifts = state.gifts.filter((g) => g.id !== gift.id);
      saveGifts();
      render();
      showToast('Item deleted');
    }
  }
});

/* ── Owner mode ─────────────────────────────────────────────────────────── */

function applyAdmin() {
  document.body.classList.toggle('is-admin', state.admin);
  ownerForm.hidden = state.admin; // hide the password form when unlocked
}

ownerBtn.addEventListener('click', () => {
  if (state.admin) {
    state.admin = false;
    localStorage.removeItem(ADMIN_KEY);
    applyAdmin();
    showToast('Owner mode off');
    return;
  }
  ownerForm.hidden = !ownerForm.hidden;
  if (!ownerForm.hidden) ownerPass.focus();
});

function tryUnlock() {
  if (ownerPass.value === ADMIN_PASSWORD) {
    state.admin = true;
    localStorage.setItem(ADMIN_KEY, '1');
    ownerPass.value = '';
    applyAdmin();
    showToast('Owner mode on ✅');
  } else {
    ownerPass.value = '';
    ownerPass.focus();
    showToast('Wrong password');
  }
}

ownerEnter.addEventListener('click', tryUnlock);
ownerPass.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') tryUnlock();
});

/* ── Reset ──────────────────────────────────────────────────────────────── */

resetBtn.addEventListener('click', () => {
  const message =
    'Reset the list? Everything added via the site will be removed ' +
    'and the list from script.js will come back.';
  if (!confirm(message)) return;
  localStorage.removeItem(STORAGE_KEY);
  state.gifts = loadGifts();
  render();
  showToast('List reset');
});

/* ── Start ──────────────────────────────────────────────────────────────── */

state.gifts = loadGifts();
state.admin = localStorage.getItem(ADMIN_KEY) === '1';
applyAdmin();
render();

