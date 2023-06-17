using AutoMapper;
using BarberApi.Dados.Autenticacao.Dtos;
using BarberApi.Dados.Dtos;
using BarberApi.Dados.Models;

namespace BarberApi.Dados.Mappings
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Agendamento, DtoDeAgendamento>()
                .ForMember(x => x.DescricaoServico, map => map.MapFrom(src => src.Servico.Descricao))
                .ForMember(x => x.NomeProfissional, map => map.MapFrom(src => src.Profissional.Nome))
                .ForMember(x => x.NomeEstabelecimento, map => map.MapFrom(src => src.Estabelecimento.Nome))
                .ForMember(x => x.EnderecoEstabelecimento, map => map.MapFrom(src => src.Estabelecimento.Endereco))
                .ReverseMap();
            CreateMap<Usuario, DtoDeUsuario>().ReverseMap();
            CreateMap<DtoDeCadastroDeUsuario, Usuario>()
                .ForMember(x => x.Senha, map => map.MapFrom(src => BCrypt.Net.BCrypt.HashPassword(src.Senha)))
                .ReverseMap();
        }
    }
}