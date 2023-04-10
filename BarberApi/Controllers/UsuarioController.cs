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
        public Usuario ObterPorId([FromQuery] int id)
        {
            var usuario = new Usuario()
            {
                Nome = "Dudu da Rocha",
                Cpf = "837.702.240-00",
                Email = "eduardoldarocha@gmail.com",
                PhoneNumber = "51 993848249",
                Sexo = Sexo.Masculino,
                Foto = ""
            };

            return usuario;
        }
    }
}