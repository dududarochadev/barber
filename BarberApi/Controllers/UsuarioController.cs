using BarberApi.Dados.Dtos;
using BarberApi.Servicos.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BarberApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IServicoDeUsuario _servicoDeUsuario;

        public UsuarioController(IServicoDeUsuario servicoDeUsuario)
        {
            _servicoDeUsuario = servicoDeUsuario;
        }

        //TODO ConfirmEmail

        [HttpPost]
        [Route("editar")]
        public IActionResult Editar([FromBody] DtoDeUsuario dtoDeUsuario)
        {
            var usuario = _servicoDeUsuario.Editar(dtoDeUsuario);

            return Ok(usuario);
        }

        [HttpGet]
        public IActionResult ObterPorId([FromQuery] int id)
        {
            var dtoUsuario = _servicoDeUsuario.ObterPorId(id);

            if (dtoUsuario != null)
            {
                return Ok(dtoUsuario);
            }

            return NotFound("Usuário não encontrado");
        }

        [HttpGet]
        public IActionResult ObterPorEmail(string email)
        {
            var dtoUsuario = _servicoDeUsuario.ObterPorEmail(email);

            if (dtoUsuario != null)
            {
                return Ok(dtoUsuario);
            }

            return NotFound("Usuário não encontrado");
        }
    }
}