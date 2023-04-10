using BarberApi.Dados.Enumeradores;
using Microsoft.AspNetCore.Identity;

namespace BarberApi.Dados.Models
{
    public class Usuario : IdentityUser<int>
    {
        public string Nome { get; set; }
        public string? Cpf { get; set; }
        public Sexo Sexo { get; set; }
        public string? Foto { get; set; }
    }
}