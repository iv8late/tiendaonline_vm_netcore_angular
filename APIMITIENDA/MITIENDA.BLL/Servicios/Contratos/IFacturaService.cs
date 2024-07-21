
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MITIENDA.DTO;

namespace MITIENDA.BLL.Servicios.Contratos
{
    public interface IFacturaService
    {
        Task<FacturaDTO> Registrar(FacturaDTO modelo);

        Task<List<FacturaDTO>> Historial(string buscarPor, string numeroFactura, string fechalnicio, string fechaFin);

        
    }
}
