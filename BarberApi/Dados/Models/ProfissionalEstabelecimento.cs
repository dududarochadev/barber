using System.ComponentModel.DataAnnotations.Schema;

namespace BarberApi.Dados.Models
{
    [Table("ProfissionalEstabelecimento")]
    public class ProfissionalEstabelecimento
    {
        public int ProfissionalId { get; set; }
        public int EstabelecimentoId { get; set; }
    }
}