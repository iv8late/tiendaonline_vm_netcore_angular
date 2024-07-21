using System;
using System.Collections.Generic;

namespace MITIENDA.Models;

public partial class Usuario
{
    public int IdUsuario { get; set; }

    public string? NombreCompleto { get; set; }

    public string Cedula { get; set; } = null!;

    public string? Correo { get; set; }

    public int? IdRol { get; set; }

    public string? Clave { get; set; }

    public bool? Estado { get; set; }

    public DateTime? FechaRegistro { get; set; }

    public virtual ICollection<Carrito> Carritos { get; set; } = new List<Carrito>();

    public virtual ICollection<Factura> FacturaCedulaNavigations { get; set; } = new List<Factura>();

    public virtual ICollection<Factura> FacturaIdUsuarioNavigations { get; set; } = new List<Factura>();


    public virtual Rol? IdRolNavigation { get; set; }
}
