using System.ComponentModel.DataAnnotations.Schema;

namespace BarberApi.Dados.Models
{
    [Table("Profissional")]
    public class Profissional
    {
        public Profissional()
        {
            Servicos = new List<Servico>();
            ProfissionalServicos = new List<ProfissionalServico>();
            AgendamentosDeClientes = new List<Agendamento>();
            Estabelecimentos = new List<Estabelecimento>();
        }

        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? Foto { get; set; }
        public int? UsuarioId { get; set; }
        public Usuario? Usuario { get; set; }
        public ICollection<Servico> Servicos { get; set; }
        public ICollection<ProfissionalServico> ProfissionalServicos { get; set; }
        public ICollection<Agendamento> AgendamentosDeClientes { get; set; }
        public ICollection<Estabelecimento> Estabelecimentos { get; set; }
    }
}