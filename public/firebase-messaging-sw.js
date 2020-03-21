/* eslint-disable no-undef,no-restricted-globals */

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  messagingSenderId: "653122939571"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging();

  messaging.setBackgroundMessageHandler(function(payload) {
    const { title, body } = payload.data;
    const options = {
      body,
      icon: "/favicon.ico"
    };

    return self.registration.showNotification(title, options);
  });
}

self.addEventListener("notificationclick", function(event) {
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        includeUncontrolled: true,
        type: "window"
      })
      .then(function(clientList) {
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];

          const isOrigin = client.url.includes(self.location.origin);
          const canBeFocused = "focus" in client;

          if (isOrigin && canBeFocused) {
            return client.focus();
          }
        }

        if (clients.openWindow) {
          return clients.openWindow("/");
        }
      })
  );
});
