using BarberApi.Dados.Models;
using Microsoft.EntityFrameworkCore;

namespace BarberApi.Dados
{
    public class Contexto : DbContext
    {
        public Contexto(DbContextOptions<Contexto> options) : base(options)
        {

        }

        public DbSet<Estabelecimento> Estabelecimento { get; set; }
        public DbSet<Profissional> Profissional { get; set; }
        public DbSet<ProfissionalServico> ProfissionalServico { get; set; }
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Servico> Servico { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>(ent =>
            {
                ent.HasIndex(usu => usu.Email).IsUnique();
            });
        }
    }
}