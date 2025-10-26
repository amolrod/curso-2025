namespace videojuegosev.Models
{
    public class Videojuego
    {
        public int Id { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public DateTime FechaLanzamiento { get; set; }
        public decimal Precio { get; set; }

        public int DesarrolladoraId { get; set; }
        public int GeneroId { get; set; }

        public Desarrolladora Desarrolladora { get; set; } = null!;
        public Genero Genero { get; set; } = null!;

        public ICollection<VideojuegoPlataforma> VideojuegoPlataformas { get; set; } = new List<VideojuegoPlataforma>();
    }
}
