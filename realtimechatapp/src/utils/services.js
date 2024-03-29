export const baseURL = "http://localhost:7000/api";

export const postRequest = async (url, body) => {
  try {
    const response = await fetch(`${baseURL}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      let message;

      if (data?.message) {
        message = data.message;
      } else {
        message = data;
      }

      return { error: true, message };
    }

    return data;
  } catch (error) {
    return {
      error: true,
      message: error.message || "An error occurred during the request.",
    };
  }
};

export const getRequest = async (url) => {
  try {
    const response = await fetch(`${baseURL}/${url}`);
    const data = await response.json();

    // console.log("Message from a get request", data);

    if (!response.ok) {
      let message = "An error occurred...........";
      if (data?.message) {
        message = data.message;
      }
      return { error: true, message };
    }

    return { data };
  } catch (error) {
    return { error: true, message: "An unexpected error occurred." };
  }
};
