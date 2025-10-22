using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SupermercadoWeb.Models;

namespace SupermercadoWeb.Controllers
{
    public class PedidosController : Controller
    {
        private readonly SupermercadoContext _context;

        public PedidosController(SupermercadoContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var pedidos = _context.Pedidos
                .Include(p => p.Cliente)
                .ToList();
            return View(pedidos);
        }
    }
}
