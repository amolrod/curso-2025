namespace videojuegosev.Models
{
    public class Desarrolladora
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string PaisOrigen { get; set; } = string.Empty;
        public int AñoFundacion { get; set; }

        public ICollection<Videojuego> Videojuegos { get; set; } = new List<Videojuego>();
    }
}
