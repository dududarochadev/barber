using BarberApi.Dto;
using BarberApi.Servicos.Interfaces.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BarberApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IServicoDeUsuario _servicoDeUsuario;
        private readonly IServicoDeToken _servicoDeToken;

        public AccountController(
            IServicoDeUsuario servicoDeUsuario,
            IServicoDeToken servicoDeToken)
        {
            _servicoDeUsuario = servicoDeUsuario;
            _servicoDeToken = servicoDeToken;
        }

        //TODO ConfirmEmail

        [HttpPost]
        [AllowAnonymous]
        [Route("cadastrar")]
        public async Task<ActionResult<bool>> CadastrarUsuario([FromBody] DtoDeCadastro usuarioCadastro)
        {
            if (usuarioCadastro.ConfirmacaoDeSenha != usuarioCadastro.Senha)
            {
                return BadRequest("Senhas não conferem!");
            }

            var resultado = await _servicoDeUsuario.Cadastrar(usuarioCadastro);

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
        [Route("login")]
        public async Task<ActionResult<DtoDeRetornoLogin>> Login([FromBody] DtoDeLogin login)
        {
            var resultado = await _servicoDeUsuario.Login(login);
            var user = User;

            if (resultado)
            {
                var usuario = await _servicoDeUsuario.ObterUsuarioPorEmail(login.Email);
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

        // private void SalvarCookie(string nomeCookie)
        // {
        //     var cookie = new HttpCookie(nomeCookie);

        //     cookie.Expires = DateTime.Now.AddHours(10);
        //     cookie.HttpOnly = true;

        // }
    }
}