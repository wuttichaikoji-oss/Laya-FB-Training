const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAaiMSOeGDahZuVDqWhgeuSHBf129wXv6g",
  authDomain: "laya-training.firebaseapp.com",
  projectId: "laya-training",
  storageBucket: "laya-training.firebasestorage.app",
  messagingSenderId: "843807988908",
  appId: "1:843807988908:web:cda1a814a2bcb41c4a9309",
  measurementId: "G-QB481YNZCJ"
};

if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
const auth = firebase.auth();
const db = firebase.firestore();
let storage = null;
try { storage = firebase.storage(); } catch (err) { console.warn('Firebase Storage unavailable', err); }

const baseLessons = window.LESSONS_DATA || [];
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
  currentWineIndex: 0,
  saveTimer: null,
  saving: false,
  communityLessons: [],
  communityUnsub: null,
  editorLessonId: null,
  deletingLesson: false
};

const el = id => document.getElementById(id);
const authView = el('authView');
const mainView = el('mainView');
const lessonGrid = el('lessonGrid');
const readerSection = el('readerSection');
const listSection = el('listSection');
const backBtn = el('backBtn');
const addLessonBtn = el('addLessonBtn');
const openEditorSecondaryBtn = el('openEditorSecondaryBtn');
const editorModal = el('editorModal');

function safeHTML(text) {
  return String(text ?? '').replace(/[&<>"']/g, s => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[s]));
}

function userLabel() {
  return state.isDemo ? 'Demo User' : (state.user?.displayName || state.user?.email || 'พนักงาน');
}

function allLessons() {
  return [...baseLessons, ...state.communityLessons];
}

function lessonById(id) {
  return allLessons().find(item => item.id === id);
}

function lessonCats() {
  return ['All', ...Array.from(new Set(allLessons().map(l => l.category || 'General'))).sort()];
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

function timestampToISO(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value.toDate === 'function') return value.toDate().toISOString();
  return '';
}

function formatDate(value) {
  const iso = timestampToISO(value);
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('th-TH', { day: '2-digit', month: 'short', year: '2-digit' }) + ' ' +
    d.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
}

function splitLines(text) {
  return String(text || '')
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean);
}


function splitMediaLines(text) {
  return splitLines(text).filter(line => /^https?:\/\//i.test(line) || /^data:image\//i.test(line) || /^data:video\//i.test(line) || /^blob:/i.test(line));
}

function extractBulletItems(text) {
  return splitLines(text)
    .map(line => line.replace(/^[-•●]\s*/, '').trim())
    .filter(Boolean);
}

function sanitizeUrl(url) {
  const value = String(url || '').trim();
  if (!value) return '';
  if (/^https?:\/\//i.test(value) || /^data:image\//i.test(value) || /^data:video\//i.test(value) || /^blob:/i.test(value)) return value;
  return '';
}



function safeFileName(name) {
  return String(name || 'file')
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'file';
}

function appendLineToTextarea(id, value) {
  const node = el(id);
  if (!node || !value) return;
  const current = node.value.trim();
  node.value = current ? `${current}
${value}` : value;
}

function mediaTextareaId(sectionNum, kind) {
  return `section${sectionNum}${kind === 'image' ? 'Images' : 'Videos'}`;
}

function mediaPreviewId(sectionNum, kind) {
  return `section${sectionNum}${kind === 'image' ? 'ImagePreview' : 'VideoPreview'}`;
}

function mediaInputId(sectionNum, kind) {
  return `section${sectionNum}${kind === 'image' ? 'ImageFiles' : 'VideoFiles'}`;
}

function mediaUploadMsgId(sectionNum, kind) {
  return `section${sectionNum}${kind === 'image' ? 'ImageUploadMsg' : 'VideoUploadMsg'}`;
}

function setUploadMessage(sectionNum, kind, message, tone = '') {
  const node = el(mediaUploadMsgId(sectionNum, kind));
  if (!node) return;
  node.textContent = message;
  node.classList.remove('error', 'success');
  if (tone) node.classList.add(tone);
}

function defaultUploadHint(kind) {
  return kind === 'image'
    ? 'เลือกรูปจากมือถือหรือคอมพิวเตอร์ได้หลายรูป ระบบจะอัปโหลดขึ้น Firebase Storage แล้วเติมลิงก์ลงช่องรูปภาพให้อัตโนมัติ'
    : 'เลือกลิงก์วิดีโอเองหรืออัปโหลดไฟล์วิดีโอจากเครื่อง ระบบจะอัปขึ้น Firebase Storage แล้วเติมลิงก์ลงช่องวิดีโอให้อัตโนมัติ';
}

function refreshUploadHint(sectionNum, kind) {
  const count = splitMediaLines(el(mediaTextareaId(sectionNum, kind))?.value || '').length;
  if (!count) {
    setUploadMessage(sectionNum, kind, defaultUploadHint(kind));
    return;
  }
  const label = kind === 'image' ? 'รูปภาพ' : 'วิดีโอ';
  setUploadMessage(sectionNum, kind, `มีลิงก์${label}แล้ว ${count} รายการ`, 'success');
}

function fileToDataUrl(file, kind = 'image') {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error(kind === 'image' ? 'อ่านไฟล์รูปไม่สำเร็จ' : 'อ่านไฟล์วิดีโอไม่สำเร็จ'));
    reader.readAsDataURL(file);
  });
}

function buildEditorPreviewHTML(kind, urls) {
  if (!urls.length) {
    const text = kind === 'image' ? 'ยังไม่มีรูปในหัวข้อนี้' : 'ยังไม่มีวิดีโอในหัวข้อนี้';
    return `<div class="preview-empty">${text}</div>`;
  }
  return urls.map(url => {
    const safe = safeHTML(url);
    if (kind === 'image') {
      return `
        <a class="editor-preview-card image-preview-card" href="${safe}" target="_blank" rel="noopener">
          <img src="${safe}" alt="preview image" loading="lazy">
          <span>เปิดรูป</span>
        </a>
      `;
    }
    const yt = toYouTubeEmbed(url);
    if (yt) {
      return `
        <div class="editor-preview-card video-preview-card">
          <iframe src="${safeHTML(yt)}" title="video preview" loading="lazy" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
          <span>YouTube</span>
        </div>
      `;
    }
    if (isDirectVideoUrl(url)) {
      return `
        <div class="editor-preview-card video-preview-card">
          <video controls preload="metadata" src="${safe}"></video>
          <span>วิดีโอ</span>
        </div>
      `;
    }
    return `
      <a class="editor-preview-card video-link-preview-card" href="${safe}" target="_blank" rel="noopener">
        <div class="preview-link-icon">▶</div>
        <span>เปิดลิงก์วิดีโอ</span>
      </a>
    `;
  }).join('');
}

function refreshMediaPreview(sectionNum, kind) {
  const node = el(mediaPreviewId(sectionNum, kind));
  if (!node) return;
  const urls = splitMediaLines(el(mediaTextareaId(sectionNum, kind))?.value || '');
  node.innerHTML = buildEditorPreviewHTML(kind, urls);
}

function refreshSectionPreviews(sectionNum) {
  refreshUploadHint(sectionNum, 'image');
  refreshUploadHint(sectionNum, 'video');
  refreshMediaPreview(sectionNum, 'image');
  refreshMediaPreview(sectionNum, 'video');
}

async function uploadMediaFile(file, kind) {
  if (state.isDemo) return await fileToDataUrl(file, kind);
  if (!state.user) throw new Error(`กรุณาเข้าสู่ระบบก่อนอัปโหลด${kind === 'image' ? 'รูป' : 'วิดีโอ'}`);
  if (!storage) throw new Error('Firebase Storage ยังไม่พร้อมใช้งาน');
  const folder = kind === 'image' ? 'images' : 'videos';
  const fallbackType = kind === 'image' ? 'image/jpeg' : 'video/mp4';
  const path = `team_lesson_uploads/${state.user.uid}/${folder}/${Date.now()}-${safeFileName(file.name)}`;
  const ref = storage.ref().child(path);
  const snapshot = await ref.put(file, { contentType: file.type || fallbackType });
  return await snapshot.ref.getDownloadURL();
}

async function handleSectionMediaUpload(sectionNum, kind, files) {
  const picked = Array.from(files || []).filter(Boolean);
  if (!picked.length) return;
  const label = kind === 'image' ? 'รูป' : 'วิดีโอ';
  setUploadMessage(sectionNum, kind, `กำลังเตรียมอัปโหลด ${picked.length} ${label}...`);
  try {
    for (let i = 0; i < picked.length; i += 1) {
      const file = picked[i];
      setUploadMessage(sectionNum, kind, `กำลังอัปโหลด ${i + 1}/${picked.length}: ${file.name}`);
      const url = await uploadMediaFile(file, kind);
      appendLineToTextarea(mediaTextareaId(sectionNum, kind), url);
      refreshMediaPreview(sectionNum, kind);
    }
    refreshSectionPreviews(sectionNum);
  } catch (err) {
    console.error(err);
    setUploadMessage(sectionNum, kind, err.message || `อัปโหลด${label}ไม่สำเร็จ`, 'error');
  } finally {
    const input = el(mediaInputId(sectionNum, kind));
    if (input) input.value = '';
  }
}

function toYouTubeEmbed(url) {
  const value = String(url || '').trim();
  if (!value) return '';
  try {
    const parsed = new URL(value);
    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.replace(/^\//, '').split('/')[0];
      return id ? `https://www.youtube.com/embed/${id}` : '';
    }
    if (parsed.hostname.includes('youtube.com')) {
      if (parsed.pathname === '/watch') {
        const id = parsed.searchParams.get('v');
        return id ? `https://www.youtube.com/embed/${id}` : '';
      }
      const parts = parsed.pathname.split('/').filter(Boolean);
      if (parts[0] === 'shorts' && parts[1]) return `https://www.youtube.com/embed/${parts[1]}`;
      if (parts[0] === 'embed' && parts[1]) return `https://www.youtube.com/embed/${parts[1]}`;
    }
  } catch (err) {
    return '';
  }
  return '';
}

function isDirectVideoUrl(url) {
  const value = String(url || '').trim();
  return /^data:video\//i.test(value) || /^blob:/i.test(value) || /\.(mp4|mov|webm|m4v|ogg|ogv)(\?|$)/i.test(value);
}


function buildRichTextHTML(text) {
  const raw = String(text || '').replace(/\r/g, '');
  if (!raw.trim()) return '';
  const chunks = raw.split(/\n\s*\n/).map(chunk => chunk.trim()).filter(Boolean);
  return chunks.map(chunk => {
    const lines = chunk.split('\n').map(line => line.trim()).filter(Boolean);
    const isBulletBlock = lines.every(line => /^[-•●]\s+/.test(line));
    if (isBulletBlock) {
      return `<ul>${lines.map(line => `<li>${safeHTML(line.replace(/^[-•●]\s*/, ''))}</li>`).join('')}</ul>`;
    }
    return lines.map(line => `<p>${safeHTML(line)}</p>`).join('');
  }).join('');
}

function renderSectionMedia(section) {
  const images = Array.isArray(section.images) ? section.images.map(sanitizeUrl).filter(Boolean) : [];
  const videos = Array.isArray(section.videos) ? section.videos.map(sanitizeUrl).filter(Boolean) : [];
  if (!images.length && !videos.length) return '';
  return `
    <div class="section-media-wrap">
      ${images.length ? `
        <div class="media-block">
          <div class="media-block-title">รูปภาพ</div>
          <div class="media-grid image-grid">
            ${images.map(url => `<a class="media-card image-card" href="${safeHTML(url)}" target="_blank" rel="noopener"><img src="${safeHTML(url)}" alt="lesson image" loading="lazy"></a>`).join('')}
          </div>
        </div>
      ` : ''}
      ${videos.length ? `
        <div class="media-block">
          <div class="media-block-title">วิดีโอ</div>
          <div class="media-grid video-grid">
            ${videos.map(url => {
              const yt = toYouTubeEmbed(url);
              if (yt) return `<div class="media-card video-card"><iframe src="${safeHTML(yt)}" title="lesson video" loading="lazy" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>`;
              if (isDirectVideoUrl(url)) return `<div class="media-card video-card"><video controls preload="metadata" src="${safeHTML(url)}"></video></div>`;
              return `<a class="media-card video-link-card" href="${safeHTML(url)}" target="_blank" rel="noopener">เปิดวิดีโอ</a>`;
            }).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

function lessonProgress(id) {
  state.userData.progress[id] ||= { openedCount: 0, completed: false, favorite: false };
  return state.userData.progress[id];
}

function englishProgress(tab) {
  state.userData.englishProgress[tab] ||= { openedCount: 0, completed: false };
  return state.userData.englishProgress[tab];
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
  const runSave = async () => {
    if (state.saving) return;
    state.saving = true;
    updateHeader();
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

  if (immediate) return runSave();
  state.saveTimer = setTimeout(runSave, 500);
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

function transformCommunityLesson(docId, raw = {}) {
  return {
    id: `community:${docId}`,
    source: 'community',
    firestoreId: docId,
    category: raw.category || 'Team Knowledge',
    level: raw.level || 'Team',
    title: raw.title || 'Untitled Lesson',
    summary: raw.summary || '',
    sections: Array.isArray(raw.sections) ? raw.sections.map(section => {
      const content = String(section?.content || '').trim();
      const items = Array.isArray(section?.items) ? section.items.filter(Boolean) : [];
      const images = Array.isArray(section?.images) ? section.images.filter(Boolean) : [];
      const videos = Array.isArray(section?.videos) ? section.videos.filter(Boolean) : [];
      return {
        title: section?.title || 'หัวข้อ',
        content,
        items,
        images,
        videos
      };
    }).filter(section => section.title || section.content || section.items.length || section.images.length || section.videos.length) : [],
    tips: Array.isArray(raw.tips) ? raw.tips.filter(Boolean) : [],
    authorId: raw.authorId || '',
    authorName: raw.authorName || 'Team Member',
    createdAt: raw.createdAt || '',
    updatedAt: raw.updatedAt || '',
    publishedAt: raw.publishedAt || '',
    type: 'team-article'
  };
}

function saveDemoCommunity() {
  localStorage.setItem('laya_demo_community_lessons', JSON.stringify(state.communityLessons.map(item => ({
    ...item,
    id: undefined,
    source: undefined,
    firestoreId: item.firestoreId,
    createdAt: timestampToISO(item.createdAt),
    updatedAt: timestampToISO(item.updatedAt),
    publishedAt: timestampToISO(item.publishedAt)
  }))));
}

function loadDemoCommunity() {
  const raw = JSON.parse(localStorage.getItem('laya_demo_community_lessons') || '[]');
  state.communityLessons = Array.isArray(raw)
    ? raw.map(item => transformCommunityLesson(item.firestoreId || crypto.randomUUID(), item))
    : [];
  renderLessons();
}

function stopCommunitySubscription() {
  if (typeof state.communityUnsub === 'function') {
    state.communityUnsub();
    state.communityUnsub = null;
  }
}

function subscribeCommunityLessons() {
  stopCommunitySubscription();
  if (state.isDemo) {
    loadDemoCommunity();
    return;
  }
  if (!state.user) return;
  state.communityUnsub = db.collection('community_lessons').onSnapshot(snapshot => {
    state.communityLessons = snapshot.docs
      .map(doc => transformCommunityLesson(doc.id, doc.data()))
      .sort((a, b) => {
        const aTime = new Date(timestampToISO(a.updatedAt) || timestampToISO(a.createdAt) || 0).getTime();
        const bTime = new Date(timestampToISO(b.updatedAt) || timestampToISO(b.createdAt) || 0).getTime();
        return bTime - aTime;
      });
    renderLessons();
    if (state.currentLessonId?.startsWith('community:')) {
      const stillThere = lessonById(state.currentLessonId);
      if (!stillThere) closeLesson();
      else openLesson(state.currentLessonId, { keepEnglishSearch: true, skipRecord: true });
    }
  }, err => {
    console.error(err);
  });
}

function updateHeader() {
  el('welcomeName').textContent = userLabel();
  el('doneCount').textContent = (state.userData.done || []).length;
  el('favCount').textContent = (state.userData.favorites || []).length;
  el('teamLessonCount').textContent = state.communityLessons.length;
  const sync = el('syncStatus');
  if (state.saving) sync.textContent = 'กำลังบันทึก...';
  else sync.textContent = state.isDemo ? 'บันทึกในเครื่องนี้' : 'บันทึกในบัญชี Firebase';
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
  const sectionText = (lesson.sections || []).map(section => `${section.title || ''} ${section.content || ''} ${(section.items || []).join(' ')}`).join(' ');
  const hay = `${lesson.title} ${lesson.summary || ''} ${lesson.category || ''} ${lesson.authorName || ''} ${sectionText}`.toLowerCase();
  return catOK && (!q || hay.includes(q));
}

function lessonSortValue(lesson) {
  if (lesson.source === 'community') {
    return new Date(timestampToISO(lesson.updatedAt) || timestampToISO(lesson.createdAt) || 0).getTime() + 1000000000000;
  }
  return 0;
}

function renderLessons() {
  updateHeader();
  renderChips();
  const visibleLessons = allLessons()
    .filter(matchesLesson)
    .sort((a, b) => lessonSortValue(b) - lessonSortValue(a));

  lessonGrid.innerHTML = '';
  if (!visibleLessons.length) {
    lessonGrid.innerHTML = `<div class="empty-box">ไม่พบบทเรียนที่ตรงกับคำค้นหา</div>`;
    return;
  }

  visibleLessons.forEach(lesson => {
    const prog = lessonProgress(lesson.id);
    const done = !!prog.completed;
    const fav = !!prog.favorite;
    const extra = prog.lastOpenedAt ? `เปิดล่าสุด ${formatDate(prog.lastOpenedAt)}` : 'ยังไม่เคยเปิด';
    const authorText = lesson.source === 'community'
      ? `<div class="mini-meta">โดย ${safeHTML(lesson.authorName || 'Team Member')} · ${safeHTML(formatDate(lesson.updatedAt) || formatDate(lesson.createdAt) || 'บทเรียนทีม')}</div>`
      : '';

    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="tag-row">
        <span class="tag">${safeHTML(lesson.category || 'General')}</span>
        <span class="tag">${safeHTML(lesson.level || 'Core')}</span>
        ${lesson.source === 'community' ? '<span class="tag team-tag">Team</span>' : ''}
        ${done ? '<span class="tag success-tag">อ่านจบแล้ว</span>' : ''}
      </div>
      <div>
        <h3>${safeHTML(lesson.title)}</h3>
        <p>${safeHTML(lesson.summary || '')}</p>
      </div>
      ${authorText}
      <div class="mini-meta">${safeHTML(extra)} · เปิด ${prog.openedCount || 0} ครั้ง</div>
      <div class="card-actions">
        <button class="primary-btn open-btn">เปิดอ่าน</button>
        <button class="icon-btn fav-btn">${fav ? '★ โปรด' : '☆ โปรด'}</button>
      </div>
    `;
    card.querySelector('.open-btn').onclick = () => openLesson(lesson.id);
    card.querySelector('.fav-btn').onclick = async () => {
      prog.favorite = !prog.favorite;
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

function noteValue(id) {
  return state.userData.notes[id] || '';
}

function speak(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  u.rate = 0.92;
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
  const items = ENGLISH_DATA[tab]?.items || [];
  const q = state.englishSearch.trim().toLowerCase();
  if (!q) return items;
  return items.filter(item => (`${item.term} ${item.reading} ${item.meaning}`).toLowerCase().includes(q));
}

function renderEnglishPack() {
  const key = state.englishTab in ENGLISH_DATA ? state.englishTab : 'restaurant';
  const cat = ENGLISH_DATA[key] || { items: [], title: '' };
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
          <p class="small">รวมคำศัพท์ไว้ในหัวข้อเดียว แยกเป็น 5 แท็บ ค้นหาเร็ว และกดฟังเสียงได้ทุกคำ</p>
        </div>
        <div class="english-progress-box">
          <div><strong>${cat.items?.length || 0}</strong><span>คำในหมวดนี้</span></div>
          <div><strong>${prog.openedCount || 0}</strong><span>เปิดอ่าน</span></div>
          <div><strong>${prog.completed ? 'ครบ' : 'ยังไม่จบ'}</strong><span>สถานะ</span></div>
        </div>
      </div>

      <div class="english-tabs-wrap">
        ${ENGLISH_ORDER.map(tab => {
          const tabProg = englishProgress(tab);
          return `<button class="english-tab ${tab === key ? 'active' : ''}" data-etab="${tab}">${safeHTML(englishTabTitle(tab))}${tabProg.completed ? ' ✓' : ''}</button>`;
        }).join('')}
      </div>

      <div class="english-toolbar">
        <div class="english-tab-title">${safeHTML(cat.title || englishTabTitle(key))}</div>
        <input id="englishSearchInput" class="search english-search" type="search" value="${safeHTML(state.englishSearch)}" placeholder="ค้นหาในหมวดนี้ เช่น menu, order, banana, tomato">
      </div>

      <div class="vocab-list">
        ${rows || '<div class="empty-box">ไม่พบคำศัพท์ในหมวดนี้</div>'}
      </div>

      <div class="english-footer-row">
        <div class="mini-meta">${prog.lastOpenedAt ? `เปิดล่าสุด ${safeHTML(formatDate(prog.lastOpenedAt))}` : 'ยังไม่มีประวัติการเปิดอ่านของแท็บนี้'}</div>
        <button id="englishDoneBtn" class="ghost-btn">${prog.completed ? 'ยกเลิกอ่านหมวดนี้จบแล้ว' : 'ทำเครื่องหมายว่าอ่านหมวดนี้จบแล้ว'}</button>
      </div>
    </section>
  `;
}

function renderSections(lesson) {
  return (lesson.sections || []).map(section => {
    const content = String(section.content || '').trim();
    const fallbackItems = Array.isArray(section.items) ? section.items : [];
    const body = content
      ? buildRichTextHTML(content)
      : (fallbackItems.length ? `<ul>${fallbackItems.map(item => `<li>${safeHTML(item)}</li>`).join('')}</ul>` : '<div class="empty-box">ยังไม่มีเนื้อหาในหัวข้อนี้</div>');
    return `
      <section class="section-box">
        <h3>${safeHTML(section.title)}</h3>
        <div class="section-body">${body}</div>
        ${renderSectionMedia(section)}
      </section>
    `;
  }).join('');
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

function renderWineDetail(wine) {
  if (!wine) return '<div class="empty-box">ยังไม่มีข้อมูลไวน์</div>';
  return `
    <div class="wine-detail-card">
      <div class="wine-detail-image-wrap">
        <img src="${safeHTML(wine.image)}" alt="${safeHTML(wine.name)}" loading="lazy">
      </div>
      <div class="wine-detail-copy">
        <div class="tag-row">
          <span class="tag">${safeHTML(wine.category || 'Wine')}</span>
          <span class="tag">${safeHTML(wine.vintage || 'NV')}</span>
          <span class="tag">${safeHTML(wine.vineyard || '-')}</span>
        </div>
        <h4>${safeHTML(wine.name)}</h4>
        <p class="wine-detail-pronounce">คำอ่าน: ${safeHTML(wine.pronunciation || '-')}</p>
        <div class="wine-detail-grid">
          <div class="wine-detail-item"><span>องุ่น</span><strong>${safeHTML(wine.grape || '-')}</strong></div>
          <div class="wine-detail-item"><span>สไตล์</span><strong>${safeHTML(wine.category || '-')}</strong></div>
          <div class="wine-detail-item wide"><span>รสชาติ</span><strong>${safeHTML(wine.taste || '-')}</strong></div>
          <div class="wine-detail-item wide"><span>จับคู่อาหาร</span><strong>${safeHTML(wine.pair || '-')}</strong></div>
          <div class="wine-detail-item wide"><span>วิธีพูดกับแขก</span><strong>${safeHTML(wine.en || '-')}</strong></div>
        </div>
      </div>
    </div>
  `;
}

function renderWineMedia() {
  const selected = WINE_MEDIA[state.currentWineIndex] || WINE_MEDIA[0];
  return `
    <section class="wine-box">
      <div class="wine-head wine-head-modern">
        <div>
          <h3>Wine Reference Bottles (40 ขวด)</h3>
          <p class="small">รวมรูปขวดไวน์ทั้งหมดที่อัปโหลดไว้ในบทเดียว กดที่ขวดเพื่อเปิดรายละเอียดด้านล่าง ช่วยให้พนักงานจำฉลากและชื่อไวน์ได้ง่ายขึ้น</p>
        </div>
        <div class="wine-hint">แตะรูปขวดเพื่อดูรายละเอียด</div>
      </div>
      <div class="wine-grid">
        ${WINE_MEDIA.map((wine, index) => `
          <button class="wine-tile ${index === state.currentWineIndex ? 'active' : ''}" data-wine-index="${index}" type="button">
            <div class="wine-tile-image">
              <img src="${safeHTML(wine.image)}" alt="${safeHTML(wine.name)}" loading="lazy">
            </div>
            <div class="wine-tile-name">${safeHTML(wine.name)}</div>
            <div class="wine-tile-meta">${safeHTML(wine.category || 'Wine')}</div>
          </button>
        `).join('')}
      </div>
      <div id="wineDetailPanel" class="wine-detail-panel">${renderWineDetail(selected)}</div>
    </section>
  `;
}

function bindWineInteractions() {
  const panel = document.getElementById('wineDetailPanel');
  if (!panel) return;
  readerSection.querySelectorAll('[data-wine-index]').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = Number(btn.dataset.wineIndex || 0);
      state.currentWineIndex = index;
      const wine = WINE_MEDIA[index] || WINE_MEDIA[0];
      readerSection.querySelectorAll('[data-wine-index]').forEach(tile => tile.classList.toggle('active', tile === btn));
      panel.innerHTML = renderWineDetail(wine);
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
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

function canEditLesson(lesson) {
  if (!lesson || lesson.source !== 'community') return false;
  if (state.isDemo) return true;
  return lesson.authorId && lesson.authorId === state.user?.uid;
}

function openLesson(id, opts = {}) {
  const lesson = lessonById(id);
  if (!lesson) return;
  if (!opts.keepEnglishSearch) state.englishSearch = '';
  state.currentLessonId = id;
  if (!opts.skipRecord) {
    recordLessonOpen(id);
    if (lesson.type === 'english-pack') recordEnglishOpen(state.englishTab);
  }

  const prog = lessonProgress(id);
  const note = noteValue(id);
  const isDone = !!prog.completed;
  const isFav = !!prog.favorite;

  listSection.classList.add('hidden');
  readerSection.classList.remove('hidden');
  backBtn.classList.remove('hidden');

  const authorBox = lesson.source === 'community'
    ? `
      <section class="author-box">
        <div>
          <strong>บทเรียนจากทีม</strong>
          <span>เขียนโดย ${safeHTML(lesson.authorName || 'Team Member')} · ${safeHTML(formatDate(lesson.updatedAt) || formatDate(lesson.createdAt) || '')}</span>
        </div>
        ${canEditLesson(lesson) ? '<button id="editCommunityLessonBtn" class="ghost-btn">แก้ไขบทเรียนนี้</button>' : ''}
      </section>
    `
    : '';

  readerSection.innerHTML = `
    <article class="reader-card">
      <div class="reader-head">
        <div class="tag-row">
          <span class="tag">${safeHTML(lesson.category || 'General')}</span>
          <span class="tag">${safeHTML(lesson.level || 'Core')}</span>
          ${lesson.source === 'community' ? '<span class="tag team-tag">Team</span>' : ''}
          ${isDone ? '<span class="tag success-tag">อ่านจบแล้ว</span>' : ''}
          ${isFav ? '<span class="tag fav-tag">รายการโปรด</span>' : ''}
        </div>
        <h1>${safeHTML(lesson.title)}</h1>
        <p>${safeHTML(lesson.summary || '')}</p>
      </div>

      <div class="reader-meta-row">
        <div class="mini-meta">เปิด ${prog.openedCount || 0} ครั้ง · ${prog.lastOpenedAt ? 'ล่าสุด ' + safeHTML(formatDate(prog.lastOpenedAt)) : 'ยังไม่มีประวัติ'}</div>
      </div>

      ${authorBox}
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
    openLesson(id, { keepEnglishSearch: false, skipRecord: false });
  }));

  readerSection.querySelectorAll('[data-speak]').forEach(btn => btn.addEventListener('click', () => speak(btn.dataset.speak)));

  if (lesson.id === 'wine-basic') bindWineInteractions();

  const englishSearchInput = el('englishSearchInput');
  if (englishSearchInput) {
    englishSearchInput.addEventListener('input', e => {
      state.englishSearch = e.target.value;
      openLesson(id, { keepEnglishSearch: true, skipRecord: true });
    });
  }

  const englishDoneBtn = el('englishDoneBtn');
  if (englishDoneBtn) {
    englishDoneBtn.onclick = async () => {
      const ep = englishProgress(state.englishTab);
      ep.completed = !ep.completed;
      ep.completedAt = ep.completed ? new Date().toISOString() : null;
      await saveUserData(true);
      openLesson(id, { keepEnglishSearch: true, skipRecord: true });
    };
  }

  const editBtn = el('editCommunityLessonBtn');
  if (editBtn) {
    editBtn.onclick = () => openEditorForLesson(lesson);
  }

  el('saveNoteBtn').onclick = async () => {
    state.userData.notes[id] = el('noteInput').value;
    prog.noteUpdatedAt = new Date().toISOString();
    await saveUserData(true);
    openLesson(id, { keepEnglishSearch: true, skipRecord: true });
  };

  el('lessonFavBtn').onclick = async () => {
    prog.favorite = !prog.favorite;
    prog.favoriteAt = prog.favorite ? new Date().toISOString() : null;
    state.userData.favorites = prog.favorite
      ? Array.from(new Set([...state.userData.favorites, id]))
      : state.userData.favorites.filter(x => x !== id);
    await saveUserData(true);
    openLesson(id, { keepEnglishSearch: true, skipRecord: true });
  };

  el('doneBtn').onclick = async () => {
    prog.completed = !prog.completed;
    prog.completedAt = prog.completed ? new Date().toISOString() : null;
    state.userData.done = prog.completed
      ? Array.from(new Set([...state.userData.done, id]))
      : state.userData.done.filter(x => x !== id);
    await saveUserData(true);
    openLesson(id, { keepEnglishSearch: true, skipRecord: true });
  };
}

function closeLesson() {
  state.currentLessonId = null;
  readerSection.classList.add('hidden');
  listSection.classList.remove('hidden');
  backBtn.classList.add('hidden');
  renderLessons();
}

function resetEditorForm() {
  state.editorLessonId = null;
  el('editorTitle').textContent = 'เพิ่มบทเรียนใหม่';
  el('editorMsg').textContent = '';
  el('lessonEditorForm').reset();
  el('editorLessonLevel').value = 'Team';
  el('deleteLessonBtn').classList.add('hidden');
  [1,2,3,4].forEach(refreshSectionPreviews);
}

function openEditor() {
  if (!state.isDemo && !state.user) return;
  resetEditorForm();
  editorModal.classList.remove('hidden');
}

function fillEditorFromLesson(lesson) {
  resetEditorForm();
  state.editorLessonId = lesson.firestoreId;
  el('editorTitle').textContent = 'แก้ไขบทเรียนของทีม';
  el('editorLessonTitle').value = lesson.title || '';
  el('editorLessonCategory').value = lesson.category || '';
  el('editorLessonLevel').value = lesson.level || 'Team';
  el('editorLessonSummary').value = lesson.summary || '';
  [0,1,2,3].forEach(index => {
    const section = lesson.sections?.[index] || { title: '', items: [], content: '', images: [], videos: [] };
    el(`section${index+1}Title`).value = section.title || '';
    el(`section${index+1}Items`).value = section.content || (section.items || []).join('\n');
    el(`section${index+1}Images`).value = (section.images || []).join('\n');
    el(`section${index+1}Videos`).value = (section.videos || []).join('\n');
  });
  el('editorLessonTips').value = (lesson.tips || []).join('\n');
  el('deleteLessonBtn').classList.remove('hidden');
  [1,2,3,4].forEach(refreshSectionPreviews);
}

function openEditorForLesson(lesson) {
  if (!canEditLesson(lesson)) return;
  fillEditorFromLesson(lesson);
  editorModal.classList.remove('hidden');
}

function closeEditor() {
  editorModal.classList.add('hidden');
  resetEditorForm();
}

function buildEditorPayload() {
  const title = el('editorLessonTitle').value.trim();
  const category = el('editorLessonCategory').value.trim() || 'Team Knowledge';
  const level = el('editorLessonLevel').value || 'Team';
  const summary = el('editorLessonSummary').value.trim();
  const sections = [0,1,2,3].map(index => {
    const content = el(`section${index+1}Items`).value.trim();
    const images = splitMediaLines(el(`section${index+1}Images`).value);
    const videos = splitMediaLines(el(`section${index+1}Videos`).value);
    return {
      title: el(`section${index+1}Title`).value.trim(),
      content,
      items: extractBulletItems(content),
      images,
      videos
    };
  }).filter(section => section.title || section.content || section.images.length || section.videos.length);
  const tips = splitLines(el('editorLessonTips').value);

  if (!title) throw new Error('กรุณาใส่ชื่อบทเรียน');
  if (!summary) throw new Error('กรุณาใส่คำอธิบายสั้น');
  if (!sections.length) throw new Error('กรุณาใส่อย่างน้อย 1 หัวข้อย่อย');
  return { title, category, level, summary, sections, tips };
}

async function saveCommunityLesson(payload) {
  const authorName = userLabel();
  if (state.isDemo) {
    const docId = state.editorLessonId || crypto.randomUUID();
    const raw = {
      ...payload,
      authorId: 'demo-user',
      authorName,
      createdAt: state.editorLessonId ? (state.communityLessons.find(item => item.firestoreId === docId)?.createdAt || new Date().toISOString()) : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString()
    };
    const lesson = transformCommunityLesson(docId, raw);
    const idx = state.communityLessons.findIndex(item => item.firestoreId === docId);
    if (idx >= 0) state.communityLessons[idx] = lesson;
    else state.communityLessons.unshift(lesson);
    saveDemoCommunity();
    renderLessons();
    if (state.currentLessonId === `community:${docId}`) openLesson(`community:${docId}`, { skipRecord: true });
    return;
  }

  const baseData = {
    ...payload,
    authorId: state.user.uid,
    authorName,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    publishedAt: firebase.firestore.FieldValue.serverTimestamp()
  };
  if (state.editorLessonId) {
    await db.collection('community_lessons').doc(state.editorLessonId).set(baseData, { merge: true });
  } else {
    await db.collection('community_lessons').add({
      ...baseData,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
}

async function deleteCommunityLesson() {
  if (!state.editorLessonId) return;
  if (!confirm('ลบบทเรียนนี้ออกจากคลังความรู้ทีมใช่หรือไม่')) return;
  if (state.isDemo) {
    state.communityLessons = state.communityLessons.filter(item => item.firestoreId !== state.editorLessonId);
    saveDemoCommunity();
    closeEditor();
    closeLesson();
    return;
  }
  await db.collection('community_lessons').doc(state.editorLessonId).delete();
  closeEditor();
  closeLesson();
}

backBtn.addEventListener('click', closeLesson);
el('searchInput').addEventListener('input', e => { state.search = e.target.value; renderLessons(); });
addLessonBtn.addEventListener('click', openEditor);
openEditorSecondaryBtn.addEventListener('click', openEditor);
el('closeEditorBtn').addEventListener('click', closeEditor);
el('cancelEditorBtn').addEventListener('click', closeEditor);
el('deleteLessonBtn').addEventListener('click', async () => {
  if (state.deletingLesson) return;
  state.deletingLesson = true;
  try {
    await deleteCommunityLesson();
  } catch (err) {
    el('editorMsg').textContent = err.message || 'ลบบทเรียนไม่สำเร็จ';
  } finally {
    state.deletingLesson = false;
  }
});
editorModal.querySelectorAll('[data-close-editor="true"]').forEach(node => node.addEventListener('click', closeEditor));

el('lessonEditorForm').addEventListener('submit', async e => {
  e.preventDefault();
  el('editorMsg').textContent = '';
  try {
    const payload = buildEditorPayload();
    await saveCommunityLesson(payload);
    closeEditor();
  } catch (err) {
    el('editorMsg').textContent = err.message || 'บันทึกบทเรียนไม่สำเร็จ';
  }
});


[1,2,3,4].forEach(sectionNum => {
  el(`section${sectionNum}ImageFiles`).addEventListener('change', e => {
    handleSectionMediaUpload(sectionNum, 'image', e.target.files);
  });
  el(`section${sectionNum}Images`).addEventListener('input', () => refreshSectionPreviews(sectionNum));
  el(`section${sectionNum}VideoFiles`).addEventListener('change', e => {
    handleSectionMediaUpload(sectionNum, 'video', e.target.files);
  });
  el(`section${sectionNum}Videos`).addEventListener('input', () => refreshSectionPreviews(sectionNum));
});

el('demoBtn').addEventListener('click', async () => {
  state.isDemo = true;
  state.user = { uid: 'demo-user', displayName: 'Demo User', email: 'demo@local' };
  await loadUserData();
  subscribeCommunityLessons();
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
  stopCommunitySubscription();
  if (state.isDemo) {
    state.isDemo = false;
    state.user = null;
    state.communityLessons = [];
    authView.classList.remove('hidden');
    mainView.classList.add('hidden');
    closeEditor();
    return;
  }
  await auth.signOut();
});

auth.onAuthStateChanged(async user => {
  stopCommunitySubscription();
  if (user) {
    state.isDemo = false;
    state.user = user;
    await loadUserData();
    subscribeCommunityLessons();
    authView.classList.add('hidden');
    mainView.classList.remove('hidden');
    closeLesson();
  } else if (!state.isDemo) {
    state.user = null;
    state.communityLessons = [];
    authView.classList.remove('hidden');
    mainView.classList.add('hidden');
  }
});

setAuthMode('login');
renderLessons();
