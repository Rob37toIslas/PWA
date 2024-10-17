// app.js

// Detectar el estado de conexión
window.addEventListener('online', updateConnectionStatus);
window.addEventListener('offline', updateConnectionStatus);

function updateConnectionStatus() {
  const status = navigator.onLine ? 'En línea' : 'Fuera de línea';
  document.getElementById('connection-status').textContent = status;
  document.getElementById('connection-status').style.backgroundColor = navigator.onLine ? '#4CAF50' : '#F44336';
}

// Registrar el Service Worker y detectar cambios para actualizaciones
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(registration => {
    console.log('Service Worker registrado con éxito:', registration);

    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          const updateButton = document.createElement('button');
          updateButton.textContent = 'Nueva actualización disponible. Haz clic para actualizar.';
          updateButton.onclick = () => {
            newWorker.postMessage({ type: 'SKIP_WAITING' });
            window.location.reload();
          };
          document.body.appendChild(updateButton);
        }
      });
    });
  }).catch(error => console.error('Error al registrar el Service Worker:', error));

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('Service Worker control cambiado.');
    window.location.reload();
  });
}
