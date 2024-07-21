using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


using AutoMapper;
using MITIENDA.Models;
using MITIENDA.DTO;

namespace MITIENDA.Utility
{
    public class AutomapperProfile : Profile
    {

        public AutomapperProfile()
        {

            #region Rol
            CreateMap<Rol, RolDTO>().ReverseMap();
            #endregion Rol

            #region Menu
            CreateMap<Menu, MenuDTO>().ReverseMap();
            #endregion Menu

            #region Usuario
            CreateMap<Usuario, UsuarioDTO>()
                .ForMember(destino =>
                        destino.RolDescripcion,
                        opt => opt.MapFrom(origen => origen.IdRolNavigation.Nombre)
                        )
                .ForMember(destino =>
                        destino.Estado,
                        opt => opt.MapFrom(origen => origen.Estado == true ? 1 : 0)
                        );

            CreateMap<UsuarioDTO, Usuario>()
                .ForMember(destino =>
                        destino.IdRolNavigation,
                        opt => opt.Ignore()
                        )
                .ForMember(destino =>
                        destino.Estado,
                        opt => opt.MapFrom(origen => origen.Estado == 1 ? true : false)
                        );
            #endregion Usuario

            #region Categoria
            CreateMap<Categoria, CategoriaDTO>().ReverseMap();
            #endregion Categoria

            #region Producto

            CreateMap<Producto, ProductoDTO>()
                .ForMember(destino =>
                        destino.DescripcionCategoria,
                        opt => opt.MapFrom(origen => origen.IdCategoriaNavigation.Nombre)
                        )
                .ForMember(destino =>
                        destino.Precio,
                        opt => opt.MapFrom(origen => Convert.ToString(origen.Precio.Value, new CultureInfo("es-ES")))
                        )
                .ForMember(destino =>
                        destino.Estado,
                        opt => opt.MapFrom(origen => origen.Estado == true ? 1 : 0)
                        );

            CreateMap<ProductoDTO, Producto>()
               .ForMember(destino =>
                       destino.IdCategoriaNavigation,
                          opt => opt.Ignore()
                       )
               .ForMember(destino =>
                       destino.Precio,
                       opt => opt.MapFrom(origen => Convert.ToDecimal(origen.Precio, new CultureInfo("es-ES")))
                       )
            .ForMember(destino =>
                       destino.Estado,
                        opt => opt.MapFrom(origen => origen.Estado == 1 ? true : false)
                        );
            #endregion Producto

            #region Factura

            CreateMap<Factura, FacturaDTO>()
                .ForMember(destino =>
                        destino.TotalTexto,
                        opt => opt.MapFrom(origen => Convert.ToString(origen.Total.Value, new CultureInfo("es-ES")))
                        )
                .ForMember(destino =>
                        destino.FechaRegistro,
                        opt => opt.MapFrom(origen => origen.FechaRegistro.Value.ToString("dd/MM/yyyy"))
                        );


            CreateMap<FacturaDTO, Factura>()
                .ForMember(destino =>
                        destino.Total,
                        opt => opt.MapFrom(origen => Convert.ToDecimal(origen.TotalTexto, new CultureInfo("es-ES")))
                        );


            #endregion Factura

            #region DetalleFactura
            CreateMap<DetalleFactura, DetalleFacturaDTO>()
                 .ForMember(destino =>
                        destino.DescripcionProducto,
                        opt => opt.MapFrom(origen => origen.IdProductoNavigation.Nombre)
                        )
                  .ForMember(destino =>
                        destino.PrecioTexto,
                        opt => opt.MapFrom(origen => Convert.ToString(origen.Precio.Value, new CultureInfo("es-ES")))
                        )
                  .ForMember(destino =>
                        destino.TotalTexto,
                        opt => opt.MapFrom(origen => Convert.ToString(origen.Total.Value, new CultureInfo("es-ES")))
                        );

            CreateMap<DetalleFacturaDTO,DetalleFactura>()
                .ForMember(destino =>
                        destino.Precio,
                        opt => opt.MapFrom(origen => Convert.ToString(origen.PrecioTexto, new CultureInfo("es-ES")))
                        )
                  .ForMember(destino =>
                        destino.Total,
                        opt => opt.MapFrom(origen => Convert.ToString(origen.TotalTexto, new CultureInfo("es-ES")))
                        );

            #endregion DetalleFactura

            #region Carrito

            CreateMap<Carrito, CarritoDTO>()
                .ForMember(destino =>
                        destino.Detalles,
                        opt => opt.MapFrom(origen => origen.DetalleCarritos)
                        );

            CreateMap<CarritoDTO, Carrito>()
                .ForMember(destino =>
                        destino.DetalleCarritos,
                        opt => opt.Ignore()
                        );
            #endregion Carrito

            #region DetalleCarrito
            CreateMap<DetalleCarrito, DetalleCarritoDTO>()
                .ForMember(destino =>
                        destino.PrecioTexto,
                        opt => opt.MapFrom(origen => Convert.ToString(origen.Precio.Value, new CultureInfo("es-ES")))
                        );

            CreateMap<DetalleCarritoDTO, DetalleCarrito>()
                .ForMember(destino =>
                        destino.Precio,
                        opt => opt.MapFrom(origen => Convert.ToDecimal(origen.PrecioTexto, new CultureInfo("es-ES")))
                        )
                .ForMember(destino =>
                        destino.IdProductoNavigation,
                        opt => opt.Ignore()
                        );
            #endregion DetalleCarrito






        }
    }
}








