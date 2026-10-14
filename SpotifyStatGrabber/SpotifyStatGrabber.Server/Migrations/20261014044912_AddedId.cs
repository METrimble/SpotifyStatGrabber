using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpotifyStatGrabber.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddedId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "TrackStreams",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0)
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_TrackStreams",
                table: "TrackStreams",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_TrackStreams",
                table: "TrackStreams");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "TrackStreams");
        }
    }
}
