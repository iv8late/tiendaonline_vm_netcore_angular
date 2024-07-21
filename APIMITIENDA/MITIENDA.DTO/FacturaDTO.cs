using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MITIENDA.DTO
{
    public class FacturaDTO
    {
        public int IdFactura { get; set; }

        public string? NumeroDocumento { get; set; }

        public string? TipoPago { get; set; }

        public string? TotalTexto { get; set; }

        public string? FechaRegistro { get; set; }

        public virtual ICollection<DetalleFacturaDTO> DetalleFactura{ get; set; } 
    }
}
