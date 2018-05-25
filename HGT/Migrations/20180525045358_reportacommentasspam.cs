using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace HGT.Migrations
{
    public partial class reportacommentasspam : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Comments",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "SpamCount",
                table: "Comments",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "SpamCount",
                table: "Comments");
        }
    }
}
