
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

    console.debug('[Libro] creado', this.titulo, '-', this.isbn);
  }
}

// patrón singleton para la biblioteca
class Biblioteca {
  static #instancia = null;
  #libros = [];

  static getInstance() {
    // siempre devolvemos la misma instancia para tener una única fuente de verdad
    if (!Biblioteca.#instancia) {
      Biblioteca.#instancia = new Biblioteca();
      console.debug('[Biblioteca] instancia única creada');
    }
    return Biblioteca.#instancia;
  }

  constructor() {
    console.debug('[Biblioteca] constructor ejecutado');
  }

  // agregamos libro evitando duplicados por isbn
  agregarLibro(libro) {
    if (!(libro instanceof Libro)) throw new Error('solo se aceptan libros');
    const existe = this.#libros.some(l => l.isbn === libro.isbn);
    if (existe) throw new Error('isbn duplicado');
    this.#libros.push(libro);
    console.debug('[Biblioteca] libro agregado', libro.titulo, '-', libro.isbn);
  }

  // devolvemos una copia inmutable del listado
  listar() {
    console.debug('[Biblioteca] listar llamado. Total:', this.#libros.length);
    // usamos map para clonar de forma simple
    return this.#libros.map(l => ({ ...l }));
  }

  // búsqueda por título parcial o isbn exacto
  buscar({ titulo = '', isbn = '' } = {}) {
    console.debug('[Biblioteca] buscar llamada con', { titulo, isbn });
    const qTitulo = String(titulo).trim().toLowerCase();
    const qIsbn = String(isbn).trim();
    // usamos filter para seleccionar coincidencias
    const resultados = this.#libros.filter(l => {
      const coincideTitulo = qTitulo ? l.titulo.toLowerCase().includes(qTitulo) : true;
      const coincideIsbn = qIsbn ? l.isbn === qIsbn : true;
      return coincideTitulo && coincideIsbn;
    }).map(l => ({ ...l })); // devolvemos copias
    console.debug('[Biblioteca] resultados de búsqueda:', resultados.length);
    return resultados;
  }

  // eliminar por isbn, devuelve boolean indicando si borró algo
  eliminar(isbn) {
    console.debug('[Biblioteca] eliminar llamado con isbn', isbn);
    const antes = this.#libros.length;
    this.#libros = this.#libros.filter(l => l.isbn !== isbn);
    const borrado = this.#libros.length < antes;
    if (borrado) console.debug('[Biblioteca] eliminado', isbn);
    else console.debug('[Biblioteca] no encontrado para eliminar', isbn);
    return borrado;
  }

  // estadísticas con reduce
  estadisticas() {
    console.debug('[Biblioteca] calculando estadísticas');
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
    const resultado = { porGenero, mediaAntiguedad };
    console.debug('[Biblioteca] estadísticas calculadas:', resultado);
    return resultado;
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
  console.debug('[App] iniciando precarga de libros');
  const seed = [
    { titulo: 'The Subtle Art of Not Giving a F*ck', autor: 'Mark Manson', anioPublicacion: 2016, genero: 'desarrollo personal', isbn: '9780062457714' },
    { titulo: 'Normal Sucks', autor: 'Jonathan Mooney', anioPublicacion: 2019, genero: 'ensayo', isbn: '9781250227307' },
    { titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes Saavedra', anioPublicacion: 1605, genero: 'novela clásica', isbn: '9788491050293' },
    { titulo: 'La madurez: La responsabilidad de ser uno mismo', autor: 'Osho', anioPublicacion: 2005, genero: 'filosofía', isbn: '9788484450981' },
    { titulo: 'Así es la puta vida', autor: 'Manuel Jabois', anioPublicacion: 2023, genero: 'ensayo / realismo', isbn: '9788420476068' }
  ];
  seed.forEach(d => repo.agregarLibro(new Libro(d)));
  console.debug('[App] precarga completada con', repo.listar().length, 'libros');
}

// render del listado
function renderLista(libros) {
  console.debug('[UI] renderizando lista. Elementos:', libros.length);
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
  console.debug('[UI] renderizando estadísticas');
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
  console.debug('[UI] alta de libro iniciada');

  const titulo = document.getElementById('titulo').value.trim();
  const autor = document.getElementById('autor').value.trim();
  const anio = Number(document.getElementById('anio').value);
  const genero = document.getElementById('genero').value.trim();
  const isbn = document.getElementById('isbn').value.trim();

  try {
    if (!ui.formAlta.checkValidity()) {
      ui.msgAlta.textContent = 'revisa los campos';
      console.debug('[UI] alta cancelada: validación HTML fallida');
      return;
    }
    const libro = new Libro({ titulo, autor, anioPublicacion: anio, genero, isbn });
    repo.agregarLibro(libro);
    ui.formAlta.reset();
    renderLista(repo.listar());
    renderEstadisticas();
    ui.msgAlta.style.color = '#0a7';
    ui.msgAlta.textContent = 'libro añadido';
    console.debug('[UI] alta completada:', titulo);
  } catch (err) {
    ui.msgAlta.style.color = '#b00020';
    ui.msgAlta.textContent = err.message || 'error al añadir';
    console.debug('[UI] error al añadir libro:', err.message);
  }
});

// manejar búsqueda
ui.formBuscar.addEventListener('submit', e => {
  e.preventDefault();
  console.debug('[UI] búsqueda iniciada');
  const titulo = ui.qTitulo.value;
  const isbn = ui.qIsbn.value;
  const resultados = repo.buscar({ titulo, isbn });
  renderLista(resultados);
  console.debug('[UI] búsqueda completada con', resultados.length, 'resultados');
});

// limpiar búsqueda
ui.btnLimpiar.addEventListener('click', () => {
  console.debug('[UI] limpiar búsqueda');
  ui.qTitulo.value = '';
  ui.qIsbn.value = '';
  renderLista(repo.listar());
});

// delegación para eliminar
ui.tbody.addEventListener('click', e => {
  const btn = e.target.closest('.btn-eliminar');
  if (!btn) return;
  const isbn = btn.getAttribute('data-isbn');
  console.debug('[UI] intento de eliminar', isbn);
  if (repo.eliminar(isbn)) {
    renderLista(repo.listar());
    renderEstadisticas();
    console.debug('[UI] libro eliminado', isbn);
  } else {
    console.debug('[UI] libro no encontrado para eliminar', isbn);
  }
});

// init
(function init() {
  console.debug('[Init] iniciando aplicación');
  precargar();
  renderLista(repo.listar());
  renderEstadisticas();
  console.debug('[Init] biblioteca lista con', repo.listar().length, 'libros precargados');
})();
