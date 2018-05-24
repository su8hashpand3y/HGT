using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace HGT.Migrations
{
    public partial class avatar : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AvatarPath",
                table: "AspNetUsers",
                newName: "AvatarImage");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AvatarImage",
                table: "AspNetUsers",
                newName: "AvatarPath");
        }
    }
}
