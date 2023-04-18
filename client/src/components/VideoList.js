import React, { useEffect, useState } from "react";
import { getAllVideosWithComments } from "../modules/videoManager";
import SearchBar from "./SearchBar";
import VideoListCard from "./VideoListCard";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDescending, setSortDescending] = useState(false);

  const getVideos = () => {
    getAllVideosWithComments().then((videos) => setVideos(videos));
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

export default VideoList;
