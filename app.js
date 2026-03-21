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
const RAW_WINE_MEDIA = window.WINE_MEDIA || [];
const ENGLISH_ORDER = ['restaurant', 'vegetables', 'fruits', 'orders', 'greeting'];

function imageFileName(path = '') {
  try {
    return decodeURIComponent(String(path || '').split('/').pop() || '');
  } catch (err) {
    return String(path || '').split('/').pop() || '';
  }
}

function titleCaseWord(word) {
  const raw = String(word || '');
  if (!raw) return '';
  const lower = raw.toLowerCase();
  const lookup = {
    nv: 'NV',
    aoc: 'AOC',
    igp: 'IGP',
    docg: 'DOCG',
    doc: 'DOC',
    brut: 'Brut',
    rose: 'Rosé',
    'rosé': 'Rosé',
    pinot: 'Pinot',
    riesling: 'Riesling',
    grigio: 'Grigio',
    noir: 'Noir',
    chianti: 'Chianti',
    margaux: 'Margaux',
    sauvignon: 'Sauvignon',
    blanc: 'Blanc'
  };
  if (lookup[lower]) return lookup[lower];
  return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
}

function humanizeWineFileName(fileName = '') {
  let stem = String(fileName || '').replace(/\.[^.]+$/, '').trim();
  if (!stem) return '';
  if (/^[a-f0-9]{8,}$/i.test(stem) || /^[0-9a-f_~-]+$/i.test(stem)) return '';
  stem = stem
    .replace(/[,_]+/g, ' ')
    .replace(/[-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!stem || /^[0-9a-f ]{10,}$/i.test(stem)) return '';
  return stem.split(' ').map(titleCaseWord).join(' ').trim();
}

function wineNameLooksPlaceholder(name = '') {
  const value = String(name || '').trim();
  if (!value) return true;
  return /unknown label/i.test(value)
    || /^ขวดยังไม่ตั้งชื่อ/i.test(value)
    || /^[a-f0-9]{8,}$/i.test(value.replace(/\s+/g, ''))
    || /^[0-9a-f_-]{10,}$/i.test(value)
    || /^(18035a|911285|5b7d39|e6db4ea)/i.test(value)
    || /^[a-z0-9-]{22,}$/i.test(value)
    || (value.includes('-') && value === value.toLowerCase())
    || /^[A-Za-z]{18,}\s+Redwine$/i.test(value);
}

function wineValueIsPlaceholder(value = '') {
  const text = String(value || '').trim();
  if (!text || text === '-') return true;
  return /ดูที่ฉลากขวด|ดูจากฉลากขวด|ข้อมูลจากขวดที่อัปโหลด|ใช้เป็น reference bottle/i.test(text);
}

function normalizeWineKey(raw = {}, index = 0) {
  const seed = String(raw.id || raw.name || imageFileName(raw.image) || `wine-${index + 1}`);
  const normalized = seed
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return normalized || `wine-${index + 1}`;
}

function normalizeWineItem(raw = {}, index = 0) {
  const sourceFile = imageFileName(raw.image || '');
  const fileLabel = humanizeWineFileName(sourceFile);
  const originalName = String(raw.name || '').trim();
  const name = (!wineNameLooksPlaceholder(originalName) && originalName)
    ? originalName
    : (fileLabel || `ขวดยังไม่ตั้งชื่อ ${index + 1}`);
  const normalized = {
    id: normalizeWineKey(raw, index),
    order: index,
    sourceFile,
    image: String(raw.image || '').trim(),
    category: String(raw.category || 'Wine').trim() || 'Wine',
    name,
    pronunciation: String(raw.pronunciation || '').trim(),
    vintage: String(raw.vintage || '').trim(),
    vineyard: String(raw.vineyard || '').trim(),
    taste: String(raw.taste || '').trim(),
    grape: String(raw.grape || '').trim(),
    en: String(raw.en || '').trim(),
    pair: String(raw.pair || '').trim()
  };
  normalized.incomplete = wineNameLooksPlaceholder(originalName)
    || ['pronunciation', 'vintage', 'vineyard', 'taste', 'grape', 'en', 'pair'].some(key => wineValueIsPlaceholder(normalized[key]));
  return normalized;
}

const BASE_WINE_MEDIA = RAW_WINE_MEDIA.map((item, index) => normalizeWineItem(item, index));

const defaultUserData = () => ({
  done: [],
  favorites: [],
  notes: {},
  progress: {},
  englishProgress: {},
  quiz: { attempts: [], bestScore: 0, lastScore: 0, lastAttemptAt: '' }
});


function normalizeEmployeeCode(raw = '') {
  const value = String(raw || '').trim();
  const collapsed = value.replace(/\s+/g, '').toUpperCase();
  const normalized = collapsed.replace(/[^A-Z0-9._-]/g, '');
  if (!normalized) throw new Error('กรุณากรอกรหัสพนักงาน');
  if (normalized.length < 3) throw new Error('รหัสพนักงานสั้นเกินไป');
  return normalized;
}

function employeeCodeToEmail(code = '') {
  const normalized = normalizeEmployeeCode(code).toLowerCase();
  return `emp.${normalized}@laya-training.local`;
}

function employeeCodeFromEmail(email = '') {
  const match = String(email || '').trim().match(/^emp\.([a-z0-9._-]+)@laya-training\.local$/i);
  return match ? match[1].toUpperCase() : '';
}

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
  wineBaseCatalog: BASE_WINE_MEDIA.slice(),
  wineCatalog: BASE_WINE_MEDIA.slice(),
  wineOverrides: {},
  wineUnsub: null,
  wineCatalogUnsub: null,
  syncingWineCatalog: false,
  wineCatalogSource: 'local',
  editingWineId: null,
  savingWine: false,
  editorLessonId: null,
  deletingLesson: false,
  userProfile: null,
  quizBank: [],
  quizSession: null,
  adminQuizData: [],
  adminUsersData: [],
  quizEnabled: true,
  settingsUnsub: null
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
const wineModal = el('wineModal');
const quizModal = el('quizModal');
const adminQuizModal = el('adminQuizModal');

function safeHTML(text) {
  return String(text ?? '').replace(/[&<>"']/g, s => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[s]));
}

function userLabel() {
  if (state.isDemo) return 'Demo User';
  return state.userProfile?.displayName
    || state.user?.displayName
    || state.userProfile?.employeeCode
    || employeeCodeFromEmail(state.user?.email)
    || 'พนักงาน';
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
  merged.quiz = raw.quiz && typeof raw.quiz === 'object' ? { attempts: Array.isArray(raw.quiz.attempts) ? raw.quiz.attempts : [], bestScore: Number(raw.quiz.bestScore || 0), lastScore: Number(raw.quiz.lastScore || 0), lastAttemptAt: raw.quiz.lastAttemptAt || '' } : { attempts: [], bestScore: 0, lastScore: 0, lastAttemptAt: '' };

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


function currentWineList() {
  return state.wineCatalog.length ? state.wineCatalog : BASE_WINE_MEDIA;
}

function currentWine() {
  return currentWineList()[state.currentWineIndex] || currentWineList()[0] || null;
}

function editableWineValue(key, value = '') {
  if (key === 'name') return wineNameLooksPlaceholder(value) ? '' : String(value || '').trim();
  return wineValueIsPlaceholder(value) ? '' : String(value || '').trim();
}

function mergeWineCatalog(overrides = {}) {
  state.wineOverrides = overrides && typeof overrides === 'object' ? overrides : {};
  const baseList = (Array.isArray(state.wineBaseCatalog) && state.wineBaseCatalog.length)
    ? state.wineBaseCatalog
    : BASE_WINE_MEDIA;
  const merged = baseList.map((base, index) => {
    const extra = state.wineOverrides[base.id] || {};
    return normalizeWineItem({
      ...base,
      ...extra,
      id: base.id,
      image: sanitizeUrl(extra.image || base.image) || base.image,
      order: typeof base.order === 'number' ? base.order : index
    }, typeof base.order === 'number' ? base.order : index);
  });
  state.wineCatalog = merged.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  if (state.currentWineIndex >= state.wineCatalog.length) state.currentWineIndex = 0;
}

function syncWineViewIfOpen() {
  if (state.currentLessonId === 'wine-basic') {
    openLesson('wine-basic', { keepEnglishSearch: true, skipRecord: true });
  }
}

function loadDemoWineOverrides() {
  const raw = JSON.parse(localStorage.getItem('laya_demo_wine_overrides') || '{}');
  mergeWineCatalog(raw);
  syncWineViewIfOpen();
}

function stopWineSubscription() {
  if (typeof state.wineUnsub === 'function') {
    state.wineUnsub();
    state.wineUnsub = null;
  }
}

function stopWineCatalogSubscription() {
  if (typeof state.wineCatalogUnsub === 'function') {
    state.wineCatalogUnsub();
    state.wineCatalogUnsub = null;
  }
}

function setWineBaseCatalog(list = [], source = 'local') {
  const incoming = Array.isArray(list) && list.length ? list : BASE_WINE_MEDIA;
  const normalized = incoming.map((item, index) => normalizeWineItem({
    ...item,
    id: item.id || normalizeWineKey(item, index),
    order: typeof item.order === 'number' ? item.order : index
  }, typeof item.order === 'number' ? item.order : index));
  const seen = new Set(normalized.map(item => item.id));
  const extras = BASE_WINE_MEDIA.filter(item => !seen.has(item.id));
  state.wineBaseCatalog = [...normalized, ...extras];
  state.wineCatalogSource = source;
  mergeWineCatalog(state.wineOverrides);
}

async function bootstrapWineCatalogToFirebase() {
  if (state.isDemo || !state.user) return;
  const batch = db.batch();
  BASE_WINE_MEDIA.forEach((wine, index) => {
    const docRef = db.collection('wine_catalog').doc(wine.id);
    batch.set(docRef, {
      id: wine.id,
      order: typeof wine.order === 'number' ? wine.order : index,
      name: wine.name || '',
      pronunciation: wine.pronunciation || '',
      category: wine.category || 'Wine',
      vintage: wine.vintage || '',
      vineyard: wine.vineyard || '',
      taste: wine.taste || '',
      grape: wine.grape || '',
      en: wine.en || '',
      pair: wine.pair || '',
      image: wine.image || '',
      sourceFile: wine.sourceFile || imageFileName(wine.image || ''),
      seededAt: firebase.firestore.FieldValue.serverTimestamp(),
      seededById: state.user.uid,
      seededByName: userLabel()
    }, { merge: true });
  });
  await batch.commit();
}

function subscribeWineCatalog() {
  stopWineCatalogSubscription();
  if (state.isDemo) {
    setWineBaseCatalog(BASE_WINE_MEDIA, 'local');
    return;
  }
  if (!state.user) {
    setWineBaseCatalog(BASE_WINE_MEDIA, 'local');
    return;
  }
  state.wineCatalogUnsub = db.collection('wine_catalog').orderBy('order').onSnapshot(async snapshot => {
    if (snapshot.empty) {
      setWineBaseCatalog(BASE_WINE_MEDIA, 'local');
      if (!state.syncingWineCatalog) {
        state.syncingWineCatalog = true;
        try {
          await bootstrapWineCatalogToFirebase();
        } catch (err) {
          console.error(err);
          state.syncingWineCatalog = false;
        }
      }
      syncWineViewIfOpen();
      return;
    }
    state.syncingWineCatalog = false;
    const list = snapshot.docs.map((doc, index) => ({
      id: doc.id,
      ...(doc.data() || {}),
      order: typeof doc.data()?.order === 'number' ? doc.data().order : index
    }));
    setWineBaseCatalog(list, 'firebase');
    syncWineViewIfOpen();
  }, err => {
    console.error(err);
    setWineBaseCatalog(BASE_WINE_MEDIA, 'local');
    syncWineViewIfOpen();
  });
}

function subscribeWineReference() {
  stopWineSubscription();
  if (state.isDemo) {
    loadDemoWineOverrides();
    return;
  }
  if (!state.user) {
    mergeWineCatalog({});
    return;
  }
  state.wineUnsub = db.collection('wine_reference').onSnapshot(snapshot => {
    const overrides = {};
    snapshot.docs.forEach(doc => {
      overrides[doc.id] = doc.data() || {};
    });
    mergeWineCatalog(overrides);
    syncWineViewIfOpen();
  }, err => {
    console.error(err);
  });
}

async function saveWineOverride(wineId, payload) {
  const data = {
    ...payload,
    updatedById: state.user?.uid || 'demo-user',
    updatedByName: userLabel()
  };
  if (state.isDemo) {
    const raw = JSON.parse(localStorage.getItem('laya_demo_wine_overrides') || '{}');
    raw[wineId] = {
      ...(raw[wineId] || {}),
      ...data,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem('laya_demo_wine_overrides', JSON.stringify(raw));
    mergeWineCatalog(raw);
    syncWineViewIfOpen();
    return;
  }
  await db.collection('wine_reference').doc(wineId).set({
    ...data,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  }, { merge: true });
}

async function clearWineOverride(wineId) {
  if (state.isDemo) {
    const raw = JSON.parse(localStorage.getItem('laya_demo_wine_overrides') || '{}');
    delete raw[wineId];
    localStorage.setItem('laya_demo_wine_overrides', JSON.stringify(raw));
    mergeWineCatalog(raw);
    syncWineViewIfOpen();
    return;
  }
  await db.collection('wine_reference').doc(wineId).delete();
}

function attachImageFallback(img, label = 'รูปไม่พร้อมแสดง') {
  if (!img || img.dataset.boundError) return;
  img.dataset.boundError = '1';
  img.addEventListener('error', () => {
    const wrap = img.parentElement;
    if (wrap) {
      wrap.classList.add('img-broken');
      if (!wrap.querySelector('.img-fallback-label')) {
        const span = document.createElement('span');
        span.className = 'img-fallback-label';
        span.textContent = label;
        wrap.appendChild(span);
      }
    }
    img.remove();
  }, { once: true });
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
          employeeCode: state.userProfile?.employeeCode || employeeCodeFromEmail(state.user.email),
          employeeCodeNorm: (state.userProfile?.employeeCode || employeeCodeFromEmail(state.user.email) || '').toUpperCase(),
          displayName: state.userProfile?.displayName || state.user.displayName || '',
          done: state.userData.done,
          favorites: state.userData.favorites,
          notes: state.userData.notes,
          progress: state.userData.progress,
          englishProgress: state.userData.englishProgress,
          quiz: state.userData.quiz,
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
  const raw = snap.exists ? snap.data() : {};
  state.userProfile = { ...(raw || {}), employeeCode: raw.employeeCode || employeeCodeFromEmail(state.user.email) };
  state.userData = mergeUserData(raw);
}


async function ensureUserDocument() {
  if (state.isDemo || !state.user) return;
  const employeeCode = (state.userProfile?.employeeCode || employeeCodeFromEmail(state.user.email) || '').toUpperCase();
  const payload = {
    email: state.user.email || '',
    employeeCode,
    employeeCodeNorm: employeeCode,
    displayName: state.userProfile?.displayName || state.user.displayName || employeeCode || '',
    role: state.userProfile?.role || 'staff',
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  };
  if (!state.userProfile?.createdAt) {
    payload.createdAt = firebase.firestore.FieldValue.serverTimestamp();
  }
  await db.collection('users').doc(state.user.uid).set(payload, { merge: true });
  state.userProfile = { ...(state.userProfile || {}), ...payload };
}

function userRole() {
  return String(state.userProfile?.role || 'staff').toLowerCase();
}

function isAdminLike() {
  return ['supervisor', 'admin'].includes(userRole());
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

function stopSettingsSubscription() {
  if (typeof state.settingsUnsub === 'function') {
    state.settingsUnsub();
    state.settingsUnsub = null;
  }
}

function subscribeQuizSettings() {
  stopSettingsSubscription();
  if (state.isDemo) {
    const raw = localStorage.getItem('laya_demo_quiz_settings');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        state.quizEnabled = parsed?.isOpen !== false;
      } catch (err) {
        state.quizEnabled = true;
      }
    } else {
      state.quizEnabled = true;
    }
    updateHeader();
    return;
  }
  if (!state.user) return;
  state.settingsUnsub = db.collection('app_settings').doc('quiz_controls').onSnapshot(snap => {
    const raw = snap.exists ? (snap.data() || {}) : {};
    state.quizEnabled = raw.isOpen !== false;
    updateHeader();
    if (!state.quizEnabled && !isAdminLike() && !quizModal.classList.contains('hidden')) {
      closeQuizModal();
      alert('แอดมินปิดการสอบชั่วคราว');
    }
  }, err => {
    console.warn('quiz settings unavailable', err);
    state.quizEnabled = true;
    updateHeader();
  });
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
  el('welcomeName').textContent = state.isDemo ? 'Quick Learning (Demo)' : `สวัสดี, ${userLabel()}`;
  el('doneCount').textContent = String(state.userData.done.length || 0);
  el('favCount').textContent = String(state.userData.favorites.length || 0);
  el('teamLessonCount').textContent = String(state.communityLessons.length || 0);
  el('syncStatus').textContent = state.isDemo ? 'เครื่องนี้' : (state.saving ? 'กำลังบันทึก...' : 'Firebase');
  el('quizBestStat').textContent = state.userData?.quiz?.bestScore ? `${state.userData.quiz.bestScore}%` : '-';
  const adminBtn = el('openAdminQuizBtn');
  if (adminBtn) adminBtn.classList.toggle('hidden', !isAdminLike());
  const adminDashboardBtn = el('openAdminDashboardBtn');
  if (adminDashboardBtn) adminDashboardBtn.classList.toggle('hidden', !isAdminLike());
  const quizBtn = el('openQuizBtn');
  if (quizBtn) {
    const locked = !state.quizEnabled && !isAdminLike();
    quizBtn.disabled = locked;
    quizBtn.textContent = locked ? 'Quiz (ปิดชั่วคราว)' : 'Quiz';
  }
}



function shuffleArray(list = []) {
  const arr = list.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pickRandom(list = [], count = 1, exclude = []) {
  const ex = new Set(exclude);
  return shuffleArray(list.filter(item => !ex.has(item))).slice(0, count);
}

function normalizeTextSnippet(text = '', max = 140) {
  const clean = String(text || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (!clean) return '';
  return clean.length > max ? clean.slice(0, max - 1).trim() + '…' : clean;
}

function buildQuizBank() {
  const questions = [];
  const pushQ = q => {
    if (!q || !q.prompt || !Array.isArray(q.options) || q.options.length < 2) return;
    if (q.correctIndex < 0 || q.correctIndex >= q.options.length) return;
    questions.push({ id: q.id || `q-${questions.length + 1}`, scope: q.scope || 'all', category: q.category || 'General', ...q });
  };

  Object.entries(ENGLISH_DATA || {}).forEach(([tab, pack]) => {
    const items = Array.isArray(pack.items) ? pack.items : [];
    items.forEach((item, idx) => {
      const wrong = pickRandom(items.map(x => x.meaning), 3, [item.meaning]);
      const options = shuffleArray([item.meaning, ...wrong]).slice(0, 4);
      pushQ({
        id: `eng-${tab}-${idx}`,
        scope: 'english',
        category: 'English',
        prompt: `คำศัพท์ "${item.term}" แปลว่าอะไร`,
        options,
        correctIndex: options.indexOf(item.meaning),
        explanation: `${item.term} อ่านว่า ${item.reading} แปลว่า ${item.meaning}`
      });
    });
  });

  const lessonCandidates = allLessons().filter(lesson => lesson.id !== 'english-fnb' && lesson.id !== 'wine-basic');
  const lessonTitles = lessonCandidates.map(l => l.title);
  lessonCandidates.forEach(lesson => {
    (lesson.sections || []).forEach((section, sIdx) => {
      const pool = [];
      if (Array.isArray(section.items)) pool.push(...section.items);
      if (section.content) pool.push(...splitLines(section.content));
      pool.filter(Boolean).slice(0, 4).forEach((fact, fIdx) => {
        const wrong = pickRandom(lessonTitles, 3, [lesson.title]);
        const options = shuffleArray([lesson.title, ...wrong]).slice(0, 4);
        pushQ({
          id: `lesson-${lesson.id}-${sIdx}-${fIdx}`,
          scope: 'lessons',
          category: lesson.category || 'Lesson',
          prompt: `ข้อมูลนี้อยู่ในหัวข้อใด

“${normalizeTextSnippet(fact, 120)}”`,
          options,
          correctIndex: options.indexOf(lesson.title),
          explanation: `ข้อนี้มาจากบท ${lesson.title} → ${section.title || 'หัวข้อย่อย'}`
        });
      });
    });
    if (lesson.summary) {
      const wrong = pickRandom(lessonTitles, 3, [lesson.title]);
      const options = shuffleArray([lesson.title, ...wrong]).slice(0, 4);
      pushQ({
        id: `lesson-summary-${lesson.id}`,
        scope: 'lessons',
        category: lesson.category || 'Lesson',
        prompt: `คำอธิบายนี้หมายถึงบทเรียนใด

“${normalizeTextSnippet(lesson.summary, 140)}”`,
        options,
        correctIndex: options.indexOf(lesson.title),
        explanation: `คำอธิบายนี้เป็น summary ของบท ${lesson.title}`
      });
    }
  });

  const wines = currentWineList();
  wines.forEach((wine, idx) => {
    const otherNames = wines.filter(w => w.id !== wine.id).map(w => w.name);
    if (wine.grape && wine.grape !== '-') {
      const options = shuffleArray([wine.grape, ...pickRandom(wines.map(w => w.grape).filter(Boolean), 3, [wine.grape])]).slice(0, 4);
      pushQ({
        id: `wine-grape-${idx}`,
        scope: 'wine',
        category: 'Wine',
        prompt: `ไวน์ ${wine.name} ใช้องุ่นอะไร`,
        options,
        correctIndex: options.indexOf(wine.grape),
        explanation: `${wine.name} ใช้องุ่น ${wine.grape}`
      });
    }
    if (wine.category && wine.category !== '-') {
      const cats = Array.from(new Set(wines.map(w => w.category).filter(Boolean)));
      const options = shuffleArray([wine.category, ...pickRandom(cats, 3, [wine.category])]).slice(0, 4);
      pushQ({
        id: `wine-cat-${idx}`,
        scope: 'wine',
        category: 'Wine',
        prompt: `${wine.name} เป็นไวน์ประเภทใด`,
        options,
        correctIndex: options.indexOf(wine.category),
        explanation: `${wine.name} จัดอยู่ในกลุ่ม ${wine.category}`
      });
    }
    if (wine.pair && wine.pair !== '-') {
      const options = shuffleArray([wine.name, ...pickRandom(otherNames, 3, [wine.name])]).slice(0, 4);
      pushQ({
        id: `wine-pair-${idx}`,
        scope: 'wine',
        category: 'Wine',
        prompt: `ไวน์ตัวใดเหมาะจับคู่กับอาหารลักษณะนี้

“${normalizeTextSnippet(wine.pair, 120)}”`,
        options,
        correctIndex: options.indexOf(wine.name),
        explanation: `${wine.name} เหมาะจับคู่กับ ${wine.pair}`
      });
    }
  });

  state.quizBank = questions;
  return questions;
}

function quizScopedBank(scope = 'all') {
  const bank = state.quizBank.length ? state.quizBank : buildQuizBank();
  if (scope === 'all') return bank;
  return bank.filter(q => q.scope === scope);
}

function quizHistoryHTML() {
  const attempts = state.userData?.quiz?.attempts || [];
  if (!attempts.length) return '<div class="empty-box">ยังไม่มีประวัติการทำ Quiz</div>';
  return attempts.slice().reverse().slice(0, 5).map(item => `
    <div class="quiz-history-item">
      <strong>${item.score}/${item.total} (${item.pct}%)</strong>
      <span>${safeHTML(item.scopeLabel || 'ทุกหัวข้อ')} · ${safeHTML(formatDate(item.attemptedAt) || '')}</span>
    </div>`).join('');
}

function openQuizModal() {
  if (!state.quizEnabled && !isAdminLike()) {
    alert('แอดมินปิดการสอบชั่วคราว');
    return;
  }
  buildQuizBank();
  el('quizBankCount').textContent = `พร้อมใช้ ${state.quizBank.length} คำถาม`;
  el('quizHistoryBox').innerHTML = quizHistoryHTML();
  el('quizHome').classList.remove('hidden');
  el('quizRunner').classList.add('hidden');
  quizModal.classList.remove('hidden');
}

function closeQuizModal() {
  state.quizSession = null;
  quizModal.classList.add('hidden');
}

function startQuizSession() {
  const count = Number(el('quizCountSelect').value || 10);
  const scope = el('quizScopeSelect').value || 'all';
  const bank = quizScopedBank(scope);
  if (bank.length < 2) {
    alert('คำถามยังไม่พอสำหรับหมวดนี้');
    return;
  }
  state.quizSession = {
    scope,
    scopeLabel: el('quizScopeSelect').selectedOptions[0]?.textContent || 'ทุกหัวข้อ',
    questions: shuffleArray(bank).slice(0, Math.min(count, bank.length)),
    current: 0,
    answers: []
  };
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const session = state.quizSession;
  if (!session) return;
  if (session.current >= session.questions.length) {
    renderQuizResult();
    return;
  }
  const q = session.questions[session.current];
  el('quizHome').classList.add('hidden');
  const wrap = el('quizRunner');
  wrap.classList.remove('hidden');
  wrap.dataset.answered = '0';
  wrap.innerHTML = `
    <div class="quiz-progress-row">
      <div class="tag-row"><span class="tag">${safeHTML(q.category)}</span><span class="tag">ข้อ ${session.current + 1}/${session.questions.length}</span></div>
      <div class="mini-meta">${safeHTML(session.scopeLabel)}</div>
    </div>
    <div class="section-box">
      <h3 class="quiz-prompt">${safeHTML(q.prompt).replace(/\n/g, '<br>')}</h3>
      <div class="quiz-options">
        ${q.options.map((opt, index) => `<button class="quiz-option" data-opt="${index}" type="button">${safeHTML(opt)}</button>`).join('')}
      </div>
      <div id="quizFeedback" class="hidden"></div>
    </div>
    <div class="editor-actions">
      <button id="cancelQuizRunBtn" class="ghost-btn" type="button">ยกเลิก Quiz</button>
      <div class="editor-actions-right"><button id="nextQuizBtn" class="primary-btn hidden" type="button">ข้อต่อไป</button></div>
    </div>
  `;
  wrap.querySelectorAll('[data-opt]').forEach(btn => btn.addEventListener('click', () => {
    if (wrap.dataset.answered === '1') return;
    wrap.dataset.answered = '1';
    const chosen = Number(btn.dataset.opt);
    const correct = chosen === q.correctIndex;
    session.answers.push({ questionId: q.id, category: q.category, correct, chosenIndex: chosen, correctIndex: q.correctIndex });
    wrap.querySelectorAll('[data-opt]').forEach(node => {
      const idx = Number(node.dataset.opt);
      node.disabled = true;
      node.classList.toggle('correct', idx === q.correctIndex);
      node.classList.toggle('wrong', idx === chosen && idx !== q.correctIndex);
    });
    const feedback = el('quizFeedback');
    feedback.classList.remove('hidden');
    feedback.className = `quiz-feedback ${correct ? 'ok' : 'bad'}`;
    feedback.innerHTML = `<strong>${correct ? 'ตอบถูก' : 'ยังไม่ถูก'}</strong><div>${safeHTML(q.explanation || '')}</div>`;
    el('nextQuizBtn').classList.remove('hidden');
  }));
  el('nextQuizBtn').onclick = () => { session.current += 1; renderQuizQuestion(); };
  el('cancelQuizRunBtn').onclick = closeQuizModal;
}

async function saveQuizAttempt(result) {
  state.userData.quiz ||= { attempts: [], bestScore: 0, lastScore: 0, lastAttemptAt: '' };
  state.userData.quiz.attempts = [...state.userData.quiz.attempts.slice(-9), result];
  state.userData.quiz.lastScore = result.pct;
  state.userData.quiz.bestScore = Math.max(Number(state.userData.quiz.bestScore || 0), result.pct);
  state.userData.quiz.lastAttemptAt = result.attemptedAt;
  await saveUserData(true);
  if (state.isDemo || !state.user) return;
  await db.collection('quiz_attempts').add({
    userUid: state.user.uid,
    userName: userLabel(),
    userEmail: state.user.email || '',
    employeeCode: state.userProfile?.employeeCode || '',
    role: userRole(),
    scope: result.scope,
    scopeLabel: result.scopeLabel,
    score: result.score,
    total: result.total,
    pct: result.pct,
    categoryStats: result.categoryStats,
    strengths: result.strengths,
    weaknesses: result.weaknesses,
    answers: result.answers,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

async function renderQuizResult() {
  const session = state.quizSession;
  const total = session.questions.length;
  const score = session.answers.filter(a => a.correct).length;
  const pct = Math.round((score / Math.max(total, 1)) * 100);
  const grouped = {};
  session.answers.forEach(a => {
    grouped[a.category] ||= { correct: 0, total: 0 };
    grouped[a.category].total += 1;
    if (a.correct) grouped[a.category].correct += 1;
  });
  const categoryStats = Object.fromEntries(Object.entries(grouped).map(([k,v]) => [k, { ...v, pct: Math.round((v.correct / Math.max(v.total,1))*100) }]));
  const sortedCats = Object.entries(categoryStats).sort((a,b)=> b[1].pct - a[1].pct);
  const result = {
    scope: session.scope,
    scopeLabel: session.scopeLabel,
    score,
    total,
    pct,
    answers: session.answers,
    categoryStats,
    strengths: sortedCats.slice(0,2).map(([k]) => k),
    weaknesses: sortedCats.slice(-2).map(([k]) => k),
    attemptedAt: new Date().toISOString()
  };
  try {
    await saveQuizAttempt(result);
  } catch (err) {
    console.error('saveQuizAttempt failed', err);
  }
  const wrap = el('quizRunner');
  wrap.innerHTML = `
    <div class="section-box">
      <h3>สรุปผล Quiz</h3>
      <div class="quiz-result-score">${score}/${total} <span>${pct}%</span></div>
      <div class="admin-summary-grid">
        ${Object.entries(categoryStats).map(([cat, stat]) => `<div class="stat-card"><span>${safeHTML(cat)}</span><strong>${stat.correct}/${stat.total}</strong><div class="mini-meta">${stat.pct}%</div></div>`).join('')}
      </div>
      <div class="quiz-info-box"><strong>จุดเด่น:</strong> ${safeHTML(result.strengths.join(', ') || '-')}<br><strong>ควรพัฒนาเพิ่ม:</strong> ${safeHTML(result.weaknesses.join(', ') || '-')}</div>
    </div>
    <div class="editor-actions">
      <button id="quizBackHomeBtn" class="ghost-btn" type="button">กลับหน้า Quiz</button>
      <div class="editor-actions-right"><button id="quizRetryBtn" class="primary-btn" type="button">สุ่มใหม่อีกครั้ง</button></div>
    </div>
  `;
  el('quizBackHomeBtn').onclick = openQuizModal;
  el('quizRetryBtn').onclick = startQuizSession;
  updateHeader();
}

async function loadAdminQuizDashboard() {
  if (!isAdminLike()) return;
  el('adminQuizMeta').textContent = 'กำลังโหลดข้อมูล...';
  if (state.isDemo) {
    const quizRaw = localStorage.getItem('laya_demo_quiz_settings');
    let demoOpen = true;
    if (quizRaw) {
      try { demoOpen = JSON.parse(quizRaw)?.isOpen !== false; } catch (err) {}
    }
    state.quizEnabled = demoOpen;
    el('adminQuizControlStatus').textContent = demoOpen ? 'เปิดสอบอยู่' : 'ปิดสอบอยู่';
    el('toggleQuizStatusBtn').textContent = demoOpen ? 'ปิดการสอบ' : 'เปิดการสอบ';
    el('adminQuizMeta').textContent = 'Demo mode ไม่มีข้อมูลทีมใน Firebase';
    el('adminQuizSummary').innerHTML = '<div class="stat-card"><span>โหมด</span><strong>Demo</strong></div>';
    el('adminAllAccounts').innerHTML = '<div class="empty-box">Demo mode ไม่มีรายชื่อพนักงานทั้งหมด</div>';
    el('adminQuizUsers').innerHTML = '<div class="empty-box">Demo mode ไม่มีรายงานการอ่านทีม</div>';
    el('adminQuizAttempts').innerHTML = '<div class="empty-box">Demo mode ไม่มีข้อมูลคะแนนทีม</div>';
    return;
  }

  const [attemptSnap, userSnap, settingSnap] = await Promise.all([
    db.collection('quiz_attempts').orderBy('createdAt', 'desc').limit(300).get().catch(() => ({ docs: [] })),
    db.collection('users').orderBy('employeeCodeNorm').limit(500).get().catch(() => ({ docs: [] })),
    db.collection('app_settings').doc('quiz_controls').get().catch(() => ({ exists: false, data: () => ({}) }))
  ]);

  state.adminQuizData = (attemptSnap.docs || []).map(doc => ({ id: doc.id, ...(doc.data() || {}) }));
  state.adminUsersData = (userSnap.docs || []).map(doc => ({ id: doc.id, ...(doc.data() || {}) }));
  const settings = settingSnap.exists ? (settingSnap.data() || {}) : {};
  state.quizEnabled = settings.isOpen !== false;

  el('adminQuizControlStatus').textContent = state.quizEnabled ? 'เปิดสอบอยู่' : 'ปิดสอบอยู่';
  el('toggleQuizStatusBtn').textContent = state.quizEnabled ? 'ปิดการสอบ' : 'เปิดการสอบ';

  const attempts = state.adminQuizData;
  const users = state.adminUsersData;
  el('adminQuizMeta').textContent = `บัญชี ${users.length} คน · ข้อมูลสอบ ${attempts.length} รายการ`;

  const avg = attempts.length ? Math.round(attempts.reduce((s,a)=>s+Number(a.pct||0),0)/attempts.length) : 0;
  const completedReaders = users.filter(u => Array.isArray(u.done) && u.done.length).length;
  const activeReaders = users.filter(u => Object.keys(u.progress || {}).length || Object.keys(u.englishProgress || {}).length).length;
  el('adminQuizSummary').innerHTML = `
    <div class="stat-card"><span>บัญชีทั้งหมด</span><strong>${users.length}</strong></div>
    <div class="stat-card"><span>ผู้ทำแบบทดสอบ</span><strong>${new Set(attempts.map(a => a.userUid || a.employeeCode || a.userName)).size}</strong></div>
    <div class="stat-card"><span>คะแนนเฉลี่ยทีม</span><strong>${avg}%</strong></div>
    <div class="stat-card"><span>ผู้มีความคืบหน้าการอ่าน</span><strong>${activeReaders}</strong></div>
    <div class="stat-card"><span>อ่านจบอย่างน้อย 1 บท</span><strong>${completedReaders}</strong></div>
  `;

  const userMap = {};
  users.forEach(u => {
    const key = u.id;
    const lessonProgress = u.progress || {};
    const englishProgress = u.englishProgress || {};
    const lessonOpened = Object.values(lessonProgress).reduce((sum, item) => sum + Number(item?.openedCount || 0), 0);
    const englishOpened = Object.values(englishProgress).reduce((sum, item) => sum + Number(item?.openedCount || 0), 0);
    const allDates = [];
    Object.values(lessonProgress).forEach(item => { if (item?.lastOpenedAt) allDates.push(item.lastOpenedAt); if (item?.completedAt) allDates.push(item.completedAt); });
    Object.values(englishProgress).forEach(item => { if (item?.lastOpenedAt) allDates.push(item.lastOpenedAt); if (item?.completedAt) allDates.push(item.completedAt); });
    if (u.quiz?.lastAttemptAt) allDates.push(u.quiz.lastAttemptAt);
    const categoryBuckets = {};
    userMap[key] = {
      uid: key,
      employeeCode: u.employeeCode || '-',
      displayName: u.displayName || '',
      role: u.role || 'staff',
      doneCount: Array.isArray(u.done) ? u.done.length : 0,
      favoriteCount: Array.isArray(u.favorites) ? u.favorites.length : 0,
      lessonOpened,
      englishOpened,
      totalOpened: lessonOpened + englishOpened,
      best: Number(u.quiz?.bestScore || 0),
      latest: Number(u.quiz?.lastScore || 0),
      attempts: Array.isArray(u.quiz?.attempts) ? u.quiz.attempts.length : 0,
      lastActivity: allDates.length ? allDates.sort().slice(-1)[0] : '',
      categories: categoryBuckets
    };
  });

  attempts.forEach(a => {
    const key = a.userUid || '';
    if (!userMap[key]) {
      userMap[key] = {
        uid: key,
        employeeCode: a.employeeCode || '-',
        displayName: a.userName || '',
        role: a.role || 'staff',
        doneCount: 0,
        favoriteCount: 0,
        lessonOpened: 0,
        englishOpened: 0,
        totalOpened: 0,
        best: 0, latest: 0, attempts: 0, lastActivity: '', categories: {}
      };
    }
    userMap[key].best = Math.max(userMap[key].best, Number(a.pct || 0));
    userMap[key].latest = Math.max(userMap[key].latest, Number(a.pct || 0));
    userMap[key].attempts += 1;
    userMap[key].lastActivity = a.createdAt || userMap[key].lastActivity;
    Object.entries(a.categoryStats || {}).forEach(([cat, stat]) => {
      userMap[key].categories[cat] ||= { correct: 0, total: 0 };
      userMap[key].categories[cat].correct += Number(stat.correct || 0);
      userMap[key].categories[cat].total += Number(stat.total || 0);
    });
  });

  const userList = Object.values(userMap).map(u => {
    const ranking = Object.entries(u.categories).map(([cat, stat]) => ({ cat, pct: Math.round((stat.correct / Math.max(stat.total,1))*100) })).sort((a,b)=>b.pct-a.pct);
    return {
      ...u,
      strengths: ranking.slice(0,2).map(x=>`${x.cat} ${x.pct}%`),
      needs: ranking.slice(-2).map(x=>`${x.cat} ${x.pct}%`)
    };
  }).sort((a,b)=> (b.best || 0) - (a.best || 0) || String(a.employeeCode).localeCompare(String(b.employeeCode)));

  el('adminAllAccounts').innerHTML = userList.length ? userList.map(u => `
    <div class="admin-user-card">
      <div><strong>${safeHTML(u.employeeCode || '-')}</strong><div class="mini-meta">${safeHTML(u.displayName || 'ไม่มีชื่อ')} · ${safeHTML(String(u.role || 'staff'))}</div></div>
      <div class="admin-user-skills"><span><strong>UID:</strong> ${safeHTML(u.uid || '-')}</span><span><strong>สถานะสอบ:</strong> ${u.attempts ? 'เคยสอบ' : 'ยังไม่เคยสอบ'}</span></div>
    </div>`).join('') : '<div class="empty-box">ยังไม่มีรายชื่อพนักงาน</div>';

  el('adminQuizUsers').innerHTML = userList.length ? userList.map(u => `
    <div class="admin-user-card">
      <div><strong>${safeHTML(u.employeeCode || '-')} · ${safeHTML(u.displayName || 'ไม่มีชื่อ')}</strong><div class="mini-meta">บทอ่านจบ ${u.doneCount} · โปรด ${u.favoriteCount} · เปิดอ่าน ${u.totalOpened} ครั้ง · ล่าสุด ${safeHTML(formatDate(u.lastActivity) || '-')}</div></div>
      <div class="admin-user-skills">
        <span><strong>เด่น:</strong> ${safeHTML(u.strengths.join(', ') || '-')}</span>
        <span><strong>ควรพัฒนา:</strong> ${safeHTML(u.needs.join(', ') || '-')}</span>
        <span><strong>Quiz:</strong> ล่าสุด ${u.latest || 0}% · สูงสุด ${u.best || 0}% · ${u.attempts} ครั้ง</span>
      </div>
    </div>`).join('') : '<div class="empty-box">ยังไม่มีรายงานการอ่านทีม</div>';

  el('adminQuizAttempts').innerHTML = attempts.length ? attempts.slice(0,50).map(a => `
    <div class="admin-attempt-card">
      <strong>${safeHTML(a.employeeCode || a.userName || a.userEmail || 'Unknown')}</strong>
      <span>${a.score}/${a.total} (${a.pct}%) · ${safeHTML(a.scopeLabel || 'ทุกหัวข้อ')} · ${safeHTML(formatDate(a.createdAt) || '')}</span>
    </div>`).join('') : '<div class="empty-box">ยังไม่มีประวัติการทำ Quiz</div>';
}

async function toggleQuizAvailability() {
  if (!isAdminLike()) return;
  const next = !state.quizEnabled;
  if (state.isDemo) {
    state.quizEnabled = next;
    localStorage.setItem('laya_demo_quiz_settings', JSON.stringify({ isOpen: next, updatedAt: new Date().toISOString() }));
    updateHeader();
    await loadAdminQuizDashboard();
    return;
  }
  await db.collection('app_settings').doc('quiz_controls').set({
    isOpen: next,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedByUid: state.user?.uid || '',
    updatedByCode: state.userProfile?.employeeCode || ''
  }, { merge: true });
}

function openAdminQuizModal() {
  if (!isAdminLike()) return;
  adminQuizModal.classList.remove('hidden');
  loadAdminQuizDashboard().catch(err => {
    console.error(err);
    el('adminQuizMeta').textContent = 'โหลดข้อมูลไม่สำเร็จ';
  });
}

function closeAdminQuizModal() {
  adminQuizModal.classList.add('hidden');
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
  buildQuizBank();
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
  const alert = wine.incomplete
    ? `<div class="wine-edit-alert">ข้อมูลขวดนี้ยังไม่ครบ กดปุ่ม <strong>แก้ไขข้อมูลไวน์</strong> เพื่อใส่ชื่อไวน์ คำอ่าน และรายละเอียดเพิ่มเติมได้</div>`
    : '';
  const updatedText = wine.updatedAt ? `อัปเดตล่าสุด ${safeHTML(formatDate(wine.updatedAt))}` : '';
  return `
    <div class="wine-detail-card">
      <div class="wine-detail-image-wrap">
        <img src="${safeHTML(wine.image)}" alt="${safeHTML(wine.name)}" loading="lazy">
      </div>
      <div class="wine-detail-copy">
        <div class="wine-detail-top">
          <div class="tag-row">
            <span class="tag">${safeHTML(wine.category || 'Wine')}</span>
            <span class="tag">${safeHTML(wine.vintage || 'NV')}</span>
            <span class="tag">${safeHTML(wine.vineyard || '-')}</span>
            ${wine.incomplete ? '<span class="tag incomplete-tag">ข้อมูลยังไม่ครบ</span>' : ''}
          </div>
          <button id="editWineBtn" class="ghost-btn wine-edit-btn" type="button">แก้ไขข้อมูลไวน์</button>
        </div>
        <h4>${safeHTML(wine.name)}</h4>
        <p class="wine-detail-pronounce">คำอ่าน: ${safeHTML(wine.pronunciation || '-')}</p>
        ${alert}
        <div class="wine-detail-grid">
          <div class="wine-detail-item"><span>องุ่น</span><strong>${safeHTML(wine.grape || '-')}</strong></div>
          <div class="wine-detail-item"><span>สไตล์</span><strong>${safeHTML(wine.category || '-')}</strong></div>
          <div class="wine-detail-item wide"><span>รสชาติ</span><strong>${safeHTML(wine.taste || '-')}</strong></div>
          <div class="wine-detail-item wide"><span>จับคู่อาหาร</span><strong>${safeHTML(wine.pair || '-')}</strong></div>
          <div class="wine-detail-item wide"><span>วิธีพูดกับแขก</span><strong>${safeHTML(wine.en || '-')}</strong></div>
        </div>
        <div class="mini-meta">${safeHTML(updatedText || `ไฟล์อ้างอิง: ${wine.sourceFile || '-'}`)}</div>
      </div>
    </div>
  `;
}

function renderWineMedia() {
  const wines = currentWineList();
  const selected = wines[state.currentWineIndex] || wines[0];
  const sourceLabel = state.wineCatalogSource === 'firebase'
    ? 'รายการขวดในส่วนนี้ดึงจาก Firebase แล้ว'
    : 'รายการขวดชุดนี้ยังใช้จากไฟล์ในระบบ และจะถูกเพิ่มเข้า Firebase อัตโนมัติเมื่อเปิดหน้านี้หลังล็อกอิน';
  return `
    <section class="wine-box">
      <div class="wine-head wine-head-modern">
        <div>
          <h3>Wine Reference Bottles (${wines.length} ขวด)</h3>
          <p class="small">รวมรูปขวดไวน์ทั้งหมดที่อัปโหลดไว้ในบทเดียว กดที่ขวดเพื่อเปิดรายละเอียดด้านล่าง และถ้าข้อมูลยังไม่ครบสามารถกดแก้ไขแล้วบันทึกเข้า Firebase ได้เลย</p>
          <div class="mini-meta">${safeHTML(sourceLabel)}</div>
        </div>
        <div class="wine-head-actions">
          ${!state.isDemo && state.user ? '<button id="syncWineCatalogBtn" class="ghost-btn" type="button">เพิ่มรายการส่วนนี้เข้า Firebase</button>' : ''}
          <div class="wine-hint">แตะรูปขวดเพื่อดูรายละเอียด</div>
        </div>
      </div>
      <div class="wine-grid">
        ${wines.map((wine, index) => `
          <button class="wine-tile ${index === state.currentWineIndex ? 'active' : ''}" data-wine-index="${index}" type="button">
            <div class="wine-tile-image">
              <img src="${safeHTML(wine.image)}" alt="${safeHTML(wine.name)}" loading="lazy">
            </div>
            ${wine.incomplete ? '<div class="wine-tile-status">ต้องเพิ่มข้อมูล</div>' : ''}
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

  const syncBtn = document.getElementById('syncWineCatalogBtn');
  if (syncBtn) {
    syncBtn.addEventListener('click', async () => {
      if (state.syncingWineCatalog) return;
      state.syncingWineCatalog = true;
      syncBtn.disabled = true;
      const original = syncBtn.textContent;
      syncBtn.textContent = 'กำลังเพิ่มเข้า Firebase...';
      try {
        await bootstrapWineCatalogToFirebase();
        syncBtn.textContent = 'เพิ่มรายการส่วนนี้เข้า Firebase แล้ว';
      } catch (err) {
        console.error(err);
        syncBtn.textContent = 'เพิ่มเข้า Firebase ไม่สำเร็จ';
      } finally {
        setTimeout(() => {
          state.syncingWineCatalog = false;
          syncBtn.disabled = false;
          syncBtn.textContent = original;
        }, 1600);
      }
    });
  }

  const wireCurrentDetail = () => {
    panel.querySelectorAll('.wine-detail-image-wrap img').forEach(img => attachImageFallback(img, 'รูปขวดไม่พร้อมแสดง'));
    const editBtn = document.getElementById('editWineBtn');
    if (editBtn) editBtn.onclick = () => openWineEditor(currentWine());
  };

  readerSection.querySelectorAll('.wine-tile-image img').forEach(img => attachImageFallback(img, 'รูปขวดไม่พร้อมแสดง'));

  readerSection.querySelectorAll('[data-wine-index]').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = Number(btn.dataset.wineIndex || 0);
      state.currentWineIndex = index;
      const wine = currentWineList()[index] || currentWineList()[0];
      readerSection.querySelectorAll('[data-wine-index]').forEach(tile => tile.classList.toggle('active', tile === btn));
      panel.innerHTML = renderWineDetail(wine);
      wireCurrentDetail();
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  wireCurrentDetail();
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


function fillWineEditor(wine) {
  if (!wine) return;
  state.editingWineId = wine.id;
  el('wineEditorTitle').textContent = `แก้ไขข้อมูลไวน์: ${wine.name}`;
  el('wineEditorSubtitle').textContent = wine.incomplete
    ? 'ขวดนี้ยังมีข้อมูลไม่ครบ สามารถเติมชื่อไวน์ คำอ่าน รสชาติ หรือจับคู่อาหาร แล้วกดบันทึกได้เลย หากกรอกผิดสามารถลบข้อมูลที่แก้เพิ่มเพื่อกลับไปใช้ข้อมูลเดิมได้'
    : 'แก้ไขรายละเอียดไวน์ขวดนี้ แล้วกดบันทึกเพื่ออัปเดตคลังความรู้ร่วมกัน หากกรอกผิดสามารถลบข้อมูลที่แก้เพิ่มได้';
  el('wineName').value = editableWineValue('name', wine.name);
  el('winePronunciation').value = editableWineValue('pronunciation', wine.pronunciation);
  el('wineCategory').value = editableWineValue('category', wine.category || 'Wine');
  el('wineVintage').value = editableWineValue('vintage', wine.vintage);
  el('wineVineyard').value = editableWineValue('vineyard', wine.vineyard);
  el('wineGrape').value = editableWineValue('grape', wine.grape);
  el('wineTaste').value = editableWineValue('taste', wine.taste);
  el('winePair').value = editableWineValue('pair', wine.pair);
  el('wineEn').value = editableWineValue('en', wine.en);
  el('wineMsg').textContent = '';
  el('winePreviewBox').innerHTML = wine.image
    ? `<img src="${safeHTML(wine.image)}" alt="${safeHTML(wine.name)}" loading="lazy"><div class="mini-meta">รูปขวดใช้จากคลังกลางของระบบ${safeHTML(wine.sourceFile ? ' • ' + wine.sourceFile : '')}</div>`
    : '<div class="preview-empty">ยังไม่มีรูปขวดในรายการนี้</div>';
  el('winePreviewBox').querySelectorAll('img').forEach(img => attachImageFallback(img, 'รูปขวดไม่พร้อมแสดง'));
}

function openWineEditor(wine) {
  if (!wine) return;
  if (!state.isDemo && !state.user) {
    alert('กรุณาเข้าสู่ระบบก่อนแก้ไขข้อมูลไวน์');
    return;
  }
  fillWineEditor(wine);
  wineModal.classList.remove('hidden');
}

function closeWineEditor() {
  state.editingWineId = null;
  el('wineForm').reset();
  el('wineMsg').textContent = '';
  el('winePreviewBox').innerHTML = '';
  wineModal.classList.add('hidden');
}

function buildWinePayload() {
  const payload = {
    name: el('wineName').value.trim(),
    pronunciation: el('winePronunciation').value.trim(),
    category: el('wineCategory').value.trim() || 'Wine',
    vintage: el('wineVintage').value.trim(),
    vineyard: el('wineVineyard').value.trim(),
    grape: el('wineGrape').value.trim(),
    taste: el('wineTaste').value.trim(),
    pair: el('winePair').value.trim(),
    en: el('wineEn').value.trim()
  };
  return payload;
}

async function handleWineSave() {
  if (!state.editingWineId || state.savingWine) return;
  state.savingWine = true;
  el('wineMsg').textContent = '';
  try {
    const payload = buildWinePayload();
    await saveWineOverride(state.editingWineId, payload);
    closeWineEditor();
  } catch (err) {
    el('wineMsg').textContent = err.message || 'บันทึกข้อมูลไวน์ไม่สำเร็จ';
  } finally {
    state.savingWine = false;
  }
}

backBtn.addEventListener('click', closeLesson);
el('searchInput').addEventListener('input', e => { state.search = e.target.value; renderLessons(); });
addLessonBtn.addEventListener('click', openEditor);

openEditorSecondaryBtn.addEventListener('click', openEditor);
el('openQuizBtn').addEventListener('click', openQuizModal);
el('closeQuizBtn').addEventListener('click', closeQuizModal);
quizModal.querySelectorAll('[data-close-quiz="true"]').forEach(node => node.addEventListener('click', closeQuizModal));
el('startQuizBtn').addEventListener('click', startQuizSession);
el('openAdminQuizBtn').addEventListener('click', openAdminQuizModal);
el('openAdminDashboardBtn')?.addEventListener('click', () => window.open('admin.html', '_blank'));
el('closeAdminQuizBtn').addEventListener('click', closeAdminQuizModal);
adminQuizModal.querySelectorAll('[data-close-admin-quiz="true"]').forEach(node => node.addEventListener('click', closeAdminQuizModal));
el('refreshAdminQuizBtn').addEventListener('click', () => loadAdminQuizDashboard());
el('toggleQuizStatusBtn').addEventListener('click', () => toggleQuizAvailability().catch(err => alert(err.message || 'เปลี่ยนสถานะสอบไม่สำเร็จ')));
el('exportAdminQuizBtn').addEventListener('click', () => {
  const data = JSON.stringify(state.adminQuizData || [], null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `quiz-attempts-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
});
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
el('closeWineBtn').addEventListener('click', closeWineEditor);
el('cancelWineBtn').addEventListener('click', closeWineEditor);
wineModal.querySelectorAll('[data-close-wine="true"]').forEach(node => node.addEventListener('click', closeWineEditor));
el('resetWineBtn').addEventListener('click', () => {
  const wine = currentWine();
  if (wine) fillWineEditor(wine);
});
el('deleteWineOverrideBtn').addEventListener('click', async () => {
  if (!state.editingWineId) return;
  if (!confirm('ต้องการลบข้อมูลที่แก้เพิ่มของขวดนี้ และกลับไปใช้ข้อมูลเดิมใช่หรือไม่')) return;
  try {
    await clearWineOverride(state.editingWineId);
    closeWineEditor();
  } catch (err) {
    el('wineMsg').textContent = err.message || 'ลบข้อมูลไวน์ไม่สำเร็จ';
  }
});
el('wineForm').addEventListener('submit', async e => {
  e.preventDefault();
  await handleWineSave();
});

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
  state.userProfile = { displayName: 'Demo User', employeeCode: 'DEMO', role: 'admin' };
  await loadUserData();
  subscribeCommunityLessons();
  subscribeWineCatalog();
  subscribeWineReference();
  subscribeQuizSettings();
  authView.classList.add('hidden');
  mainView.classList.remove('hidden');
  closeLesson();
});

el('authForm').addEventListener('submit', async e => {
  e.preventDefault();
  const employeeCodeInput = el('employeeCode').value.trim();
  const password = el('password').value;
  const displayName = el('displayName').value.trim();
  el('authMsg').textContent = '';
  try {
    const employeeCode = normalizeEmployeeCode(employeeCodeInput);
    const email = employeeCodeToEmail(employeeCode);
    if (state.mode === 'login') {
      await auth.signInWithEmailAndPassword(email, password);
    } else {
      const cred = await auth.createUserWithEmailAndPassword(email, password);
      if (displayName) await cred.user.updateProfile({ displayName });
      await db.collection('users').doc(cred.user.uid).set({
        email,
        employeeCode,
        employeeCodeNorm: employeeCode,
        displayName,
        role: 'staff',
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
  stopWineSubscription();
  stopWineCatalogSubscription();
  stopSettingsSubscription();
  if (state.isDemo) {
    state.isDemo = false;
    state.user = null;
    state.userProfile = null;
    state.communityLessons = [];
    state.quizBank = [];
    state.wineCatalogSource = 'local';
    setWineBaseCatalog(BASE_WINE_MEDIA, 'local');
    mergeWineCatalog({});
    authView.classList.remove('hidden');
    mainView.classList.add('hidden');
    closeEditor();
    closeWineEditor();
    return;
  }
  await auth.signOut();
});

auth.onAuthStateChanged(async user => {
  stopCommunitySubscription();
  stopWineSubscription();
  stopWineCatalogSubscription();
  stopSettingsSubscription();
  if (user) {
    state.isDemo = false;
    state.user = user;
    await loadUserData();
    await ensureUserDocument();
    await loadUserData();
    buildQuizBank();
    subscribeCommunityLessons();
    subscribeWineCatalog();
    subscribeWineReference();
    subscribeQuizSettings();
    authView.classList.add('hidden');
    mainView.classList.remove('hidden');
    closeLesson();
  } else if (!state.isDemo) {
    state.user = null;
    state.userProfile = null;
    state.communityLessons = [];
    state.quizBank = [];
    state.wineCatalogSource = 'local';
    setWineBaseCatalog(BASE_WINE_MEDIA, 'local');
    mergeWineCatalog({});
    authView.classList.remove('hidden');
    mainView.classList.add('hidden');
  }
});

setAuthMode('login');
mergeWineCatalog({});
renderLessons();
