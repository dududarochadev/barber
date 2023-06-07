namespace BarberApi.Dados.Models
{
    public class Profissional
    {
        public Profissional()
        {
            Servicos = new List<Servico>();
        }
        public int Id { get; set; }
        public Usuario Usuario { get; set; }
        public List<Servico> Servicos { get; set; }
        public Estabelecimento Estabelecimento { get; set; }
    }
}