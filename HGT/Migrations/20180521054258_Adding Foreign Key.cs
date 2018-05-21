using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace HGT.Migrations
{
    public partial class AddingForeignKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "HGTUserID",
                table: "Videos",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Videos_HGTUserID",
                table: "Videos",
                column: "HGTUserID");

            migrationBuilder.AddForeignKey(
                name: "FK_Videos_AspNetUsers_HGTUserID",
                table: "Videos",
                column: "HGTUserID",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Videos_AspNetUsers_HGTUserID",
                table: "Videos");

            migrationBuilder.DropIndex(
                name: "IX_Videos_HGTUserID",
                table: "Videos");

            migrationBuilder.AlterColumn<string>(
                name: "HGTUserID",
                table: "Videos",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
