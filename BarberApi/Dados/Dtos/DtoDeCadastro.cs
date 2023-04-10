namespace BarberApi.Dados.Dtos
{
    public class DtoDeCadastro
    {
        public string NomeCompleto { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string ConfirmacaoDeSenha { get; set; }
        public string? Telefone { get; set; }
        public string? Cpf { get; set; }
    }
}