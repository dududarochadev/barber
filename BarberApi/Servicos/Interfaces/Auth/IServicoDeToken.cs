using BarberApi.Dados.Models;

namespace BarberApi.Servicos.Interfaces.Auth
{
    public interface IServicoDeToken
    {
        public string GerarToken(Usuario usuario);
        // public JwtSecurityToken VerificarToken(string jwt);
    }
}