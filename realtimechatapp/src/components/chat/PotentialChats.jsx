import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const PotentialChats = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);
  console.log("In potentialchats components");
  console.table(potentialChats);
  // =========================================================================
  const userIdToFind = "65967b40c179506b370d22a4";
  const userExists = onlineUsers.some((user) => user.userId === userIdToFind);
  if (userExists) {
    console.log(`User with userId ${userIdToFind} exists in onlineUsers.`);
  } else {
    console.log(
      `User with userId ${userIdToFind} does not exist in onlineUsers.`
    );
  }

  return (
    <>
      <div className="all-users">
        {potentialChats &&
          potentialChats?.map((u, index) => (
            <>
              <div
                className="single-user text-white"
                key={index}
                onClick={() => createChat(user?._id, u._id)}
              >
                {u.name}
                {onlineUsers?.some((user) => user?.userId === u._id) && (
                  <span className="user-online"></span>
                )}
              </div>
            </>
          ))}
      </div>
    </>
  );
};
export default PotentialChats;
