using BarberApi.Dados.Dtos;
using BarberApi.Servicos.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BarberApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EstabelecimentoController : ControllerBase
    {
        private readonly IServicoDeEstabelecimento _servicoDeEstabelecimento;

        public EstabelecimentoController(IServicoDeEstabelecimento servicoDeEstabelecimento)
        {
            _servicoDeEstabelecimento = servicoDeEstabelecimento;
        }

        [HttpPost]
        public IActionResult Incluir([FromBody] DtoDeEstabelecimento dtoDeEstabelecimento)
        {
            var estabelecimento = _servicoDeEstabelecimento.Incluir(dtoDeEstabelecimento);

            return Ok(estabelecimento);
        }

        [HttpPut]
        public IActionResult Editar([FromBody] DtoDeEstabelecimento dtoDeEstabelecimento)
        {
            var estabelecimento = _servicoDeEstabelecimento.Editar(dtoDeEstabelecimento);

            return Ok(estabelecimento);
        }

        [HttpGet]
        public IActionResult ObterPorId([FromQuery] int id)
        {
            var estabelecimento = _servicoDeEstabelecimento.ObterPorId(id);

            return Ok(estabelecimento);
        }

        [HttpDelete]
        public IActionResult Excluir([FromQuery] int id)
        {
            _servicoDeEstabelecimento.Excluir(id);

            return Ok();
        }
    }
}