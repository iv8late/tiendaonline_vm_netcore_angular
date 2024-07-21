using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MITIENDA.DAL.DBContext;
using MITIENDA.DAL.Repositorios.Contratos;
using MITIENDA.DAL.Repositorios;
using MITIENDA.BLL.Servicios.Contratos;
using MITIENDA.BLL.Servicios;
using MITIENDA.Utility;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace MITIENDA.IOC
{
    public static class Dependencias
    {
        public static void InyectarDependencies(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<MitiendaContext>(options =>
             options.UseSqlServer(configuration.GetConnectionString("conexion")));

           
            services.AddTransient(typeof(IGenericRepository<>), typeof(GenericRepository<>));

            services.AddScoped<IFacturaRepository, FacturaRepository>();

            services.AddAutoMapper(typeof(AutomapperProfile));



            services.AddScoped<IRolService, RolService>();
            services.AddScoped<IUsuarioService, UsuarioService>();
            services.AddScoped<ICategoriaService, CategoriaService>();
            services.AddScoped<IProductoService, ProductoService>();
            services.AddScoped<IFacturaService, FacturaService>();
            services.AddScoped<IMenuService, MenuService>();
           
        }
    }
}
