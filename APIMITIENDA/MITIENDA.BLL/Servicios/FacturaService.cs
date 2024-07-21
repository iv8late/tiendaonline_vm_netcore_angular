using AutoMapper;
using MITIENDA.BLL.Servicios.Contratos;
using MITIENDA.DAL.Repositorios.Contratos;
using MITIENDA.DTO;
using MITIENDA.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Win32;
using System.Globalization;

namespace MITIENDA.BLL.Servicios
{
    public class FacturaService : IFacturaService

    {

        private readonly IFacturaRepository _FacturaRepositorio;

        private readonly IGenericRepository<DetalleFactura> _detalleFacturaRepositorio;

        private readonly IMapper _mapper;

        public FacturaService(IFacturaRepository FacturaRepositorio, IGenericRepository<DetalleFactura> detalleFacturaRepositorio, IMapper mapper)
        {
            _FacturaRepositorio = FacturaRepositorio;
            _detalleFacturaRepositorio = detalleFacturaRepositorio;
            _mapper = mapper;
        }

        public async Task<FacturaDTO> Registrar(FacturaDTO modelo)
        {
            try
            {

                var FacturaGenerada = await _FacturaRepositorio.Registrar(_mapper.Map<Factura>(modelo));
                if (FacturaGenerada.IdFactura == 0)
                    throw new TaskCanceledException("No se pudo crear");

                return _mapper.Map<FacturaDTO>(FacturaGenerada);

            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<List<FacturaDTO>> Historial(string buscarPor, string numeroFactura, string fechalnicio, string fechaFin)
        {

            IQueryable<Factura> query = await _FacturaRepositorio.Consultar();
            var ListaResultado = new List<Factura>();
            try
            {
                if (buscarPor == "fecha")
                {
                    DateTime fech_Inicio = DateTime.ParseExact(fechalnicio, "dd/MM/yyyy", new CultureInfo("es-ES"));
                    DateTime fech_Fin = DateTime.ParseExact(fechaFin, "dd/MM/yyyy", new CultureInfo("es-ES"));



                    ListaResultado = await query.Where(v =>
                    v.FechaRegistro.Value.Date >= fech_Inicio.Date &&
                    v.FechaRegistro.Value.Date <= fech_Fin.Date
                    ).Include(dv => dv.DetalleFactura)
                    .ThenInclude(p => p.IdProductoNavigation)
                    .ToListAsync();
                }
                else
                {

                    ListaResultado = await query.Where(v => v.NumeroDocumento == numeroFactura
                    ).Include(dv => dv.DetalleFactura)
                    .ThenInclude(p => p.IdProductoNavigation)
                    .ToListAsync();

                }
            }
            catch (Exception)
            {

                throw;
            }
            return _mapper.Map <List<FacturaDTO >> (ListaResultado);
        }


    }

}

