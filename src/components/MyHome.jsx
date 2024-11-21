import { Col, Container, Row } from "react-bootstrap";
import MyNav from "./MyNav";
import MySearch from "./MySearch";
import MyProfNav from "./MyProfNav";
import MyHero from "./MyHero";
import MyCards from "./MyCards";
import MyLogin from "./MyLogin";
import MyDaily from "./MyDaily";
import MyNews from "./MyNews";

const MyHome = () => {
  return (
    <Container fluid className="vh-100 p-5 bg-black overflow-hidden">
      <Row className="bg-dark h-100 rounded-5 p-4">
        <Col className="col-2 pe-5 d-flex flex-column justify-content-between">
          <MyNav />
          <MyLogin />
          <MyProfNav />
        </Col>
        <Col className="col-6 px-3 h-100 overflow-card ">
          <MySearch />
          <MyHero />
          <Row>
            <Col className="d-flex justify-content-between flex-wrap">
              <MyCards />
              <MyCards />
              <MyCards />
              <MyCards />
              <MyCards />
              <MyCards />
              <MyCards />
              <MyCards />
              <MyCards />
              <MyCards />
              <MyCards />
              <MyCards />
            </Col>
          </Row>
        </Col>
        <Col className="col-4 ps-5 d-flex flex-column justify-content-between">
          <MyDaily />
          {/* <MyNews /> */}
        </Col>
      </Row>
    </Container>
  );
};

export default MyHome;
