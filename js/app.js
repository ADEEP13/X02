import { firebaseConfig } from './firebase-config.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getFirestore, doc, onSnapshot, getDoc, collection, query, where, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

let app, db;
try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch(e) {
  console.warn('Firebase not initialized. Paste config in js/firebase-config.js', e);
}

// Utility
function formatMinutes(mins) {
  const h = Math.floor(mins/60);
  const m = mins%60;
  return `${h}h ${m}m`;
}

function safeGet(id) {
  return document.getElementById(id) || null;
}

// Real-time listeners (if Firestore available)
export function initRealtimeListeners(userId='local_user') {
  if (!db) return;
  const today = new Date().toISOString().slice(0,10);
  const docId = `${userId}_${today}`;
  const usageRef = doc(db, 'usage', docId);
  onSnapshot(usageRef, (snap) => {
    if (!snap.exists()) {
      updateUsageUI({ totalMinutes:0, breakdown: {} });
      return;
    }
    const data = snap.data();
    const entries = data.entries || {};
    let totalMinutes = 0;
    const byApp = {};
    Object.values(entries).forEach(e => {
      const mins = e.durationMinutes || 0;
      totalMinutes += mins;
      const key = e.app || 'Other';
      byApp[key] = (byApp[key] || 0) + mins;
    });
    const breakdown = Object.entries(byApp).map(([app, mins]) => ({ app, mins }));
    updateUsageUI({ totalMinutes, breakdown });
  });
}

function updateUsageUI({ totalMinutes, breakdown }) {
  const screenTimeEl = safeGet('screenTime') || safeGet('screen-time') || null;
  if (screenTimeEl) screenTimeEl.textContent = formatMinutes(totalMinutes || 0);

  const breakdownEl = safeGet('usageBreakdown') || safeGet('usage-breakdown') || null;
  if (breakdownEl) {
    breakdownEl.innerHTML = (breakdown || []).map(b => `<div class="usage-item">${b.app}: ${formatMinutes(b.mins)}</div>`).join('');
  }

  // update other UI elements if present
  const focusSessionsEl = safeGet('focusSessions');
  if (focusSessionsEl) {
    // naive conversion: one session = 25 mins
    const sessions = Math.round((totalMinutes || 0)/25);
    focusSessionsEl.textContent = `${sessions} sessions`;
  }
}

// Expose helper for pages to call
window.DetoxRealtime = { initRealtimeListeners, updateUsageUI };
