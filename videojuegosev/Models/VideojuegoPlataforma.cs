namespace videojuegosev.Models
{
    public class VideojuegoPlataforma
    {
        public int VideojuegoId { get; set; }
        public Videojuego Videojuego { get; set; } = null!;

        public int PlataformaId { get; set; }
        public Plataforma Plataforma { get; set; } = null!;
    }
}
