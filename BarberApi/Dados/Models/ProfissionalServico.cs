namespace BarberApi.Dados.Models
{
    public class ProfissionalServico
    {
        public int Id { get; set; }
        public Profissional Profissional { get; set; }
        public Servico Servico { get; set; }
    }
}