using BarberApi.Dados.Enumeradores;

namespace BarberApi.Dados
{
    public static class UsuarioAtual
    {
        public static int Id;
        public static string Nome;
        public static string Email;
        public static string? Cpf;
        public static Sexo Sexo;
        public static string? Foto;
        public static string? Telefone;
        public static TipoUsuario TipoUsuario;
    }
}