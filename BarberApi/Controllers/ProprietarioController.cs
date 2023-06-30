using BarberApi.Dados.Dtos;
using BarberApi.Dados.Models;
using BarberApi.Servicos.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BarberApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProprietarioController : ControllerBase
    {
        private readonly IServicoDeProprietario _servicoDeProprietario;

        public ProprietarioController(IServicoDeProprietario servicoDeProprietario)
        {
            _servicoDeProprietario = servicoDeProprietario;
        }

        [HttpPost]
        public IActionResult Incluir([FromBody] DtoDeProprietario dtoDeProprietario)
        {
            var Proprietario = _servicoDeProprietario.Incluir(dtoDeProprietario);

            return Ok(Proprietario);
        }

        [HttpPut]
        public IActionResult Editar([FromBody] DtoDeProprietario dtoDeProprietario)
        {
            var Proprietario = _servicoDeProprietario.Editar(dtoDeProprietario);

            return Ok(Proprietario);
        }

        [HttpGet]
        public Proprietario ObterPorId([FromQuery] int id)
        {
            var Proprietario = _servicoDeProprietario.ObterPorId(id);

            return Proprietario;
        }

        [HttpDelete]
        public IActionResult Excluir([FromQuery] int id)
        {
            _servicoDeProprietario.Excluir(id);

            return Ok();
        }
    }
}