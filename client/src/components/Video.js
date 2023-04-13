import React from "react";
import { Card, CardBody } from "reactstrap";

const Video = ({ video }) => {
  return (
    <Card>
      <p className="text-left px-2">Posted by: {video.userProfile.name}</p>
      <CardBody>
        <iframe
          className="video"
          src={video.url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        <p>
          <strong>{video.title}</strong>
        </p>
        <h4>{video.description}</h4>
        <h5>Comments</h5>
        <ul className="list-unstyled">
          {video.comments.map((comment) => (
            <>
              <li className="text-left">{comment.message}</li>
            </>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};

export default Video;
