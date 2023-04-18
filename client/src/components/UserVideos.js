import React, { useEffect, useState } from "react";
import { getAllVideosWithComments } from "../modules/videoManager";
import { useParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import VideoListCard from "./VideoListCard";
import { getUser } from "../modules/userManager";

const UserVideos = () => {
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDescending, setSortDescending] = useState(false);
  const { id } = useParams();

  const getVideos = () => {
    getAllVideosWithComments().then((videos) => {
      videos = videos.filter((video) => video.userProfileId === parseInt(id));
      setVideos(videos);
    });
  };

  useEffect(() => {
    getVideos();
    getUser(parseInt(id)).then((user) => setUser(user));
  }, []);

  useEffect(() => {
    setSearchQuery("");
    setSortDescending(false);
  }, [videos]);

  useEffect(() => {}, [user]);

  return (
    <div className="container">
      <h2>Videos by {user.name}</h2>
      <SearchBar
        setVideos={setVideos}
        setSearchQuery={setSearchQuery}
        sortDescending={sortDescending}
        setSortDescending={setSortDescending}
        searchQuery={searchQuery}
        id={id}
      />
      <VideoListCard videos={videos} />
    </div>
  );
};

export default UserVideos;
