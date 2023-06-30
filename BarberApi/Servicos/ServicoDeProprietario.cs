using AutoMapper;
using BarberApi.Dados;
using BarberApi.Dados.Dtos;
using BarberApi.Dados.Models;
using BarberApi.Servicos.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BarberApi.Servicos
{
    public class ServicoDeProprietario : IServicoDeProprietario
    {
        private readonly Contexto _db;
        private readonly IMapper _mapper;

        public ServicoDeProprietario(Contexto db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public Proprietario Incluir(DtoDeProprietario dtoDeProprietario)
        {
            var Proprietario = _mapper.Map<Proprietario>(dtoDeProprietario);
            _db.Add(Proprietario);
            Proprietario.Id = _db.SaveChanges();

            return Proprietario;
        }

        public Proprietario Editar(DtoDeProprietario dtoDeProprietario)
        {
            var Proprietario = _db.Proprietario.First(a => a.Id == dtoDeProprietario.Id);
            Proprietario = _mapper.Map<Proprietario>(dtoDeProprietario);
            _db.SaveChanges();

            return Proprietario;
        }

        public Proprietario ObterPorId(int id)
        {
            var Proprietario = _db.Proprietario.First(a => a.Id == id);

            return Proprietario;
        }

        public void Excluir(int id)
        {
            var Proprietario = _db.Proprietario.First(a => a.Id == id);
            _db.Remove(Proprietario);
            _db.SaveChanges();
        }
    }
}