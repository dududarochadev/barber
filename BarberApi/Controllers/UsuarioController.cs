using BarberApi.Dados.Autenticacao.Dtos;
using BarberApi.Servicos.Interfaces;
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
                    var token = _servicoDeToken.GerarToken(usuario);

                    Response.Cookies.Append("jwt", token, new CookieOptions
                    {
                        HttpOnly = true,
                        SameSite = SameSiteMode.None,
                        Secure = true
                    });

                    return Ok(new
                    {
                        message = "Sucesso!"
                    });
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
        public IActionResult CadastrarUsuario([FromBody] DtoDeCadastro dtoCadastro)
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

                Login(new DtoDeLogin { Email = usuario.Email, Senha = usuario.Senha });

                return Ok("Usuário cadastrado com sucesso!");
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        // [HttpPost]
        // [AllowAnonymous]
        // [Route("editar")]
        // public async Task<ActionResult<bool>> EditarUsuario([FromBody] DtoDeCadastro usuarioCadastro)
        // {
        //     if (usuarioCadastro.ConfirmacaoDeSenha != usuarioCadastro.Senha)
        //     {
        //         return BadRequest("Senhas não conferem!");
        //     }

        //     var resultado = await _servicoDeUsuario.Incluir(usuarioCadastro);

        //     if (resultado)
        //     {
        //         return Ok("Usuário cadastrado com sucesso!");
        //     }
        //     else
        //     {
        //         return BadRequest("Erro ao cadastrar usuário!");
        //     }
        // }

        [HttpGet]
        public IActionResult ObterUsuario()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _servicoDeToken.VerificarToken(jwt ?? "");

                var idUsuario = int.Parse(token.Issuer);

                var usuario = _servicoDeUsuario.ObterPorId(idUsuario);

                var dtoUsuario = _servicoDeUsuario.MapearEntidadeParaDto(usuario);

                return Ok(dtoUsuario);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }
    }
}