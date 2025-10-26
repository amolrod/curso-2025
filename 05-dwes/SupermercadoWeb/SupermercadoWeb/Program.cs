using Microsoft.EntityFrameworkCore;
using SupermercadoWeb.Models;

var builder = WebApplication.CreateBuilder(args);

// Agregar servicios
builder.Services.AddControllersWithViews();

// Registrar DbContext con versión fija
builder.Services.AddDbContext<SupermercadoContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(10, 4, 28))
    )
);

var app = builder.Build();

// Configurar pipeline HTTP
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Clientes}/{action=Index}/{id?}");

app.Run();
