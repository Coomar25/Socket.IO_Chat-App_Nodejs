import { useEffect, useState } from "react";
import { getRequest } from "../utils/services";

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  console.log("From useFetchRecipeint chat attribute is", chat);
  console.log("From useFetchRecipeint user attribute is", user);
  let recipientId;
  if (!user) {
    const storedUserData = localStorage.getItem("User");
    const storedUser = JSON.parse(storedUserData);
    recipientId = chat?.members?.find((id) => id !== storedUser?._id);
  } else {
    recipientId = chat?.members?.find((id) => id !== user?._id);
  }
  console.log("lists of recipients id", recipientId);
  console.log("chat", chat);
  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return null;
      const response = await getRequest(`user/getuser/${recipientId}`);
      console.log(
        "Fuccccckkkkk use fetch recipients hooks fetching the user details",
        response.data
      );

      if (response.error) {
        return setError(error);
      }
      setRecipientUser(response);
    };
    getUser();
  }, []);

  return { recipientUser };
};
