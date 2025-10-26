using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using videojuegosev.Models;
using videojuegosev.Models;

namespace videojuegosev.Controllers
{
    public class DesarrolladorasController : Controller
    {
        private readonly ApplicationDbContext _context;

        public DesarrolladorasController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var desarrolladoras = await _context.Desarrolladoras
                .Include(d => d.Videojuegos)
                .ToListAsync();

            return View(desarrolladoras);
        }
    }
}
