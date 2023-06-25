using AutoMapper;
using BarberApi.Dados;
using BarberApi.Dados.Dtos;
using BarberApi.Dados.Models;
using BarberApi.Servicos.Interfaces;

namespace BarberApi.Servicos
{
    public class ServicoDeAgendamento : IServicoDeAgendamento
    {
        private readonly Contexto _db;
        private readonly IMapper _mapper;

        public ServicoDeAgendamento(Contexto db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public Agendamento Incluir(DtoDeAgendamento dtoDeAgendamento)
        {
            var agendamento = _mapper.Map<Agendamento>(dtoDeAgendamento);
            _db.Add(agendamento);
            agendamento.Id = _db.SaveChanges();

            return agendamento;
        }

        public Agendamento Editar(DtoDeAgendamento dtoDeAgendamento)
        {
            var agendamento = _db.Agendamento.First(a => a.Id == dtoDeAgendamento.Id);
            agendamento = _mapper.Map<Agendamento>(dtoDeAgendamento);
            _db.SaveChanges();

            return agendamento;
        }

        public Agendamento ObterPorId(int id)
        {
            var agendamento = _db.Agendamento.First(a => a.Id == id);
            return agendamento;
        }

        public void Excluir(int id)
        {
            var agendamento = _db.Agendamento.First(a => a.Id == id);
            _db.Remove(agendamento);
            _db.SaveChanges();
        }
    }
}