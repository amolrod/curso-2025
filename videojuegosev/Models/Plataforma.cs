namespace videojuegosev.Models
{
    public class Plataforma
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Fabricante { get; set; } = string.Empty;
        public int AñoLanzamiento { get; set; }

        public ICollection<VideojuegoPlataforma> VideojuegoPlataformas { get; set; } = new List<VideojuegoPlataforma>();
    }
}
