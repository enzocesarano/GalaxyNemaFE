import { Card, Spinner } from "react-bootstrap";

const MyCards = ({ film, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="cards rounded-4 bg-transparent border-black p-2 cursor-pointer mb-2">
        {/* Placeholder image and content */}
        <div className="w-100 rounded-4 mb-2 bg-dark" style={{ height: "150px" }}></div>
        <div className="d-flex justify-content-between align-items-center p-1">
          <Card.Title className="fs-6 m-0 p-0 text-secondary fw-bold">
            <Spinner animation="border" size="sm" />
          </Card.Title>
          <i className="bi bi-play-circle-fill text-secondary"></i>
        </div>
      </Card>
    );
  }

  return (
    <Card className="cards rounded-4 bg-transparent border-black p-2 cursor-pointer mb-2">
      <Card.Img
        variant="top"
        src="https://placedog.net/200"
        className="w-100 rounded-4 mb-2"
      />
      <div className="d-flex justify-content-between align-items-center p-1">
        <Card.Title className="fs-6 m-0 p-0 text-secondary fw-bold">
          {film.titolo}
        </Card.Title>
        <i className="bi bi-play-circle-fill text-secondary"></i>
      </div>
    </Card>
  );
};

export default MyCards;