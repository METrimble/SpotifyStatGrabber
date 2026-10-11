using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Diagnostics;

namespace SpotifyStatGrabber.Server.Controllers
{
	[ApiController]
	[Route("api/[controller]/[action]")]
	public class TrackStreamController : ControllerBase
	{
		[HttpGet()] 
		public IActionResult LoadTrackStreams()
		{
			List<TrackStream> trackStreams; 
			using (StreamReader r = new StreamReader("../../testjson.json"))
			{
				string json = r.ReadToEnd();
				trackStreams = JsonConvert.DeserializeObject<List<TrackStream>>(json);
			}

			return new JsonResult("done");
		}
	}
}
