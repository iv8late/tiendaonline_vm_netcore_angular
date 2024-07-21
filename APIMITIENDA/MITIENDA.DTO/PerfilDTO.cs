namespace MITIENDA.DTO
{
    public class PerfilDTO
    {
        public int IdUsuario { get; set; }
        public string? NombreCompleto { get; set; }
        public string Cedula { get; set; } = null!;
        public string? Correo { get; set; }
        public int? IdRol { get; set; }
        public bool? Estado { get; set; }
        public DateTime? FechaRegistro { get; set; }

        public string? TotalCompras { get; set; }

       
        
    }
}
