// Service worker khusus buat nampilin notifikasi jadwal
// dengan tampilan yang lebih mirip notifikasi asli HP (lewat registration.showNotification).
// File ini HARUS berada di folder yang sama dengan jadwal-harian.html saat di-hosting.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Kalau notifikasi di-tap, fokusin/buka tab jadwalnya
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});
