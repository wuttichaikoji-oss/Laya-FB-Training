
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
const ENGLISH_ORDER = ['restaurant','vegetables','fruits','orders','greeting'];

const state = {
  mode: 'login',
  user: null,
  isDemo: false,
  userData: { done: [], favorites: [], notes: {} },
  currentLessonId: null,
  filter: 'All',
  search: '',
  englishTab: 'restaurant'
};

const el = id => document.getElementById(id);
const authView = el('authView');
const mainView = el('mainView');
const lessonGrid = el('lessonGrid');
const readerSection = el('readerSection');
const listSection = el('listSection');
const backBtn = el('backBtn');

function lessonCats(){
  return ['All', ...Array.from(new Set(lessons.map(l => l.category || 'General'))).sort()];
}

function safeHTML(text){
  return String(text).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
}

function setAuthMode(mode){
  state.mode = mode;
  document.querySelectorAll('.auth-tabs .tab').forEach(btn => btn.classList.toggle('active', btn.dataset.mode === mode));
  el('nameWrap').classList.toggle('hidden', mode !== 'register');
  el('authSubmit').textContent = mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครผู้ใช้ใหม่';
  el('authMsg').textContent = '';
}

document.querySelectorAll('.auth-tabs .tab').forEach(btn => btn.addEventListener('click', () => setAuthMode(btn.dataset.mode)));

async function saveUserData(){
  if (state.isDemo) {
    localStorage.setItem('laya_demo_user_data', JSON.stringify(state.userData));
    return;
  }
  if (!state.user) return;
  await db.collection('users').doc(state.user.uid).set({
    email: state.user.email || '',
    displayName: state.user.displayName || '',
    done: state.userData.done,
    favorites: state.userData.favorites,
    notes: state.userData.notes,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  }, { merge: true });
}

async function loadUserData(){
  if (state.isDemo) {
    state.userData = JSON.parse(localStorage.getItem('laya_demo_user_data') || '{"done":[],"favorites":[],"notes":{}}');
    return;
  }
  if (!state.user) return;
  const ref = await db.collection('users').doc(state.user.uid).get();
  const data = ref.exists ? ref.data() : {};
  state.userData = {
    done: data.done || [],
    favorites: data.favorites || [],
    notes: data.notes || {}
  };
}

function updateHeader(){
  const name = state.isDemo ? 'Demo User' : (state.user?.displayName || state.user?.email || 'พนักงาน');
  el('welcomeName').textContent = name;
  el('doneCount').textContent = (state.userData.done || []).length;
  el('favCount').textContent = (state.userData.favorites || []).length;
}

function renderChips(){
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

function matchesLesson(lesson){
  const q = state.search.trim().toLowerCase();
  const catOK = state.filter === 'All' || (lesson.category || 'General') === state.filter;
  const hay = `${lesson.title} ${lesson.summary} ${lesson.category || ''}`.toLowerCase();
  return catOK && (!q || hay.includes(q));
}

function renderLessons(){
  updateHeader();
  renderChips();
  lessonGrid.innerHTML = '';
  lessons.filter(matchesLesson).forEach(lesson => {
    const card = document.createElement('article');
    card.className = 'card';
    const done = state.userData.done.includes(lesson.id);
    const fav = state.userData.favorites.includes(lesson.id);
    card.innerHTML = `
      <div class="tag-row">
        <span class="tag">${safeHTML(lesson.category || 'General')}</span>
        <span class="tag">${safeHTML(lesson.level || 'Core')}</span>
        ${done ? '<span class="tag">อ่านจบแล้ว</span>' : ''}
      </div>
      <div>
        <h3>${safeHTML(lesson.title)}</h3>
        <p>${safeHTML(lesson.summary || '')}</p>
      </div>
      <div class="card-actions">
        <button class="primary-btn open-btn">เปิดอ่าน</button>
        <button class="icon-btn fav-btn">${fav ? '★ โปรด' : '☆ โปรด'}</button>
      </div>
    `;
    card.querySelector('.open-btn').onclick = () => openLesson(lesson.id);
    card.querySelector('.fav-btn').onclick = async () => {
      state.userData.favorites = fav ? state.userData.favorites.filter(x => x !== lesson.id) : [...state.userData.favorites, lesson.id];
      await saveUserData();
      renderLessons();
    };
    lessonGrid.appendChild(card);
  });
}

function noteValue(id){ return state.userData.notes[id] || ''; }

function speak(text){
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  u.rate = 0.9;
  speechSynthesis.speak(u);
}

function englishTabTitle(key){
  const map = {
    restaurant: '1. คำศัพท์ในร้านอาหาร',
    vegetables: '2. คำศัพท์ผัก',
    fruits: '3. คำศัพท์ผลไม้',
    orders: '4. คำศัพท์รับออเดอร์',
    greeting: '5. คำศัพท์พูดคุย / ทักทาย'
  };
  return map[key] || key;
}

function renderEnglishPack(lesson){
  const key = state.englishTab in ENGLISH_DATA ? state.englishTab : 'restaurant';
  const cat = ENGLISH_DATA[key] || { items: [] };
  const rows = cat.items.map(item => `
    <div class="vocab-row">
      <div class="vocab-main">
        <div class="vocab-term">${safeHTML(item.term)}</div>
        <div class="vocab-sub">(${safeHTML(item.reading)}) — ${safeHTML(item.meaning)}</div>
      </div>
      <button class="speak-btn" data-speak="${safeHTML(item.term)}">🔊</button>
      <button class="star-btn" data-copy="${safeHTML(item.term)} | ${safeHTML(item.reading)} | ${safeHTML(item.meaning)}">☆</button>
    </div>
  `).join('');

  return `
    <div class="english-box">
      <h3>English: F&B</h3>
      <p class="small">รวมคำศัพท์ 5 หมวดไว้ในหัวข้อเดียว แต่ละรายการมีคำศัพท์ คำอ่านไทย คำแปลไทย และปุ่มฟังเสียง</p>
      <div class="english-tabs">
        ${ENGLISH_ORDER.filter(k => ENGLISH_DATA[k]).map(k => `<button class="english-tab ${k===key?'active':''}" data-etab="${k}">${englishTabTitle(k)}</button>`).join('')}
      </div>
      <div class="vocab-list">${rows}</div>
    </div>
  `;
}

function renderSections(lesson){
  return (lesson.sections || []).map(sec => `
    <section class="section-box">
      <h3>${safeHTML(sec.title)}</h3>
      <ul>${(sec.items || []).map(item => `<li>${safeHTML(item)}</li>`).join('')}</ul>
    </section>
  `).join('');
}

function renderTips(lesson){
  if (!lesson.tips || !lesson.tips.length) return '';
  return `
    <section class="section-box tips">
      <h3>Key Takeaways</h3>
      <ul>${lesson.tips.map(t => `<li>${safeHTML(t)}</li>`).join('')}</ul>
    </section>
  `;
}

function renderWineMedia(){
  return `
    <section class="wine-box">
      <h3>Wine Reference</h3>
      <div class="wine-grid">
        ${WINE_MEDIA.map(w => `
          <article class="wine-card">
            <img src="${safeHTML(w.image)}" alt="${safeHTML(w.name)}">
            <div class="wine-content">
              <h4>${safeHTML(w.name)}</h4>
              <p>${safeHTML(w.pronunciation)}</p>
              <p>${safeHTML(w.category)} • ${safeHTML(w.vineyard)}</p>
              <p><strong>รสชาติ:</strong> ${safeHTML(w.taste)}</p>
              <p><strong>Pairing:</strong> ${safeHTML(w.pair)}</p>
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function openLesson(id){
  const lesson = lessons.find(x => x.id === id);
  if (!lesson) return;
  state.currentLessonId = id;
  listSection.classList.add('hidden');
  readerSection.classList.remove('hidden');
  backBtn.classList.remove('hidden');
  const isDone = state.userData.done.includes(id);
  const note = noteValue(id);
  readerSection.innerHTML = `
    <article class="reader-card">
      <div class="reader-head">
        <div class="tag-row">
          <span class="tag">${safeHTML(lesson.category || 'General')}</span>
          <span class="tag">${safeHTML(lesson.level || 'Core')}</span>
        </div>
        <h1>${safeHTML(lesson.title)}</h1>
        <p>${safeHTML(lesson.summary || '')}</p>
      </div>
      ${lesson.type === 'english-pack' ? renderEnglishPack(lesson) : renderSections(lesson)}
      ${lesson.id === 'wine-basic' ? renderWineMedia() : ''}
      ${renderTips(lesson)}
      <section class="note-box">
        <h3>โน้ตส่วนตัว</h3>
        <textarea id="noteInput" placeholder="จดสิ่งที่อยากจำของหัวข้อนี้...">${safeHTML(note)}</textarea>
      </section>
      <div class="reader-actions">
        <button id="saveNoteBtn" class="ghost-btn">บันทึกโน้ต</button>
        <button id="doneBtn" class="primary-btn">${isDone ? 'ยกเลิกอ่านจบแล้ว' : 'ทำเครื่องหมายว่าอ่านจบแล้ว'}</button>
      </div>
    </article>
  `;

  readerSection.querySelectorAll('[data-etab]').forEach(btn => btn.addEventListener('click', () => {
    state.englishTab = btn.dataset.etab;
    openLesson(id);
  }));
  readerSection.querySelectorAll('[data-speak]').forEach(btn => btn.addEventListener('click', () => speak(btn.dataset.speak)));
  readerSection.querySelectorAll('[data-copy]').forEach(btn => btn.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(btn.dataset.copy); btn.textContent = 'คัดลอกแล้ว'; setTimeout(() => btn.textContent='☆', 1000);} catch(e){}
  }));
  el('saveNoteBtn').onclick = async () => {
    state.userData.notes[id] = el('noteInput').value;
    await saveUserData();
  };
  el('doneBtn').onclick = async () => {
    if (state.userData.done.includes(id)) state.userData.done = state.userData.done.filter(x => x !== id);
    else state.userData.done.push(id);
    await saveUserData();
    updateHeader();
    openLesson(id);
  };
}

function closeLesson(){
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
      await db.collection('users').doc(cred.user.uid).set({ email, displayName, done: [], favorites: [], notes: {} }, { merge: true });
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
