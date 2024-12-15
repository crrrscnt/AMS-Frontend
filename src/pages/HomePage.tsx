import {FC} from "react";
// import {Link} from "react-router-dom";
// import {ROUTES} from "../Routes.tsx";
import {Col, Container, Row} from "react-bootstrap";

export const HomePage: FC = () => {
  return (
    <Container className="home-background">
      <Row>
        <Col md={6}>
          <h1></h1>
          <p>
            Добро пожаловать! Здесь вы можете отправить
            АМС на космические объекты.
          </p>
          {/*<Link to={ROUTES.SPACEOBJECTS}>*/}
          {/*  <Button variant="outline-dark">Просмотреть космические объекты</Button>*/}
          {/*</Link>*/}
        </Col>
      </Row>
    </Container>
  );
};