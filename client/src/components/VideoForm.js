import React, { useEffect, useState } from "react";
import { Card, Label, Input, Button } from "reactstrap";
import { addVideo } from "../modules/videoManager";
import { useNavigate } from "react-router-dom";

const VideoForm = (props) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    url: "",
  });

  useEffect(() => {
    setForm({ title: "", description: "", url: "" });
  }, [props.videos]);

  return (
    <div>
      <Card className="m-2 d-flex align-items-center">
        <h4 className="m-1">Submit a Video</h4>
        <div className="m-2" style={{ width: "50%" }}>
          <Label className="px-2" htmlFor="title">
            Title:{" "}
          </Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={(event) => {
              setForm({ ...form, title: event.target.value });
            }}
          />
        </div>

        <div className="m-2" style={{ width: "50%" }}>
          <Label className="px-2" htmlFor="url">
            URL:{" "}
          </Label>
          <Input
            type="url"
            id="url"
            name="url"
            value={form.url}
            onChange={(event) => {
              setForm({ ...form, url: event.target.value });
            }}
          />
        </div>

        <div className="m-2" style={{ width: "50%" }}>
          <Label className="px-2" htmlFor="description">
            Description:{" "}
          </Label>
          <Input
            type="textarea"
            id="description"
            name="description"
            value={form.description}
            onChange={(event) => {
              setForm({ ...form, description: event.target.value });
            }}
          />
        </div>

        <Button
          className="m-2"
          style={{ width: "150px" }}
          onClick={() => {
            // addVideo(form).then(() => props.getVideos());
            addVideo(form).then(() => navigate("/"));
          }}
        >
          Submit
        </Button>
      </Card>
    </div>
  );
};

export default VideoForm;
