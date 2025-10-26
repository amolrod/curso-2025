namespace SupermercadoWeb.Models
{
    public partial class Clientes
    {
        public Clientes()
        {
            Pedidos = new HashSet<Pedidos>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public string? Email { get; set; }
        public string? Telefono { get; set; }

        public virtual ICollection<Pedidos> Pedidos { get; set; }
    }
}
