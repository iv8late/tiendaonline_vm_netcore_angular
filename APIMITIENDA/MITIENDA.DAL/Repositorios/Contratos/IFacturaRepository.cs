
using MITIENDA.Models;
using System;
using System.Linq;

namespace MITIENDA.DAL.Repositorios.Contratos
{
    public interface IFacturaRepository:IGenericRepository<Factura>
    {
        Task<Factura> Registrar(Factura modelo);
    }
}
