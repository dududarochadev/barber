using BarberApi.Dados.Models;
using BarberApi.Dto;

namespace BarberApi.Servicos.Interfaces.Auth
{
    public interface IServicoDeUsuario
    {
        Task<bool> Login(DtoDeLogin login);
        Task Logout();
        Task<bool> Cadastrar(DtoDeCadastro usuarioCadastro);
        Usuario MapeamentoDeUsuario(DtoDeCadastro usuarioCadastro);
        Task<Usuario> ObterUsuarioPorEmail(string email);
    }
}