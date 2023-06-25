using BarberApi.Dados.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace BarberApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CalendarioController : ControllerBase
    {
        [HttpGet]
        public List<DtoDeCalendario> ObterDias()
        {
            var dias = new List<DtoDeCalendario>();

            var dataAtual = DateTime.Now;

            for (int i = 0; i < 90; i++)
            {
                dias.Add(
                    new DtoDeCalendario
                    {
                        Id = i++,
                        Mes = dataAtual.Month.ToString("00"),
                        DiaDoMes = dataAtual.Day.ToString("00"),
                        DiaDaSemana = dataAtual.ToString("ddd").ToUpper(),
                    }
                );

                dataAtual = dataAtual.AddDays(1);
            }

            return dias;
        }
    }
}