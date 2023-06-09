﻿using Streamish.Models;
using System.Collections.Generic;

namespace Streamish.Repositories
{
	public interface IUserProfileRepository
	{
		void Add(UserProfile userProfile);
		void Delete(int id);
		List<UserProfile> GetAll();
		UserProfile GetById(int id);
		void Update(UserProfile userProfile);
		UserProfile GetByIdWithVideos(int id);
		UserProfile GetByFirebaseUserId(string firebaseUserId);
	}
}