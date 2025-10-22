namespace SupermercadoWeb.Models
{
    public partial class Productos
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public decimal? Precio { get; set; }
        public int? Stock { get; set; }
        public int? CategoriaId { get; set; }

        public virtual Categoria? Categoria { get; set; }
    }
}
