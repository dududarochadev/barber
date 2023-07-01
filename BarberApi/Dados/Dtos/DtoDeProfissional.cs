namespace BarberApi.Dados.Dtos
{
    public class DtoDeProfissional
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? Foto { get; set; }
        public int? UsuarioId { get; set; }
        public ICollection<DtoDeEstabelecimento> Estabelecimentos { get; set; }
    }
}