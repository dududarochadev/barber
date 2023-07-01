using AutoMapper.Configuration.Annotations;

namespace BarberApi.Dados.Models
{
    public class Agendamento
    {
        public Agendamento()
        {
            Passado = DateTime.Now < DataAgendamento;
        }

        public int Id { get; set; }
        public DateTime DataAgendamento { get; set; }
        public bool Passado { get; set; }
        public int UsuarioId { get; set; }
        public int ServicoId { get; set; }
        public int ProfissionalId { get; set; }
        public int EstabelecimentoId { get; set; }
        public Usuario Usuario { get; set; }
        public Servico Servico { get; set; }
        public Profissional Profissional { get; set; }
        public Estabelecimento Estabelecimento { get; set; }
    }
}