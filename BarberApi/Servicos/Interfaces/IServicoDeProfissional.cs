using BarberApi.Dados.Dtos;
using BarberApi.Dados.Models;

namespace BarberApi.Servicos.Interfaces
{
    public interface IServicoDeProfissional : IServicoDeCRUD<Profissional, DtoDeProfissional>
    {
        List<string> ListarHorariosDisponiveis(int id, DtoDeCalendario dia);
    }
}