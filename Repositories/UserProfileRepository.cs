using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Streamish.Models;
using Streamish.Utils;

namespace Streamish.Repositories
{
	public class UserProfileRepository : BaseRepository, IUserProfileRepository
	{
		public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

		public UserProfile GetByFirebaseUserId(string firebaseUserId)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
                        SELECT up.Id, Up.FirebaseUserId, up.Name AS UserProfileName, up.Email, up.ImageUrl, up.DateCreated
                          FROM UserProfile up
                         WHERE FirebaseUserId = @FirebaseuserId";

					DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

					UserProfile userProfile = null;

					var reader = cmd.ExecuteReader();
					if (reader.Read())
					{
						userProfile = new UserProfile()
						{
							Id = DbUtils.GetInt(reader, "Id"),
							FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
							Name = DbUtils.GetString(reader, "UserProfileName"),
							Email = DbUtils.GetString(reader, "Email"),
							ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
							DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
						};
					}
					reader.Close();

					return userProfile;
				}
			}
		}

		public List<UserProfile> GetAll()
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"SELECT Id, Name, Email, ImageUrl, DateCreated FROM UserProfile";
					using (SqlDataReader reader = cmd.ExecuteReader())
					{
						var userProfiles = new List<UserProfile>();
						while (reader.Read())
						{
							userProfiles.Add(new UserProfile()
							{
								Id = DbUtils.GetInt(reader, "Id"),
								Name = DbUtils.GetString(reader, "Name"),
								Email = DbUtils.GetString(reader, "Email"),
								ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
								DateCreated = DbUtils.GetDateTime(reader, "DateCreated")
							});
						}
						return userProfiles;
					}
				}
			}
		}

		public UserProfile GetById(int id)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"SELECT Id, Name, Email, ImageUrl, DateCreated FROM UserProfile WHERE Id = @id";
					DbUtils.AddParameter(cmd, "@id", id);

					using (SqlDataReader reader = cmd.ExecuteReader())
					{
						UserProfile userProfile = null;
						if (reader.Read())
						{
							userProfile = new UserProfile()
							{
								Id = DbUtils.GetInt(reader, "Id"),
								Name = DbUtils.GetString(reader, "Name"),
								Email = DbUtils.GetString(reader, "Email"),
								ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
								DateCreated = DbUtils.GetDateTime(reader, "DateCreated")
							};
						}
						return userProfile;
					}
				}
			}
		}

		public UserProfile GetByIdWithVideos(int id)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"SELECT 
										u.Id AS UserId, u.Name, u.Email, u.ImageUrl, u.DateCreated, 
										v.Id AS VideoId, v.Title, v.Description, v.Url, v.DateCreated AS VideoDateCreated, v.UserProfileId AS VideoUserProfileId,
										c.Id AS CommentId, c.Message, c.UserProfileId
										FROM UserProfile AS u 
										LEFT JOIN Video AS v 
										ON u.Id = v.UserProfileId 
										LEFT JOIN Comment AS c
										ON c.VideoId = v.Id
										WHERE u.Id = @id";
					DbUtils.AddParameter(cmd, "@id", id);

					using (SqlDataReader reader = cmd.ExecuteReader())
					{
						int lastVideoId = 0;
						UserProfile userProfile = null;
						Video video = null;
						while (reader.Read())
						{
							if (userProfile == null)
							{
								userProfile = new UserProfile()
								{
									Id = DbUtils.GetInt(reader, "UserId"),
									Name = DbUtils.GetString(reader, "Name"),
									Email = DbUtils.GetString(reader, "Email"),
									ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
									DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
									Videos = new List<Video>()
								};
							}
							if (DbUtils.IsNotDbNull(reader, "VideoId"))
							{
								if (DbUtils.GetInt(reader, "VideoId") != lastVideoId)
								{
									if (lastVideoId != 0)
									{
										userProfile.Videos.Add(video);
									}
									lastVideoId = DbUtils.GetInt(reader, "VideoId");
									video = new Video()
									{
										Id = DbUtils.GetInt(reader, "VideoId"),
										Title = DbUtils.GetString(reader, "Title"),
										Description = DbUtils.GetString(reader, "Description"),
										Url = DbUtils.GetString(reader, "Url"),
										DateCreated = DbUtils.GetDateTime(reader, "VideoDateCreated"),
										UserProfileId = DbUtils.GetInt(reader, "VideoUserProfileId"),
										Comments = new List<Comment>()
									};

								}
								if (DbUtils.IsNotDbNull(reader, "CommentId"))
								{
									Comment comment = new Comment()
									{
										Id = DbUtils.GetInt(reader, "CommentId"),
										Message = DbUtils.GetString(reader, "Message"),
										VideoId = DbUtils.GetInt(reader, "VideoId"),
										UserProfileId = DbUtils.GetInt(reader, "UserProfileId")
									};
									video.Comments.Add(comment);
								}

							}
						}
						if (lastVideoId != 0)
						{
							userProfile.Videos.Add(video);
						}
						return userProfile;
					}

				}
			}
		}
		public void Add(UserProfile userProfile)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
					INSERT INTO UserProfile (Name, Email, ImageUrl, DateCreated) 
					OUTPUT INSERTED.ID
					VALUES (@Name, @Email, @ImageUrl, @DateCreated)";

					DbUtils.AddParameter(cmd, "@Name", userProfile.Name);
					DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
					DbUtils.AddParameter(cmd, "@ImageUrl", userProfile.ImageUrl);
					DbUtils.AddParameter(cmd, "@DateCreated", userProfile.DateCreated);

					userProfile.Id = (int)cmd.ExecuteScalar();
				}
			}
		}

		public void Update(UserProfile userProfile)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"UPDATE UserProfile SET Name = @Name, Email = @Email, ImageUrl = @ImageUrl, DateCreated = @DateCreated WHERE Id = @Id";

					DbUtils.AddParameter(cmd, "@Name", userProfile.Name);
					DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
					DbUtils.AddParameter(cmd, "@ImageUrl", userProfile.ImageUrl);
					DbUtils.AddParameter(cmd, "@DateCreated", userProfile.DateCreated);

					cmd.ExecuteNonQuery();
				}
			}
		}

		public void Delete(int id)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
									DELETE FROM Comment WHERE UserProfileID = @Id;
									DELETE FROM Video WHERE UserProfileId = @Id;
									DELETE FROM UserProfile WHERE Id = @Id";
					DbUtils.AddParameter(cmd, "@Id", id);
					cmd.ExecuteNonQuery();
				}
			}
		}
	}
}

