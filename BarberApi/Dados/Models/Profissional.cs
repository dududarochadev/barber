using System.ComponentModel.DataAnnotations.Schema;
using BarberApi.Dados.Enumeradores;

namespace BarberApi.Dados.Models
{
    [Table("Profissional")]
    public class Profissional : Usuario
    {
        public Profissional()
        {
            TipoUsuario = TipoUsuario.Profissional;
            Servicos = new List<Servico>();
            AgendamentosDeClientes = new List<Agendamento>();
        }

        public int EstabelecimentoId { get; set; }
        public ICollection<Servico> Servicos { get; set; }
        public ICollection<Agendamento> AgendamentosDeClientes { get; set; }
        public Estabelecimento Estabelecimento { get; set; }
    }
}