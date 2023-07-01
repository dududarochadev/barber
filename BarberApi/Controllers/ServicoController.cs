using BarberApi.Dados.Dtos;
using BarberApi.Dados.Models;
using BarberApi.Servicos.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BarberApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ServicoController : ControllerBase
    {
        private readonly IServicoDeServico _servicoDeServico;

        public ServicoController(IServicoDeServico servicoDeServico)
        {
            _servicoDeServico = servicoDeServico;
        }

        [HttpPost]
        public IActionResult Incluir([FromBody] DtoDeServico dtoDeServico)
        {
            var Servico = _servicoDeServico.Incluir(dtoDeServico);

            return Ok(Servico);
        }

        [HttpPut]
        public IActionResult Editar([FromBody] DtoDeServico dtoDeServico)
        {
            var Servico = _servicoDeServico.Editar(dtoDeServico);

            return Ok(Servico);
        }

        [HttpGet]
        public IActionResult ObterPorId([FromQuery] int id)
        {
            var Servico = _servicoDeServico.ObterPorId(id);

            return Ok(Servico);
        }

        [HttpGet]
        [Route("estabelecimento")]
        public IActionResult ListarPorEstabelecimento([FromQuery] int estabelecimentoId)
        {
            var Servico = _servicoDeServico.ListarPorEstabelecimento(estabelecimentoId);

            return Ok(Servico);
        }

        [HttpDelete]
        public IActionResult Excluir([FromQuery] int id)
        {
            _servicoDeServico.Excluir(id);

            return Ok();
        }
    }
}