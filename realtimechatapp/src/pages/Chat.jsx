import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import UserChatsLists from "../components/chat/UserChatsLists";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/chat/PotentialChats";
import ChatBox from "../components/chat/ChatBox";

const Chat = () => {
  const { userChats, isuserchaterror, isuserchatloading, updateCurrentChat } =
    useContext(ChatContext);
  const { user } = useContext(AuthContext);
  // console.log("group members chatters", userChats);
  // console.log("user in Chat component", user);

  return (
    <>
      <Container>
        <PotentialChats />
        {userChats && userChats.length > 0 ? (
          <Stack direction="horizontal" gap={4} className="align-items-start">
            <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
              {isuserchatloading && <p>Chat is loading.....</p>}
              {userChats.map((chat) => (
                <div key={chat._id} onClick={() => updateCurrentChat(chat)}>
                  <UserChatsLists chat={chat} user={user} />
                </div>
              ))}
            </Stack>
            <ChatBox />
          </Stack>
        ) : (
          <p>No chats available.</p>
        )}
      </Container>
    </>
  );
};
export default Chat;
