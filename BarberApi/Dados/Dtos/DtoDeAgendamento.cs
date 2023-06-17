namespace BarberApi.Dados.Dtos
{
    public class DtoDeAgendamento
    {
        public int Id { get; set; }
        public DateTime DataAgendamento { get; set; }
        public bool Passado { get; set; }
        public int UsuarioId { get; set; }
        public int ServicoId { get; set; }
        public string DescricaoServico { get; set; }
        public int ProfissionalId { get; set; }
        public string NomeProfissional { get; set; }
        public int EstabelecimentoId { get; set; }
        public string NomeEstabelecimento { get; set; }
        public string EnderecoEstabelecimento { get; set; }
    }
}