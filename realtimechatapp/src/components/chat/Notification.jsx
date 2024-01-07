import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const Notification = () => {
  const { notifications } = useContext(ChatContext);
  return (
    <div className="notifications">
      <div className="notifications-icon d-flex gap-2">
        {notifications && (
          <>
            <strong>
              <h4 className="text-warning">{notifications.length}</h4>
            </strong>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-bell-fill"
              viewBox="0 0 16 16"
              color="orange"
            >
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
            </svg>
            Notifications
          </>
        )}
      </div>
    </div>
  );
};
export default Notification;
