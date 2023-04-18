import React, { useEffect, useState } from "react";
import { getAllVideosWithComments } from "../modules/videoManager";
import { useParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import VideoListCard from "./VideoListCard";

const UserVideos = () => {
  const [videos, setVideos] = useState([]);
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
  }, []);

  useEffect(() => {
    setSearchQuery("");
    setSortDescending(false);
  }, [videos]);

  return (
    <div className="container">
      <SearchBar
        setVideos={setVideos}
        setSearchQuery={setSearchQuery}
        sortDescending={sortDescending}
        setSortDescending={setSortDescending}
        searchQuery={searchQuery}
      />
      <VideoListCard videos={videos} />
    </div>
  );
};

export default UserVideos;
