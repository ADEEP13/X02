import { db } from './firebase-config.js';
import { doc, onSnapshot, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

function getUserId() {
  let id = localStorage.getItem('detox_user_id');
  if (!id) {
    if (crypto && crypto.randomUUID) id = 'user_' + crypto.randomUUID();
    else id = 'user_' + Math.floor(Math.random()*1e9);
    localStorage.setItem('detox_user_id', id);
  }
  return id;
}

function formatMinutes(mins) {
  const h = Math.floor(mins/60);
  const m = mins%60;
  return h>0 ? `${h}h ${m}m` : `${m}m`;
}

function updateUsageUI(data) {
  const screenEl = document.querySelector('[data-screen-time]');
  if (screenEl) screenEl.textContent = formatMinutes(data.totalScreenTime || 0);
  const focusEl = document.querySelector('[data-focus-sessions]');
  if (focusEl) focusEl.textContent = (data.focusSessions || Math.round((data.totalScreenTime||0)/25));
  const prodEl = document.querySelector('[data-productive-score]');
  if (prodEl) prodEl.textContent = (data.productiveScore!=null? data.productiveScore + '%':'—');
  const weeklyEl = document.querySelector('[data-weekly-goal]');
  if (weeklyEl) weeklyEl.textContent = (data.weeklyProgressPercent!=null? data.weeklyProgressPercent + '%':'—');
  const breakdownEl = document.getElementById('usageBreakdown');
  if (breakdownEl && data.usageBreakdown) {
    breakdownEl.innerHTML = Object.entries(data.usageBreakdown).map(([k,v])=>`<div>${k}: ${formatMinutes(v)}</div>`).join('');
  }
}

export function initRealtimeListeners(userId=null) {
  const uid = userId || getUserId();
  const today = new Date().toISOString().slice(0,10);
  const docId = `${uid}_${today}`;
  const ref = doc(db,'usage',docId);
  const unsub = onSnapshot(ref, snap => {
    if (!snap.exists()) { updateUsageUI({}); return; }
    updateUsageUI(snap.data());
  }, err => console.warn('onSnapshot error', err));
  return unsub;
}

export async function loadFocusSessions(userId=null) {
  const uid = userId || getUserId();
  // sessions stored under collection 'sessions' with subcollection uid or documents; try both
  const container = document.querySelector('[data-focus-history]');
  if (!container) return;
  container.innerHTML = '';
  // try collection sessions/{uid}/list
  try {
    const q = collection(db, 'sessions', uid, 'list');
    const snaps = await getDocs(q);
    snaps.forEach(d => {
      const s = d.data();
      const el = document.createElement('div');
      el.textContent = `${s.startTime || ''} — ${s.duration || 0} min`;
      container.appendChild(el);
    });
  } catch(e){
    // fallback: query sessions where userId == uid
    try {
      const q2 = collection(db, 'sessions');
      const all = await getDocs(q2);
      all.forEach(d=>{
        const s = d.data();
        if (s.userId === uid) {
          const el = document.createElement('div');
          el.textContent = `${s.startTime || ''} — ${s.duration || 0} min`;
          container.appendChild(el);
        }
      });
    } catch(e2){ console.warn(e2); }
  }
}
