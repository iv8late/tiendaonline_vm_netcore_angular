﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MITIENDA.BLL.Servicios.Contratos;
using MITIENDA.DAL.Repositorios.Contratos;
using MITIENDA.DTO;
using MITIENDA.Models;
using System;
using System.Linq;

namespace MITIENDA.BLL.Servicios
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IGenericRepository<Usuario> _usuarioRepositorio;

        private readonly IMapper _mapper;

        public UsuarioService(IGenericRepository<Usuario> usuarioRepositorio, IMapper mapper)
        {
            _usuarioRepositorio = usuarioRepositorio;
            _mapper = mapper;
        }



        public async Task<List<UsuarioDTO>> Lista()
        {

            try
            {
                var queryUsuario = await _usuarioRepositorio.Consultar();
                var listaUsuarios = queryUsuario.Include(rol => rol.IdRolNavigation).ToList();
                return _mapper.Map<List<UsuarioDTO>>(listaUsuarios);

            }
            catch
            {
                throw;
            } 

        }

        public async Task<SesionDTO> ValidarCredenciales(string correo, string clave)
        {
            try
            {
                var queryUsuario = await _usuarioRepositorio.Consultar(u=>
                u.Correo == correo &&
                u.Clave == clave);



                if (queryUsuario.FirstOrDefault() == null)
                    throw new TaskCanceledException("El usuario no existe");
                Usuario devolverUsuario = queryUsuario.Include(rol => rol.IdRolNavigation).First();
                
                return _mapper.Map<SesionDTO>(devolverUsuario);



            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<UsuarioDTO> Crear(UsuarioDTO modelo)
        {
            try{
                
                var usuarioCreado = await _usuarioRepositorio.Crear(_mapper.Map<Usuario>(modelo));

                if (usuarioCreado.IdUsuario == 0)
                    throw new TaskCanceledException("No se pudo crear");
                
                
                var query = await _usuarioRepositorio.Consultar(u => u.IdUsuario == usuarioCreado.IdUsuario);
                usuarioCreado = query.Include(rol => rol.IdRolNavigation).First();
                
                return _mapper.Map<UsuarioDTO>(usuarioCreado);

            } catch (Exception)                                                               {

                throw;
            }

        }

        public async Task<bool> Editar(UsuarioDTO modelo)
        {
            try
            {
                var usuarioModelo = _mapper.Map<Usuario>(modelo);

                var usuarioEncontrado = await _usuarioRepositorio.Obtener(u => u.IdUsuario == usuarioModelo.IdUsuario); 
                
                if (usuarioEncontrado == null)
                    throw new TaskCanceledException("El usuario no existe");


                usuarioEncontrado.NombreCompleto = usuarioModelo.NombreCompleto; usuarioEncontrado.Correo = usuarioModelo.Correo;
                usuarioEncontrado.IdRol = usuarioModelo.IdRol;
                usuarioEncontrado.Clave = usuarioModelo.Clave; usuarioEncontrado.Estado = usuarioModelo.Estado;
                bool respuesta = await _usuarioRepositorio.Editar(usuarioEncontrado);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo editar");
                return respuesta;
            }
            catch (Exception)
            {

                throw;
            }

        }

        public async Task<bool> Eliminar(int id)
        {
            try
            {


                var usuarioEcontrado = await _usuarioRepositorio.Obtener(u => u.IdUsuario == id);

                if (usuarioEcontrado == null)
                    throw new TaskCanceledException("El usuario no existe");

                bool respuesta = await _usuarioRepositorio.Eliminar(usuarioEcontrado);

                if (!respuesta)
                    throw new TaskCanceledException("No se pudo eliminar");
                return respuesta;
                

            }
            catch (Exception)  {
                throw;
            }

        }

    }
}