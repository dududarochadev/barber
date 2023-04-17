using BarberApi.Dados.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BarberApi.Dados
{
    public class Contexto : IdentityDbContext<Usuario, IdentityRole<int>, int>
    {
        public Contexto(DbContextOptions<Contexto> options) : base(options)
        {

        }

        public DbSet<Estabelecimento> Estabelecimento { get; set; }
        public DbSet<Funcionario> Funcionario { get; set; }
        public DbSet<FuncionarioServico> FuncionarioServico { get; set; }
        public DbSet<Servico> Servico { get; set; }
    }
}