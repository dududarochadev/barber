using System.ComponentModel.DataAnnotations.Schema;

namespace BarberApi.Dados.Models
{
    [Table("Proprietario")]
    public class Proprietario
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }
        public int EstabelecimentoId { get; set; }
        public Estabelecimento Estabelecimento { get; set; }
    }
}