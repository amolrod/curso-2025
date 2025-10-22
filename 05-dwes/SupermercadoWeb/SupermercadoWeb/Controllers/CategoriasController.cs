using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SupermercadoWeb.Models;

namespace SupermercadoWeb.Controllers
{
    public class CategoriasController : Controller
    {
        private readonly SupermercadoContext _context;

        public CategoriasController(SupermercadoContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var categoriasConProductos = _context.Categoria
                .Include(c => c.Productos)
                .ToList();
            return View(categoriasConProductos);
        }
    }
}
