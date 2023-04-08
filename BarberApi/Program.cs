using System.Text;
using BarberApi.Models;
using BarberApi.Servicos.Auth;
using BarberApi.Servicos.Interfaces.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var connectionString = builder.Configuration["ConnectionStrings:ConnectionString"];

builder.Services.AddDbContext<Contexto>(options => options.UseSqlServer(connectionString));

builder.Services.AddIdentity<Usuario, IdentityRole<int>>(opt =>
    {
        opt.User.RequireUniqueEmail = true;
        opt.Password.RequireDigit = true;
        opt.Password.RequiredLength = 8;
        opt.Password.RequireLowercase = true;
        opt.Password.RequireUppercase = true;
        opt.Password.RequireNonAlphanumeric = true;
    })
    .AddEntityFrameworkStores<Contexto>()
    .AddDefaultTokenProviders();

// builder.Services.AddAuthentication(x =>
//     Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults
//     .AuthenticationScheme).AddCookie(s =>
//     {
//         s.LoginPath = "";
//     });
// );

var key = Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"]);
var issuer = builder.Configuration["Jwt:Issuer"];
var audience = builder.Configuration["Jwt:Audience"];

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
        ValidateIssuer = true,
        ValidIssuer = issuer,
        ValidateAudience = true,
        ValidAudience = audience,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
    };

    opt.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            // context.Token = context.Request.Cookies["jwt"];
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddScoped<IServicoDeUsuario, ServicoDeUsuario>();
builder.Services.AddScoped<IServicoDeToken, ServicoDeToken>();

builder.Services.AddCors();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

var dominioCORS = builder.Configuration["DominioCORS"];
app.UseCors(opt => opt.WithOrigins(dominioCORS).AllowCredentials().AllowAnyMethod().AllowAnyHeader());

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
