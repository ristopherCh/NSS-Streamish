import React, { useEffect, useState } from "react";
import Video from "./Video";
import { Card, Row, Col, Label, Input, Button } from "reactstrap";
import {
  getAllVideosWithComments,
  searchVideos,
} from "../modules/videoManager";
import { useParams } from "react-router-dom";

const UserVideos = () => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDescending, setSortDescending] = useState(false);
  const { id } = useParams();

  const getVideos = () => {
    getAllVideosWithComments().then((videos) => {
      videos = videos.filter((video) => (video.userProfileId === parseInt(id)));
      setVideos(videos);
    });
  };

  useEffect(() => {
    getVideos();
  }, []);

  useEffect(() => {
    setSearchQuery("");
  }, [videos]);

  return (
    <div className="container">
      <Card className="m-2">
        <div className="m-4">
          <Row>
            <Col>
              <Label htmlFor="search-input" className="px-2">
                Search:
              </Label>
              <Input
                type="text"
                value={searchQuery}
                id="search-input"
                name="search-input"
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                }}
              />
            </Col>
            <Col>
              <Label htmlFor="sort-checkbox" className="px-2">
                Sort Descending:
              </Label>
              <Input
                type="checkbox"
                id="sort-checkbox"
                name="sort-checkbox"
                value="desc"
                onChange={(event) => {
                  setSortDescending(event.target.checked);
                }}
              />
            </Col>
            <Col>
              <Button
                onClick={() => {
                  searchVideos(searchQuery, sortDescending).then((result) => {
                    setVideos(result);
                  });
                }}
              >
                Search
              </Button>
            </Col>
          </Row>
        </div>
      </Card>
      <div>{/* <VideoForm getVideos={getVideos} videos={videos} /> */}</div>
      <Row className="justify-content-center">
        {videos.map((video, index) => (
          <Video video={video} key={parseInt(video.id)} />
        ))}
      </Row>
    </div>
  );
};

export default UserVideos;
