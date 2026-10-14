using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpotifyStatGrabber.Server.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TrackStreams",
                columns: table => new
                {
                    ts = table.Column<DateTime>(type: "TEXT", nullable: false),
                    platform = table.Column<string>(type: "TEXT", nullable: true),
                    ms_played = table.Column<int>(type: "INTEGER", nullable: true),
                    conn_country = table.Column<string>(type: "TEXT", nullable: true),
                    ip_addr = table.Column<string>(type: "TEXT", nullable: true),
                    master_metadata_track_name = table.Column<string>(type: "TEXT", nullable: true),
                    master_metadata_album_artist_name = table.Column<string>(type: "TEXT", nullable: true),
                    master_metadata_album_album_name = table.Column<string>(type: "TEXT", nullable: true),
                    spotify_track_uri = table.Column<string>(type: "TEXT", nullable: true),
                    episode_name = table.Column<string>(type: "TEXT", nullable: true),
                    episode_show_name = table.Column<string>(type: "TEXT", nullable: true),
                    spotify_episode_uri = table.Column<string>(type: "TEXT", nullable: true),
                    audiobook_title = table.Column<string>(type: "TEXT", nullable: true),
                    audiobook_uri = table.Column<string>(type: "TEXT", nullable: true),
                    audiobook_chapter_uri = table.Column<string>(type: "TEXT", nullable: true),
                    audiobook_chapter_title = table.Column<string>(type: "TEXT", nullable: true),
                    reason_start = table.Column<string>(type: "TEXT", nullable: true),
                    reason_end = table.Column<string>(type: "TEXT", nullable: true),
                    shuffle = table.Column<bool>(type: "INTEGER", nullable: true),
                    skipped = table.Column<bool>(type: "INTEGER", nullable: true),
                    offline = table.Column<bool>(type: "INTEGER", nullable: true),
                    offline_timestamp = table.Column<long>(type: "INTEGER", nullable: true),
                    incognito_mode = table.Column<bool>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TrackStreams");
        }
    }
}
