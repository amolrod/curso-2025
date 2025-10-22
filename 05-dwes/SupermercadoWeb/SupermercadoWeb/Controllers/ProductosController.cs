using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SupermercadoWeb.Models;

namespace SupermercadoWeb.Controllers
{
    public class ProductosController : Controller
    {
        private readonly SupermercadoContext _context;

        public ProductosController(SupermercadoContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var productos = _context.Productos
                .Include(p => p.Categoria)
                .ToList();
            return View(productos);
        }

        public IActionResult PorCategoria(int? categoriaId)
        {
            var productos = categoriaId.HasValue
                ? _context.Productos.Include(p => p.Categoria).Where(p => p.CategoriaId == categoriaId).ToList()
                : _context.Productos.Include(p => p.Categoria).ToList();

            ViewBag.Categorias = _context.Categoria.ToList();
            ViewBag.CategoriaSeleccionada = categoriaId;
            return View(productos);
        }
    }
}
