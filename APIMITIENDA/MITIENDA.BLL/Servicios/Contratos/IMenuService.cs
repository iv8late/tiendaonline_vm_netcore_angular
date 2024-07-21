
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MITIENDA.DTO;

namespace MITIENDA.BLL.Servicios.Contratos
{
    public interface IMenuService
    {

        Task<List<MenuDTO>> Lista(int idUsuario);

    }
}
