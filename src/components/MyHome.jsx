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
        
  );
};

export default MyHome;
