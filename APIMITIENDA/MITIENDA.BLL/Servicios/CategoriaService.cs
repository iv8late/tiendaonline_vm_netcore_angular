using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

using MITIENDA.BLL.Servicios.Contratos;
using MITIENDA.DAL.Repositorios.Contratos;
using MITIENDA.DTO;
using MITIENDA.Models;

namespace MITIENDA.BLL.Servicios
{
    public class CategoriaService :ICategoriaService
    {

        private readonly IGenericRepository<Categoria> _categoriaRepositorio;

        private readonly IMapper _mapper;

        public CategoriaService(IGenericRepository<Categoria> categoriaRepositorio, IMapper mapper)
        {
            _categoriaRepositorio = categoriaRepositorio;
            _mapper = mapper;
        }

        public async Task<List<CategoriaDTO>> Lista()
        {
            try
            {
                var listaRoles = await _categoriaRepositorio.Consultar();
                return _mapper.Map<List<CategoriaDTO>>(listaRoles.ToList());
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
