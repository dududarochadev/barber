using BarberApi.Dados.Autenticacao.Dtos;
using BarberApi.Dados.Dtos;
using BarberApi.Dados.Models;

namespace BarberApi.Servicos.Interfaces
{
    public interface IServicoDeUsuario
    {
        Usuario Incluir(DtoDeCadastro usuarioCadastro);
        // Usuario Editar(DtoDeCadastro usuarioCadastro);
        Usuario MapearDtoDeCadastroParaEntidade(DtoDeCadastro usuarioCadastro);
        DtoDeUsuario MapearEntidadeParaDto(Usuario usuarioCadastro);
        Usuario ObterPorEmail(string email);
        Usuario ObterPorId(int id);
    }
}