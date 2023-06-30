namespace BarberApi.Dados.Dtos
{
    public class DtoDeProfissional : DtoDeUsuario
    {
        public ICollection<DtoDeEstabelecimento> Estabelecimentos { get; set; }
    }
}