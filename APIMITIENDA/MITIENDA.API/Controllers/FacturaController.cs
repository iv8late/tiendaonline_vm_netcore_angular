
using MITIENDA.API.Utilidad;
using MITIENDA.DTO;
using MITIENDA.BLL.Servicios.Contratos;

using Microsoft.AspNetCore.Mvc;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MITIENDA.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacturaController : ControllerBase
    {
        private readonly IFacturaService _facturaServicio;

        public FacturaController(IFacturaService FacturaServicio)
        {
            _facturaServicio = FacturaServicio;
        }

        // GET: api/<RolController>



        [HttpPost]
        [Route("Registrar")]

        public async Task<IActionResult> Registrar([FromBody] FacturaDTO Factura)
        {
            var rsp = new Response<FacturaDTO>();
            try
            {
                rsp.status = true;
                rsp.value = await _facturaServicio.Registrar(Factura);
            }

            catch (Exception ex)
            {
                rsp.status = false;
                rsp.msg = ex.Message;
            }

            return Ok(rsp);

        }


        [HttpGet]
        [Route("Historial")]

        public async Task<IActionResult> Historial(string buscarPor, string? numeroFactura, string? fechalnicio, string? fechaFin)
        {
            var rsp = new Response<List<FacturaDTO>>();
            numeroFactura = numeroFactura is null ? "" : numeroFactura;
            fechalnicio = fechalnicio is null ? "" : fechalnicio;
            fechaFin = fechaFin is null ? "" : fechaFin;

            try
            {
                rsp.status = true;
                rsp.value = await _facturaServicio.Historial(buscarPor, numeroFactura, fechalnicio, fechaFin);

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
