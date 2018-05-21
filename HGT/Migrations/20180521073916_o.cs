using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace HGT.Migrations
{
    public partial class o : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Location",
                table: "Videos",
                newName: "Poster");

            migrationBuilder.AddColumn<string>(
                name: "FileName",
                table: "Videos",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FolderName",
                table: "Videos",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileName",
                table: "Videos");

            migrationBuilder.DropColumn(
                name: "FolderName",
                table: "Videos");

            migrationBuilder.RenameColumn(
                name: "Poster",
                table: "Videos",
                newName: "Location");
        }
    }
}
