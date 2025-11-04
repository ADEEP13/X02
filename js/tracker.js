import { db } from './firebase-config.js';
import { doc, setDoc, serverTimestamp, updateDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

function getUserId() {
  let id = localStorage.getItem('detox_user_id');
  if (!id) {
    if (crypto && crypto.randomUUID) id = 'user_' + crypto.randomUUID();
    else id = 'user_' + Math.floor(Math.random()*1e9);
    localStorage.setItem('detox_user_id', id);
  }
  return id;
}
const USER_ID = getUserId();
function todayId(){ return `${USER_ID}_${new Date().toISOString().slice(0,10)}`; }

let active = !document.hidden;
let lastChange = Date.now();
let totalActiveMs = 0;

function saveToLocal(){ const key='detox_usage_local_'+USER_ID; localStorage.setItem(key, JSON.stringify({totalActiveMs,lastChange:new Date().toISOString()})); }

async function flushToFirestore(){
  try{
    const docId = todayId();
    const totalMinutes = Math.round(totalActiveMs/60000);
    const ref = doc(db,'usage',docId);
    await setDoc(ref, { userId: USER_ID, date: new Date().toISOString().slice(0,10), totalScreenTime: totalMinutes, lastActive: serverTimestamp() }, { merge: true });
    await updateDoc(ref, { updatedAt: serverTimestamp() }).catch(()=>{});
    console.log('Flushed usage to Firestore', totalMinutes);
  }catch(e){ console.warn('Firestore flush failed', e); }
  saveToLocal();
}

document.addEventListener('visibilitychange', ()=>{
  const now=Date.now();
  if(!document.hidden){ lastChange=now; active=true; } else { if(active){ totalActiveMs += now-lastChange; saveToLocal(); } active=false; lastChange=now; }
});

['mousemove','keydown','scroll','pointerdown','touchstart'].forEach(ev=> window.addEventListener(ev, ()=>{ if(active){ lastChange=Date.now(); } else { active=true; lastChange=Date.now(); } }, {passive:true}));

setInterval(()=>{ const now=Date.now(); if(active){ totalActiveMs += now-lastChange; lastChange=now; } saveToLocal(); }, 15000);
setInterval(()=>{ flushToFirestore(); }, 30000);

// restore
try{
  const raw = localStorage.getItem('detox_usage_local_'+USER_ID);
  if(raw){ const obj = JSON.parse(raw); if(obj && obj.totalActiveMs) totalActiveMs = obj.totalActiveMs; }
}catch(e){}

window.DetoxTracker = { getTotalMinutes: ()=> Math.round(totalActiveMs/60000), flushNow: flushToFirestore, userId: USER_ID };
