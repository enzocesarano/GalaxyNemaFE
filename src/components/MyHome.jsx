import MyHero from "./MyHero";
import MyCards from "./MyCards";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import MySearch from "./MySearch";
import Carousel from "react-multi-carousel";

const MyHome = () => {
  const films = useSelector((state) => state.films.films);
  const isLoading = films.length === 0;

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const responsive2 = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <Col className="col-6 px-3 h-100 overflow-card">
      

      <Carousel
        responsive={responsive2}
        infinite={true}
        autoPlay={true}
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {isLoading
          ? Array.from({ length: 1 }).map((_, index) => (
              <MyHero key={index} isLoading={true} />
            ))
          : (films.content || []).map((film, index) => (
              <MyHero key={index} film={film} />
            ))}
      </Carousel>

      <MySearch />
      <Row>
        <Col>
          <Carousel
            responsive={responsive}
            infinite={true}
            itemClass="m-1"
            removeArrowOnDeviceType={["tablet", "mobile"]}
          >
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <MyCards key={index} isLoading={true} />
                ))
              : (films.content || []).map((film, index) => (
                  <MyCards key={index} film={film} />
                ))}
          </Carousel>
        </Col>
      </Row>
    </Col>
  );
};

export default MyHome;
