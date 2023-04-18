namespace BarberApi.Dados.Models
{
    public class Estabelecimento
    {
        public Estabelecimento()
        {
            Funcionarios = new List<Funcionario>();
        }

        public int Id { get; set; }
        public string Nome { get; set; }
        public string? Cnpj { get; set; }
        public List<Funcionario> Funcionarios { get; set; }
    }
}