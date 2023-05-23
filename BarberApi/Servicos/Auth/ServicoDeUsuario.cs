using BarberApi.Dados;
using BarberApi.Dados.Autenticacao.Dtos;
using BarberApi.Dados.Dtos;
using BarberApi.Dados.Models;
using BarberApi.Servicos.Interfaces.Auth;

namespace BarberApi.Servicos.Auth
{
    public class ServicoDeUsuario : IServicoDeUsuario
    {
        private readonly Contexto _db;

        public ServicoDeUsuario(Contexto db)
        {
            _db = db;
        }

        // public async Task<bool> Login(DtoDeLogin login)
        // {
        //     var resultado = await _signInManager.PasswordSignInAsync(login.Email, login.Senha, true, false);
        //     return resultado.Succeeded;
        // }

        // public async Task Logout()
        // {
        //     await _signInManager.SignOutAsync();
        // }

        public Usuario Incluir(DtoDeCadastro dtoCadastro)
        {
            //validacoes (email cadastrado, username, etc)
            var usuario = MapearDtoDeCadastroParaEntidade(dtoCadastro);

            _db.Add(usuario);
            usuario.Id = _db.SaveChanges();

            return usuario;
        }

        // public async Task<bool> Editar(DtoDeCadastro dtoCadastro)
        // {
        //     //validacoes (email cadastrado, username, etc)
        //     var usuario = MapearDtoDeCadastroParaEntidade(dtoCadastro);
        //     var resultado = await _userManager.UpdateAsync(usuario);

        //     return resultado.Succeeded;
        // }

        public Usuario ObterPorEmail(string email)
        {
            return _db.Usuario.FirstOrDefault(usu => usu.Email == email);
        }

        public Usuario ObterPorId(int id)
        {
            return _db.Usuario.FirstOrDefault(usu => usu.Id == id);
        }

        public Usuario MapearDtoDeCadastroParaEntidade(DtoDeCadastro dtoCadastro)
        {
            var usuario = new Usuario()
            {
                Email = dtoCadastro.Email,
                Nome = dtoCadastro.NomeCompleto,
                Telefone = dtoCadastro.Telefone,
                Cpf = dtoCadastro.Cpf,
                Senha = BCrypt.Net.BCrypt.HashPassword(dtoCadastro.Senha)
            };

            return usuario;
        }

        public DtoDeUsuario MapearEntidadeParaDto(Usuario entidade)
        {
            var indexEspacoNome = entidade.Nome.IndexOf(" ");

            string primeiroNome;

            if (indexEspacoNome > 0)
            {
                primeiroNome = entidade.Nome.Substring(0, indexEspacoNome);
            }
            else
            {
                primeiroNome = entidade.Nome;
            }

            var usuario = new DtoDeUsuario()
            {
                NomeCompleto = entidade.Nome,
                PrimeiroNome = primeiroNome,
                Cpf = entidade.Cpf,
                Email = entidade.Email,
                Foto = entidade.Foto,
                Sexo = entidade.Sexo,
                Telefone = entidade.Telefone
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