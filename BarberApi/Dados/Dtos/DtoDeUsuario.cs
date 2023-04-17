using BarberApi.Dados.Enumeradores;

namespace BarberApi.Dados.Dtos
{
    public class DtoDeUsuario
    {
        public string NomeCompleto { get; set; }
        public string PrimeiroNome { get; set; }
        public string Email { get; set; }
        public string? Cpf { get; set; }
        public string? Telefone { get; set; }
        public Sexo? Sexo { get; set; }
        public string? Foto { get; set; }
    }
}