using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using MITIENDA.DTO;

namespace MITIENDA.BLL.Servicios.Contratos
{
    public interface ICategoriaService
    {
        Task<List<CategoriaDTO>> Lista();
    }
}
