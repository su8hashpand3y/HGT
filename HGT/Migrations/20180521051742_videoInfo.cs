using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace HGT.Migrations
{
    public partial class videoInfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "User",
                table: "Likes");

            migrationBuilder.DropColumn(
                name: "User",
                table: "Comments");

            migrationBuilder.RenameColumn(
                name: "Path",
                table: "Videos",
                newName: "HGTUserID");

            migrationBuilder.RenameColumn(
                name: "Video",
                table: "Likes",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "Video",
                table: "Comments",
                newName: "UserId");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Videos",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Videos",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Format",
                table: "Videos",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "SponseredVideo",
                table: "Videos",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "VideoId",
                table: "Likes",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "VideoId",
                table: "Comments",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Videos");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Videos");

            migrationBuilder.DropColumn(
                name: "Format",
                table: "Videos");

            migrationBuilder.DropColumn(
                name: "SponseredVideo",
                table: "Videos");

            migrationBuilder.DropColumn(
                name: "VideoId",
                table: "Likes");

            migrationBuilder.DropColumn(
                name: "VideoId",
                table: "Comments");

            migrationBuilder.RenameColumn(
                name: "HGTUserID",
                table: "Videos",
                newName: "Path");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Likes",
                newName: "Video");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Comments",
                newName: "Video");

            migrationBuilder.AddColumn<string>(
                name: "User",
                table: "Likes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "User",
                table: "Comments",
                nullable: true);
        }
    }
}
