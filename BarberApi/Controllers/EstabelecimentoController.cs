using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BarberApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EstabelecimentoController : ControllerBase
    {
        [HttpGet]
        // [Authorize]
        public List<string> ObterEstabelecimentos()
        {
            var estabelecimentos = new List<string>() {
                "La Máfia",
                "Teste1",
                "Teste2"
            };

            return estabelecimentos;
        }
    }
}