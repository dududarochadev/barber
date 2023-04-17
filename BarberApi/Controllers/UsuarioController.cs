using BarberApi.Dados;
using BarberApi.Dados.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace BarberApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly Contexto _db;

        public UsuarioController(Contexto db)
        {
            _db = db;
        }

        [HttpGet]
        // [Authorize]
        public ActionResult<DtoDeUsuario> ObterPorId([FromQuery] int id)
        {
            var usuario = (from usu in _db.Users
                           where usu.Id == id
                           select new DtoDeUsuario()
                           {
                               NomeCompleto = usu.Nome,
                               PrimeiroNome = usu.Nome.Substring(0, usu.Nome.IndexOf(" ")),
                               Cpf = usu.Cpf,
                               Email = usu.Email,
                               Telefone = usu.PhoneNumber,
                               Sexo = usu.Sexo,
                               Foto = usu.Foto
                           }).FirstOrDefault();

            if (usuario == null)
            {
                return BadRequest("Usuário não encontrado");
            }

            // var usuario = new DtoDeUsuario()
            // {
            //     NomeCompleto = "Dudu da Rocha",
            //     PrimeiroNome = "Dudu da Rocha".Substring(0, "Dudu da Rocha".IndexOf(" ")),
            //     Cpf = "837.702.240-00",
            //     Email = "eduardoldarocha@gmail.com",
            //     Telefone = "51 993848249",
            //     Sexo = Sexo.Masculino,
            //     Foto = ""
            // };

            return usuario;
        }
    }
}