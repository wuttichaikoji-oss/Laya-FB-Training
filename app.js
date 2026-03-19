const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAaiMSOeGDahZuVDqWhgeuSHBf129wXv6g",
  authDomain: "laya-training.firebaseapp.com",
  projectId: "laya-training",
  storageBucket: "laya-training.firebasestorage.app",
  messagingSenderId: "843807988908",
  appId: "1:843807988908:web:cda1a814a2bcb41c4a9309",
  measurementId: "G-QB481YNZCJ"
};

firebase.initializeApp(FIREBASE_CONFIG);
const auth = firebase.auth();
const db = firebase.firestore();

const lessons = window.LESSONS_DATA || [];
const ENGLISH_DATA = window.ENGLISH_DATA || {};
const WINE_MEDIA = window.WINE_MEDIA || [];
const ENGLISH_ORDER = ['restaurant', 'vegetables', 'fruits', 'orders', 'greeting'];

const defaultUserData = () => ({
  done: [],
  favorites: [],
  notes: {},
  progress: {},
  englishProgress: {}
});

const state = {
  mode: 'login',
  user: null,
  isDemo: false,
  userData: defaultUserData(),
  currentLessonId: null,
  filter: 'All',
  search: '',
  englishTab: 'restaurant',
  englishSearch: '',
  saveTimer: null,
  saving: false
};

const el = id => document.getElementById(id);
const authView = el('authView');
const mainView = el('mainView');
const lessonGrid = el('lessonGrid');
const readerSection = el('readerSection');
const listSection = el('listSection');
const backBtn = el('backBtn');

function safeHTML(text) {
  return String(text ?? '').replace(/[&<>"']/g, s => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[s]));
}

function lessonCats() {
  return ['All', ...Array.from(new Set(lessons.map(l => l.category || 'General'))).sort()];
}

function mergeUserData(raw = {}) {
  const merged = defaultUserData();
  merged.done = Array.isArray(raw.done) ? raw.done : [];
  merged.favorites = Array.isArray(raw.favorites) ? raw.favorites : [];
  merged.notes = raw.notes && typeof raw.notes === 'object' ? raw.notes : {};
  merged.progress = raw.progress && typeof raw.progress === 'object' ? raw.progress : {};
  merged.englishProgress = raw.englishProgress && typeof raw.englishProgress === 'object' ? raw.englishProgress : {};

  merged.done.forEach(id => {
    merged.progress[id] ||= {};
    merged.progress[id].completed = true;
  });
  merged.favorites.forEach(id => {
    merged.progress[id] ||= {};
    merged.progress[id].favorite = true;
  });
  return merged;
}

function setAuthMode(mode) {
  state.mode = mode;
  document.querySelectorAll('.auth-tabs .tab').forEach(btn => btn.classList.toggle('active', btn.dataset.mode === mode));
  el('nameWrap').classList.toggle('hidden', mode !== 'register');
  el('authSubmit').textContent = mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครผู้ใช้ใหม่';
  el('authMsg').textContent = '';
}

document.querySelectorAll('.auth-tabs .tab').forEach(btn => btn.addEventListener('click', () => setAuthMode(btn.dataset.mode)));

async function saveUserData(immediate = false) {
  if (state.saveTimer) {
    clearTimeout(state.saveTimer);
    state.saveTimer = null;
  }
  const doSave = async () => {
    if (state.saving) return;
    state.saving = true;
    try {
      if (state.isDemo) {
        localStorage.setItem('laya_demo_user_data', JSON.stringify(state.userData));
      } else if (state.user) {
        await db.collection('users').doc(state.user.uid).set({
          email: state.user.email || '',
          displayName: state.user.displayName || '',
          done: state.userData.done,
          favorites: state.userData.favorites,
          notes: state.userData.notes,
          progress: state.userData.progress,
          englishProgress: state.userData.englishProgress,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      }
    } finally {
      state.saving = false;
      updateHeader();
    }
  };

  if (immediate) return doSave();
  state.saveTimer = setTimeout(doSave, 500);
}

async function loadUserData() {
  if (state.isDemo) {
    state.userData = mergeUserData(JSON.parse(localStorage.getItem('laya_demo_user_data') || '{}'));
    return;
  }
  if (!state.user) return;
  const snap = await db.collection('users').doc(state.user.uid).get();
  state.userData = mergeUserData(snap.exists ? snap.data() : {});
}

function updateHeader() {
  const name = state.isDemo ? 'Demo User' : (state.user?.displayName || state.user?.email || 'พนักงาน');
  el('welcomeName').textContent = name;
  el('doneCount').textContent = (state.userData.done || []).length;
  el('favCount').textContent = (state.userData.favorites || []).length;
  const sync = el('syncStatus');
  if (sync) sync.textContent = state.isDemo ? 'บันทึกในเครื่องนี้' : 'บันทึกในบัญชี Firebase';
}

function lessonProgress(id) {
  state.userData.progress[id] ||= { openedCount: 0, completed: false, favorite: false };
  return state.userData.progress[id];
}

function englishProgress(tab) {
  state.userData.englishProgress[tab] ||= { openedCount: 0, completed: false };
  return state.userData.englishProgress[tab];
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('th-TH', { day: '2-digit', month: 'short', year: '2-digit' }) + ' ' +
    d.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
}

function renderChips() {
  const wrap = el('filterChips');
  wrap.innerHTML = '';
  lessonCats().forEach(cat => {
    const b = document.createElement('button');
    b.className = 'chip' + (state.filter === cat ? ' active' : '');
    b.textContent = cat;
    b.onclick = () => { state.filter = cat; renderLessons(); };
    wrap.appendChild(b);
  });
}

function matchesLesson(lesson) {
  const q = state.search.trim().toLowerCase();
  const catOK = state.filter === 'All' || (lesson.category || 'General') === state.filter;
  const hay = `${lesson.title} ${lesson.summary} ${lesson.category || ''}`.toLowerCase();
  return catOK && (!q || hay.includes(q));
}

function renderLessons() {
  updateHeader();
  renderChips();
  lessonGrid.innerHTML = '';

  lessons.filter(matchesLesson).forEach(lesson => {
    const card = document.createElement('article');
    card.className = 'card';
    const prog = lessonProgress(lesson.id);
    const done = !!prog.completed;
    const fav = !!prog.favorite;
    const extra = prog.lastOpenedAt ? `เปิดล่าสุด ${formatDate(prog.lastOpenedAt)}` : 'ยังไม่เคยเปิด';

    card.innerHTML = `
      <div class="tag-row">
        <span class="tag">${safeHTML(lesson.category || 'General')}</span>
        <span class="tag">${safeHTML(lesson.level || 'Core')}</span>
        ${done ? '<span class="tag success-tag">อ่านจบแล้ว</span>' : ''}
      </div>
      <div>
        <h3>${safeHTML(lesson.title)}</h3>
        <p>${safeHTML(lesson.summary || '')}</p>
      </div>
      <div class="mini-meta">${safeHTML(extra)} · เปิด ${prog.openedCount || 0} ครั้ง</div>
      <div class="card-actions">
        <button class="primary-btn open-btn">เปิดอ่าน</button>
        <button class="icon-btn fav-btn">${fav ? '★ โปรด' : '☆ โปรด'}</button>
      </div>
    `;

    card.querySelector('.open-btn').onclick = () => openLesson(lesson.id);
    card.querySelector('.fav-btn').onclick = async () => {
      prog.favorite = !fav;
      prog.favoriteAt = prog.favorite ? new Date().toISOString() : null;
      state.userData.favorites = prog.favorite
        ? Array.from(new Set([...state.userData.favorites, lesson.id]))
        : state.userData.favorites.filter(x => x !== lesson.id);
      await saveUserData(true);
      renderLessons();
    };
    lessonGrid.appendChild(card);
  });
}

function noteValue(id) { return state.userData.notes[id] || ''; }

function speak(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
}

function englishTabTitle(key) {
  const map = {
    restaurant: '1. คำศัพท์ในร้านอาหาร',
    vegetables: '2. คำศัพท์ผัก',
    fruits: '3. คำศัพท์ผลไม้',
    orders: '4. คำศัพท์รับออเดอร์',
    greeting: '5. คำศัพท์พูดคุย / ทักทาย'
  };
  return map[key] || key;
}

function filteredEnglishItems(tab) {
  const items = (ENGLISH_DATA[tab]?.items || []);
  const q = state.englishSearch.trim().toLowerCase();
  if (!q) return items;
  return items.filter(item => (`${item.term} ${item.reading} ${item.meaning}`).toLowerCase().includes(q));
}

function renderEnglishPack() {
  const key = state.englishTab in ENGLISH_DATA ? state.englishTab : 'restaurant';
  const cat = ENGLISH_DATA[key] || { items: [] };
  const prog = englishProgress(key);
  const rows = filteredEnglishItems(key).map(item => `
    <div class="vocab-row">
      <div class="vocab-main">
        <div class="vocab-term">${safeHTML(item.term)}</div>
        <div class="vocab-sub">${safeHTML(item.reading)} · ${safeHTML(item.meaning)}</div>
      </div>
      <button class="speak-btn" data-speak="${safeHTML(item.term)}">🔊 ฟัง</button>
    </div>
  `).join('');

  return `
    <section class="english-panel">
      <div class="english-hero">
        <div>
          <h3>English: F&B</h3>
          <p class="small">แยกเป็น 5 แท็บย่อย เปิดอ่านง่ายขึ้น ค้นหาในแท็บได้ และมีปุ่มฟังเสียงทุกคำ</p>
        </div>
        <div class="english-progress-box">
          <div><strong>${cat.items.length}</strong><span>คำในหมวดนี้</span></div>
          <div><strong>${prog.openedCount || 0}</strong><span>เปิดอ่าน</span></div>
          <div><strong>${prog.completed ? 'ครบ' : 'ยังไม่จบ'}</strong><span>สถานะ</span></div>
        </div>
      </div>

      <div class="english-tabs-wrap">
        ${ENGLISH_ORDER.map(tab => {
          const tp = englishProgress(tab);
          return `<button class="english-tab ${tab === key ? 'active' : ''}" data-etab="${tab}">${safeHTML(englishTabTitle(tab))}${tp.completed ? ' ✓' : ''}</button>`;
        }).join('')}
      </div>

      <div class="english-toolbar">
        <div class="english-tab-title">${safeHTML(cat.title || englishTabTitle(key))}</div>
        <input id="englishSearchInput" class="search english-search" type="search" placeholder="ค้นคำศัพท์ในแท็บนี้" value="${safeHTML(state.englishSearch)}">
      </div>

      <div class="vocab-list">${rows || '<div class="empty-box">ไม่พบคำศัพท์ที่ค้นหา</div>'}</div>

      <div class="english-footer-row">
        <div class="mini-meta">${prog.lastOpenedAt ? 'เปิดล่าสุด ' + safeHTML(formatDate(prog.lastOpenedAt)) : 'ยังไม่มีประวัติการเปิดในแท็บนี้'}</div>
        <button id="englishDoneBtn" class="ghost-btn">${prog.completed ? 'ยกเลิกอ่านจบแท็บนี้' : 'ทำเครื่องหมายว่าอ่านจบแท็บนี้'}</button>
      </div>
    </section>
  `;
}

function renderSections(lesson) {
  const sections = (lesson.sections || []).map(section => `
    <section class="section-box">
      <h3>${safeHTML(section.title)}</h3>
      <ul>${(section.items || []).map(item => `<li>${safeHTML(item)}</li>`).join('')}</ul>
    </section>
  `).join('');
  return sections;
}

function renderTips(lesson) {
  if (!lesson.tips?.length) return '';
  return `
    <section class="section-box tips">
      <h3>Key Takeaways / Tips</h3>
      <ul>${lesson.tips.map(item => `<li>${safeHTML(item)}</li>`).join('')}</ul>
    </section>
  `;
}

function renderWineMedia() {
  return `
    <section class="wine-box wine-media-box">
      <div class="wine-head">
        <div>
          <h3>Wine Reference Bottles</h3>
          <p class="small">รวมรูปขวดจริงของไวน์หลักในรายการ เพื่อให้พนักงานจำฉลากและขวดได้ง่ายขึ้น</p>
        </div>
      </div>
      <div class="wine-grid">
        ${WINE_MEDIA.map(w => `
          <article class="wine-card">
            <div class="wine-thumb-wrap">
              <img src="${safeHTML(w.image)}" alt="${safeHTML(w.name)}" loading="lazy">
            </div>
            <div class="wine-content">
              <h4>${safeHTML(w.name)}</h4>
              <p><strong>คำอ่าน:</strong> ${safeHTML(w.pronunciation)}</p>
              <p><strong>ประเภท:</strong> ${safeHTML(w.category)} · ${safeHTML(w.vintage)}</p>
              <p><strong>รสชาติ:</strong> ${safeHTML(w.taste)}</p>
              <p><strong>จับคู่:</strong> ${safeHTML(w.pair)}</p>
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function recordLessonOpen(id) {
  const prog = lessonProgress(id);
  prog.openedCount = (prog.openedCount || 0) + 1;
  prog.lastOpenedAt = new Date().toISOString();
  saveUserData(false);
}

function recordEnglishOpen(tab) {
  const prog = englishProgress(tab);
  prog.openedCount = (prog.openedCount || 0) + 1;
  prog.lastOpenedAt = new Date().toISOString();
  saveUserData(false);
}

function openLesson(id, opts = {}) {
  const lesson = lessons.find(l => l.id === id);
  if (!lesson) return;
  if (!opts.keepEnglishSearch) state.englishSearch = '';
  state.currentLessonId = id;
  recordLessonOpen(id);
  if (lesson.type === 'english-pack') recordEnglishOpen(state.englishTab);

  const prog = lessonProgress(id);
  const note = noteValue(id);
  const isDone = !!prog.completed;
  const isFav = !!prog.favorite;

  listSection.classList.add('hidden');
  readerSection.classList.remove('hidden');
  backBtn.classList.remove('hidden');

  readerSection.innerHTML = `
    <article class="reader-card">
      <div class="reader-head">
        <div class="tag-row">
          <span class="tag">${safeHTML(lesson.category || 'General')}</span>
          <span class="tag">${safeHTML(lesson.level || 'Core')}</span>
          ${isDone ? '<span class="tag success-tag">อ่านจบแล้ว</span>' : ''}
          ${isFav ? '<span class="tag fav-tag">รายการโปรด</span>' : ''}
        </div>
        <h1>${safeHTML(lesson.title)}</h1>
        <p>${safeHTML(lesson.summary || '')}</p>
      </div>

      <div class="reader-meta-row">
        <div class="mini-meta">เปิด ${prog.openedCount || 0} ครั้ง · ${prog.lastOpenedAt ? 'ล่าสุด ' + safeHTML(formatDate(prog.lastOpenedAt)) : 'ยังไม่มีประวัติ'}</div>
      </div>

      ${lesson.type === 'english-pack' ? renderEnglishPack() : renderSections(lesson)}
      ${lesson.id === 'wine-basic' ? renderWineMedia() : ''}
      ${lesson.type === 'english-pack' ? '' : renderTips(lesson)}

      <section class="note-box">
        <h3>โน้ตส่วนตัว</h3>
        <textarea id="noteInput" placeholder="จดสิ่งที่อยากจำของหัวข้อนี้...">${safeHTML(note)}</textarea>
      </section>

      <div class="reader-actions">
        <button id="saveNoteBtn" class="ghost-btn">บันทึกโน้ต</button>
        <button id="lessonFavBtn" class="ghost-btn">${isFav ? 'เอาออกจากโปรด' : 'บันทึกเป็นรายการโปรด'}</button>
        <button id="doneBtn" class="primary-btn">${isDone ? 'ยกเลิกอ่านจบแล้ว' : 'ทำเครื่องหมายว่าอ่านจบแล้ว'}</button>
      </div>
    </article>
  `;

  readerSection.querySelectorAll('[data-etab]').forEach(btn => btn.addEventListener('click', () => {
    state.englishTab = btn.dataset.etab;
    openLesson(id, { keepEnglishSearch: false });
  }));

  readerSection.querySelectorAll('[data-speak]').forEach(btn => btn.addEventListener('click', () => speak(btn.dataset.speak)));

  const searchInput = el('englishSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      state.englishSearch = e.target.value;
      openLesson(id, { keepEnglishSearch: true });
    });
  }

  const englishDoneBtn = el('englishDoneBtn');
  if (englishDoneBtn) {
    englishDoneBtn.onclick = async () => {
      const ep = englishProgress(state.englishTab);
      ep.completed = !ep.completed;
      ep.completedAt = ep.completed ? new Date().toISOString() : null;
      await saveUserData(true);
      openLesson(id, { keepEnglishSearch: true });
    };
  }

  el('saveNoteBtn').onclick = async () => {
    state.userData.notes[id] = el('noteInput').value;
    prog.noteUpdatedAt = new Date().toISOString();
    await saveUserData(true);
    openLesson(id, { keepEnglishSearch: true });
  };

  el('lessonFavBtn').onclick = async () => {
    prog.favorite = !prog.favorite;
    prog.favoriteAt = prog.favorite ? new Date().toISOString() : null;
    state.userData.favorites = prog.favorite
      ? Array.from(new Set([...state.userData.favorites, id]))
      : state.userData.favorites.filter(x => x !== id);
    await saveUserData(true);
    openLesson(id, { keepEnglishSearch: true });
  };

  el('doneBtn').onclick = async () => {
    prog.completed = !prog.completed;
    prog.completedAt = prog.completed ? new Date().toISOString() : null;
    state.userData.done = prog.completed
      ? Array.from(new Set([...state.userData.done, id]))
      : state.userData.done.filter(x => x !== id);
    await saveUserData(true);
    openLesson(id, { keepEnglishSearch: true });
  };
}

function closeLesson() {
  state.currentLessonId = null;
  readerSection.classList.add('hidden');
  listSection.classList.remove('hidden');
  backBtn.classList.add('hidden');
  renderLessons();
}

backBtn.addEventListener('click', closeLesson);
el('searchInput').addEventListener('input', e => { state.search = e.target.value; renderLessons(); });

el('demoBtn').addEventListener('click', async () => {
  state.isDemo = true;
  state.user = { displayName: 'Demo User', email: 'demo@local' };
  await loadUserData();
  authView.classList.add('hidden');
  mainView.classList.remove('hidden');
  closeLesson();
});

el('authForm').addEventListener('submit', async e => {
  e.preventDefault();
  const email = el('email').value.trim();
  const password = el('password').value;
  const displayName = el('displayName').value.trim();
  el('authMsg').textContent = '';
  try {
    if (state.mode === 'login') {
      await auth.signInWithEmailAndPassword(email, password);
    } else {
      const cred = await auth.createUserWithEmailAndPassword(email, password);
      if (displayName) await cred.user.updateProfile({ displayName });
      await db.collection('users').doc(cred.user.uid).set({
        email,
        displayName,
        ...defaultUserData(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    }
  } catch (err) {
    el('authMsg').textContent = err.message || 'เข้าสู่ระบบไม่สำเร็จ';
  }
});

el('logoutBtn').addEventListener('click', async () => {
  if (state.isDemo) {
    state.isDemo = false;
    state.user = null;
    authView.classList.remove('hidden');
    mainView.classList.add('hidden');
    return;
  }
  await auth.signOut();
});

auth.onAuthStateChanged(async user => {
  if (user) {
    state.isDemo = false;
    state.user = user;
    await loadUserData();
    authView.classList.add('hidden');
    mainView.classList.remove('hidden');
    closeLesson();
  } else if (!state.isDemo) {
    state.user = null;
    authView.classList.remove('hidden');
    mainView.classList.add('hidden');
  }
});

setAuthMode('login');
renderChips();
