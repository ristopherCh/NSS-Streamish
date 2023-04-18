import React from "react";
import { Col, Label, Input, Button, Form } from "reactstrap";
import { searchVideos } from "../modules/videoManager";

const SearchBar = ({
  setVideos,
  searchQuery,
  setSearchQuery,
  sortDescending,
  setSortDescending,
  id,
}) => {
  const searchSubmit = (event) => {
    event.preventDefault();
    searchVideos(searchQuery, sortDescending).then((result) => {
      let videos = result.filter((video) => video.userProfileId === parseInt(id));
      setVideos(videos);
    });
  };

  return (
    <>
      <Form className="m-2" onSubmit={searchSubmit}>
        <div className="m-4">
          <div className="d-flex flex-column align-items-center">
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
                checked={sortDescending}
                onChange={(event) => {
                  setSortDescending(event.target.checked);
                }}
              />
            </Col>
            <Col>
              <Button>Search</Button>
            </Col>
          </div>
        </div>
      </Form>
    </>
  );
};

export default SearchBar;
