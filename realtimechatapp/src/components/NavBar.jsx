import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Notification from "./chat/Notification";

const NavBar = () => {
  const { user, logoutuser } = useContext(AuthContext);
  console.log("user from navbar using authcontext", user?.name);
  return (
    <>
      <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
        <Container>
          <h2>
            <Link to="/" className="link-light text-decoration-none">
              {" "}
              Chat App
            </Link>
          </h2>
          <span className="text-warning">
            {" "}
            {user ? `Logged in as ${user?.name}` : "No User Logged in"}
          </span>
          <Nav>
            <Stack direction="horizontal" gap={3}>
              {user ? <Notification /> : ""}

              {user ? (
                ""
              ) : (
                <Link to="/login" className="link-light text-decoration-none">
                  Login
                </Link>
              )}
              {/* {user ? (
                ""
              ) : (
                <Link
                  to="/register"
                  className="link-light text-decoration-none"
                >
                  Register
                </Link>
              )} */}

              {user ? (
                <Link
                  onClick={logoutuser}
                  to="/login"
                  className="link-light text-decoration-none"
                >
                  Logout
                </Link>
              ) : (
                ""
              )}
            </Stack>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
export default NavBar;
