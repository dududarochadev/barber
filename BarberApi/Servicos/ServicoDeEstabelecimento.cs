using AutoMapper;
using BarberApi.Dados;
using BarberApi.Dados.Dtos;
using BarberApi.Dados.Models;
using BarberApi.Servicos.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BarberApi.Servicos
{
    public class ServicoDeEstabelecimento : IServicoDeEstabelecimento
    {
        private readonly Contexto _db;
        private readonly IMapper _mapper;

        public ServicoDeEstabelecimento(Contexto db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public Estabelecimento Incluir(DtoDeEstabelecimento dtoDeEstabelecimento)
        {
            var estabelecimento = _mapper.Map<Estabelecimento>(dtoDeEstabelecimento);
            _db.Add(estabelecimento);
            estabelecimento.Id = _db.SaveChanges();

            return estabelecimento;
        }

        public Estabelecimento Editar(DtoDeEstabelecimento dtoDeEstabelecimento)
        {
            var estabelecimento = _db.Estabelecimento.First(a => a.Id == dtoDeEstabelecimento.Id);
            estabelecimento = _mapper.Map<Estabelecimento>(dtoDeEstabelecimento);
            _db.SaveChanges();

            return estabelecimento;
        }

        public Estabelecimento ObterPorId(int id)
        {
            var estabelecimento = _db.Estabelecimento
                                .Include(e => e.Profissionais)
                                .Include(e => e.Servicos)
                                .First(a => a.Id == id);

            return estabelecimento;
        }

        public void Excluir(int id)
        {
            var estabelecimento = _db.Estabelecimento.First(a => a.Id == id);
            _db.Remove(estabelecimento);
            _db.SaveChanges();
        }
    }
}