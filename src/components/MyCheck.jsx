import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const MyCheck = () => {

  const selectedTickets = useSelector(
    (store) => store.selectedTickets.selectedTickets
  );

  const selectedProiezione = useSelector((store) => store.selectedProiezione.selectedProiezione)

  useEffect(() => {
    console.log(selectedProiezione)
  }, [selectedProiezione])


  const [invoiceData, setInvoiceData] = useState({
    via: "",
    civico: "",
    cap: "",
    comune: "",
    provincia: "",
  });


  const [ticketData, setTicketData] = useState(
    selectedTickets.map((ticket) => ({
      nome: "",
      cognome: "",
      data_nascita: "",
      postoASedere: ticket,
    }))
  );

  const handleInvoiceChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handleTicketChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTickets = [...ticketData];
    updatedTickets[index] = { ...updatedTickets[index], [name]: value };
    setTicketData(updatedTickets);
  };

  const jsonData = {
    ...invoiceData,
    ticket: ticketData.map((ticket, index) => ({
      nome: ticket.nome,
      cognome: ticket.cognome,
      data_nascita: ticket.data_nascita,
      postoASedere: {
        fila: ticket.postoASedere.split(" ")[0],
        numeroPosto: ticket.postoASedere.split(" ")[1],
      },
    })),
  };

  return (
    <>
      <Col className="col-5 h-100">
        <h2 className="text-light mt-4">Dettagli dei Tickets</h2>

        {/* Form per ogni Ticket */}
        {ticketData.map((ticket, index) => (
          <div key={index} className="mb-4">
            <h4 className="text-light">
              Fila: {ticket.postoASedere.split(" ")[0]} - Posto:{" "}
              {ticket.postoASedere.split(" ")[1]}
            </h4>
            <div className="d-flex">
              <Form>
                <Form.Group controlId={`formNomeTicket-${index}`}>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci il nome"
                    name="nome"
                    value={ticket.nome}
                    onChange={(e) => handleTicketChange(index, e)}
                    className={`rounded-4 px-4 py-2 text-light bg-black border-0 placeholder-light mb-2`}
                  />
                </Form.Group>

                <Form.Group controlId={`formCognomeTicket-${index}`}>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci il cognome"
                    name="cognome"
                    value={ticket.cognome}
                    onChange={(e) => handleTicketChange(index, e)}
                    className={`rounded-4 px-4 py-2 text-light bg-black border-0 placeholder-light mb-2`}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId={`formDataNascitaTicket-${index}`}
                >
                  <Form.Control
                    type="date"
                    name="data_nascita"
                    value={ticket.data_nascita}
                    onChange={(e) => handleTicketChange(index, e)}
                    className={`rounded-4 px-4 py-2 bg-black border-0 text-secondary placeholder-light mb-2`}
                  />
                </Form.Group>
              </Form>
            </div>
          </div>
        ))}
      </Col>
      <Col>
        <h2 className="text-secondary">DATI DI FATTURAZIONE</h2>

        {/* Form per Invoice */}
        <Form>
          <Row className="mb-3">
            <Form.Group controlId="formVia">
              <Form.Control
                type="text"
                placeholder="Inserisci la via"
                name="via"
                value={invoiceData.via}
                onChange={handleInvoiceChange}
                className={`rounded-4 px-4 py-2 text-light bg-black border-0 placeholder-light mb-2`}
              />
            </Form.Group>

            <Form.Group controlId="formCivico">
              <Form.Control
                type="text"
                placeholder="Inserisci il civico"
                name="civico"
                value={invoiceData.civico}
                onChange={handleInvoiceChange}
                className={`rounded-4 px-4 py-2 text-light bg-black border-0 placeholder-light mb-2`}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group controlId="formCap">
              <Form.Control
                type="text"
                placeholder="Inserisci il CAP"
                name="cap"
                value={invoiceData.cap}
                onChange={handleInvoiceChange}
                className={`rounded-4 px-4 py-2 text-light bg-black border-0 placeholder-light mb-2`}
              />
            </Form.Group>

            <Form.Group controlId="formComune">
              <Form.Control
                type="text"
                placeholder="Inserisci il comune"
                name="comune"
                value={invoiceData.comune}
                onChange={handleInvoiceChange}
                className={`rounded-4 px-4 py-2 text-light bg-black border-0 placeholder-light mb-2`}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group controlId="formProvincia">
              <Form.Control
                type="text"
                placeholder="Inserisci la provincia"
                name="provincia"
                value={invoiceData.provincia}
                onChange={handleInvoiceChange}
                className={`rounded-4 px-4 py-2 text-light bg-black border-0 placeholder-light mb-2`}
              />
            </Form.Group>
          </Row>
        </Form>

        <h2 className="text-secondary mt-4">JSON Generato</h2>
        <pre className="text-secondary">
          {JSON.stringify(jsonData, null, 2)}
        </pre>
      </Col>
    </>
  );
};

export default MyCheck;
