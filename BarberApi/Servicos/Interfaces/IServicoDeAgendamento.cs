using BarberApi.Dados.Dtos;
using BarberApi.Dados.Models;

namespace BarberApi.Servicos.Interfaces
{
    public interface IServicoDeAgendamento : IServicoDeCRUD<Agendamento, DtoDeAgendamento>
    {
        List<Agendamento> ObterAgendamentosPorIdUsuario(int idUsuario);
    }
}