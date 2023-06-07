namespace BarberApi.Dados.Models
{
    public class Agendamento
    {
        public int Id { get; set; }
        public Servico Servico { get; set; }
        public Profissional Profissional { get; set; }
        public DateTime DataAgendamento { get; set; }
    }
}