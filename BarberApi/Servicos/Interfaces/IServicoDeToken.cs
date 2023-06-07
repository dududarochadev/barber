using System.IdentityModel.Tokens.Jwt;
using BarberApi.Dados.Models;

namespace BarberApi.Servicos.Interfaces
{
    public interface IServicoDeToken
    {
        public string GerarToken(Usuario usuario);
        public JwtSecurityToken VerificarToken(string jwt);
    }
}