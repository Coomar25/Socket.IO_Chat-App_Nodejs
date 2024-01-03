import { Alert, Button, Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
const Register = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    registersuccess,
    isRegisterLoading,
  } = useContext(AuthContext);

  return (
    <Container>
      <div className="registerContainer">
        <div className="registerForm">
          <h1 className="text-center mb-4">Register Here</h1>

          <Form onSubmit={registerUser}>
            <Form.Group
              as={Row}
              className="mb-3 text-white"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2">
                Name
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  className="text-white"
                  plaintext
                  defaultValue="Enter name here"
                  onChange={(e) =>
                    updateRegisterInfo({
                      ...registerInfo,
                      name: e.target.value,
                    })
                  }
                />
              </Col>
            </Form.Group>

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
                  onChange={(e) =>
                    updateRegisterInfo({
                      ...registerInfo,
                      email: e.target.value,
                    })
                  }
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
                  onChange={(e) =>
                    updateRegisterInfo({
                      ...registerInfo,
                      password: e.target.value,
                    })
                  }
                />
              </Col>
            </Form.Group>
            {/* succes and error message */}
            {registersuccess && (
              <Alert className="mt-4" variant="success">
                <p>{registersuccess}</p>
              </Alert>
            )}
            {registerError && (
              <Alert className="mt-4" variant="danger">
                <p>{("Failed on creating user", registerError)}</p>
              </Alert>
            )}
            {/* succes and error message */}

            <Button className="mt-4" varient="primary" type="submit">
              {isRegisterLoading ? "Creating User" : "Register"}
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
};
export default Register;
