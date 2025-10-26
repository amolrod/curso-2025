namespace videojuegosev.Models
{
    public class Genero
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;

        public ICollection<Videojuego> Videojuegos { get; set; } = new List<Videojuego>();
    }
}
