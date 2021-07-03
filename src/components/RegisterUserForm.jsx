import React, { useState, useEffect, useMemo } from "react";
import { useHistory, Link } from "react-router-dom";
import { Form, Button, Alert, Row, Col, Container } from "react-bootstrap";
import useRegisterUser from "../hooks/useRegisterUser";

const RegisterUserForm = () => {
  const initialState = useMemo(
    () => ({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
    }),
    []
  );
  const [validate, setValidate] = useState(false);
  const [formState, setFormState] = useState(initialState);
  const [error, setError] = useState("");
  const history = useHistory();
  const { firstName, lastName, username, email, password } = formState;

  const {
    registerUser,
    loading,
    data: gqlData,
    error: gqlError,
  } = useRegisterUser();

  const handleRegisterUser = async (event) => {
    event.preventDefault();
    setValidate(true);
    const input = {
      firstName,
      lastName,
      username,
      email,
      password,
    };

    await registerUser(input);
  };

  const handleTextChange = (target) => {
    setFormState((prevForState) => ({
      ...prevForState,
      [target.name]: target.value,
    }));
  };

  useEffect(() => {
    if (gqlError) {
      setValidate(true);
      setError(gqlError?.message.split("_").join(" ").toUpperCase());
    }
    if (gqlData) {
      setValidate(false);
      setFormState(initialState);
      history.push("/login");
    }
  }, [gqlData, gqlError, history, initialState]);

  const renderMessage = (loading, error, user) => {
    if (error) {
      return <Alert variant="danger">{error}</Alert>;
    } else if (loading) {
      return <Alert variant="primary">Loading...</Alert>;
    } else if (user) {
      console.log("user", user);
      return <Alert variant="success">User successfully registerred!</Alert>;
    }
  };

  return (
    <Container>
      <Form
        method="POST"
        noValidate
        validated={validate}
        onSubmit={handleRegisterUser}
      >
        <h2>React WPGraphQL Auth</h2>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            required
            name="firstName"
            placeholder="First Name"
            onChange={(event) => handleTextChange(event.target)}
            value={firstName}
          />
          <Form.Control.Feedback type="invalid">
            First Name cannot be empty!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            required
            name="lastName"
            placeholder="Last Name"
            onChange={(event) => handleTextChange(event.target)}
            value={lastName}
          />
          <Form.Control.Feedback type="invalid">
            Last Name cannot be empty!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            name="email"
            placeholder="Email"
            onChange={(event) => handleTextChange(event.target)}
            value={email}
          />
          <Form.Control.Feedback type="invalid">
            Email cannot be empty!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            required
            name="username"
            placeholder="Username / Email"
            onChange={(event) => handleTextChange(event.target)}
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
            name="password"
            placeholder="Password"
            onChange={(event) => handleTextChange(event.target)}
            value={password}
          />
          <Form.Control.Feedback type="invalid">
            Password cannot be empty!
          </Form.Control.Feedback>
        </Form.Group>
        {renderMessage(loading, error, gqlData)}
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <Row className="mt-3">
        <Col>
          <Link to="/login" className="btn btn-primary">
            Already have an account?
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterUserForm;
