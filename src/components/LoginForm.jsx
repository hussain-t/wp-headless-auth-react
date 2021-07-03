import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import useLoginUser from "../hooks/useLoginUser";
import { AUTH_TOKEN } from "../helper";

const LoginForm = () => {
  const [validate, setValidate] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const { login, data: gqlData, loading, error: gqlError } = useLoginUser();

  const handleLogin = async (event) => {
    event.preventDefault();
    setValidate(true);

    await login(username, password);
  };

  const handleUsername = (context) => {
    setUsername(context);
  };

  const handlePassword = (context) => {
    setPassword(context);
  };

  useEffect(() => {
    if (gqlError) {
      setValidate(true);
      setError(gqlError?.message.split("_").join(" ").toUpperCase());
    }
    if (gqlData) {
      localStorage.setItem(AUTH_TOKEN, JSON.stringify(gqlData.login));
      setValidate(false);
      setUsername("");
      setPassword("");
      setError("");
      history.push("/profile");
    }
  }, [gqlData, gqlError, history]);

  const renderMessage = (loading, error, user) => {
    if (error) {
      return <Alert variant="danger">{error}</Alert>;
    } else if (loading) {
      return <Alert variant="primary">Loading...</Alert>;
    } else if (user) {
      console.log("user", user);
      return <Alert variant="success">User successfully authenticated!</Alert>;
    }
  };

  return (
    <Container>
      <Form
        method="POST"
        noValidate
        validated={validate}
        onSubmit={handleLogin}
      >
        <h2>React WPGraphQL Auth</h2>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Username / Email"
            onChange={(event) => handleUsername(event.target.value)}
            value={username}
          />
          <Form.Control.Feedback type="invalid">
            Username cannot be empty!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Password"
            onChange={(event) => handlePassword(event.target.value)}
            value={password}
          />
          <Form.Control.Feedback type="invalid">
            Password cannot be empty!
          </Form.Control.Feedback>
        </Form.Group>
        {renderMessage(loading, error, gqlData)}
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <Row className="mt-3">
        <Col>
          <Link to="/register" className="btn btn-primary">
            New User?
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
