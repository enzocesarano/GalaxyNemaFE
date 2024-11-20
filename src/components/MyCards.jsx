import { Button, Card } from "react-bootstrap";

const MyCards = () => {
  return (
    <Card className="cards rounded-4 bg-transparent border-black p-2 cursor-pointer mb-2">
      <Card.Img
        variant="top"
        src="https://www.thespacecinema.it/-/media/tsc/2024/10/venom-the-last-dance/locandina_vonomthelastdance.jpg?w=200"
        className="w-100 rounded-4 mb-2"
      />

      <div className="d-flex justify-content-between align-items-center p-1">
        <Card.Title className="fs-6 m-0 p-0 text-secondary fw-bold">
        Terrifier 3
        </Card.Title>
        <i class="bi bi-play-circle-fill text-secondary"></i>
      </div>
    </Card>
  );
};

export default MyCards;
