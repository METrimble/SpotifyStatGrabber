using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpotifyStatGrabber.Server
{
	
	public class TrackStream
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public DateTime ts { get; set; }
		public string? platform { get; set; }
		public int? ms_played { get; set; }
		public string? conn_country { get; set; }
		public string? ip_addr { get; set; }
		public string? master_metadata_track_name { get; set; }
		public string? master_metadata_album_artist_name { get; set; }
		public string? master_metadata_album_album_name { get; set; }
		public string? spotify_track_uri { get; set; }
		public string? episode_name { get; set; }
		public string? episode_show_name { get; set; }
		public string? spotify_episode_uri { get; set; }
		public string? audiobook_title { get; set; }
		public string? audiobook_uri { get; set; }
		public string? audiobook_chapter_uri { get; set; }
		public string? audiobook_chapter_title { get; set; }
		public string? reason_start { get; set; }
		public string? reason_end { get; set; }
		public bool? shuffle { get; set; }
		public bool? skipped { get; set; }
		public bool? offline { get; set; }
		public Int64? offline_timestamp { get; set; }
		public bool? incognito_mode { get; set; }

	}
}
