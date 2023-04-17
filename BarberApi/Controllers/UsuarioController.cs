using BarberApi.Dados.Dtos;
using BarberApi.Dados.Enumeradores;
using BarberApi.Dados.Models;
using Microsoft.AspNetCore.Mvc;

namespace BarberApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        [HttpGet]
        // [Authorize]
        public DtoDeUsuario ObterPorId([FromQuery] int id)
        {
            var usuario = new DtoDeUsuario()
            {
                NomeCompleto = "Dudu da Rocha",
                PrimeiroNome = "Dudu da Rocha".Substring(0, "Dudu da Rocha".IndexOf(" ")),
                Cpf = "837.702.240-00",
                Email = "eduardoldarocha@gmail.com",
                Telefone = "51 993848249",
                Sexo = Sexo.Masculino,
                Foto = ""
            };

            return usuario;
        }
    }
}