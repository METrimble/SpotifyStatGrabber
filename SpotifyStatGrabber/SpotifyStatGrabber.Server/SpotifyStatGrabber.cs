using Microsoft.EntityFrameworkCore;

namespace SpotifyStatGrabber.Server
{
	// DB Context
	public class SpotifyStatGrabberContext : DbContext
	{
		public DbSet<TrackStream>? TrackStreams { get; set; }

		public SpotifyStatGrabberContext(DbContextOptions<SpotifyStatGrabberContext> options) : base(options) { }

	}
}
