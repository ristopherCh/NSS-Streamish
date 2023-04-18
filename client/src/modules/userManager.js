import { getToken } from "./authManager";

const baseUrl = "/api/userprofile";

export const getUser = (userId) => {
  return getToken().then((token) => {
    return fetch(`${baseUrl}/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to do that thing."
        );
      }
    });
  });
};
