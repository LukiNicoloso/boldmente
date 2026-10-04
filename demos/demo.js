// Utilidades compartidas por las demos de Boldmente
const Demo = {
  // Guarda y lee estado en localStorage; si no está disponible, la demo funciona igual en memoria.
  cargar(clave, inicial) {
    try {
      const guardado = localStorage.getItem(clave);
      if (guardado) return JSON.parse(guardado);
    } catch (e) {}
    return structuredClone(inicial);
  },

  guardar(clave, datos) {
    try { localStorage.setItem(clave, JSON.stringify(datos)); } catch (e) {}
  },

  // Conecta el botón "Reiniciar demo" del banner.
  reinicio(clave) {
    const btn = document.getElementById('demo-reset');
    if (!btn) return;
    btn.addEventListener('click', () => {
      try { localStorage.removeItem(clave); } catch (e) {}
      location.reload();
    });
  },

  toast(texto) {
    let el = document.querySelector('.toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = texto;
    el.classList.add('visible');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('visible'), 2600);
  },

  pesos(n) {
    return '$' + Math.round(n).toLocaleString('es-AR');
  },

  esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  },

  abrirModal(id) { document.getElementById(id).classList.add('abierto'); },
  cerrarModal(id) { document.getElementById(id).classList.remove('abierto'); },
};

document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-fondo')) e.target.classList.remove('abierto');
  if (e.target.dataset.cerrar) Demo.cerrarModal(e.target.dataset.cerrar);
});
