export const baseURL = "http://localhost:8000/api";

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
