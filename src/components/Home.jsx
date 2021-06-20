import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const HomePage = () => (
  <Container>
    <Row className="mt-3">
      <Col>
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
      </Col>
      <Col>
        <Link to="/register" className="btn btn-primary">
          Register
        </Link>
      </Col>
    </Row>
  </Container>
);

export default HomePage;
