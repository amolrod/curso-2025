namespace SupermercadoWeb.Models
{
    public partial class Categoria
    {
        public Categoria()
        {
            Productos = new HashSet<Productos>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; } = null!;

        public virtual ICollection<Productos> Productos { get; set; }
    }
}
