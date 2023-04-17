using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BarberApi.Dados.Models
{
    public class Estabelecimento
    {
        public Estabelecimento()
        {
            Funcionarios = new List<Funcionario>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CodigoEstabelecimento { get; set; }
        public string Nome { get; set; }
        public string? Cnpj { get; set; }
        public List<Funcionario> Funcionarios { get; set; }

    }
}