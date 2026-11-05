const CACHE='drowsyguard-v1';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(CORE);await self.skipWaiting();})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim();})()));
self.addEventListener('fetch',e=>{
 const req=e.request;
 if(req.method!=='GET')return;
 e.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  const cached=await cache.match(req);
  if(cached)return cached;
  try{
   const response=await fetch(req);
   if(response&&(response.ok||response.type==='opaque')){try{await cache.put(req,response.clone());}catch(err){}}
   return response;
  }catch(err){
   const fallback=await cache.match('./index.html');
   if(req.mode==='navigate'&&fallback)return fallback;
   throw err;
  }
 })());
});