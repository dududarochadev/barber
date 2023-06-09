using BarberApi.Dados.Autenticacao.Dtos;
using BarberApi.Servicos.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BarberApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IServicoDeUsuario _servicoDeUsuario;
        private readonly IServicoDeToken _servicoDeToken;

        public AuthController(
            IServicoDeUsuario servicoDeUsuario,
            IServicoDeToken servicoDeToken)
        {
            _servicoDeUsuario = servicoDeUsuario;
            _servicoDeToken = servicoDeToken;
        }

        //TODO ConfirmEmail

        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] DtoDeLogin dtoLogin)
        {
            try
            {
                var usuario = _servicoDeUsuario.ObterPorEmail(dtoLogin.Email);

                if (usuario == null)
                {
                    return BadRequest("Usuário ou senha inválidos.");
                }
                else if (!BCrypt.Net.BCrypt.Verify(dtoLogin.Senha, usuario.Senha))
                {
                    return BadRequest("Usuário ou senha inválidos.");
                }
                else
                {
                    if (!string.IsNullOrEmpty(Request.Cookies["jwt"]))
                    {
                        Logout();
                    }

                    var token = _servicoDeToken.GerarToken(usuario);

                    Response.Cookies.Append("jwt", token, new CookieOptions
                    {
                        HttpOnly = true,
                        SameSite = SameSiteMode.None,
                        Secure = true
                    });

                    return Ok(usuario.Id);
                }
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        [HttpPost]
        [Route("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt", new CookieOptions()
            {
                Secure = true,
                SameSite = SameSiteMode.None,
                HttpOnly = true
            });

            return Ok(new
            {
                message = "Sucesso!"
            });
        }

        [HttpPost]
        [Route("cadastrar")]
        public IActionResult CadastrarUsuario([FromBody] DtoDeCadastroDeUsuario dtoCadastro)
        {
            try
            {
                if (dtoCadastro.ConfirmacaoDeSenha != dtoCadastro.Senha)
                {
                    return BadRequest("Senhas não conferem!");
                }

                if (_servicoDeUsuario.ObterPorEmail(dtoCadastro.Email) != null)
                {
                    return BadRequest("E-mail já cadastrado!");
                }

                var usuario = _servicoDeUsuario.Incluir(dtoCadastro);

                return Login(new DtoDeLogin { Email = dtoCadastro.Email, Senha = dtoCadastro.Senha });
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        [HttpGet]
        public IActionResult ObterUsuarioDoCookie()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _servicoDeToken.VerificarToken(jwt ?? "");

                var idUsuario = int.Parse(token.Issuer);

                var dtoUsuario = _servicoDeUsuario.ObterPorId(idUsuario);

                if (dtoUsuario != null)
                {
                    return Ok(dtoUsuario);
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception exception)
            {
                return Unauthorized(exception.Message);
            }
        }
    }
}