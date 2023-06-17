using BarberApi.Dados.Dtos;
using BarberApi.Dados.Models;
using BarberApi.Servicos.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BarberApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AgendamentoController : ControllerBase
    {
        private readonly IServicoDeAgendamento _servicoDeAgendamento;

        public AgendamentoController(IServicoDeAgendamento servicoDeAgendamento)
        {
            _servicoDeAgendamento = servicoDeAgendamento;
        }

        //TODO ConfirmEmail

        [HttpPost]
        public IActionResult Incluir([FromBody] DtoDeAgendamento dtoDeAgendamento)
        {
            var agendamento = _servicoDeAgendamento.Incluir(dtoDeAgendamento);

            return Ok(agendamento);
        }

        [HttpPut]
        public IActionResult Editar([FromBody] DtoDeAgendamento dtoDeAgendamento)
        {
            var agendamento = _servicoDeAgendamento.Editar(dtoDeAgendamento);

            return Ok(agendamento);
        }

        [HttpGet]
        public IActionResult ObterPorId([FromQuery] int id)
        {
            var agendamento = _servicoDeAgendamento.ObterPorId(id);

            return Ok(agendamento);
        }

        // [HttpGet]
        // public List<Agendamento> ObterAgendamentosPorIdUsuario([FromQuery] int idUsuario)
        // {
        //     var agendamentos = _servicoDeAgendamento.ObterAgendamentosPorIdUsuario(idUsuario);

        //     return agendamentos;
        // }

        [HttpDelete]
        public IActionResult Excluir([FromQuery] int id)
        {
            _servicoDeAgendamento.Excluir(id);

            return Ok();
        }
    }
}