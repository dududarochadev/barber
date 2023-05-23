using System.Text.Json.Serialization;
using BarberApi.Dados.Enumeradores;

namespace BarberApi.Dados.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string? Cpf { get; set; }
        public Sexo Sexo { get; set; } = Sexo.Nenhum;
        public string? Foto { get; set; }
        public string? Telefone { get; set; }
        [JsonIgnore]
        public string Senha { get; set; }
    }
}