import MyHero from "./MyHero";
import MyCards from "./MyCards";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import MySearch from "./MySearch";

const MyHome = () => {
  const films = useSelector((state) => state.films.films); // ottieni i dati dal Redux store
  const isLoading = films.length === 0; // definisci una condizione di caricamento (puoi usare un'altra logica)

  return (
    <Col className="col-6 px-3 h-100 overflow-card">
      <MySearch />
      <MyHero />
      <Row>
        <Col className="d-flex justify-content-between flex-wrap">
          {/* Aggiungi la card placeholder se i dati sono ancora in caricamento */}
          {isLoading ? (
            [...Array(12)].map((_, index) => (
              <MyCards key={index} isLoading={true} />
            ))
          ) : (
            films.content.map((film, index) => (
              <MyCards key={index} film={film} />
            ))
          )}
        </Col>
      </Row>
    </Col>
  );
};

export default MyHome;
