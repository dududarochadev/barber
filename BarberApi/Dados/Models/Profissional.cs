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
            Estabelecimentos = new List<Estabelecimento>();
        }

        public ICollection<Servico> Servicos { get; set; }
        public ICollection<Agendamento> AgendamentosDeClientes { get; set; }
        public ICollection<Estabelecimento> Estabelecimentos { get; set; }
    }
}