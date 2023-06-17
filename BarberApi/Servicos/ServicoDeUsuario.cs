using AutoMapper;
using BarberApi.Dados;
using BarberApi.Dados.Autenticacao.Dtos;
using BarberApi.Dados.Dtos;
using BarberApi.Dados.Models;
using BarberApi.Servicos.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BarberApi.Servicos
{
    public class ServicoDeUsuario : IServicoDeUsuario
    {
        private readonly Contexto _db;
        private readonly IMapper _mapper;

        public ServicoDeUsuario(Contexto db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public Usuario Incluir(DtoDeCadastroDeUsuario dtoDeCadastroDeUsuario)
        {
            //validacoes (email cadastrado, username, etc)
            var usuario = _mapper.Map<Usuario>(dtoDeCadastroDeUsuario);

            _db.Add(usuario);
            _db.SaveChanges();

            return usuario;
        }

        public Usuario Editar(DtoDeUsuario dtoDeUsuario)
        {
            //validacoes (email cadastrado, username, etc)
            var usuario = _db.Usuario.First(u => u.Id == dtoDeUsuario.Id);

            usuario.Email = dtoDeUsuario.Email;
            usuario.Cpf = dtoDeUsuario.Cpf;
            usuario.Nome = dtoDeUsuario.Nome;
            usuario.Sexo = dtoDeUsuario.Sexo;
            usuario.Telefone = dtoDeUsuario.Telefone;

            return usuario;
        }

        public DtoDeUsuario ObterPorEmail(string email)
        {
            var usuario = _db.Usuario.Include(u => u.Agendamentos).FirstOrDefault(u => u.Email == email);

            var dtoDeUsuario = MapearEntidadeParaDto(usuario);

            return dtoDeUsuario;
        }

        public DtoDeUsuario ObterPorId(int id)
        {
            var usuario = _db.Usuario
                            .Include(u => u.Agendamentos).ThenInclude(a => a.Servico)
                            .Include(u => u.Agendamentos).ThenInclude(a => a.Estabelecimento)
                            .Include(u => u.Agendamentos).ThenInclude(a => a.Profissional)
                            .FirstOrDefault(u => u.Id == id);

            var dtoDeUsuario = MapearEntidadeParaDto(usuario);

            return dtoDeUsuario;
        }

        public DtoDeUsuario MapearEntidadeParaDto(Usuario? usuario)
        {
            var dtoDeUsuario = _mapper.Map<DtoDeUsuario>(usuario);

            if (usuario != null)
            {
                var indexEspacoNome = usuario.Nome.IndexOf(" ");
                dtoDeUsuario.PrimeiroNome = indexEspacoNome > 0 ? usuario.Nome[..indexEspacoNome] : usuario.Nome;
            }

            return dtoDeUsuario;
        }
    }
}