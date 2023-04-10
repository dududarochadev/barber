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
    }
}