import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectTicket } from "../redux/actions";

const MyDaily = ({ proiezione }) => {
  const dispatch = useDispatch();
  const [checkedSeats, setCheckedSeats] = useState([]);

  useEffect(() => {
    dispatch(selectTicket(checkedSeats));
  }, [checkedSeats, dispatch]);

  if (!proiezione) {
    return <p>Seleziona una proiezione per vedere i posti disponibili.</p>;
  }

  const occupiedSeats = proiezione.ticketList.map((ticket) => {
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
            className={`posto m-1 ms-0 me-2 ${isRedSeat ? "poltrona" : ""} ${
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
      <Card className="bg-transparent border-0 px-4 mb-2 text-secondary">
        <div className="w-100 align-items-center p-1">
          <div className="d-flex justify-content-between">
            <ol className="w-100 p-0 m-0">{rows}</ol>
            <div className="d-flex flex-column justify-content-end">
              <div className="mb-2">
                <Link
                  to={{
                    pathname: "/checkout",
                  }}
                  className="btn botton-check border-0 rounded-4 text-black fw-bold"
                >
                  Checkout
                </Link>
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
