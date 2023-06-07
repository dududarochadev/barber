namespace BarberApi.Dados.Models
{
    public class Estabelecimento
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string? Cnpj { get; set; }
        public string Endereco { get; set; }
    }
}