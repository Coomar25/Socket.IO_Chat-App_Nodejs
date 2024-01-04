import { createContext, useCallback, useEffect, useState } from "react";
import { baseURL, postRequest } from "../utils/services";
import Cookies from "js-cookie";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [registersuccess, setRegisterSuccess] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  // =========================================================For Login
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginerror, setLoginerror] = useState(null);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  console.log(loginInfo);
  // ========================================================For Registration
  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  useEffect(() => {
    const storedUserData = localStorage.getItem("User");
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      setUser(user);
    }
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsRegisterLoading(true);
        setRegisterError(null);
        setRegisterSuccess(null);
        const response = await postRequest("user/register", registerInfo);
        if (response.error) {
          console.log("For Error Tracking", response.message);
          return setRegisterError(response.message);
        }
        setRegisterSuccess("Successfull", response.message);
      } catch (error) {
        console.error("An error occurred during registration:", error);
        setRegisterError(
          "An error occurred during registration. Please try again."
        );
      } finally {
        setIsRegisterLoading(false);
      }
    },
    [registerInfo]
  );

  // ========================================================For Login

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      console.log("When click on login button", loginInfo);

      try {
        setIsLoginLoading(true);
        const response = await postRequest("user/login", loginInfo);
        if (response.error) {
          console.log("Error Tracking for login", response);
          return setLoginerror(response);
        }
        // Parse the JSON string into an object
        const userObject = JSON.parse(JSON.stringify(response));
        console.log("User Object after parsing", userObject.data);
        Cookies.set("cooChatToken", userObject.token);
        localStorage.setItem("User", JSON.stringify(userObject));
        setUser(response);
      } catch (error) {
        console.error("An Error occurred while logging in ", error);
        setLoginerror(`An error occurred while logging in ${error}`);
      } finally {
        setIsLoginLoading(false);
      }
    },
    [loginInfo]
  );

  // For logout======================================================
  const logoutuser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          registerInfo,
          updateRegisterInfo,
          registerUser,
          registerError,
          registersuccess,
          isRegisterLoading,
          logoutuser,
          // login strucureing of data
          updateLoginInfo,
          loginInfo,
          loginUser,
          loginerror,
          isLoginLoading,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
