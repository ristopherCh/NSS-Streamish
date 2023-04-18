import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Video = ({ video }) => {
  return (
    <Card>
      <div>
        Posted by:{" "}
        <Link to={`/users/${video.userProfileId}`}>
          <strong>{video.userProfile?.name}</strong>
        </Link>
      </div>

      <Link to={`/videos/${video.id}`}>
        <strong>{video.title}</strong>
      </Link>
      <p className="text-left m-2"></p>
      <CardBody>
        <iframe
          className="video"
          src={video.url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <p>{video.description}</p>
        <h5 className="m-3">Comments</h5>
        <ul className="list-unstyled">
          {video.comments?.map((comment, index) => (
            <>
              <li className="text-left" key={parseInt(index)}>
                {comment.message}
              </li>
            </>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};

export default Video;
