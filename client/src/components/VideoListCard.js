import React from "react";
import Video from "./Video";
import { Row } from "reactstrap";

const VideoListCard = ({videos}) => {
  return (
    <Row className="justify-content-center">
      {videos.map((video, index) => (
        <Video video={video} key={parseInt(video.id)} />
      ))}
    </Row>
  );
};

export default VideoListCard;
