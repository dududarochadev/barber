using BarberApi.Dados.Autenticacao.Dtos;
using BarberApi.Dados.Models;

namespace BarberApi.Servicos.Interfaces.Auth
{
    public interface IServicoDeUsuario
    {
        Task<bool> Login(DtoDeLogin login);
        Task Logout();
        Task<bool> Incluir(DtoDeCadastro usuarioCadastro);
        Task<bool> Editar(DtoDeCadastro usuarioCadastro);
        Usuario MapeamentoDeUsuario(DtoDeCadastro usuarioCadastro);
        Task<Usuario> ObterPorEmail(string email);
        Task<Usuario> ObterPorId(int id);
    }
}