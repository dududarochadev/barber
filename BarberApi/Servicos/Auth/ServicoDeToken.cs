using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BarberApi.Models;
using BarberApi.Servicos.Interfaces.Auth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace BarberApi.Servicos.Auth
{
    public class ServicoDeToken : IServicoDeToken
    {
        private readonly IConfiguration _configuration;

        public ServicoDeToken(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GerarToken(Usuario usuario)
        {
            var claims = new List<Claim>();

            if (!string.IsNullOrEmpty(usuario.UserName))
            {
                claims.Add(new Claim(ClaimTypes.Name, usuario.NomeCompleto));
            }

            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]));
            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
            var expiration = DateTime.UtcNow.AddDays(14);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: expiration,
                signingCredentials: signingCredentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // public JwtSecurityToken VerificarToken(string jwt)
        // {
        //     var tokenHandler = new JwtSecurityTokenHandler();
        //     var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

        //     var validationParameters = new TokenValidationParameters()
        //     {
        //         IssuerSigningKey = new SymmetricSecurityKey(key),
        //         ValidateIssuerSigningKey = true,
        //         ValidateIssuer = false,
        //         ValidateAudience = false
        //     };

        //     tokenHandler.ValidateToken(jwt, validationParameters, out SecurityToken validatedToken);

        //     return (JwtSecurityToken)validatedToken;
        // }
    }
}