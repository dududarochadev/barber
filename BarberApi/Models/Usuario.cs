using Microsoft.AspNetCore.Identity;

namespace BarberApi.Models
{
    public class Usuario : IdentityUser<int>
    {
        public string NomeCompleto { get; set; }
        public string? Cpf { get; set; }
    }
}