namespace SpotifyStatGrabber.Server
{
	public class TrackStream
	{
		public DateTime ts { get; set; }
		public string platform { get; set; }
		public int ms_played { get; set; }
		public string conn_country { get; set; }
		public string ip_addr { get; set; }
		public string master_metadata_track_name { get; set; }
		public string master_metadata_album_artist_name { get; set; }
		public string master_metadata_album_album_name { get; set; }
		public string spotify_track_uri { get; set; }
		public object episode_name { get; set; }
		public object episode_show_name { get; set; }
		public object spotify_episode_uri { get; set; }
		public object audiobook_title { get; set; }
		public object audiobook_uri { get; set; }
		public object audiobook_chapter_uri { get; set; }
		public object audiobook_chapter_title { get; set; }
		public string reason_start { get; set; }
		public string reason_end { get; set; }
		public bool shuffle { get; set; }
		public bool skipped { get; set; }
		public bool offline { get; set; }
		public int offline_timestamp { get; set; }
		public bool incognito_mode { get; set; }
	}
}
