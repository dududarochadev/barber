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

            modelBuilder.Entity<Profissional>()
                .HasMany(ent => ent.Servicos)
                .WithMany(ent => ent.Profissionais)
                .UsingEntity<ProfissionalServico>();

            modelBuilder.Entity<Profissional>()
                .HasMany(ent => ent.Estabelecimentos)
                .WithMany(ent => ent.Profissionais)
                .UsingEntity<ProfissionalEstabelecimento>();

            // modelBuilder.Entity<ProfissionalEstabelecimento>().HasKey(ent => new { ent.ProfissionalId, ent.EstabelecimentoId });
            // modelBuilder.Entity<ProfissionalServico>().HasKey(ent => new { ent.ProfissionalId, ent.ServicoId });
            modelBuilder.Entity<Proprietario>();

            modelBuilder.Entity<Servico>();

            modelBuilder.Entity<Usuario>()
                .HasIndex(ent => ent.Email)
                .IsUnique();
        }
    }
}