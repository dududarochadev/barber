using System.Text.Json.Serialization;
using BarberApi.Dados.Enumeradores;

namespace BarberApi.Dados.Dtos
{
    public class DtoDeUsuario
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string PrimeiroNome { get; set; }
        public string Email { get; set; }
        public string? Cpf { get; set; }
        public string? Telefone { get; set; }
        public Sexo Sexo { get; set; }
        public string? Foto { get; set; }
        [JsonIgnore]
        public string Senha { get; set; }
        public ICollection<DtoDeAgendamento> Agendamentos { get; set; }
    }
}