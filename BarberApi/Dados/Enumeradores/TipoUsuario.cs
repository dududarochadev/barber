using System.ComponentModel;

namespace BarberApi.Dados.Enumeradores
{
    public enum TipoUsuario
    {
        [Description("Cliente")]
        Cliente = 1,
        [Description("Funcionário")]
        Funcionario = 2,
        [Description("Proprietário")]
        Proprietario = 3
    }
}