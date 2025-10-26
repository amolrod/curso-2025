namespace SupermercadoWeb.Models
{
    public partial class Pedidos
    {
        public int Id { get; set; }
        public int? ClienteId { get; set; }
        public DateTime? Fecha { get; set; }
        public decimal? Total { get; set; }

        public virtual Clientes? Cliente { get; set; }
    }
}
