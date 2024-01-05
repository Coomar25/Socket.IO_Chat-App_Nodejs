import { useEffect, useState } from "react";
import { getRequest } from "../utils/services";

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  console.log("From useFetchRecipeint chat attribute is");
  console.table(chat);
  console.log("From useFetchRecipeint user attribute is");
  console.table(user);
  console.log(
    "Fuccccckkkkk use fetch recipients hooks fetching the recipient user"
  );
  console.table(recipientUser);
  // by author
  // const recipientId = chat[0]?.members.find((id) => id !== user?._id);
  const recipientId = chat && chat[0]?.members.find((id) => id !== user?._id);
  console.log("recipientId in useFetchRecipient.js", recipientId);
  // ========================================================================
  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return null;
      const response = await getRequest(`user/getuser/${recipientId}`);
      if (response.error) {
        return setError(error);
      }
      setRecipientUser(response);
    };
    getUser();
  }, [recipientId]);

  //================================================================================
  // let recipientId;
  // const storedUserData = localStorage.getItem("User");
  // const storedUser = JSON.parse(storedUserData);
  // recipientId = chat?.members?.find((id) => id !== storedUser?._id);

  // if (!user) {
  //   recipientId = chat?.members?.find((id) => id !== storedUser?._id);
  // } else {
  //   recipientId = chat?.members?.find((id) => id !== user?._id);
  // }
  // console.log("lists of recipients id", recipientId);
  // console.log("chat from useFetchRecipient.js");
  // console.table(chat);

  // ===============================================================================
  // let recipientId;
  // const storedUserData = localStorage.getItem("User");
  // const storedUser = JSON.parse(storedUserData);

  // if (!user) {
  //   for (const chatObj of chat) {
  //     recipientId = chatObj?.members?.find((id) => id !== storedUser?._id);
  //     // if (recipientId) {
  //     //   break;
  //     // }
  //   }
  // } else {
  //   for (const chatObj of chat) {
  //     recipientId = chatObj?.members?.find((id) => id !== user?._id);
  //   }
  // }

  // console.log("Recipient ID:", recipientId);
  // console.log("Chat from useFetchRecipient.js");
  // console.table(chat);

  // ===============================================================================

  return { recipientUser };
};
