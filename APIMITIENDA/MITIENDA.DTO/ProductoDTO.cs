using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MITIENDA.DTO
{
    
    public class ProductoDTO
    {
        public int IdProducto { get; set; }

        public string? Nombre { get; set; }
        public int? IdCategoria { get; set; }
        public string? DescripcionCategoria { get; set; }

        public int? Stock { get; set; }
        public decimal? Precio { get; set; }

        public string? UrlImagen { get; set; }

        public string? Descripcion { get; set; }


        public int? Estado { get; set; }
    }
}
