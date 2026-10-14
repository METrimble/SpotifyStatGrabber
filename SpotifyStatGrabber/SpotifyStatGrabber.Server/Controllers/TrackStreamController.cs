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

		[HttpPost()]
		public async void LoadTrackStreams([FromForm] IFormFile File)
		{
			Debug.WriteLine("In POST call" + File.Name);

			List<TrackStream> trackStreams = new List<TrackStream>();

			using (ZipArchive spotifyExtendedStreamHistoryZip = ZipFile.OpenRead("../../my_spotify_data.zip"))
			{
				foreach (ZipArchiveEntry entry in spotifyExtendedStreamHistoryZip.Entries)
				{
					if (entry.FullName.Contains("Streaming_History_Audio_") && entry.FullName.Contains(".json"))
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

			// Set the DB
			_context.TrackStreams.AddRange(trackStreams);
			await _context.SaveChangesAsync();
		}
	}
}


// we will need to read the zip 
// find zip
// open
// go through every file in the folder with .json file type and "streaming_history_audio_.....json"
// append onto the trackstreams list