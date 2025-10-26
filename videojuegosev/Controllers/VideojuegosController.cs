using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using videojuegosev.Models;

namespace videojuegosev.Controllers
{
    public class VideojuegosController : Controller
    {
        private readonly ApplicationDbContext _context;

        public VideojuegosController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var videojuegos = await _context.Videojuegos
                .Include(v => v.Desarrolladora)
                .Include(v => v.Genero)
                .ToListAsync();

            return View(videojuegos);
        }

        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var videojuego = await _context.Videojuegos
                .Include(v => v.Desarrolladora)
                .Include(v => v.Genero)
                .Include(v => v.VideojuegoPlataformas)
                    .ThenInclude(vp => vp.Plataforma)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (videojuego == null)
            {
                return NotFound();
            }

            return View(videojuego);
        }

        public async Task<IActionResult> PorGenero(int? generoId)
        {
            ViewBag.Generos = await _context.Generos.ToListAsync();

            if (generoId == null)
            {
                return View(new List<Videojuego>());
            }

            var videojuegos = await _context.Videojuegos
                .Include(v => v.Desarrolladora)
                .Include(v => v.Genero)
                .Where(v => v.GeneroId == generoId)
                .ToListAsync();

            return View(videojuegos);
        }

        public async Task<IActionResult> Estadisticas()
        {
            var totalJuegos = await _context.Videojuegos.CountAsync();
            var precioPromedio = await _context.Videojuegos.AverageAsync(v => (double)v.Precio);

            var juegosPorGenero = await _context.Generos
                .Select(g => new
                {
                    Genero = g.Nombre,
                    Cantidad = g.Videojuegos.Count()
                })
                .ToListAsync();

            var desarrolladoraMasProlifica = await _context.Desarrolladoras
                .Include(d => d.Videojuegos)
                .OrderByDescending(d => d.Videojuegos.Count)
                .FirstOrDefaultAsync();

            ViewBag.TotalJuegos = totalJuegos;
            ViewBag.PrecioPromedio = precioPromedio;
            ViewBag.JuegosPorGenero = juegosPorGenero;
            ViewBag.DesarrolladoraMasProlifica = desarrolladoraMasProlifica;

            return View();
        }

    }
}
