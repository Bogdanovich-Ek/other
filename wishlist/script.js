'use strict';

/* ============================================================================
   ✏️  ВАШ СПИСОК ПОДАРКОВ — редактируйте прямо здесь!

   Как добавить пункт: скопируйте блок { ... } и поменяйте текст.
     name        — название подарка
     description — описание: какой именно (цвет, размер, модель, где купить)
     price       — примерная цена, например "до 3 000 ₽" (можно оставить "")
     link        — ссылка на магазин (можно оставить "")

   Личный комментарий на главной странице редактируется в файле index.html —
   ищите пометку «✏️ ВПИШИТЕ СВОЙ ТЕКСТ».

   После правок сохраните файл и запушьте изменения на GitHub.
   ⚠️ Если вы нажимали кнопки на сайте, список сохраняется в браузере
   (localStorage), и тогда правки кода не видны — нажмите «Сбросить список»
   внизу страницы, чтобы вернуться к варианту из этого файла.
============================================================================ */

const DEFAULT_GIFTS = [
  // ── Пример заполненного пункта (отредактируйте или удалите) ─────────────
  {
    name: 'Пример: беспроводные наушники',
    description:
      'Это пример заполнения. Напишите, что именно хотите: модель, цвет, ' +
      'комплектацию и где удобнее покупать.',
    price: 'до 12 000 ₽',
    link: '',
  },

  // ── Места для ваших пунктов — просто замените текст ниже ↓ ──────────────
  {
    name: 'Пункт 1 — впишите название',
    description: 'Место для описания: что за вещь и какой именно вариант вам хочется.',
    price: '',
    link: '',
  },
  {
    name: 'Пункт 2 — впишите название',
    description: 'Место для описания: что за вещь и какой именно вариант вам хочется.',
    price: '',
    link: '',
  },
  {
    name: 'Пункт 3 — впишите название',
    description: 'Место для описания: что за вещь и какой именно вариант вам хочется.',
    price: '',
    link: '',
  },
  {
    name: 'Пункт 4 — впишите название',
    description: 'Место для описания: что за вещь и какой именно вариант вам хочется.',
    price: '',
    link: '',
  },
];

/* ============================================================================
   Дальше идёт код сайта — обычно его менять не нужно.
============================================================================ */

const STORAGE_KEY = 'wishlist.gifts.v5';

const state = {
  gifts: [],
  editingId: null, // id пункта в режиме редактирования (null = добавление)
};

/* ── Элементы страницы ──────────────────────────────────────────────────── */

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
const fLink         = document.getElementById('fLink');
const cancelBtn     = document.getElementById('cancelBtn');
const toastEl       = document.getElementById('toast');

/* ── Утилиты ────────────────────────────────────────────────────────────── */

const esc = (value = '') =>
  String(value).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[ch]));

const newId = () =>
  (window.crypto && crypto.randomUUID)
    ? crypto.randomUUID()
    : 'id-' + Date.now() + '-' + Math.random().toString(36).slice(2);

// пропускаем только безопасные http(s)-ссылки
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

/* ── Загрузка и сохранение ──────────────────────────────────────────────── */

function loadGifts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn('Не удалось прочитать сохранённый список:', err);
  }
  // первый визит — берём список из кода выше
  return DEFAULT_GIFTS.map((gift) => ({ ...gift, id: newId() }));
}

function saveGifts() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.gifts));
  } catch (err) {
    console.warn('Не удалось сохранить список:', err);
  }
}

/* ── Отрисовка ──────────────────────────────────────────────────────────── */

function rowHTML(gift, index) {
  const url = gift.link ? safeUrl(gift.link) : null;
  const desc = gift.description
    ? esc(gift.description)
    : '<em>Описание пока не добавлено…</em>';
  const num = String(index + 1).padStart(2, '0');

  return `
    <article class="row" data-id="${esc(gift.id)}"
             style="animation-delay:${Math.min(index * 40, 320)}ms">
      <div class="row-num" aria-hidden="true">${num}</div>
      <div class="row-body">
        <h3 class="row-name">${esc(gift.name)}</h3>
        <p class="row-desc">${desc}</p>
        <div class="row-meta">
          ${gift.price ? `<span class="price-chip">${esc(gift.price)}</span>` : ''}
          ${url ? `<a class="shop-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer">Перейти ↗</a>` : ''}
        </div>
      </div>
      <div class="row-actions">
        <button type="button" class="mini-btn" data-action="edit">изм.</button>
        <button type="button" class="mini-btn" data-action="delete">удал.</button>
      </div>
    </article>`;
}

function render() {
  if (state.gifts.length === 0) {
    listEl.innerHTML = `
      <div class="empty">
        <span class="big" aria-hidden="true">///</span>
        <p>Список пуст. Добавьте пункт через кнопку ниже или впишите его в файле <b>script.js</b>.</p>
        <button type="button" class="btn-red" id="emptyAddBtn">＋ Добавить пункт</button>
      </div>`;
  } else {
    listEl.innerHTML = state.gifts.map(rowHTML).join('');
  }

  statsEl.innerHTML = `пунктов: <b>${state.gifts.length}</b>`;
}

/* ── Модальное окно ─────────────────────────────────────────────────────── */

function openModal(gift = null) {
  state.editingId = gift ? gift.id : null;
  modalTitle.textContent = gift ? 'Редактировать пункт' : 'Новый пункт';
  fName.value = gift ? gift.name : '';
  fDesc.value = gift ? gift.description || '' : '';
  fPrice.value = gift ? gift.price || '' : '';
  fLink.value = gift ? gift.link || '' : '';
  modalBackdrop.hidden = false;
  document.body.style.overflow = 'hidden'; // не прокручивать фон под окном
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
    link: fLink.value.trim(),
  };

  if (state.editingId) {
    const gift = state.gifts.find((g) => g.id === state.editingId);
    if (gift) Object.assign(gift, data);
    showToast('Изменения сохранены ✅');
  } else {
    state.gifts.push({ id: newId(), ...data });
    showToast('Пункт добавлен');
  }

  saveGifts();
  render();
  closeModal();
});

/* ── Действия на строках ────────────────────────────────────────────────── */

listEl.addEventListener('click', (event) => {
  if (event.target.closest('#emptyAddBtn')) {
    openModal();
    return;
  }

  const actionBtn = event.target.closest('[data-action]');
  if (!actionBtn) return;

  const row = actionBtn.closest('.row');
  const gift = state.gifts.find((g) => g.id === row.dataset.id);
  if (!gift) return;

  if (actionBtn.dataset.action === 'edit') {
    openModal(gift);
  } else if (actionBtn.dataset.action === 'delete') {
    if (confirm(`Удалить «${gift.name}» из списка?`)) {
      state.gifts = state.gifts.filter((g) => g.id !== gift.id);
      saveGifts();
      render();
      showToast('Пункт удалён');
    }
  }
});

/* ── Сброс ──────────────────────────────────────────────────────────────── */

resetBtn.addEventListener('click', () => {
  const message =
    'Сбросить список? Добавленное через сайт будет удалено, ' +
    'вернётся список из файла script.js.';
  if (!confirm(message)) return;
  localStorage.removeItem(STORAGE_KEY);
  state.gifts = loadGifts();
  render();
  showToast('Список сброшен');
});

/* ── Запуск ─────────────────────────────────────────────────────────────── */

state.gifts = loadGifts();
render();
