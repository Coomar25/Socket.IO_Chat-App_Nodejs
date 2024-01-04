import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const PotentialChats = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat } = useContext(ChatContext);
  console.log("In potentialchats components");
  console.table(potentialChats);
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
                <span className="user-online"></span>
              </div>
            </>
          ))}
      </div>
    </>
  );
};
export default PotentialChats;
