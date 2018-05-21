using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace HGT.Migrations
{
    public partial class likeandcomment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UniqueID",
                table: "Videos");

            migrationBuilder.AddColumn<long>(
                name: "Comments",
                table: "Videos",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Comments",
                table: "Videos");

            migrationBuilder.AddColumn<string>(
                name: "UniqueID",
                table: "Videos",
                nullable: true);
        }
    }
}
