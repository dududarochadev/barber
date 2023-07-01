using BarberApi.Dados.Dtos;
using BarberApi.Dados.Models;

namespace BarberApi.Servicos.Interfaces
{
    public interface IServicoDeServico : IServicoDeCRUD<Servico, DtoDeServico>
    {
        public List<Servico> ListarPorEstabelecimento(int estabelecimentoId);
    }
}