namespace BarberApi.Servicos.Interfaces
{
    public interface IServicoDeCRUD<out T, in TDto>
    {
        T Incluir(TDto dto);
        T Editar(TDto dto);
        T ObterPorId(int id);
        void Excluir(int id);
    }
}