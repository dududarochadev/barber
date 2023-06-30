using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BarberApi.Migrations
{
    /// <inheritdoc />
    public partial class Barber11 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Profissional_Estabelecimento_EstabelecimentoId",
                table: "Profissional");

            migrationBuilder.DropIndex(
                name: "IX_Profissional_EstabelecimentoId",
                table: "Profissional");

            migrationBuilder.DropColumn(
                name: "EstabelecimentoId",
                table: "Profissional");

            migrationBuilder.AddColumn<int>(
                name: "EstabelecimentoId",
                table: "Proprietario",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "EstabelecimentoProfissional",
                columns: table => new
                {
                    EstabelecimentosId = table.Column<int>(type: "int", nullable: false),
                    ProfissionaisId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstabelecimentoProfissional", x => new { x.EstabelecimentosId, x.ProfissionaisId });
                    table.ForeignKey(
                        name: "FK_EstabelecimentoProfissional_Estabelecimento_EstabelecimentosId",
                        column: x => x.EstabelecimentosId,
                        principalTable: "Estabelecimento",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EstabelecimentoProfissional_Profissional_ProfissionaisId",
                        column: x => x.ProfissionaisId,
                        principalTable: "Profissional",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Proprietario_EstabelecimentoId",
                table: "Proprietario",
                column: "EstabelecimentoId");

            migrationBuilder.CreateIndex(
                name: "IX_EstabelecimentoProfissional_ProfissionaisId",
                table: "EstabelecimentoProfissional",
                column: "ProfissionaisId");

            migrationBuilder.AddForeignKey(
                name: "FK_Proprietario_Estabelecimento_EstabelecimentoId",
                table: "Proprietario",
                column: "EstabelecimentoId",
                principalTable: "Estabelecimento",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Proprietario_Estabelecimento_EstabelecimentoId",
                table: "Proprietario");

            migrationBuilder.DropTable(
                name: "EstabelecimentoProfissional");

            migrationBuilder.DropIndex(
                name: "IX_Proprietario_EstabelecimentoId",
                table: "Proprietario");

            migrationBuilder.DropColumn(
                name: "EstabelecimentoId",
                table: "Proprietario");

            migrationBuilder.AddColumn<int>(
                name: "EstabelecimentoId",
                table: "Profissional",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Profissional_EstabelecimentoId",
                table: "Profissional",
                column: "EstabelecimentoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Profissional_Estabelecimento_EstabelecimentoId",
                table: "Profissional",
                column: "EstabelecimentoId",
                principalTable: "Estabelecimento",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
