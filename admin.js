
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

const $ = id => document.getElementById(id);

const state = {
  me: null,
  profile: null,
  users: [],
  attempts: [],
  quizOpen: true
};

function safeHTML(text) {
  return String(text ?? '').replace(/[&<>\"']/g, m => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[m]));
}

function tsToDate(value) {
  if (!value) return null;
  if (value.toDate) return value.toDate();
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function fmtDate(value) {
  const d = tsToDate(value);
  if (!d) return '-';
  return d.toLocaleString('th-TH', { dateStyle:'medium', timeStyle:'short' });
}

function employeeCodeFromEmail(email = '') {
  const match = String(email || '').trim().match(/^emp\.([a-z0-9._-]+)@laya-training\.local$/i);
  return match ? match[1].toUpperCase() : '';
}

function isAdminLike(role = '') {
  return ['admin', 'supervisor'].includes(String(role || '').toLowerCase());
}

function sumOpened(progress = {}) {
  return Object.values(progress || {}).reduce((sum, item) => sum + Number(item?.openedCount || 0), 0);
}

function lessonCounts(progress = {}) {
  const values = Object.values(progress || {});
  return {
    completed: values.filter(v => v?.completed).length,
    favorites: values.filter(v => v?.favorite).length,
    opened: values.reduce((sum, v) => sum + Number(v?.openedCount || 0), 0)
  };
}

function englishCounts(progress = {}) {
  const values = Object.values(progress || {});
  return {
    completed: values.filter(v => v?.completed).length,
    opened: values.reduce((sum, v) => sum + Number(v?.openedCount || 0), 0)
  };
}

function latestActivity(user = {}) {
  const candidates = [
    tsToDate(user.updatedAt),
    tsToDate(user.quiz?.lastAttemptAt)
  ].filter(Boolean);
  if (!candidates.length) return null;
  return new Date(Math.max(...candidates.map(d => d.getTime())));
}

function aggregateAttemptsByUser(attempts = []) {
  const map = {};
  attempts.forEach(item => {
    const key = item.userUid || item.employeeCode || item.userEmail || `u-${Math.random()}`;
    map[key] ||= [];
    map[key].push(item);
  });
  return map;
}

function strengthSummary(user, attempts = []) {
  const categoryTotals = {};
  attempts.forEach(attempt => {
    const stats = attempt.categoryStats || {};
    Object.entries(stats).forEach(([cat, value]) => {
      categoryTotals[cat] ||= { correct: 0, total: 0 };
      categoryTotals[cat].correct += Number(value.correct || 0);
      categoryTotals[cat].total += Number(value.total || 0);
    });
  });
  const ranking = Object.entries(categoryTotals)
    .map(([cat, v]) => ({ cat, pct: Math.round((v.correct / Math.max(v.total, 1)) * 100) }))
    .sort((a,b) => b.pct - a.pct);

  const lesson = lessonCounts(user.progress || {});
  const eng = englishCounts(user.englishProgress || {});
  const best = ranking[0]?.cat || (eng.completed > 0 ? 'English' : lesson.completed > 0 ? 'Operations' : 'ยังไม่มีข้อมูลพอ');
  const improve = ranking.length > 1 ? ranking[ranking.length - 1].cat : (lesson.completed < 2 ? 'ควรเพิ่มการอ่านบทเรียน' : 'ติดตามผลเพิ่มเติม');
  return {
    best,
    improve,
    ranking
  };
}

function updateMetrics() {
  $('metricUsers').textContent = String(state.users.length);
  const attemptsBy = aggregateAttemptsByUser(state.attempts);
  $('metricQuizUsers').textContent = String(Object.keys(attemptsBy).length);
  const latestByUser = Object.values(attemptsBy).map(list => list.sort((a,b) => (tsToDate(b.createdAt)?.getTime() || 0) - (tsToDate(a.createdAt)?.getTime() || 0))[0]);
  if (latestByUser.length) {
    const avg = Math.round(latestByUser.reduce((s,a)=> s + Number(a.pct || 0), 0) / latestByUser.length);
    $('metricAvgScore').textContent = avg + '%';
  } else {
    $('metricAvgScore').textContent = '-';
  }
  const totalCompleted = state.users.reduce((s, u) => s + lessonCounts(u.progress || {}).completed + englishCounts(u.englishProgress || {}).completed, 0);
  $('metricCompleted').textContent = String(totalCompleted);
  $('metricQuizStatus').textContent = state.quizOpen ? 'เปิดอยู่' : 'ปิดอยู่';
}

function renderAccounts() {
  const tbody = $('accountsTbody');
  tbody.innerHTML = '';
  const attemptsBy = aggregateAttemptsByUser(state.attempts);

  state.users
    .slice()
    .sort((a,b) => {
      const aCode = String(a.employeeCode || '').toUpperCase();
      const bCode = String(b.employeeCode || '').toUpperCase();
      return aCode.localeCompare(bCode, 'en');
    })
    .forEach(user => {
      const row = document.createElement('tr');
      const lesson = lessonCounts(user.progress || {});
      const eng = englishCounts(user.englishProgress || {});
      const allOpened = lesson.opened + eng.opened;
      const fav = Array.isArray(user.favorites) ? user.favorites.length : lesson.favorites;
      const attempts = attemptsBy[user.uid] || [];
      const best = attempts.length ? Math.max(...attempts.map(a => Number(a.pct || 0))) : Number(user.quiz?.bestScore || 0);
      row.innerHTML = `
        <td>${safeHTML(user.employeeCode || employeeCodeFromEmail(user.email) || '-')}</td>
        <td>${safeHTML(user.displayName || '-')}</td>
        <td><span class="tag">${safeHTML(user.role || 'staff')}</span></td>
        <td>${lesson.completed + eng.completed}</td>
        <td>${allOpened}</td>
        <td>${fav}</td>
        <td>${best ? best + '%' : '-'}</td>
        <td>${safeHTML(fmtDate(latestActivity(user)))}</td>
      `;
      tbody.appendChild(row);
    });

  if (!tbody.children.length) {
    tbody.innerHTML = `<tr><td colspan="8" class="mini-meta">ยังไม่มีข้อมูลผู้ใช้</td></tr>`;
  }
}

function renderTalentCards() {
  const wrap = $('talentCards');
  wrap.innerHTML = '';
  const attemptsBy = aggregateAttemptsByUser(state.attempts);

  state.users.forEach(user => {
    const attempts = (attemptsBy[user.uid] || []).slice().sort((a,b) => (tsToDate(b.createdAt)?.getTime() || 0) - (tsToDate(a.createdAt)?.getTime() || 0));
    const summary = strengthSummary(user, attempts);
    const latest = attempts[0] || null;
    const lesson = lessonCounts(user.progress || {});
    const eng = englishCounts(user.englishProgress || {});
    const card = document.createElement('article');
    card.className = 'admin-user-card';
    card.innerHTML = `
      <div class="card-head">
        <div>
          <h4>${safeHTML(user.displayName || user.employeeCode || 'Unknown')}</h4>
          <div class="mini-meta">${safeHTML(user.employeeCode || '-')} · ${safeHTML(user.role || 'staff')}</div>
        </div>
        <span class="status-pill">${latest ? `${Number(latest.pct || 0)}%` : 'ยังไม่สอบ'}</span>
      </div>
      <div class="admin-summary-grid compact">
        <div class="stat-card"><span>อ่านจบ</span><strong>${lesson.completed + eng.completed}</strong><div class="mini-meta">บทเรียน + English</div></div>
        <div class="stat-card"><span>เปิดอ่าน</span><strong>${lesson.opened + eng.opened}</strong><div class="mini-meta">รวมทุกครั้ง</div></div>
        <div class="stat-card"><span>จุดเด่น</span><strong>${safeHTML(summary.best)}</strong><div class="mini-meta">จากผล Quiz และการอ่าน</div></div>
        <div class="stat-card"><span>ควรพัฒนา</span><strong>${safeHTML(summary.improve)}</strong><div class="mini-meta">ติดตามต่อ</div></div>
      </div>
      <div class="quiz-info-box">
        <strong>สรุปสำหรับผู้จัดการ:</strong>
        ${safeHTML(user.displayName || user.employeeCode || 'พนักงานคนนี้')}
        ${lesson.completed + eng.completed >= 5 ? 'มีวินัยในการอ่านบทเรียนค่อนข้างดี' : 'ควรอ่านบทเรียนเพิ่มเพื่อสร้างพื้นฐาน'}
        ${latest ? ` และมีผล Quiz ล่าสุด ${Number(latest.pct || 0)}%` : ' และยังไม่มีผล Quiz ล่าสุด'}
      </div>
      <div class="mini-meta">กิจกรรมล่าสุด: ${safeHTML(fmtDate(latestActivity(user)))}</div>
    `;
    wrap.appendChild(card);
  });

  if (!wrap.children.length) {
    wrap.innerHTML = `<div class="empty-box">ยังไม่มีข้อมูลสำหรับวิเคราะห์</div>`;
  }
}

function renderAttempts() {
  const wrap = $('attemptsList');
  wrap.innerHTML = '';
  state.attempts
    .slice()
    .sort((a,b) => (tsToDate(b.createdAt)?.getTime() || 0) - (tsToDate(a.createdAt)?.getTime() || 0))
    .slice(0, 100)
    .forEach(item => {
      const article = document.createElement('article');
      article.className = 'attempt-item';
      const strengths = Array.isArray(item.strengths) ? item.strengths.join(', ') : '';
      const weaknesses = Array.isArray(item.weaknesses) ? item.weaknesses.join(', ') : '';
      article.innerHTML = `
        <div class="attempt-top">
          <strong>${safeHTML(item.userName || item.employeeCode || '-')}</strong>
          <span class="status-pill">${Number(item.pct || 0)}%</span>
        </div>
        <div class="mini-meta">${safeHTML(item.employeeCode || '-')} · ${safeHTML(item.scopeLabel || item.scope || 'Quiz')} · ${safeHTML(fmtDate(item.createdAt))}</div>
        <div class="attempt-grid">
          <div><span>คะแนน</span><strong>${Number(item.score || 0)}/${Number(item.total || 0)}</strong></div>
          <div><span>เด่น</span><strong>${safeHTML(strengths || '-')}</strong></div>
          <div><span>พัฒนา</span><strong>${safeHTML(weaknesses || '-')}</strong></div>
        </div>
      `;
      wrap.appendChild(article);
    });

  if (!wrap.children.length) {
    wrap.innerHTML = `<div class="empty-box">ยังไม่มีประวัติการสอบ</div>`;
  }
}

async function loadAll() {
  const [settingsSnap, usersSnap, attemptsSnap] = await Promise.all([
    db.collection('app_settings').doc('quiz_controls').get(),
    db.collection('users').get(),
    db.collection('quiz_attempts').orderBy('createdAt', 'desc').limit(500).get().catch(async () => {
      return db.collection('quiz_attempts').get();
    })
  ]);

  const settings = settingsSnap.exists ? settingsSnap.data() || {} : {};
  state.quizOpen = settings.isOpen !== false;

  state.users = usersSnap.docs.map(doc => ({ uid: doc.id, ...(doc.data() || {}) }));
  state.attempts = attemptsSnap.docs.map(doc => ({ id: doc.id, ...(doc.data() || {}) }));

  $('quizToggleStatus').textContent = state.quizOpen ? 'การสอบเปิดอยู่' : 'การสอบปิดอยู่';
  $('toggleQuizBtn').textContent = state.quizOpen ? 'ปิดการสอบชั่วคราว' : 'เปิดการสอบ';
  $('toggleQuizBtn').classList.toggle('danger-btn', state.quizOpen);

  updateMetrics();
  renderAccounts();
  renderTalentCards();
  renderAttempts();
}

async function toggleQuiz() {
  const next = !state.quizOpen;
  await db.collection('app_settings').doc('quiz_controls').set({
    isOpen: next,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedBy: state.me.uid,
    updatedByCode: state.profile?.employeeCode || employeeCodeFromEmail(state.me.email)
  }, { merge: true });
  state.quizOpen = next;
  $('quizToggleStatus').textContent = state.quizOpen ? 'การสอบเปิดอยู่' : 'การสอบปิดอยู่';
  $('toggleQuizBtn').textContent = state.quizOpen ? 'ปิดการสอบชั่วคราว' : 'เปิดการสอบ';
  $('toggleQuizBtn').classList.toggle('danger-btn', state.quizOpen);
  updateMetrics();
}

function exportData() {
  const payload = {
    exportedAt: new Date().toISOString(),
    users: state.users,
    attempts: state.attempts,
    quizOpen: state.quizOpen
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'laya-admin-dashboard-export.json';
  a.click();
  URL.revokeObjectURL(a.href);
}

$('adminRefreshBtn').addEventListener('click', () => loadAll().catch(err => {
  console.error(err);
  $('adminAuthMsg').textContent = 'รีเฟรชข้อมูลไม่สำเร็จ';
}));
$('adminExportBtn').addEventListener('click', exportData);
$('toggleQuizBtn').addEventListener('click', () => toggleQuiz().catch(err => {
  console.error(err);
  alert('อัปเดตสถานะการสอบไม่สำเร็จ');
}));

auth.onAuthStateChanged(async user => {
  if (!user) {
    $('adminAuthMsg').textContent = 'ยังไม่ได้เข้าสู่ระบบ';
    $('adminAuthState').classList.remove('hidden');
    $('adminDashboardView').classList.add('hidden');
    return;
  }
  state.me = user;
  const snap = await db.collection('users').doc(user.uid).get();
  state.profile = snap.exists ? snap.data() || {} : {};
  if (!isAdminLike(state.profile.role)) {
    $('adminAuthMsg').textContent = 'บัญชีนี้ไม่มีสิทธิ์เข้า Admin Dashboard';
    $('adminAuthState').classList.remove('hidden');
    $('adminDashboardView').classList.add('hidden');
    return;
  }
  $('adminAuthState').classList.add('hidden');
  $('adminDashboardView').classList.remove('hidden');
  await loadAll();
});
