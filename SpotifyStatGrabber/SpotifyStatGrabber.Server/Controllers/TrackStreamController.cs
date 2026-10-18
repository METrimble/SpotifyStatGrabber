using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.IO.Compression;

namespace SpotifyStatGrabber.Server.Controllers
{
	[ApiController]
	[Route("api/[controller]/[action]")]
	public class TrackStreamController : ControllerBase
	{
		private readonly SpotifyStatGrabberContext _context;

		// Set the DB context
		public TrackStreamController(SpotifyStatGrabberContext context)
		{
			_context = context;
		}

		// Get all TrackStreams 
		[HttpGet()]
		public async Task<IActionResult> GetTrackStreams()
		{
			return new JsonResult(await _context.TrackStreams.ToListAsync());
		}

		// Get the count of TrackStreams
		[HttpGet()]
		public async Task<IActionResult> GetTrackStreamCount()
		{
			return new JsonResult(_context.TrackStreams.Count());
		}

		[HttpPost()]
		public async Task<IActionResult> LoadTrackStreams([FromForm] IFormFile file)
		{
			// Check file
			if (file == null || file.Length == 0) return new JsonResult(0); ;

			// Replacing data if exists
			if (_context.TrackStreams.Count() > 0)
			{
				_context.TrackStreams.ExecuteDelete();
			}

			List<TrackStream> trackStreams = new List<TrackStream>();

			// Open Zip
			using (Stream zipStream = file.OpenReadStream())
			{
				using (ZipArchive spotifyExtendedStreamHistoryZip = new ZipArchive(zipStream))
				{
					// For each file in the Spotify Zip
					foreach (ZipArchiveEntry entry in spotifyExtendedStreamHistoryZip.Entries)
					{
						// Use standard naming given in Spotify Zip - only pull json files
						if (entry.FullName.Contains("Streaming_History_Audio_", StringComparison.OrdinalIgnoreCase) && 
							entry.FullName.Contains(".json", StringComparison.OrdinalIgnoreCase))
						{
							// Reach the Json file and convert to a TrackStream object
							using (Stream stream = entry.Open())
							using (StreamReader r = new StreamReader(stream))
							{
								string json = r.ReadToEnd();
								trackStreams.AddRange(JsonConvert.DeserializeObject<List<TrackStream>>(json));
							}
						}
					}
				}
			}

			// Populate DB with Streams
			_context.TrackStreams.AddRange(trackStreams);
			int insertedStreams = await _context.SaveChangesAsync();

			// Return the count of streams we populated 
			return new JsonResult(insertedStreams);
		}
	}
}
