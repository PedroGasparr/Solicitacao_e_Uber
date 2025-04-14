importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyDmhnN2jEQWMeAwSLJiAfNHUapM5_HgiOw",
  authDomain: "appguizilim.firebaseapp.com",
  databaseURL: "https://appguizilim-default-rtdb.firebaseio.com",
  projectId: "appguizilim",
  storageBucket: "appguizilim.firebasestorage.app",
  messagingSenderId: "669241709255",
  appId: "1:669241709255:web:bde10d035254b74c9724e2",
  measurementId: "G-J2MKLZ5XL0"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Configurar handler para mensagens em segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification?.title || 'Nova mensagem';
  const notificationOptions = {
    body: payload.notification?.body || 'Você tem uma nova notificação',
    icon: '/img/GZL - Logos_pages-to-jpg-0004.jpg',
    data: payload.data || {}
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({type: 'window'}).then((clientList) => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow('/');
    })
  );
});