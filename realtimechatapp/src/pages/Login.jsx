import { useContext } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { loginInfo, updateLoginInfo, loginUser, loginerror, isLoginLoading } =
    useContext(AuthContext);
  return (
    <Container>
      <div className="registerContainer">
        <div className="registerForm">
          <Form onSubmit={loginUser}>
            <Form.Group
              as={Row}
              className="mb-3 text-white"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  className="text-white"
                  plaintext
                  defaultValue="email@example.com"
                  onChange={(e) => {
                    updateLoginInfo({
                      ...loginInfo,
                      email: e.target.value,
                    });
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    updateLoginInfo({
                      ...loginInfo,
                      password: e.target.value,
                    });
                  }}
                />
              </Col>
            </Form.Group>

            {loginerror?.error && (
              <Alert className="mt-4" varient="danger">
                {loginerror.message}
              </Alert>
            )}

            <Button className="mt-4" varient="primary" type="submit">
              {isLoginLoading ? "Logging In Please Wait" : "Login"}
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
};
export default Login;
