using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace SpotifyStatGrabber.Server
{
	public class SpotifyStatGrabberContext : DbContext
	{
		public DbSet<TrackStream>? TrackStreams { get; set; }

		public SpotifyStatGrabberContext(DbContextOptions<SpotifyStatGrabberContext> options) : base(options) { }

	}
}
