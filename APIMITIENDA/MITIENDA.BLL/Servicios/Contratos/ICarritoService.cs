using MITIENDA.DTO;

namespace MITIENDA.BLL.Servicios.Contratos
{
    public interface ICarritoService
    {

        Task<CarritoDTO> Nuevo();
        Task<bool> AgregarProducto(int IdProducto, int cantidad);
         Task<List<CarritoDTO>> Lista();
        Task<bool> Editar(int IdProducto, int cantidad);
        Task<bool> Limpiar(int id);
        Task<bool> Eliminar();
      
    }
}
