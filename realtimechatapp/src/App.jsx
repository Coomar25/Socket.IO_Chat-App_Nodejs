import { Routes, Route, Navigate, json } from "react-router-dom";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
const App = () => {
  const { user } = useContext(AuthContext);
  console.log("user from app dot jsx", user);
  return (
    <>
      <ChatContextProvider user={user}>
        <NavBar />
        <Container>
          <Routes>
            <Route path="/" element={user ? <Chat /> : <Login />} />
            <Route path="/chat" element={user ? <Chat /> : <Login />} />
            <Route
              path="/register"
              element={user ? <Navigate to="/" /> : <Register />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
      </ChatContextProvider>
    </>
  );
};
export default App;
