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
const QUIZ_BANK = window.QUIZ_BANK || [];
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
  quizHistory: [],
  quizSummary: { attempts: 0, bestScore: 0, lastScore: 0, byCategory: {} }
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
  accountProfile: null,
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
  currentQuiz: null,
  smartGeneratedQuiz: []
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

function safeHTML(text) {
  return String(text ?? '').replace(/[&<>"']/g, s => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[s]));
}

function userLabel() {
  if (state.isDemo) return 'Demo User';
  return state.user?.displayName
    || state.accountProfile?.displayName
    || state.accountProfile?.employeeCode
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
  merged.quizHistory = Array.isArray(raw.quizHistory) ? raw.quizHistory : [];
  merged.quizSummary = raw.quizSummary && typeof raw.quizSummary === 'object' ? raw.quizSummary : { attempts: 0, bestScore: 0, lastScore: 0, byCategory: {} };

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
          displayName: state.user.displayName || state.accountProfile?.displayName || '',
          employeeCode: state.accountProfile?.employeeCode || employeeCodeFromEmail(state.user.email),
          employeeCodeNorm: (state.accountProfile?.employeeCode || employeeCodeFromEmail(state.user.email) || '').toUpperCase(),
          role: state.accountProfile?.role || 'staff',
          done: state.userData.done,
          favorites: state.userData.favorites,
          notes: state.userData.notes,
          progress: state.userData.progress,
          englishProgress: state.userData.englishProgress,
          quizHistory: state.userData.quizHistory,
          quizSummary: state.userData.quizSummary,
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
  state.accountProfile = {
    employeeCode: raw.employeeCode || employeeCodeFromEmail(state.user.email),
    displayName: raw.displayName || state.user.displayName || '',
    role: raw.role || 'staff'
  };
  if (!raw.role && state.user) {
    db.collection('users').doc(state.user.uid).set({ role: 'staff' }, { merge: true }).catch(() => {});
  }
  state.userData = mergeUserData(raw);
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
  el('quizBestScore').textContent = `${Math.round(state.userData.quizSummary?.bestScore || 0)}%`;
  const sync = el('syncStatus');
  if (state.saving) sync.textContent = 'กำลังบันทึก...';
  else sync.textContent = state.isDemo ? 'บันทึกในเครื่องนี้' : 'บันทึกในบัญชี Firebase';
  const adminBtn = el('adminDashBtn');
  if (adminBtn) adminBtn.classList.toggle('hidden', !isAdminLike());
}



function isAdminLike() {
  return ['admin', 'supervisor'].includes((state.accountProfile?.role || '').toLowerCase());
}

function quizSourceOptions() {
  return [
    { value: 'curated', label: 'คลังข้อสอบหลัก' },
    { value: 'team', label: 'สร้างจากบทเรียนทีม' },
    { value: 'smart', label: 'Smart Mix ทุกความรู้' }
  ];
}

function uniqueNonEmpty(list = []) {
  return Array.from(new Set((list || []).map(item => String(item || '').trim()).filter(Boolean)));
}

function collectLessonFacts(lessons = []) {
  return lessons.flatMap(lesson => {
    const facts = [];
    (lesson.sections || []).forEach(section => {
      const sectionTitle = String(section.title || '').trim();
      const contentLines = String(section.content || '')
        .split(/\n+/)
        .map(line => line.replace(/^[-•\d\.\)\s]+/, '').trim())
        .filter(line => line.length > 4);
      const itemLines = (section.items || []).map(item => String(item || '').replace(/^[-•\d\.\)\s]+/, '').trim()).filter(Boolean);
      [...contentLines, ...itemLines].forEach(line => {
        facts.push({
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          category: lesson.category || 'Team Knowledge',
          sectionTitle: sectionTitle || 'Key Point',
          value: line
        });
      });
    });
    return facts;
  });
}

function buildLessonGeneratedQuestions(lessons = [], sourceTag = 'team') {
  const facts = collectLessonFacts(lessons);
  const allFactValues = uniqueNonEmpty(facts.map(f => f.value));
  const questions = [];
  let counter = 1;
  facts.forEach(fact => {
    const distractors = uniqueNonEmpty(allFactValues.filter(item => item !== fact.value)).slice(0, 3);
    if (distractors.length < 3) return;
    const choices = shuffle([fact.value, ...distractors]).slice(0, 4);
    questions.push({
      id: `${sourceTag}-lesson-${counter++}`,
      category: fact.category || 'Team Knowledge',
      lessonId: fact.lessonId,
      prompt: `ข้อใดเป็นข้อมูลที่อยู่ในหัวข้อ "${fact.sectionTitle}" ของบทเรียน "${fact.lessonTitle}"?`,
      choices,
      answer: choices.indexOf(fact.value),
      explanation: `คำตอบมาจากบทเรียน "${fact.lessonTitle}" ในหัวข้อ "${fact.sectionTitle}".`,
      source: sourceTag
    });
  });
  return questions;
}

function buildEnglishQuestions() {
  const questions = [];
  let counter = 1;
  Object.entries(ENGLISH_DATA || {}).forEach(([tab, rows]) => {
    (rows || []).slice(0, 80).forEach(row => {
      const term = String(row.term || row.word || '').trim();
      const thai = String(row.thai || row.translation || '').trim();
      if (!term || !thai) return;
      const pool = Object.values(ENGLISH_DATA || {}).flat().map(item => String(item.thai || item.translation || '').trim()).filter(Boolean);
      const distractors = uniqueNonEmpty(pool.filter(item => item !== thai)).slice(0, 3);
      if (distractors.length < 3) return;
      const choices = shuffle([thai, ...distractors]).slice(0, 4);
      questions.push({
        id: `smart-eng-${counter++}`,
        category: 'English',
        lessonId: 'english-fb',
        prompt: `"${term}" แปลว่าอะไรในงาน F&B?`,
        choices,
        answer: choices.indexOf(thai),
        explanation: `${term} = ${thai}`,
        source: 'smart'
      });
    });
  });
  return questions;
}

function buildWineQuestions() {
  const wines = currentWineList();
  const questions = [];
  let counter = 1;
  wines.forEach(wine => {
    const name = String(wine.name || '').trim();
    if (!name) return;
    if (wine.grape) {
      const correct = wine.grape;
      const distractors = uniqueNonEmpty(wines.map(item => item.grape).filter(Boolean)).filter(item => item !== correct).slice(0, 3);
      if (distractors.length >= 3) {
        const choices = shuffle([correct, ...distractors]).slice(0, 4);
        questions.push({
          id: `smart-wine-${counter++}`,
          category: 'Wine',
          lessonId: 'wine-basic',
          prompt: `องุ่นหลักของ "${name}" คือข้อใด?`,
          choices,
          answer: choices.indexOf(correct),
          explanation: `${name} ใช้องุ่น ${correct}.`,
          source: 'smart'
        });
      }
    }
    if (wine.pair) {
      const correct = wine.pair;
      const distractors = uniqueNonEmpty(wines.map(item => item.pair).filter(Boolean)).filter(item => item !== correct).slice(0, 3);
      if (distractors.length >= 3) {
        const choices = shuffle([correct, ...distractors]).slice(0, 4);
        questions.push({
          id: `smart-wine-${counter++}`,
          category: 'Wine',
          lessonId: 'wine-basic',
          prompt: `"${name}" เหมาะจับคู่กับอาหารแบบใดมากที่สุด?`,
          choices,
          answer: choices.indexOf(correct),
          explanation: `Food pairing ที่แนะนำของ ${name} คือ ${correct}.`,
          source: 'smart'
        });
      }
    }
    if (wine.taste) {
      const correct = wine.taste;
      const distractors = uniqueNonEmpty(wines.map(item => item.taste).filter(Boolean)).filter(item => item !== correct).slice(0, 3);
      if (distractors.length >= 3) {
        const choices = shuffle([correct, ...distractors]).slice(0, 4);
        questions.push({
          id: `smart-wine-${counter++}`,
          category: 'Wine',
          lessonId: 'wine-basic',
          prompt: `ลักษณะรสชาติของ "${name}" ใกล้เคียงข้อใดที่สุด?`,
          choices,
          answer: choices.indexOf(correct),
          explanation: `Taste note ของ ${name} คือ ${correct}.`,
          source: 'smart'
        });
      }
    }
  });
  return questions;
}

function generatedQuizBank(sourceMode = 'smart') {
  const teamLessons = state.communityLessons || [];
  const coreLessons = baseLessons || [];
  const teamQs = buildLessonGeneratedQuestions(teamLessons, 'team');
  const coreQs = buildLessonGeneratedQuestions(coreLessons, 'core');
  const englishQs = buildEnglishQuestions();
  const wineQs = buildWineQuestions();
  if (sourceMode === 'team') return shuffle(teamQs);
  if (sourceMode === 'curated') return QUIZ_BANK.slice();
  return shuffle([...QUIZ_BANK, ...teamQs, ...coreQs, ...englishQs, ...wineQs]);
}

function buildCategoryAnalytics(quiz) {
  const map = {};
  (quiz.answers || []).forEach((ans, idx) => {
    const q = quiz.questions[idx] || {};
    const cat = q.category || ans.category || 'General';
    map[cat] ||= { total: 0, correct: 0 };
    map[cat].total += 1;
    if (ans.correct) map[cat].correct += 1;
  });
  const rows = Object.entries(map).map(([category, stat]) => ({
    category,
    total: stat.total,
    correct: stat.correct,
    pct: stat.total ? Math.round((stat.correct / stat.total) * 100) : 0
  })).sort((a, b) => b.pct - a.pct);
  return {
    rows,
    strengths: rows.filter(r => r.pct >= 80).map(r => r.category).slice(0, 3),
    focus: rows.filter(r => r.pct < 70).map(r => r.category).slice(0, 3)
  };
}

async function saveQuizAttemptRecord(attempt, quiz, analytics) {
  if (state.isDemo || !state.user) return;
  try {
    await db.collection('quiz_attempts').add({
      userUid: state.user.uid,
      employeeCode: state.accountProfile?.employeeCode || employeeCodeFromEmail(state.user.email),
      userName: state.accountProfile?.displayName || state.user.displayName || '',
      score: attempt.correct,
      total: attempt.total,
      pct: Math.round(attempt.scorePercent),
      category: quiz.category || 'All',
      sourceMode: quiz.sourceMode || 'curated',
      generatedFromTeamKnowledge: quiz.sourceMode !== 'curated',
      strengths: analytics.strengths,
      focusAreas: analytics.focus,
      categoryBreakdown: analytics.rows,
      questionIds: quiz.questions.map(q => q.id),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      completedAt: attempt.completedAt
    });
  } catch (err) {
    console.warn('saveQuizAttemptRecord failed', err);
  }
}

function quizCategories(sourceMode = 'curated') {
  const pool = generatedQuizBank(sourceMode);
  return ['All', ...Array.from(new Set(pool.map(item => item.category))).sort()];
}

function shuffle(list = []) {
  const arr = list.slice();
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function openQuizModal() {
  renderQuizLauncher();
  quizModal.classList.remove('hidden');
}

function closeQuizModal() {
  state.currentQuiz = null;
  quizModal.classList.add('hidden');
}

function quizStatRow(label, value) {
  return `<div class="quiz-stat"><span>${safeHTML(label)}</span><strong>${safeHTML(String(value))}</strong></div>`;
}

function renderQuizLauncher() {
  const body = el('quizBody');
  const attempts = state.userData.quizSummary?.attempts || 0;
  const bestScore = Math.round(state.userData.quizSummary?.bestScore || 0);
  const lastScore = Math.round(state.userData.quizSummary?.lastScore || 0);
  const defaultSource = 'smart';
  const cats = quizCategories(defaultSource);
  body.innerHTML = `
    <div class="quiz-launcher">
      <div class="quiz-stats-grid">
        ${quizStatRow('ทำไปแล้ว', `${attempts} ครั้ง`)}
        ${quizStatRow('คะแนนสูงสุด', `${bestScore}%`)}
        ${quizStatRow('คะแนนล่าสุด', `${lastScore}%`)}
      </div>
      <div class="analysis-note">Smart Analysis Edition จะสร้างคำถามจากบทเรียนทีม, บทเรียนหลัก, English และ Wine เพื่อวัดจุดแข็งรายหมวด</div>
      <div class="quiz-setup-grid">
        <label>แหล่งคำถาม
          <select id="quizSourceSelect">
            ${quizSourceOptions().map(opt => `<option value="${safeHTML(opt.value)}" ${opt.value === defaultSource ? 'selected' : ''}>${safeHTML(opt.label)}</option>`).join('')}
          </select>
        </label>
        <label>หมวดคำถาม
          <select id="quizCategorySelect">
            ${cats.map(cat => `<option value="${safeHTML(cat)}">${safeHTML(cat === 'All' ? 'สุ่มทุกหมวด' : cat)}</option>`).join('')}
          </select>
        </label>
        <label>จำนวนข้อ
          <select id="quizCountSelect">
            <option value="5">5 ข้อ</option>
            <option value="10" selected>10 ข้อ</option>
            <option value="15">15 ข้อ</option>
            <option value="20">20 ข้อ</option>
          </select>
        </label>
      </div>
      <div class="quiz-launch-actions">
        <button id="startQuizBtn" class="primary-btn">Generate & Start Quiz</button>
      </div>
      <div class="quiz-history-box">
        <h4>ประวัติล่าสุด</h4>
        ${(state.userData.quizHistory || []).length ? `
          <div class="quiz-history-list">
            ${(state.userData.quizHistory || []).slice(0, 8).map(item => `
              <div class="quiz-history-item">
                <div>
                  <strong>${safeHTML(item.category || 'All')}</strong>
                  <div class="mini-meta">${safeHTML(formatDate(item.completedAt) || '-')}</div>
                </div>
                <div class="quiz-history-score">${Math.round(item.scorePercent || 0)}%</div>
              </div>
            `).join('')}
          </div>` : `<div class="empty-box">ยังไม่มีประวัติการทำแบบทดสอบ</div>`}
      </div>
    </div>
  `;
  const sourceSelect = el('quizSourceSelect');
  const categorySelect = el('quizCategorySelect');
  sourceSelect.addEventListener('change', () => {
    const sourceCats = quizCategories(sourceSelect.value);
    categorySelect.innerHTML = sourceCats.map(cat => `<option value="${safeHTML(cat)}">${safeHTML(cat === 'All' ? 'สุ่มทุกหมวด' : cat)}</option>`).join('');
  });
  el('startQuizBtn').addEventListener('click', () => {
    startQuiz(categorySelect.value, Number(el('quizCountSelect').value || 10), sourceSelect.value);
  });
}

function startQuiz(category = 'All', count = 10, sourceMode = 'curated') {
  const bank = generatedQuizBank(sourceMode);
  const pool = category === 'All' ? bank : bank.filter(item => item.category === category);
  const selected = shuffle(pool).slice(0, Math.min(count, pool.length));
  if (!selected.length) {
    el('quizBody').innerHTML = `<div class="empty-box">ยังไม่มีคำถามในหมวดนี้</div>`;
    return;
  }
  state.currentQuiz = {
    category,
    sourceMode,
    questions: selected,
    index: 0,
    answers: []
  };
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const quiz = state.currentQuiz;
  if (!quiz) return renderQuizLauncher();
  const q = quiz.questions[quiz.index];
  const body = el('quizBody');
  const progressPct = Math.round(((quiz.index + 1) / quiz.questions.length) * 100);
  body.innerHTML = `
    <div class="quiz-progress-wrap">
      <div class="quiz-progress-head">
        <span>ข้อ ${quiz.index + 1} / ${quiz.questions.length}</span>
        <span>${safeHTML(q.category || 'General')}</span>
      </div>
      <div class="quiz-progress-bar"><span style="width:${progressPct}%"></span></div>
    </div>
    <div class="quiz-question-card">
      <div class="eyebrow">${safeHTML(q.lessonId || 'quiz')}</div>
      <h3>${safeHTML(q.prompt)}</h3>
      <div class="quiz-choice-list">
        ${q.choices.map((choice, idx) => `<button class="quiz-choice-btn" data-choice="${idx}">${String.fromCharCode(65 + idx)}. ${safeHTML(choice)}</button>`).join('')}
      </div>
    </div>
  `;
  body.querySelectorAll('[data-choice]').forEach(btn => btn.addEventListener('click', () => {
    submitQuizAnswer(Number(btn.dataset.choice));
  }));
}

function submitQuizAnswer(choiceIndex) {
  const quiz = state.currentQuiz;
  if (!quiz) return;
  const q = quiz.questions[quiz.index];
  const correct = choiceIndex === q.answer;
  quiz.answers.push({ questionId: q.id, choiceIndex, correct, category: q.category });
  const body = el('quizBody');
  body.innerHTML = `
    <div class="quiz-feedback-card ${correct ? 'correct' : 'wrong'}">
      <div class="quiz-feedback-badge">${correct ? 'ตอบถูก' : 'ยังไม่ถูก'}</div>
      <h3>${safeHTML(q.prompt)}</h3>
      <div class="quiz-answer-line"><strong>คำตอบที่ถูก:</strong> ${safeHTML(q.choices[q.answer])}</div>
      <p>${safeHTML(q.explanation || '')}</p>
      <div class="quiz-launch-actions">
        <button id="nextQuizBtn" class="primary-btn">${quiz.index === quiz.questions.length - 1 ? 'ดูผลคะแนน' : 'ข้อต่อไป'}</button>
      </div>
    </div>
  `;
  el('nextQuizBtn').addEventListener('click', async () => {
    quiz.index += 1;
    if (quiz.index >= quiz.questions.length) {
      await finishQuiz();
    } else {
      renderQuizQuestion();
    }
  });
}

async function finishQuiz() {
  const quiz = state.currentQuiz;
  if (!quiz) return;
  const total = quiz.questions.length;
  const correct = quiz.answers.filter(item => item.correct).length;
  const scorePercent = total ? (correct / total) * 100 : 0;
  const completedAt = new Date().toISOString();
  const analytics = buildCategoryAnalytics(quiz);
  const attempt = {
    id: `${Date.now()}`,
    category: quiz.category,
    sourceMode: quiz.sourceMode || 'curated',
    total,
    correct,
    scorePercent,
    strengths: analytics.strengths,
    focusAreas: analytics.focus,
    categoryBreakdown: analytics.rows,
    completedAt
  };
  state.userData.quizHistory = [attempt, ...(state.userData.quizHistory || [])].slice(0, 20);
  const summary = state.userData.quizSummary || { attempts: 0, bestScore: 0, lastScore: 0, byCategory: {} };
  summary.attempts = (summary.attempts || 0) + 1;
  summary.bestScore = Math.max(summary.bestScore || 0, scorePercent);
  summary.lastScore = scorePercent;
  summary.byCategory ||= {};
  const key = quiz.category || 'All';
  const cat = summary.byCategory[key] || { attempts: 0, bestScore: 0, lastScore: 0 };
  cat.attempts += 1;
  cat.bestScore = Math.max(cat.bestScore || 0, scorePercent);
  cat.lastScore = scorePercent;
  summary.byCategory[key] = cat;
  state.userData.quizSummary = summary;
  await saveUserData(true);
  await saveQuizAttemptRecord(attempt, quiz, analytics);

  const body = el('quizBody');
  body.innerHTML = `
    <div class="quiz-result-card">
      <div class="quiz-score-circle ${scorePercent >= 80 ? 'good' : scorePercent >= 60 ? 'mid' : 'low'}">${Math.round(scorePercent)}%</div>
      <h3>สรุปผลแบบทดสอบ</h3>
      <p>ตอบถูก ${correct} จาก ${total} ข้อ · แหล่งคำถาม: ${safeHTML((quizSourceOptions().find(item => item.value === (quiz.sourceMode || 'curated')) || {}).label || 'คลังข้อสอบหลัก')}</p>
      <div class="analysis-summary">
        <div><strong>จุดแข็ง:</strong> ${analytics.strengths.length ? analytics.strengths.map(safeHTML).join(', ') : 'ยังไม่มีหมวดที่เด่นชัด'}</div>
        <div><strong>ควรพัฒนา:</strong> ${analytics.focus.length ? analytics.focus.map(safeHTML).join(', ') : 'ทำได้สมดุลดี'}</div>
      </div>
      <div class="category-breakdown">
        ${analytics.rows.map(row => `<div class="category-pill"><span>${safeHTML(row.category)}</span><strong>${row.correct}/${row.total} · ${row.pct}%</strong></div>`).join('')}
      </div>
      <div class="quiz-result-actions">
        <button id="retryQuizBtn" class="primary-btn">สุ่มชุดใหม่อีกครั้ง</button>
        <button id="backQuizHomeBtn" class="ghost-btn">กลับหน้าหลัก Quiz</button>
      </div>
      <div class="quiz-review-list">
        ${quiz.questions.map((q, idx) => {
          const ans = quiz.answers[idx];
          return `<div class="quiz-review-item ${ans.correct ? 'correct' : 'wrong'}"><strong>ข้อ ${idx + 1}:</strong> ${safeHTML(q.prompt)}<br><span>${ans.correct ? '✓ ถูก' : '✗ ผิด'} · คำตอบที่ถูก: ${safeHTML(q.choices[q.answer])}</span></div>`;
        }).join('')}
      </div>
    </div>
  `;
  el('retryQuizBtn').addEventListener('click', () => startQuiz(quiz.category, total));
  el('backQuizHomeBtn').addEventListener('click', renderQuizLauncher);
  updateHeader();
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
el('quizBtn').addEventListener('click', openQuizModal);
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
el('closeWineBtn').addEventListener('click', closeWineEditor);
el('cancelWineBtn').addEventListener('click', closeWineEditor);
wineModal.querySelectorAll('[data-close-wine="true"]').forEach(node => node.addEventListener('click', closeWineEditor));
el('closeQuizBtn').addEventListener('click', closeQuizModal);
quizModal.querySelectorAll('[data-close-quiz="true"]').forEach(node => node.addEventListener('click', closeQuizModal));
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
  state.accountProfile = { employeeCode: 'DEMO', displayName: 'Demo User', role: 'admin' };
  await loadUserData();
  subscribeCommunityLessons();
  subscribeWineCatalog();
  subscribeWineReference();
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

el('adminDashBtn')?.addEventListener('click', () => {
  window.location.href = 'admin.html';
});

el('logoutBtn').addEventListener('click', async () => {
  stopCommunitySubscription();
  stopWineSubscription();
  stopWineCatalogSubscription();
  if (state.isDemo) {
    state.isDemo = false;
    state.user = null;
    state.accountProfile = null;
    state.communityLessons = [];
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
  if (user) {
    state.isDemo = false;
    state.user = user;
    await loadUserData();
    subscribeCommunityLessons();
    subscribeWineCatalog();
    subscribeWineReference();
    authView.classList.add('hidden');
    mainView.classList.remove('hidden');
    closeLesson();
  } else if (!state.isDemo) {
    state.user = null;
    state.accountProfile = null;
    state.communityLessons = [];
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
