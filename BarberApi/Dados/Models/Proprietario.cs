using System.ComponentModel.DataAnnotations.Schema;
using BarberApi.Dados.Enumeradores;

namespace BarberApi.Dados.Models
{
    [Table("Proprietario")]
    public class Proprietario : Profissional
    {
        public Proprietario()
        {
            TipoUsuario = TipoUsuario.Proprietario;
        }

        public int EstabelecimentoId { get; set; }
        public Estabelecimento Estabelecimento { get; set; }
    }
}