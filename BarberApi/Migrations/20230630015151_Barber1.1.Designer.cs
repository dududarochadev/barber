﻿// <auto-generated />
using System;
using BarberApi.Dados;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BarberApi.Migrations
{
    [DbContext(typeof(Contexto))]
    [Migration("20230630015151_Barber1.1")]
    partial class Barber11
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("BarberApi.Dados.Models.Agendamento", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DataAgendamento")
                        .HasColumnType("datetime2");

                    b.Property<int>("EstabelecimentoId")
                        .HasColumnType("int");

                    b.Property<bool>("Passado")
                        .HasColumnType("bit");

                    b.Property<int>("ProfissionalId")
                        .HasColumnType("int");

                    b.Property<int>("ServicoId")
                        .HasColumnType("int");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("EstabelecimentoId");

                    b.HasIndex("ProfissionalId");

                    b.HasIndex("ServicoId");

                    b.HasIndex("UsuarioId");

                    b.ToTable("Agendamento");
                });

            modelBuilder.Entity("BarberApi.Dados.Models.Estabelecimento", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Cnpj")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Endereco")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Estabelecimento");
                });

            modelBuilder.Entity("BarberApi.Dados.Models.Servico", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("EstabelecimentoId")
                        .HasColumnType("int");

                    b.Property<decimal>("Valor")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("EstabelecimentoId");

                    b.ToTable("Servico");
                });

            modelBuilder.Entity("BarberApi.Dados.Models.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Cpf")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Foto")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Sexo")
                        .HasColumnType("int");

                    b.Property<string>("Telefone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TipoUsuario")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Usuario");

                    b.UseTptMappingStrategy();
                });

            modelBuilder.Entity("EstabelecimentoProfissional", b =>
                {
                    b.Property<int>("EstabelecimentosId")
                        .HasColumnType("int");

                    b.Property<int>("ProfissionaisId")
                        .HasColumnType("int");

                    b.HasKey("EstabelecimentosId", "ProfissionaisId");

                    b.HasIndex("ProfissionaisId");

                    b.ToTable("EstabelecimentoProfissional");
                });

            modelBuilder.Entity("ProfissionalServico", b =>
                {
                    b.Property<int>("ProfissionaisId")
                        .HasColumnType("int");

                    b.Property<int>("ServicosId")
                        .HasColumnType("int");

                    b.HasKey("ProfissionaisId", "ServicosId");

                    b.HasIndex("ServicosId");

                    b.ToTable("ProfissionalServico");
                });

            modelBuilder.Entity("BarberApi.Dados.Models.Profissional", b =>
                {
                    b.HasBaseType("BarberApi.Dados.Models.Usuario");

                    b.ToTable("Profissional");
                });

            modelBuilder.Entity("BarberApi.Dados.Models.Proprietario", b =>
                {
                    b.HasBaseType("BarberApi.Dados.Models.Profissional");

                    b.Property<int>("EstabelecimentoId")
                        .HasColumnType("int");

                    b.HasIndex("EstabelecimentoId");

                    b.ToTable("Proprietario");
                });

            modelBuilder.Entity("BarberApi.Dados.Models.Agendamento", b =>
                {
                    b.HasOne("BarberApi.Dados.Models.Estabelecimento", "Estabelecimento")
                        .WithMany("Agendamentos")
                        .HasForeignKey("EstabelecimentoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BarberApi.Dados.Models.Profissional", "Profissional")
                        .WithMany("AgendamentosDeClientes")
                        .HasForeignKey("ProfissionalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BarberApi.Dados.Models.Servico", "Servico")
                        .WithMany("Agendamentos")
                        .HasForeignKey("ServicoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BarberApi.Dados.Models.Usuario", null)
                        .WithMany("Agendamentos")
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Estabelecimento");

                    b.Navigation("Profissional");

                    b.Navigation("Servico");
                });

            modelBuilder.Entity("BarberApi.Dados.Models.Servico", b =>
                {
                    b.HasOne("BarberApi.Dados.Models.Estabelecimento", "Estabelecimento")
                        .WithMany("Servicos")
                        .HasForeignKey("EstabelecimentoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Estabelecimento");
                });

            modelBuilder.Entity("EstabelecimentoProfissional", b =>
                {
                    b.HasOne("BarberApi.Dados.Models.Estabelecimento", null)
                        .WithMany()
                        .HasForeignKey("EstabelecimentosId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BarberApi.Dados.Models.Profissional", null)
                        .WithMany()
                        .HasForeignKey("ProfissionaisId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ProfissionalServico", b =>
                {
                    b.HasOne("BarberApi.Dados.Models.Profissional", null)
                        .WithMany()
                        .HasForeignKey("ProfissionaisId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BarberApi.Dados.Models.Servico", null)
                        .WithMany()
                        .HasForeignKey("ServicosId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BarberApi.Dados.Models.Profissional", b =>
                {
                    b.HasOne("BarberApi.Dados.Models.Usuario", null)
                        .WithOne()
                        .HasForeignKey("BarberApi.Dados.Models.Profissional", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BarberApi.Dados.Models.Proprietario", b =>
                {
                    b.HasOne("BarberApi.Dados.Models.Estabelecimento", "Estabelecimento")
                        .WithMany()
                        .HasForeignKey("EstabelecimentoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BarberApi.Dados.Models.Profissional", null)
                        .WithOne()
                        .HasForeignKey("BarberApi.Dados.Models.Proprietario", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Estabelecimento");
                });

            modelBuilder.Entity("BarberApi.Dados.Models.Estabelecimento", b =>
                {
                    b.Navigation("Agendamentos");

                    b.Navigation("Servicos");
                });

            modelBuilder.Entity("BarberApi.Dados.Models.Servico", b =>
                {
                    b.Navigation("Agendamentos");
                });

            modelBuilder.Entity("BarberApi.Dados.Models.Usuario", b =>
                {
                    b.Navigation("Agendamentos");
                });

            modelBuilder.Entity("BarberApi.Dados.Models.Profissional", b =>
                {
                    b.Navigation("AgendamentosDeClientes");
                });
#pragma warning restore 612, 618
        }
    }
}
