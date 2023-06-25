using BarberApi.Dados.Dtos;
using BarberApi.Dados.Models;
using BarberApi.Servicos.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BarberApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProfissionalController : ControllerBase
    {
        private readonly IServicoDeProfissional _servicoDeProfissional;

        public ProfissionalController(IServicoDeProfissional servicoDeProfissional)
        {
            _servicoDeProfissional = servicoDeProfissional;
        }

        [HttpPost]
        public IActionResult Incluir([FromBody] DtoDeProfissional dtoDeProfissional)
        {
            var profissional = _servicoDeProfissional.Incluir(dtoDeProfissional);

            return Ok(profissional);
        }

        [HttpPut]
        public IActionResult Editar([FromBody] DtoDeProfissional dtoDeProfissional)
        {
            var profissional = _servicoDeProfissional.Editar(dtoDeProfissional);

            return Ok(profissional);
        }

        [HttpGet]
        public Profissional ObterPorId([FromQuery] int id)
        {
            var profissional = _servicoDeProfissional.ObterPorId(id);

            return profissional;
        }

        [HttpGet]
        [Route("/listarHorariosDisponiveis")]
        public List<string> ListarHorariosDisponiveis([FromQuery] int id, [FromQuery] DtoDeCalendario dia)
        {
            var horarios = _servicoDeProfissional.ListarHorariosDisponiveis(id, dia);

            return horarios;
        }

        [HttpDelete]
        public IActionResult Excluir([FromQuery] int id)
        {
            _servicoDeProfissional.Excluir(id);

            return Ok();
        }
    }
}