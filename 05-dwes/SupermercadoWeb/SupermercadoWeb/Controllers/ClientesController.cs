using Microsoft.AspNetCore.Mvc;
using SupermercadoWeb.Models;

namespace SupermercadoWeb.Controllers
{
    public class ClientesController : Controller
    {
        private readonly SupermercadoContext _context;

        public ClientesController(SupermercadoContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var clientes = _context.Clientes.ToList();
            return View(clientes);
        }
    }
}
