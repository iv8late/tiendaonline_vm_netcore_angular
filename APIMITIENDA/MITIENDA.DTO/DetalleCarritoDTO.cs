using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MITIENDA.DTO
{
    public class DetalleCarritoDTO
    {
        public int IdProducto { get; set; }
        public int Cantidad { get; set; }
        public string PrecioTexto { get; set; }
    }
}
