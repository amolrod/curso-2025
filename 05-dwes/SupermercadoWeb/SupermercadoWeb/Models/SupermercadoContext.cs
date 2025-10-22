using Microsoft.EntityFrameworkCore;

namespace SupermercadoWeb.Models
{
    public partial class SupermercadoContext : DbContext
    {
        public SupermercadoContext()
        {
        }

        public SupermercadoContext(DbContextOptions<SupermercadoContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Categoria> Categoria { get; set; } = null!;
        public virtual DbSet<Clientes> Clientes { get; set; } = null!;
        public virtual DbSet<Pedidos> Pedidos { get; set; } = null!;
        public virtual DbSet<Productos> Productos { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Categoria>(entity =>
            {
                entity.ToTable("categoria");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Nombre).HasMaxLength(100).HasColumnName("nombre");
            });

            modelBuilder.Entity<Clientes>(entity =>
            {
                entity.ToTable("clientes");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Nombre).HasMaxLength(100).HasColumnName("nombre");
                entity.Property(e => e.Email).HasMaxLength(100).HasColumnName("email");
                entity.Property(e => e.Telefono).HasMaxLength(20).HasColumnName("telefono");
            });

            modelBuilder.Entity<Productos>(entity =>
            {
                entity.ToTable("productos");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Nombre).HasMaxLength(100).HasColumnName("nombre");
                entity.Property(e => e.Precio).HasPrecision(10, 2).HasColumnName("precio");
                entity.Property(e => e.Stock).HasColumnName("stock");
                entity.Property(e => e.CategoriaId).HasColumnName("categoria_id");

                entity.HasOne(d => d.Categoria)
                    .WithMany(p => p.Productos)
                    .HasForeignKey(d => d.CategoriaId);
            });

            modelBuilder.Entity<Pedidos>(entity =>
            {
                entity.ToTable("pedidos");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.ClienteId).HasColumnName("cliente_id");
                entity.Property(e => e.Fecha).HasColumnName("fecha");
                entity.Property(e => e.Total).HasPrecision(10, 2).HasColumnName("total");

                entity.HasOne(d => d.Cliente)
                    .WithMany(p => p.Pedidos)
                    .HasForeignKey(d => d.ClienteId);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
