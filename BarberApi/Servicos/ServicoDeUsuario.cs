using BarberApi.Dados;
using BarberApi.Dados.Autenticacao.Dtos;
using BarberApi.Dados.Dtos;
using BarberApi.Dados.Models;
using BarberApi.Servicos.Interfaces;

namespace BarberApi.Servicos
{
    public class ServicoDeUsuario : IServicoDeUsuario
    {
        private readonly Contexto _db;

        public ServicoDeUsuario(Contexto db)
        {
            _db = db;
        }

        public Usuario Incluir(DtoDeCadastro dtoCadastro)
        {
            //validacoes (email cadastrado, username, etc)
            var usuario = MapearDtoDeCadastroParaEntidade(dtoCadastro);

            _db.Add(usuario);
            _db.SaveChanges();

            return usuario;
        }

        public Usuario? ObterPorEmail(string email)
        {
            var usuario = _db.Usuario.FirstOrDefault(usu => usu.Email == email);

            return usuario;
        }

        public Usuario? ObterPorId(int id)
        {
            var usuario = _db.Usuario.FirstOrDefault(usu => usu.Id == id);

            return usuario;
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
    }
}