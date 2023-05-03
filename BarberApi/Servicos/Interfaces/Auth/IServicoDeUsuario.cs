using BarberApi.Dados.Autenticacao.Dtos;
using BarberApi.Dados.Dtos;
using BarberApi.Dados.Models;

namespace BarberApi.Servicos.Interfaces.Auth
{
    public interface IServicoDeUsuario
    {
        Task<bool> Login(DtoDeLogin login);
        Task Logout();
        Task<bool> Incluir(DtoDeCadastro usuarioCadastro);
        Task<bool> Editar(DtoDeCadastro usuarioCadastro);
        Usuario MapearDtoDeCadastroParaEntidade(DtoDeCadastro usuarioCadastro);
        DtoDeUsuario MapearEntidadeParaDto(Usuario usuarioCadastro);
        Task<Usuario> ObterPorEmail(string email);
        Task<Usuario> ObterPorId(int id);
    }
}