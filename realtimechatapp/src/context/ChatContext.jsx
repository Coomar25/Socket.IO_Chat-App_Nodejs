import { createContext, useCallback, useEffect, useState } from "react";
import { getRequest, postRequest } from "../utils/services";
import { io } from "socket.io-client";

export const ChatContext = createContext();
export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState([]);
  const [isuserchatloading, setIsuserchatloading] = useState(null);
  const [isuserchaterror, setisUserchaterror] = useState(null);
  const [potentialChats, setPotentialsChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMesssage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);

  console.log("currentchat", currentChat);
  console.log("messages", messages);
  console.log("messageerror", messageError);
  console.log("chat id from a currentChat lists", currentChat);
  console.log("chat id from a currentChat lists", currentChat?.[0]?._id);

  console.log("from chat context login user id", user?._id);

  // initialinz the socket

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  // Getting from state management
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

  // Getting from local storage
  useEffect(() => {
    const storedUserData = localStorage.getItem("User");
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      setIsuserchatloading(true);
      setisUserchaterror(null);
      getRequest(`chats/${user?._id}`)
        .then((response) => {
          // console.log("Here is the response format", response.data);
          setIsuserchatloading(false);
          //   const userChats = [response.data];
          setUserChats([response.data]);
          // console.log("From ChatContext__ userChats is", userChats);
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

  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest("user/getAllUsers");
      if (response.error) {
        return console.log("Error while fetching the users", response.message);
      }
      console.log(
        "From getUsers Function in ChatContext usser?.id is",
        user?._id,
        "userChats",
        userChats
      );
      const pChats = response.data.filter((u) => {
        let isChatCreated = false;
        if (user?._id === u._id) return false;

        console.log("userChats in getUser function in ChatContext");
        console.table(userChats);
        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            console.log("table chatter indeses");
            console.table(
              chat.members[0] === u._id,
              chat.members[0],
              u._id,
              user?._id
            );
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }

        return !isChatCreated;
      });
      setPotentialsChats(pChats);
      console.log("Get all users Data");
      console.table(response.data);
    };
    getUsers();
  }, [user]);

  // ==========================================================================

  useEffect(() => {
    const getMessages = async () => {
      setIsMessageLoading(true);
      setMessageError(null);
      const response = await getRequest(`messages/${currentChat?.[0]?._id}`);

      console.log("Response from the getMessage by chat id", response);
      setIsMessageLoading(false);
      if (response.error) {
        return setMessageError(error);
      }

      setMessages(response.data);
    };

    getMessages();
  }, [currentChat]);

  // =========================================================================

  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) return console.log("You must type something");

      const response = await postRequest(`messages`, {
        chatId: currentChatId,
        senderId: sender._id,
        text: textMessage,
      });

      if (response.error) {
        setSendTextMessageError(error);
      }
      setNewMessage(response);
      setMessages((prev) => [...prev, response]);
      setTextMessage("");
    },
    []
  );

  // ==========================================================================

  const updateCurrentChat = useCallback(
    async (chat) => {
      setCurrentChat(chat);
    },
    [user]
  );

  // ==========================================================================

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(`chats`, {
      firstId,
      secondId,
    });
    if (response.error) {
      return console.log("Error creating chat", response);
    }

    setUserChats((prev) => [...prev, response]);
  }, []);

  return (
    <>
      <ChatContext.Provider
        value={{
          userChats,
          isuserchaterror,
          isuserchatloading,
          potentialChats,
          createChat,
          updateCurrentChat,
          currentChat,
          messages,
          isMessageLoading,
          messageError,
          sendTextMessage,
        }}
      >
        {children}
      </ChatContext.Provider>
    </>
  );
};
