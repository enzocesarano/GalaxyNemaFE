import { useState } from "react";
import { Button, Card } from "react-bootstrap";

const MyDaily = () => {
  const [checkedSeats, setCheckedSeats] = useState([]);

  const toggleSeat = (seat) => {
    setCheckedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const rows = [];
  const rowLetters = ["A", "B", "C", "D", "E"];

  rowLetters.forEach((rowLetter) => {
    const rowSeats = [];

    for (let seatIndex = 0; seatIndex < 10; seatIndex++) {
      const seatValue = `${rowLetter} P${seatIndex + 1}`;
      const isRedSeat = seatValue.startsWith("D");
      rowSeats.push(
        <label
          key={seatValue}
          className="checkbox-label"
          aria-label={seatValue}
        >
          <input
            className={`posto m-1 ${isRedSeat ? "poltrona" : ""}`}
            type="checkbox"
            value={seatValue}
            checked={checkedSeats.includes(seatValue)}
            onChange={() => toggleSeat(seatValue)}
          />
        </label>
      );
    }

    rows.push(
      <li
        className="list-unstyled text-secondary d-flex justify-content-center mb-1"
        key={`row-${rowLetter}`}
      >
        {rowSeats}
      </li>
    );
  });

  const numberOfTickets = checkedSeats.length;

  return (
    <div className="mb-3">
      {/* <p className="text-secondary m-0 p-0 display-6 fw-bold text-end mb-4">
        OGGI NELLE SALE
      </p> */}

      <Card className=" bg-transparent border-0 px-4 mb-2 text-secondary">
        <div className="w-100 align-items-center p-1">
          <Card className="border-0 bg-transparent flex-row mb-4">
            <div className="w-50 me-4">
              <Card.Img
                variant="top"
                className="rounded-4 w-100"
                src="https://www.thespacecinema.it/-/media/tsc/2024/11/wicked/new-new/locandina_wicked.jpg?w=200"
              />
            </div>

            <Card.Body className="text-secondary m-0 p-0 flex-column justify-content-between">
              <div>
                <p className="fs-4 m-0 p-0">WHICKED </p>
                <p className="mb-3">Genere</p>
              </div>
              <p className="p-0 m-0">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
                eum aperiam reprehenderit ullam eveniet maiores odio...
              </p>
            </Card.Body>
          </Card>
          <div className="d-flex justify-content-between">
            <ol className="w-100 p-0 m-0">{rows}</ol>
            <div className="d-flex flex-column justify-content-between">
              <div className="rounded-4 border sala p-2">
                <p className="text-center fw-bold m-0 p-0 fs-6">SALA A</p>
                <p className="text-center m-0 fw-bold">22:00</p>
              </div>
              <div className="">
                <Button className="botton-check border-0 rounded-4 text-black fw-bold">Checkout</Button>
              </div>
              <div>
                <p className="text-center fw-bold">Ticket: {numberOfTickets}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MyDaily;
