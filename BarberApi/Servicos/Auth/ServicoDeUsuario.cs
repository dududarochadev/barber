using BarberApi.Dados.Models;
using BarberApi.Dto;
using BarberApi.Servicos.Interfaces.Auth;
using Microsoft.AspNetCore.Identity;

namespace BarberApi.Servicos.Auth
{
    public class ServicoDeUsuario : IServicoDeUsuario
    {
        private readonly UserManager<Usuario> _userManager;
        private readonly SignInManager<Usuario> _signInManager;

        public ServicoDeUsuario(
            UserManager<Usuario> userManager,
            SignInManager<Usuario> signInManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        public async Task<bool> Login(DtoDeLogin login)
        {
            var resultado = await _signInManager.PasswordSignInAsync(login.Email, login.Senha, true, false);
            return resultado.Succeeded;
        }

        public async Task Logout()
        {
            await _signInManager.SignOutAsync();
        }

        public async Task<bool> Cadastrar(DtoDeCadastro usuarioCadastro)
        {
            //validacoes (email cadastrado, username, etc)
            var usuario = MapeamentoDeUsuario(usuarioCadastro);
            var resultado = await _userManager.CreateAsync(usuario, usuarioCadastro.Senha);

            if (resultado.Succeeded)
            {
                await _signInManager.SignInAsync(usuario, false);
            }

            return resultado.Succeeded;
        }

        public Usuario MapeamentoDeUsuario(DtoDeCadastro usuarioCadastro)
        {
            var usuario = new Usuario()
            {
                UserName = usuarioCadastro.Email,
                Email = usuarioCadastro.Email,
                Nome = usuarioCadastro.NomeCompleto,
                PhoneNumber = usuarioCadastro.Telefone,
                Cpf = usuarioCadastro.Cpf,
            };

            return usuario;
        }

        public async Task<Usuario> ObterUsuarioPorEmail(string email)
        {
            var usuario = await _userManager.FindByEmailAsync(email);

            return usuario;
        }

        // public async Task<Usuario> GetUserById()
        // {
        //     var usuario = new Usuario();
        //     var jwt = Request.Cookies["jwt"];

        //     if (string.IsNullOrEmpty(jwt))
        //     {
        //         return usuario;
        //     }

        //     var idUsuario = _tokenService.VerificarToken(jwt).Issuer;
        //     var usuario = await _userManager.FindByIdAsync(idUsuario);

        //     usuario.Id = int.Parse(usuario.Id);
        //     usuario.Username = usuario.UserName;
        //     usuario.Email = usuario.Email;
        //     usuario.Telefone = usuario.PhoneNumber;

        //     return usuario;
        // }
    }
}