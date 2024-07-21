
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MITIENDA.DTO;
 
namespace MITIENDA.BLL.Servicios.Contratos
{
    public interface IProductoService
    {

        Task<List<ProductoDTO>> Lista();
        Task<ProductoDTO> BuscarPorId(int id);


        Task<ProductoDTO> Crear(ProductoDTO modelo);

        Task<bool> Editar(ProductoDTO modelo);

        Task<bool> Eliminar(int id);
    }
}
