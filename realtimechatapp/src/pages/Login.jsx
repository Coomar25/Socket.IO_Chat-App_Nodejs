
export default Login;
import { Alert, Button, Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const Login = () => {
  return (
    <Container>
      <div className="registerContainer">
        <div className="registerForm">
          <Form>
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
                <Form.Control type="password" placeholder="Password" />
              </Col>
            </Form.Group>

            <Button className="mt-4" varient="primary" type="submit">
              Register
            </Button>

            <Alert className="mt-4" varient="danger">
              {" "}
              <p>An Error Occured</p>{" "}
            </Alert>
          </Form>
        </div>
      </div>
    </Container>
  );
};
export default Login;
