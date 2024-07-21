using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using MITIENDA.DAL.DBContext;
using MITIENDA.DAL.Repositorios.Contratos;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;


namespace MITIENDA.DAL.Repositorios
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly MitiendaContext _context;
        public GenericRepository(MitiendaContext context)
        {
            _context = context;
        }

        public async Task<T> Obtener(Expression<Func<T, bool>> filtro)
        {
            try
            {
                T modelo = await _context.Set<T>().FirstOrDefaultAsync(filtro);
                return modelo;

            }
            catch (Exception)
            {

                throw;
            }
           
        }


        public async Task<T> Crear(T modelo)
        {
            try
            {
                _context.Set<T>().Add(modelo);
                await _context.SaveChangesAsync();
                return modelo;

            }
            catch (Exception)
            {

                throw;
            }


        }

        public async Task<bool> Editar(T modelo)
        {
            try
            {
                _context.Set<T>().Update(modelo);
                await _context.SaveChangesAsync();
                return true;

            }
            catch (Exception)
            {

                throw;
            }


        }

        public async Task<bool> Eliminar(T modelo)
        {
            try
            {
                _context.Set<T>().Remove(modelo);
                await _context.SaveChangesAsync();
                return true;

            }
            catch (Exception)
            {

                throw;
            }


        }

        public async Task<IQueryable<T>> Consultar(Expression<Func<T, bool>> filtro = null)
        {
            try
            {
                IQueryable<T> querymodelo= filtro==null ? _context.Set<T>():_context.Set<T>().Where(filtro);
                return querymodelo;
            }
            catch (Exception)
            {

                throw;
            }


        }
    }
}
