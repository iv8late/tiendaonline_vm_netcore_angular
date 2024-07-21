using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MITIENDA.DTO
{
    public class CarritoDTO
    {
        public int IdCarrito { get; set; }
        public int IdUsuario { get; set; }
        public DateTime FechaCreacion { get; set; }
        public List<DetalleCarritoDTO> Detalles { get; set; } = new List<DetalleCarritoDTO>();
    }
}
