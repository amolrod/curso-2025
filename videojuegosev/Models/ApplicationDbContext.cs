using Microsoft.EntityFrameworkCore;

namespace videojuegosev.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Videojuego> Videojuegos { get; set; }
        public DbSet<Desarrolladora> Desarrolladoras { get; set; }
        public DbSet<Genero> Generos { get; set; }
        public DbSet<Plataforma> Plataformas { get; set; }
        public DbSet<VideojuegoPlataforma> VideojuegoPlataformas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configurar la clave compuesta para VideojuegoPlataforma
            modelBuilder.Entity<VideojuegoPlataforma>()
                .HasKey(vp => new { vp.VideojuegoId, vp.PlataformaId });

            // relación muchos a muchos
            modelBuilder.Entity<VideojuegoPlataforma>()
                .HasOne(vp => vp.Videojuego)
                .WithMany(v => v.VideojuegoPlataformas)
                .HasForeignKey(vp => vp.VideojuegoId);

            modelBuilder.Entity<VideojuegoPlataforma>()
                .HasOne(vp => vp.Plataforma)
                .WithMany(p => p.VideojuegoPlataformas)
                .HasForeignKey(vp => vp.PlataformaId);

            // Configuración de precisión decimal para Precio
            modelBuilder.Entity<Videojuego>()
                .Property(v => v.Precio)
                .HasPrecision(18, 2);
        }
    }
}
