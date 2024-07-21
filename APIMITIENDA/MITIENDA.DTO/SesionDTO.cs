using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MITIENDA.DTO
{
    public class SesionDTO
    {
        public int IdUsuario { get; set; }
        public string? NombreCompleto { get; set; }
        public string Cedula { get; set; } = null!;
        public string? Correo { get; set; }
        public string? RolDescripcion { get; set; }
    }
}
