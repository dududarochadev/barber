using BarberApi.Dados.Autenticacao.Dtos;
using BarberApi.Dados.Dtos;
using BarberApi.Servicos.Interfaces.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BarberApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IServicoDeUsuario _servicoDeUsuario;
        private readonly IServicoDeToken _servicoDeToken;

        public UsuarioController(
            IServicoDeUsuario servicoDeUsuario,
            IServicoDeToken servicoDeToken)
        {
            _servicoDeUsuario = servicoDeUsuario;
            _servicoDeToken = servicoDeToken;
        }

        //TODO ConfirmEmail

        [HttpPost]
        [AllowAnonymous]
        [Route("login")]
        public async Task<ActionResult<DtoDeRetornoLogin>> Login([FromBody] DtoDeLogin login)
        {
            var resultado = await _servicoDeUsuario.Login(login);
            var user = User;

            if (resultado)
            {
                var usuario = await _servicoDeUsuario.ObterPorEmail(login.Email);
                var token = _servicoDeToken.GerarToken(usuario);

                var retorno = new DtoDeRetornoLogin
                {
                    Nome = usuario.Nome,
                    Token = token
                };

                return retorno;
            }
            else
            {
                return BadRequest("Usuário ou senha inválidos.");
            }
        }

        // [HttpGet]
        // [AllowAnonymous]
        // [Route("login")]
        // public ActionResult<string> Login(string returnUrl)
        // {
        //     if (User.Identity.IsAuthenticated)
        //     {
        //         return Redirect(returnUrl);
        //     }

        //     return Unauthorized("Usuário deslogado.");
        // }

        [HttpPost]
        // [Authorize]
        [Route("logout")]
        public async Task Logout()
        {
            await _servicoDeUsuario.Logout();
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("cadastrar")]
        public async Task<ActionResult<bool>> CadastrarUsuario([FromBody] DtoDeCadastro usuarioCadastro)
        {
            if (usuarioCadastro.ConfirmacaoDeSenha != usuarioCadastro.Senha)
            {
                return BadRequest("Senhas não conferem!");
            }

            var resultado = await _servicoDeUsuario.Incluir(usuarioCadastro);

            if (resultado)
            {
                return Ok("Usuário cadastrado com sucesso!");
            }
            else
            {
                return BadRequest("Erro ao cadastrar usuário!");
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("editar")]
        public async Task<ActionResult<bool>> EditarUsuario([FromBody] DtoDeCadastro usuarioCadastro)
        {
            if (usuarioCadastro.ConfirmacaoDeSenha != usuarioCadastro.Senha)
            {
                return BadRequest("Senhas não conferem!");
            }

            var resultado = await _servicoDeUsuario.Incluir(usuarioCadastro);

            if (resultado)
            {
                return Ok("Usuário cadastrado com sucesso!");
            }
            else
            {
                return BadRequest("Erro ao cadastrar usuário!");
            }
        }

        // private void SalvarCookie(string nomeCookie)
        // {
        //     var cookie = new HttpCookie(nomeCookie);

        //     cookie.Expires = DateTime.Now.AddHours(10);
        //     cookie.HttpOnly = true;

        // }

        [HttpGet]
        // [Authorize]
        public async Task<ActionResult<DtoDeUsuario>> ObterPorId([FromQuery] int id)
        {
            var usuario = await _servicoDeUsuario.ObterPorId(id);
            return Ok(usuario);
        }
    }
}