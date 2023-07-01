using AutoMapper;
using BarberApi.Dados;
using BarberApi.Dados.Dtos;
using BarberApi.Dados.Models;
using BarberApi.Servicos.Interfaces;

namespace BarberApi.Servicos
{
    public class ServicoDeServico : IServicoDeServico
    {
        private readonly Contexto _db;
        private readonly IMapper _mapper;

        public ServicoDeServico(Contexto db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public Servico Incluir(DtoDeServico dtoDeServico)
        {
            var Servico = _mapper.Map<Servico>(dtoDeServico);
            _db.Add(Servico);
            Servico.Id = _db.SaveChanges();

            return Servico;
        }

        public Servico Editar(DtoDeServico dtoDeServico)
        {
            var Servico = _db.Servico.First(s => s.Id == dtoDeServico.Id);
            Servico = _mapper.Map<Servico>(dtoDeServico);
            _db.SaveChanges();

            return Servico;
        }

        public Servico ObterPorId(int id)
        {
            var Servico = _db.Servico.First(s => s.Id == id);
            return Servico;
        }

        public List<Servico> ListarPorEstabelecimento(int estabelecimentoId)
        {
            var Servico = _db.Servico.Where(s => s.EstabelecimentoId == estabelecimentoId).ToList();
            return Servico;
        }

        public void Excluir(int id)
        {
            var Servico = _db.Servico.First(s => s.Id == id);
            _db.Remove(Servico);
            _db.SaveChanges();
        }
    }
}