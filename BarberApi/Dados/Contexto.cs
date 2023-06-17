using BarberApi.Dados.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace BarberApi.Dados
{
    public class Contexto : DbContext
    {
        public Contexto(DbContextOptions<Contexto> options) : base(options)
        {

        }

        public DbSet<Agendamento> Agendamento { get; set; }
        public DbSet<Estabelecimento> Estabelecimento { get; set; }
        public DbSet<Profissional> Profissional { get; set; }
        public DbSet<Proprietario> Proprietario { get; set; }
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Servico> Servico { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Agendamento>()
                .Ignore(a => a.Usuario);
            modelBuilder.Entity<Estabelecimento>();
            modelBuilder.Entity<Profissional>();
            modelBuilder.Entity<Proprietario>();
            modelBuilder.Entity<Servico>();

            modelBuilder.Entity<Usuario>(ent =>
            {
                ent.HasIndex(u => u.Email).IsUnique();
            });
        }
    }
}