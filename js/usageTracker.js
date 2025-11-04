import { firebaseConfig } from './firebase-config.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getFirestore, doc, setDoc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

let app, db;
try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch(e) {
  console.warn('Firebase not initialized. Paste config in js/firebase-config.js', e);
}

// Tracks active time on the site using Page Visibility and focus/blur
class UsageTracker {
  constructor(userId='local_user') {
    this.userId = userId;
    this.activeStart = null;
    this.totalActiveMs = 0;
    this.visibilityHandler = this.handleVisibility.bind(this);
    this.focusHandler = this.handleFocus.bind(this);
    this.blurHandler = this.handleBlur.bind(this);
    this.heartbeatInterval = null;
    this.isTracking = false;
  }
  start() {
    if (this.isTracking) return;
    this.isTracking = true;
    document.addEventListener('visibilitychange', this.visibilityHandler);
    window.addEventListener('focus', this.focusHandler);
    window.addEventListener('blur', this.blurHandler);
    if (!document.hidden) this.activeStart = Date.now();
    // heartbeat to save every minute
    this.heartbeatInterval = setInterval(()=>this.saveNow(), 60_000);
  }
  stop() {
    if (!this.isTracking) return;
    this.isTracking = false;
    document.removeEventListener('visibilitychange', this.visibilityHandler);
    window.removeEventListener('focus', this.focusHandler);
    window.removeEventListener('blur', this.blurHandler);
    if (this.activeStart) {
      this.totalActiveMs += Date.now() - this.activeStart;
      this.activeStart = null;
    }
    clearInterval(this.heartbeatInterval);
    this.saveNow();
  }
  handleVisibility() {
    if (document.hidden) {
      if (this.activeStart) {
        this.totalActiveMs += Date.now() - this.activeStart;
        this.activeStart = null;
      }
    } else {
      this.activeStart = Date.now();
    }
  }
  handleFocus() {
    this.activeStart = Date.now();
  }
  handleBlur() {
    if (this.activeStart) {
      this.totalActiveMs += Date.now() - this.activeStart;
      this.activeStart = null;
    }
  }
  async saveNow() {
    // compute minutes
    const minutes = Math.round(this.totalActiveMs / 60000);
    const today = new Date().toISOString().slice(0,10);
    const docId = `${this.userId}_${today}`;
    if (!db) {
      // fallback to localStorage
      localStorage.setItem('usage_local_'+docId, JSON.stringify({ totalMinutes: minutes, updatedAt: new Date().toISOString() }));
      return;
    }
    try {
      const docRef = doc(db, 'usage', docId);
      // set totalScreenTime field and updatedAt
      await setDoc(docRef, {
        userId: this.userId,
        totalScreenTime: minutes,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch(e) {
      console.error('Failed to save usage to Firestore', e);
    }
  }
}

const defaultTracker = new UsageTracker();
defaultTracker.start();
window.DetoxUsageTracker = defaultTracker;
