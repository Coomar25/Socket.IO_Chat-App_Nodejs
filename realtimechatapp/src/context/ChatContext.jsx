import { createContext, useEffect, useState } from "react";
import { getRequest, postRequest } from "../utils/services";

export const ChatContext = createContext();
export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState([]);
  const [isuserchatloading, setIsuserchatloading] = useState(null);
  const [isuserchaterror, setisUserchaterror] = useState(null);

  console.log("from chat context login user id", user?._id);

  //   useEffect(() => {
  //     const getUserChats = async () => {
  //       const userId = user?._id;
  //       if (userId) {
  //         setIsuserchatloading(true);
  //         setisUserchaterror(null);
  //         const response = await getRequest(`chats/${user?._id}`);
  //         console.log("Here is the response format", response);
  //         setIsuserchatloading(false);
  //         setUserChats(response);
  //         if (response.error) {
  //           return setisUserchaterror(response);
  //         }
  //         setUserChats(response);
  //       }
  //     };
  //     getUserChats();
  //   }, [user]);
  // console.log("Here is the response format", userChats);

  useEffect(() => {
    const storedUserData = localStorage.getItem("User");
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      setIsuserchatloading(true);
      setisUserchaterror(null);
      getRequest(`chats/${user?._id}`)
        .then((response) => {
          console.log("Here is the response format", response.data);
          setIsuserchatloading(false);
          //   const userChats = [response.data];
          setUserChats([response.data]);
          console.log("From ChatContext__ userChats is", userChats);
          if (response.error) {
            setisUserchaterror(response);
          }
        })
        .catch((error) => {
          console.error("Error fetching user chats:", error);
          setisUserchaterror(error);
          setIsuserchatloading(false);
        });
    }
  }, []);

  return (
    <>
      <ChatContext.Provider
        value={{
          userChats,
          isuserchaterror,
          isuserchatloading,
        }}
      >
        {children}
      </ChatContext.Provider>
    </>
  );
};
