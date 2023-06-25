using AutoMapper;
using BarberApi.Dados;
using BarberApi.Dados.Dtos;
using BarberApi.Dados.Models;
using BarberApi.Servicos.Interfaces;

namespace BarberApi.Servicos
{
    public class ServicoDeProfissional : IServicoDeProfissional
    {
        private readonly Contexto _db;
        private readonly IMapper _mapper;

        public ServicoDeProfissional(Contexto db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public Profissional Incluir(DtoDeProfissional dtoDeProfissional)
        {
            var profissional = _mapper.Map<Profissional>(dtoDeProfissional);
            _db.Add(profissional);
            profissional.Id = _db.SaveChanges();

            return profissional;
        }

        public Profissional Editar(DtoDeProfissional dtoDeProfissional)
        {
            var profissional = _db.Profissional.First(a => a.Id == dtoDeProfissional.Id);
            profissional = _mapper.Map<Profissional>(dtoDeProfissional);
            _db.SaveChanges();

            return profissional;
        }

        public Profissional ObterPorId(int id)
        {
            var profissional = _db.Profissional.First(a => a.Id == id);
            return profissional;
        }

        public List<string> ListarHorariosDisponiveis(int id, DtoDeCalendario dia)
        {
            var horasDoDia = Enumerable.Range(00, 24).Select(i => DateTime.MinValue.AddHours(i).TimeOfDay);

            var profissional = _db.Profissional.First(p => p.Id == id);

            var horariosOcupados = profissional.Agendamentos
                                    .Where(a => a.DataAgendamento.Day == Convert.ToInt32(dia.DiaDoMes)
                                        && a.DataAgendamento.Month == Convert.ToInt32(dia.Mes))
                                    .Select(a => a.DataAgendamento.TimeOfDay)
                                    .ToList();

            var horariosDisponiveis = horasDoDia.Where(h => !horariosOcupados.Contains(h)).Select(h => h.ToString("hh.mm tt")).ToList();

            return horariosDisponiveis;
        }

        public void Excluir(int id)
        {
            var profissional = _db.Profissional.First(a => a.Id == id);
            _db.Remove(profissional);
            _db.SaveChanges();
        }
    }
}