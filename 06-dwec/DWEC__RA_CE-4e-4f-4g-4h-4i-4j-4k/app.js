// gestor de biblioteca simple con poo + filter/map/reduce + singleton

// clase libro con validación básica
class Libro {
  constructor({ titulo, autor, anioPublicacion, genero, isbn }) {
    // validaciones mínimas
    if (!titulo || !autor || !genero || !isbn) throw new Error('faltan datos del libro');
    const anio = Number(anioPublicacion);
    if (!Number.isInteger(anio) || anio < 0 || anio > 9999) throw new Error('año no válido');

    // asignación
    this.titulo = String(titulo).trim();
    this.autor = String(autor).trim();
    this.anioPublicacion = anio;
    this.genero = String(genero).trim().toLowerCase();
    this.isbn = String(isbn).trim();
  }
}

// patrón singleton para la biblioteca
class Biblioteca {
  static #instancia = null;
  #libros = [];

  static getInstance() {
    // siempre devolvemos la misma instancia para tener una única fuente de verdad
    if (!Biblioteca.#instancia) Biblioteca.#instancia = new Biblioteca();
    return Biblioteca.#instancia;
  }

  // agregamos libro evitando duplicados por isbn
  agregarLibro(libro) {
    if (!(libro instanceof Libro)) throw new Error('solo se aceptan libros');
    const existe = this.#libros.some(l => l.isbn === libro.isbn);
    if (existe) throw new Error('isbn duplicado');
    this.#libros.push(libro);
    console.debug('[biblioteca] agregado', libro.isbn);
  }

  // devolvemos una copia inmutable del listado
  listar() {
    // usamos map para clonar de forma simple
    return this.#libros.map(l => ({ ...l }));
  }

  // búsqueda por título parcial o isbn exacto
  buscar({ titulo = '', isbn = '' } = {}) {
    const qTitulo = String(titulo).trim().toLowerCase();
    const qIsbn = String(isbn).trim();
    // usamos filter para seleccionar coincidencias
    return this.#libros.filter(l => {
      const coincideTitulo = qTitulo ? l.titulo.toLowerCase().includes(qTitulo) : true;
      const coincideIsbn = qIsbn ? l.isbn === qIsbn : true;
      return coincideTitulo && coincideIsbn;
    }).map(l => ({ ...l })); // devolvemos copias
  }

  // eliminar por isbn, devuelve boolean indicando si borró algo
  eliminar(isbn) {
    const antes = this.#libros.length;
    this.#libros = this.#libros.filter(l => l.isbn !== isbn);
    const borrado = this.#libros.length < antes;
    if (borrado) console.debug('[biblioteca] eliminado', isbn);
    return borrado;
  }

  // estadísticas con reduce
  estadisticas() {
    const ahora = new Date().getFullYear();
    const { porGenero, totalAntiguedad } = this.#libros.reduce(
      (acc, l) => {
        acc.porGenero[l.genero] = (acc.porGenero[l.genero] || 0) + 1;
        acc.totalAntiguedad += Math.max(0, ahora - l.anioPublicacion);
        return acc;
      },
      { porGenero: {}, totalAntiguedad: 0 }
    );
    const mediaAntiguedad = this.#libros.length ? Math.round(totalAntiguedad / this.#libros.length) : 0;
    return { porGenero, mediaAntiguedad };
  }
}

// estado ui simple
const ui = {
  tbody: document.getElementById('tbody'),
  msgAlta: document.getElementById('msg-alta'),
  mediaAntiguedad: document.getElementById('mediaAntiguedad'),
  porGenero: document.getElementById('porGenero'),
  formAlta: document.getElementById('form-alta'),
  formBuscar: document.getElementById('form-buscar'),
  qTitulo: document.getElementById('qTitulo'),
  qIsbn: document.getElementById('qIsbn'),
  btnLimpiar: document.getElementById('btn-limpiar')
};

// instancia singleton
const repo = Biblioteca.getInstance();

// datos de ejemplo para probar rápidamente
function precargar() {
  // todos libros de desarrollo personal para probar estadísticas
  const seed = [
    { titulo: 'Can’t Hurt Me', autor: 'David Goggins', anioPublicacion: 2018, genero: 'desarrollo personal', isbn: '9781544512280' },
    { titulo: 'Atomic Habits', autor: 'James Clear', anioPublicacion: 2018, genero: 'desarrollo personal', isbn: '9780735211292' },
    { titulo: 'The Subtle Art of Not Giving a F*ck', autor: 'Mark Manson', anioPublicacion: 2016, genero: 'desarrollo personal', isbn: '9780062457714' },
    { titulo: 'Ego Is the Enemy', autor: 'Ryan Holiday', anioPublicacion: 2016, genero: 'desarrollo personal', isbn: '9781591847816' },
    { titulo: 'You Are a Badass', autor: 'Jen Sincero', anioPublicacion: 2013, genero: 'desarrollo personal', isbn: '9780762447695' },
    { titulo: 'The Mountain Is You', autor: 'Brianna Wiest', anioPublicacion: 2020, genero: 'desarrollo personal', isbn: '9781949759228' },
    { titulo: 'Can’t Hurt Me: Clean Edition', autor: 'David Goggins', anioPublicacion: 2021, genero: 'desarrollo personal', isbn: '9781544534077' }
  ];
  seed.forEach(d => repo.agregarLibro(new Libro(d)));
}


// render del listado
function renderLista(libros) {
  // usamos map para generar filas html
  ui.tbody.innerHTML = libros.map(l => `
    <tr>
      <td>${escapeHtml(l.titulo)}</td>
      <td>${escapeHtml(l.autor)}</td>
      <td>${l.anioPublicacion}</td>
      <td>${escapeHtml(l.genero)}</td>
      <td>${escapeHtml(l.isbn)}</td>
      <td><button class="secondary btn-eliminar" data-isbn="${escapeAttr(l.isbn)}">eliminar</button></td>
    </tr>
  `).join('');
}

// render de estadísticas
function renderEstadisticas() {
  const { porGenero, mediaAntiguedad } = repo.estadisticas();
  ui.mediaAntiguedad.textContent = mediaAntiguedad;
  ui.porGenero.innerHTML = Object.entries(porGenero)
    .map(([g, n]) => `<li>${escapeHtml(g)}: ${n}</li>`)
    .join('') || '<li>sin datos</li>';
}

// utilidad sencilla para evitar inyección en html
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function escapeAttr(s) { return escapeHtml(s).replace(/"/g, '&quot;'); }

// manejar alta
ui.formAlta.addEventListener('submit', e => {
  e.preventDefault();
  ui.msgAlta.textContent = '';

  // recogemos datos
  const titulo = document.getElementById('titulo').value.trim();
  const autor = document.getElementById('autor').value.trim();
  const anio = Number(document.getElementById('anio').value);
  const genero = document.getElementById('genero').value.trim();
  const isbn = document.getElementById('isbn').value.trim();

  try {
    // validación html básica
    if (!ui.formAlta.checkValidity()) {
      ui.msgAlta.textContent = 'revisa los campos';
      return;
    }
    const libro = new Libro({ titulo, autor, anioPublicacion: anio, genero, isbn });
    repo.agregarLibro(libro);
    // reseteamos y refrescamos vista
    ui.formAlta.reset();
    renderLista(repo.listar());
    renderEstadisticas();
    ui.msgAlta.style.color = '#0a7';
    ui.msgAlta.textContent = 'libro añadido';
  } catch (err) {
    ui.msgAlta.style.color = '#b00020';
    ui.msgAlta.textContent = err.message || 'error al añadir';
  }
});

// manejar búsqueda
ui.formBuscar.addEventListener('submit', e => {
  e.preventDefault();
  const titulo = ui.qTitulo.value;
  const isbn = ui.qIsbn.value;
  const resultados = repo.buscar({ titulo, isbn });
  renderLista(resultados);
});

// limpiar búsqueda
ui.btnLimpiar.addEventListener('click', () => {
  ui.qTitulo.value = '';
  ui.qIsbn.value = '';
  renderLista(repo.listar());
});

// delegación para eliminar
ui.tbody.addEventListener('click', e => {
  const btn = e.target.closest('.btn-eliminar');
  if (!btn) return;
  const isbn = btn.getAttribute('data-isbn');
  if (repo.eliminar(isbn)) {
    renderLista(repo.listar());
    renderEstadisticas();
  }
});

// init
(function init() {
  // precargamos unos libros para poder probar
  precargar();
  renderLista(repo.listar());
  renderEstadisticas();
  console.debug('[init] biblioteca lista con', repo.listar().length, 'libros');
})();
