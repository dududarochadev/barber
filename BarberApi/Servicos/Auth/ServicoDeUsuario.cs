using BarberApi.Dados.Autenticacao.Dtos;
using BarberApi.Dados.Dtos;
using BarberApi.Dados.Models;
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

        public async Task<bool> Incluir(DtoDeCadastro usuarioCadastro)
        {
            //validacoes (email cadastrado, username, etc)
            var usuario = MapearDtoDeCadastroParaEntidade(usuarioCadastro);
            var resultado = await _userManager.CreateAsync(usuario, usuarioCadastro.Senha);

            if (resultado.Succeeded)
            {
                await _signInManager.SignInAsync(usuario, false);
            }

            return resultado.Succeeded;
        }

        public async Task<bool> Editar(DtoDeCadastro usuarioCadastro)
        {
            //validacoes (email cadastrado, username, etc)
            var usuario = MapearDtoDeCadastroParaEntidade(usuarioCadastro);
            var resultado = await _userManager.UpdateAsync(usuario);

            return resultado.Succeeded;
        }

        public async Task<Usuario> ObterPorEmail(string email)
        {
            var usuario = await _userManager.FindByEmailAsync(email);

            return usuario;
        }

        public async Task<Usuario> ObterPorId(int id)
        {
            var usuario = await _userManager.FindByIdAsync(id.ToString());

            return usuario;
        }

        public Usuario MapearDtoDeCadastroParaEntidade(DtoDeCadastro usuarioCadastro)
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

        public DtoDeUsuario MapearEntidadeParaDto(Usuario entidade)
        {
            var usuario = new DtoDeUsuario()
            {
                NomeCompleto = entidade.Nome,
                PrimeiroNome = entidade.Nome.Substring(0, entidade.Nome.IndexOf(" ")),
                Cpf = entidade.Cpf,
                Email = entidade.Email,
                Foto = entidade.Foto,
                Sexo = entidade.Sexo,
                Telefone = entidade.PhoneNumber
            };

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