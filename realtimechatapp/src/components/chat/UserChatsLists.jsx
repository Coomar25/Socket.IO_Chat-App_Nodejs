import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import avatar from "../../assets/avatar.svg";

const UserChatsLists = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  console.log("From a custom hook recipientUser", recipientUser);
  return (
    <>
      <Stack
        direction="horizontal"
        gap={3}
        className="user-card align-items-center p-2 justify-content-between"
        role="button"
      >
        <div className="d-flex">
          <div className="me-2">
            <img src={avatar} height="35px" />
          </div>

          <div className="text-content">
            <div className="name">{recipientUser?.data?.name}</div>
            <div className="text">Text Message</div>
          </div>
        </div>
        <div className="d-flex flex-column align-items-end">
          <div className="date">12/12/2022</div>

          <div className="this-user-notifications">2</div>
          <spam className="user-online"></spam>
        </div>
      </Stack>
    </>
  );
};
export default UserChatsLists;