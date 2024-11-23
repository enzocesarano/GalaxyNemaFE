import dayjs from "dayjs";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";

const MyDaily = () => {
  const [checkedSeats, setCheckedSeats] = useState([]);

  const proiezioni = useSelector((store) => store.proiezioni.proiezioni);
  if (!proiezioni || !proiezioni.content || !proiezioni.content[1]) {
    return <p>Caricamento in corso...</p>;
  }
  const occupiedSeats = proiezioni.content[1].ticketList.map((ticket) => {
    const fila = ticket.postoASedere.fila;
    const numeroPosto = ticket.postoASedere.numeroPosto;
    return `${fila} ${numeroPosto}`;
  });

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
      const isOccupied = occupiedSeats.includes(seatValue);

      rowSeats.push(
        <label
          key={seatValue}
          className="checkbox-label"
          aria-label={seatValue}
        >
          <input
            className={`posto  m-1 ms-0 me-2 ${isRedSeat ? "poltrona" : ""} ${
              isOccupied ? "occupato" : ""
            }`}
            type="checkbox"
            value={seatValue}
            checked={checkedSeats.includes(seatValue)}
            disabled={isOccupied}
            onChange={() => toggleSeat(seatValue)}
          />
        </label>
      );
    }

    rows.push(
      <li
        className="list-unstyled text-secondary d-flex justify-content-start mb-1"
        key={`row-${rowLetter}`}
      >
        {rowSeats}
      </li>
    );
  });

  const numberOfTickets = checkedSeats.length;

  return (
    <div className="mb-3">
      <Card className=" bg-transparent border-0 px-4 mb-2 text-secondary">
        <div className="w-100 align-items-center p-1">
          <Card className="border-0 bg-transparent flex-row mb-4">
            <div >
              <div className="rounded-4 border sala p-3 text-secondary">
                <p className="text-center fw-bold m-0 p-0 fs-5">
                  {proiezioni.content[1].sala.nome}
                </p>
                <p className="text-center m-0 fw-bold">
                  {dayjs(proiezioni.content[1].oraInizio).format("DD-MM")}
                </p>
                <p className="text-center m-0 fs-small fw-bold">
                  {dayjs(proiezioni.content[1].oraInizio).format("HH:mm")}
                </p>
              </div>
            </div>
            <Card.Body className="text-secondary m-0 p-0 flex-column justify-content-between text-end me-3">
              <div>
                <p className="fs-4 m-0 p-0">
                  {proiezioni.content[1].film.titolo}
                </p>
                <p className="mb-3">{proiezioni.content[1].film.genere}</p>
              </div>
              <p className="p-0 m-0">
                {proiezioni.content[1].film.vote_average}
              </p>
            </Card.Body>
            <div className="w-25 ">
              <Card.Img
                variant="top"
                className="rounded-4 w-100"
                src={proiezioni.content[1].film.poster_url}
              />
            </div>
          </Card>
          <div className="d-flex justify-content-between">
            <ol className="w-100 p-0 m-0">{rows}</ol>
            <div className="d-flex flex-column justify-content-end">
              <div className="mb-2">
                <Button className="botton-check border-0 rounded-4 text-black fw-bold">
                  Checkout
                </Button>
              </div>
              <div>
                <p className="text-center fw-bold">Ticket: {numberOfTickets}</p>
              </div>
            </div>
          </div>
          <div className="mt-3 text-secondary d-flex">
            <div className="d-flex align-items-center me-3">
              <span className="me-2 poltronaLegenda"></span>
              <span>Poltrona</span>
            </div>
            <div className="d-flex align-items-center me-3">
              <span className="me-2 occupatoLegenda"></span>
              <span>Occupato</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="me-2 disponibileLegenda"></span>
              <span>Disponibile</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MyDaily;
