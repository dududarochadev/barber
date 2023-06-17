namespace BarberApi.Dados.Models
{
    public class Servico
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public decimal Valor { get; set; }
        public int EstabelecimentoId { get; set; }
        public Estabelecimento Estabelecimento { get; set; }
        public ICollection<Profissional> Profissionais { get; set; }
        public ICollection<Agendamento> Agendamentos { get; set; }
    }
}