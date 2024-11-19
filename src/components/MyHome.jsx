import { Col, Container, Row } from "react-bootstrap";
import MyNav from "./MyNav";
import MySearch from "./MySearch";
import MyProfNav from "./MyProfNav";
import MyHero from "./MyHero";
import MyCards from "./MyCards";

const MyHome = () => {
  return (
    <Container fluid className="vh-100 p-5 bg-black">
      <Row className="bg-dark h-100 rounded-5 p-4">
        <Col className="col-2 pe-5">
          <MyNav />
        </Col>
        <Col className="col-6 px-3">
          <MySearch />
          <MyHero />
          <Row>
            <Col className="d-flex justify-content-between">
            <MyCards />
            <MyCards />
            <MyCards />
            <MyCards />
            <MyCards />
            <MyCards />
            </Col> 
          </Row>
          
        </Col>
        <Col className="col-4">
          <MyProfNav />
        </Col>
      </Row>
    </Container>
  );
};

export default MyHome;
