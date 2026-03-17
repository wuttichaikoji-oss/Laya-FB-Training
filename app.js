const state = {
  search: '',
  category: 'All',
  filter: 'all',
  selectedId: null,
  favorites: JSON.parse(localStorage.getItem('fnbFavorites') || '[]'),
  notes: JSON.parse(localStorage.getItem('fnbNotes') || '{}')
};

const el = {
  articleList: document.getElementById('articleList'),
  resultInfo: document.getElementById('resultInfo'),
  totalArticles: document.getElementById('totalArticles'),
  favoriteCount: document.getElementById('favoriteCount'),
  categoryFilters: document.getElementById('categoryFilters'),
  searchInput: document.getElementById('searchInput'),
  readerEmpty: document.getElementById('readerEmpty'),
  readerArticle: document.getElementById('readerArticle'),
  readerCategory: document.getElementById('readerCategory'),
  readerTitle: document.getElementById('readerTitle'),
  readerMeta: document.getElementById('readerMeta'),
  readerContent: document.getElementById('readerContent'),
  readerFavoriteBtn: document.getElementById('readerFavoriteBtn'),
  articleNote: document.getElementById('articleNote'),
  saveNoteBtn: document.getElementById('saveNoteBtn')
};

function getCategories() {
  return ['All', ...new Set(FNB_ARTICLES.map(a => a.category))];
}

function isFavorite(id) {
  return state.favorites.includes(id);
}

function toggleFavorite(id) {
  if (isFavorite(id)) {
    state.favorites = state.favorites.filter(item => item !== id);
  } else {
    state.favorites.push(id);
  }
  localStorage.setItem('fnbFavorites', JSON.stringify(state.favorites));
  renderStats();
  renderArticles();
  if (state.selectedId === id) renderReader(id);
}

function getFilteredArticles() {
  const q = state.search.trim().toLowerCase();
  return FNB_ARTICLES.filter(article => {
    const matchesCategory = state.category === 'All' || article.category === state.category;
    const matchesFavorite = state.filter === 'all' || isFavorite(article.id);
    const haystack = [article.title, article.summary, article.category, ...(article.tags || [])].join(' ').toLowerCase();
    const matchesSearch = !q || haystack.includes(q);
    return matchesCategory && matchesFavorite && matchesSearch;
  });
}

function renderStats() {
  el.totalArticles.textContent = FNB_ARTICLES.length;
  el.favoriteCount.textContent = state.favorites.length;
}

function renderCategoryFilters() {
  el.categoryFilters.innerHTML = getCategories().map(cat => `
    <button class="chip ${state.category === cat ? 'active' : ''}" data-category="${cat}">${cat}</button>
  `).join('');

  el.categoryFilters.querySelectorAll('[data-category]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.category = btn.dataset.category;
      renderCategoryFilters();
      renderArticles();
    });
  });
}

function renderArticles() {
  const articles = getFilteredArticles();
  el.resultInfo.textContent = `พบ ${articles.length} หัวข้อ`;

  if (!articles.length) {
    el.articleList.innerHTML = `<div class="empty-state"><div><h3>ไม่พบข้อมูล</h3><p>ลองเปลี่ยนคำค้นหาหรือหมวดหมู่</p></div></div>`;
    return;
  }

  el.articleList.innerHTML = articles.map(article => `
    <div class="article-card ${state.selectedId === article.id ? 'active' : ''}" data-id="${article.id}">
      <div class="article-top">
        <div>
          <span class="category-pill">${article.category}</span>
          <h3>${article.title}</h3>
        </div>
        <button class="favorite-btn" data-fav="${article.id}">${isFavorite(article.id) ? '★' : '☆'}</button>
      </div>
      <p class="article-summary">${article.summary}</p>
      <div class="article-tags">
        ${(article.tags || []).slice(0,4).map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
    </div>
  `).join('');

  el.articleList.querySelectorAll('.article-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('[data-fav]')) return;
      state.selectedId = card.dataset.id;
      renderArticles();
      renderReader(state.selectedId);
    });
  });

  el.articleList.querySelectorAll('[data-fav]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      toggleFavorite(btn.dataset.fav);
    });
  });
}

function renderReader(id) {
  const article = FNB_ARTICLES.find(a => a.id === id);
  if (!article) return;

  el.readerEmpty.classList.add('hidden');
  el.readerArticle.classList.remove('hidden');
  el.readerCategory.textContent = article.category;
  el.readerTitle.textContent = article.title;
  el.readerMeta.textContent = `${article.readTime} • แท็ก: ${(article.tags || []).join(', ')}`;
  el.readerContent.innerHTML = article.content;
  el.readerFavoriteBtn.textContent = isFavorite(id) ? '★' : '☆';
  el.articleNote.value = state.notes[id] || '';

  el.readerFavoriteBtn.onclick = () => toggleFavorite(id);
}

function saveNote() {
  if (!state.selectedId) return;
  state.notes[state.selectedId] = el.articleNote.value;
  localStorage.setItem('fnbNotes', JSON.stringify(state.notes));

  const notice = document.createElement('div');
  notice.className = 'notice';
  notice.textContent = 'บันทึกโน้ตเรียบร้อยแล้ว';
  el.readerContent.appendChild(notice);
  setTimeout(() => notice.remove(), 1800);
}

function setupEvents() {
  el.searchInput.addEventListener('input', () => {
    state.search = el.searchInput.value;
    renderArticles();
  });

  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.filter = btn.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderArticles();
    });
  });

  el.saveNoteBtn.addEventListener('click', saveNote);
}

function init() {
  renderStats();
  renderCategoryFilters();
  renderArticles();
  setupEvents();
}

init();
