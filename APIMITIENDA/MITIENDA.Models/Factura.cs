using System;
using System.Collections.Generic;

namespace MITIENDA.Models;

public partial class Factura
{
    public int IdFactura { get; set; }

    public string? NumeroDocumento { get; set; }

    public string? TipoPago { get; set; }

    public decimal? Total { get; set; }

    public int? IdUsuario { get; set; }

    public string? Cedula { get; set; }

    public DateTime? FechaRegistro { get; set; }

    public virtual Usuario? CedulaNavigation { get; set; }

    public virtual ICollection<DetalleFactura> DetalleFactura { get; set; } = new List<DetalleFactura>();


    public virtual Usuario? IdUsuarioNavigation { get; set; }
}
