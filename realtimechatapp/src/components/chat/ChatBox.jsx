import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import InputEmoji from "react-input-emoji";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessageLoading, sendTextMessage } =
    useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  // Scroll to buttom when new message appears using useRef
  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  console.log("In chatbox component checking currentChat", currentChat);
  console.log(
    "In chatbox component checking currentChat ID",
    currentChat?.[0]?._id
  );
  console.log("In chatbox component checking recipientUser", recipientUser);
  console.log("In chatbox component checking messages", messages);
  console.log(textMessage);

  if (!recipientUser) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        No Conversation selected now .......
      </p>
    );
  }
  if (isMessageLoading) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        Loadind Messages Please wait.......
      </p>
    );
  }

  return (
    <>
      <Stack gap={4} className="chat-box">
        <div className="chat-header">
          <strong>{recipientUser?.data?.name}</strong>
        </div>
        <Stack gap={3} className="messages">
          {messages &&
            messages.map((message, index) => (
              <>
                <Stack
                  key={index}
                  className={`${
                    message?.senderId === user?._id
                      ? "message self align-self-end flex-grow-0"
                      : "message align-self-start flex-grow-0 "
                  }`}
                  ref={scroll}
                >
                  <span>{message.text}</span>
                  <span>{formatDate(message.createdAt)}</span>
                </Stack>
              </>
            ))}
        </Stack>
        <Stack
          direction="horizontal"
          gap={3}
          className="chat-input flex-grow-0"
        >
          <InputEmoji
            value={textMessage}
            onChange={setTextMessage}
            fontFamily="nunito"
            borderColor="rgba(72,112,223,0.2)"
          />

          <button
            className="send-btn"
            onClick={() =>
              sendTextMessage(
                textMessage,
                user,
                currentChat?.[0]?._id,
                setTextMessage
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-send-fill"
              viewBox="0 0 16 16"
            >
              <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
            </svg>
          </button>
        </Stack>
      </Stack>
    </>
  );
};

// Function to format the date
const formatDate = (dateString) => {
  const messageDate = new Date(dateString);
  const formattedDate = messageDate.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  });
  // Remove part after 'at'
  const dateWithoutAt = formattedDate.split(" at")[0];
  return dateWithoutAt;
};

export default ChatBox;
