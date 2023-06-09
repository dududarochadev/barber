using System.Text;
using System.Text.Json.Serialization;
using BarberApi.Dados;
using BarberApi.Dados.Mappings;
using BarberApi.Servicos;
using BarberApi.Servicos.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Migrador.Api", Version = "v1" });
});

builder.Services.AddDbContext<Contexto>(opt => opt.UseSqlServer(builder.Configuration["ConnectionStrings:ConnectionString"]));

builder.Services.AddCors();

var key = Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"]);

builder.Services.AddAuthentication(opt =>
{
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(opt =>
{
    opt.RequireHttpsMetadata = false;
    opt.SaveToken = true;
    opt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
    };

    opt.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            context.Token = context.Request.Cookies["jwt"];
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddScoped<IServicoDeAgendamento, ServicoDeAgendamento>();
builder.Services.AddScoped<IServicoDeEstabelecimento, ServicoDeEstabelecimento>();
builder.Services.AddScoped<IServicoDeProfissional, ServicoDeProfissional>();
builder.Services.AddScoped<IServicoDeProprietario, ServicoDeProprietario>();
builder.Services.AddScoped<IServicoDeServico, ServicoDeServico>();
builder.Services.AddScoped<IServicoDeToken, ServicoDeToken>();
builder.Services.AddScoped<IServicoDeUsuario, ServicoDeUsuario>();
builder.Services.AddAutoMapper(typeof(MapperProfile));

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

var dominioCORS = builder.Configuration["DominioCORS"];
app.UseCors(opt => opt
                    .WithOrigins(dominioCORS)
                    .AllowCredentials()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
            );

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<Contexto>();
    db.Database.Migrate();
}

app.Run();

