using BarberApi.Dados.Autenticacao.Dtos;
using BarberApi.Dados.Dtos;
using BarberApi.Dados.Models;

namespace BarberApi.Servicos.Interfaces
{
    public interface IServicoDeUsuario
    {
        Usuario Incluir(DtoDeCadastroDeUsuario dtoDeCadastroDeUsuario);
        Usuario Editar(DtoDeUsuario dtoDeUsuario);
        DtoDeUsuario? ObterPorEmail(string email);
        DtoDeUsuario? ObterPorId(int id);
    }
}