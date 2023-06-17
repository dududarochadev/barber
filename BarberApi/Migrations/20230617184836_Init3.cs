using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BarberApi.Migrations
{
    /// <inheritdoc />
    public partial class Init3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EstabelecimentoId",
                table: "Servico",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Servico_EstabelecimentoId",
                table: "Servico",
                column: "EstabelecimentoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Servico_Estabelecimento_EstabelecimentoId",
                table: "Servico",
                column: "EstabelecimentoId",
                principalTable: "Estabelecimento",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Servico_Estabelecimento_EstabelecimentoId",
                table: "Servico");

            migrationBuilder.DropIndex(
                name: "IX_Servico_EstabelecimentoId",
                table: "Servico");

            migrationBuilder.DropColumn(
                name: "EstabelecimentoId",
                table: "Servico");
        }
    }
}
