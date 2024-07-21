using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using MITIENDA.DAL.DBContext;
using MITIENDA.DAL.Repositorios.Contratos;
using MITIENDA.Models;
using Microsoft.EntityFrameworkCore;

namespace MITIENDA.DAL.Repositorios
{
    public class FacturaRepository: GenericRepository<Factura>, IFacturaRepository
       
    {
        private readonly MitiendaContext _context;
        public FacturaRepository(MitiendaContext context):base(context)
        {
            _context = context;
        }

        public async Task<Factura> Registrar(Factura modelo)
        {
           Factura FacturaGenerada = new Factura();
            using (var transaction = _context.Database.BeginTransaction())  {
                try{


                    foreach (DetalleFactura dv in modelo.DetalleFactura)
                    {

                        Producto producto_encontrado = _context.Productos.Where(p => p.IdProducto == dv.IdProducto).First();
                        producto_encontrado.Stock = producto_encontrado.Stock - dv.Cantidad;
                        _context.Productos.Update(producto_encontrado);
                        
                    }
                    await _context.SaveChangesAsync();
                    NumeroDocumento correlativo = _context.NumeroDocumentos.First();
                    correlativo.UltimoNumero = correlativo.UltimoNumero + 1;
                    correlativo.FechaRegistro=DateTime.Now;

                    _context.NumeroDocumentos.Update(correlativo);
                    await _context.SaveChangesAsync();

                    int cantidadDigitos = 4;
                    string ceros = string.Concat(Enumerable.Repeat("0", cantidadDigitos));
                    string numeroFactura = ceros + correlativo.UltimoNumero.ToString();

                    numeroFactura = numeroFactura.Substring(numeroFactura.Length - cantidadDigitos, cantidadDigitos);


                    modelo.NumeroDocumento = numeroFactura;
                    await _context.Facturas.AddAsync(modelo); await _context.SaveChangesAsync();
                    
                    FacturaGenerada = modelo;
                    transaction.Commit();

                }
                catch (Exception)
                {
                    transaction.Rollback();

                    throw;
                }
                return FacturaGenerada;
            }
        }
    }
}
