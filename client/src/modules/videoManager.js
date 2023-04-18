import { getToken } from "./authManager";

const baseUrl = "/api/video";

export const getAllVideos = () => {
  return fetch(baseUrl).then((res) => res.json());
};



export const searchVideos = (string, sortDesc) => {
  return getToken().then((token) => {
    return fetch(`${baseUrl}/search/?q=${string}&sortDesc=${sortDesc}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get quotes."
        );
      }
    });
  });
};

export const addVideo = (video) => {
  return getToken().then((token) => {
    return fetch(baseUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(video),
    });
  });
};

export const getVideo = (id) => {
  return getToken().then((token) => {
    return fetch(`${baseUrl}/GetByIdWithComments/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error(
          "An unknown error occurred while trying to save a new quote."
        );
      }
    });
  });
};

export const getAllVideosWithComments = () => {
  return getToken().then((token) => {
    return fetch(`${baseUrl}/GetWithComments`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  });
};