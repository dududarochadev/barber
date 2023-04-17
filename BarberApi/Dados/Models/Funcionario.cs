using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BarberApi.Dados.Models
{
    public class Funcionario
    {
        public Funcionario()
        {
            Servicos = new List<Servico>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CodigoFuncionario { get; set; }
        public int CodigoUsuario { get; set; }
        public int CodigoEstabelecimento { get; set; }
        public List<Servico> Servicos { get; set; }
        public virtual Usuario Usuario { get; set; }
        public virtual Estabelecimento Estabelecimento { get; set; }

    }
}