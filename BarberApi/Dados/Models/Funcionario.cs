namespace BarberApi.Dados.Models
{
    public class Funcionario
    {
        public Funcionario()
        {
            Servicos = new List<Servico>();
        }

        public int Id { get; set; }
        public List<Servico> Servicos { get; set; }
        public virtual Usuario Usuario { get; set; }
        public virtual Estabelecimento Estabelecimento { get; set; }
    }
}