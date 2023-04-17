using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BarberApi.Dados.Models
{
    public class FuncionarioServico
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CodigoFuncionarioServico { get; set; }
        public int CodigoFuncionario { get; set; }
        public int CodigoServico { get; set; }

    }
}