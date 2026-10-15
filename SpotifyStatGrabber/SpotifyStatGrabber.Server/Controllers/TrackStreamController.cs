using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Diagnostics;
using System.IO.Compression;

namespace SpotifyStatGrabber.Server.Controllers
{
	[ApiController]
	[Route("api/[controller]/[action]")]
	public class TrackStreamController : ControllerBase
	{
		private readonly SpotifyStatGrabberContext _context;

		public TrackStreamController(SpotifyStatGrabberContext context)
		{
			_context = context;
		}

		[HttpGet()]
		public async Task<IActionResult> GetTrackStreams()
		{
			return new JsonResult(await _context.TrackStreams.ToListAsync());
		}

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

			using (Stream zipStream = file.OpenReadStream())
			{
				using (ZipArchive spotifyExtendedStreamHistoryZip = new ZipArchive(zipStream))
				{
					foreach (ZipArchiveEntry entry in spotifyExtendedStreamHistoryZip.Entries)
					{
						if (entry.FullName.Contains("Streaming_History_Audio_", StringComparison.OrdinalIgnoreCase) && 
							entry.FullName.Contains(".json", StringComparison.OrdinalIgnoreCase))
						{
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

			// Set the DB
			_context.TrackStreams.AddRange(trackStreams);
			int insertedStreams = await _context.SaveChangesAsync();
			return new JsonResult(insertedStreams);
		}
	}
}


// we will need to read the zip 
// find zip
// open
// go through every file in the folder with .json file type and "streaming_history_audio_.....json"
// append onto the trackstreams list