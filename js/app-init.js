import './firebase-config.js';
import { initRealtimeListeners, loadFocusSessions } from './listeners.js';

window.addEventListener('load', ()=>{
  const uid = localStorage.getItem('detox_user_id') || null;
  initRealtimeListeners(uid);
  // load focus sessions where present
  loadFocusSessions(uid).catch(()=>{});
});
