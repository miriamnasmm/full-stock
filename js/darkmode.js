// Modo oscuro automático: se activa a partir de las 6pm y se desactiva a las 6am.
(function () {
  function applyMode() {
    var hour = new Date().getHours();
    var isDark = hour >= 18 || hour < 6;
    document.documentElement.classList.toggle('dark', isDark);
  }

  applyMode();

  // Revisa cada minuto por si cambia la hora
  setInterval(applyMode, 60000);
})();
