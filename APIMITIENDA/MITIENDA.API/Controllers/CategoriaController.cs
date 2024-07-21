
using MITIENDA.API.Utilidad;
using MITIENDA.DTO;
using MITIENDA.BLL.Servicios.Contratos;

using Microsoft.AspNetCore.Mvc;


namespace MITIENDA.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
        private readonly ICategoriaService _categoriaServicio;

        public CategoriaController(ICategoriaService categoriaServicio)
        {
            _categoriaServicio = categoriaServicio;
        }



        [HttpGet]
        [Route("Lista")]

        public async Task<IActionResult> Lista()
        {
            var rsp = new Response<List<CategoriaDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = await _categoriaServicio.Lista();

            }
            catch (Exception ex)
            {
                rsp.status = false;
                rsp.msg = ex.Message;
            }
            return Ok(rsp);
        }
    }
}
