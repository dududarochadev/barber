namespace BarberApi.Dados.Models
{
    public class Estabelecimento
    {
        public Estabelecimento()
        {
            Agendamentos = new List<Agendamento>();
            Profissionais = new List<Profissional>();
            Servicos = new List<Servico>();
        }

        public int Id { get; set; }
        public string Nome { get; set; }
        public string? Cnpj { get; set; }
        public string Endereco { get; set; }
        public ICollection<Agendamento> Agendamentos { get; set; }
        public ICollection<Profissional> Profissionais { get; set; }
        public ICollection<Servico> Servicos { get; set; }
    }
}