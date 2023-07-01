using System.ComponentModel.DataAnnotations.Schema;

namespace BarberApi.Dados.Models
{
    [Table("ProfissionalServico")]
    public class ProfissionalServico
    {
        public int ProfissionalId { get; set; }
        public int ServicoId { get; set; }
        public int DuracaoServicoProfissional { get; set; }
    }
}