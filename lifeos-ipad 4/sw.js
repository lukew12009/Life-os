const V='wholeman-v2',FILES=['./','index.html','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.open(V).then(c=>c.match(e.request,{ignoreSearch:true}).then(r=>{
    const f=fetch(e.request).then(n=>{if(n.ok)c.put(e.request,n.clone());return n}).catch(()=>r);
    return r||f;
  })));
});
