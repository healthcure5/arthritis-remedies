const PV_KEY='hc_preview_pw';
function pvGet(){try{return localStorage.getItem(PV_KEY)||sessionStorage.getItem(PV_KEY)}catch(e){return null}}
function pvSet(p){try{localStorage.setItem(PV_KEY,p)}catch(e){try{sessionStorage.setItem(PV_KEY,p)}catch(x){}}}
function pvForget(){try{localStorage.removeItem(PV_KEY);sessionStorage.removeItem(PV_KEY)}catch(e){}}
async function pvOpen(file,pw){
  const buf=new Uint8Array(await (await fetch(file,{cache:'no-store'})).arrayBuffer());
  const salt=buf.slice(0,16),iv=buf.slice(16,28),ct=buf.slice(28);
  const base=await crypto.subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveKey']);
  const key=await crypto.subtle.deriveKey({name:'PBKDF2',salt,iterations:200000,hash:'SHA-256'},base,{name:'AES-GCM',length:256},false,['decrypt']);
  return crypto.subtle.decrypt({name:'AES-GCM',iv},key,ct);
}
