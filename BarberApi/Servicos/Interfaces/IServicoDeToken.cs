using System.IdentityModel.Tokens.Jwt;
using BarberApi.Dados.Dtos;

namespace BarberApi.Servicos.Interfaces
{
    public interface IServicoDeToken
    {
        public string GerarToken(DtoDeUsuario dtoDeUsuario);
        public JwtSecurityToken VerificarToken(string jwt);
    }
}