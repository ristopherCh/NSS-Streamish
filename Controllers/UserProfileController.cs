using System;
using Microsoft.AspNetCore.Mvc;
using Streamish.Repositories;
using Streamish.Models;

namespace Streamish.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserProfileController : Controller
	{
		private readonly IVideoRepository _videoRepository;
		private readonly IUserProfileRepository _userProfileRepository;

		public UserProfileController(IVideoRepository videoRepository, IUserProfileRepository userProfileRepository)
		{
			_videoRepository = videoRepository;
			_userProfileRepository = userProfileRepository;
		}

		[HttpGet]
		public IActionResult Get()
		{
			return Ok(_userProfileRepository.GetAll());
		}

		[HttpGet("{id}")]
		public IActionResult Get(int id)
		{
			var userProfile = _userProfileRepository.GetById(id);
			if (userProfile == null)
			{
				return NotFound();
			}
			return Ok(userProfile);
		}

		[HttpGet("GetByIdWithVideos{id}")]
		public IActionResult GetByIdWithVideos(int id)
		{
			var userProfile = _userProfileRepository.GetByIdWithVideos(id);
			return Ok(userProfile);
		}

		[HttpPost]
		public IActionResult Post(UserProfile userProfile)
		{
			_userProfileRepository.Add(userProfile);
			return CreatedAtAction("Get", new { id = userProfile.Id }, userProfile);
		}

		[HttpPut("{id}")]
		public IActionResult Put(int id, UserProfile userProfile)
		{
			if (id != userProfile.Id)
			{
				return BadRequest();
			}

			_userProfileRepository.Update(userProfile);
			return NoContent();
		}

		[HttpDelete("{id}")]
		public IActionResult Delete(int id)
		{
			_userProfileRepository.Delete(id);
			return NoContent();
		}

	}
}
