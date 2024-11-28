import React, { useState } from "react";
import { Col, Form, Row, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { filmsArray, postInvoice } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const MyCheck = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const selectedProiezione = useSelector(
    (store) => store.selectedProiezione.selectedProiezione
  );

  const selectedTickets = JSON.parse(
    localStorage.getItem(`selectedTickets_${selectedProiezione.id_proiezione}`)
  ) || [];

  const [invoiceData, setInvoiceData] = useState({
    via: "",
    civico: "",
    cap: "",
    comune: "",
    provincia: "",
  });

  const basePrice = 5.0;
  const premiumIncrement = 3.0;
  const priceMultiplier = selectedProiezione.moltiplicatore_prezzo;

  const calculatePrice = (rowLetter) =>
    rowLetter === "D"
      ? (basePrice + premiumIncrement) * priceMultiplier
      : basePrice * priceMultiplier;

  const [ticketData, setTicketData] = useState(
    selectedTickets.map((seat) => ({
      nome: "",
      cognome: "",
      data_nascita: "",
      postoASedere: seat,
      prezzo: calculatePrice(seat.split(" ")[0]),
    }))
  );

  const totalAmount = ticketData.reduce(
    (sum, ticket) => sum + ticket.prezzo,
    0
  );

  const [errors, setErrors] = useState({
    ticketErrors: selectedTickets.map(() => ({
      nome: "",
      cognome: "",
      data_nascita: "",
    })),
    invoiceErrors: {
      via: "",
      civico: "",
      cap: "",
      comune: "",
      provincia: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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

  const validateForm = () => {
    let valid = true;
    let newErrors = {
      ticketErrors: ticketData.map(() => ({
        nome: "",
        cognome: "",
        data_nascita: "",
      })),
      invoiceErrors: {
        via: "",
        civico: "",
        cap: "",
        comune: "",
        provincia: "",
      },
    };

    ticketData.forEach((ticket, index) => {
      if (!ticket.nome.trim()) {
        newErrors.ticketErrors[index].nome = "Il nome è obbligatorio.";
        valid = false;
      }
      if (!ticket.cognome.trim()) {
        newErrors.ticketErrors[index].cognome = "Il cognome è obbligatorio.";
        valid = false;
      }
      if (!ticket.data_nascita) {
        newErrors.ticketErrors[index].data_nascita =
          "La data di nascita è obbligatoria.";
        valid = false;
      }
    });

    if (!invoiceData.via.trim()) {
      newErrors.invoiceErrors.via = "La via è obbligatoria.";
      valid = false;
    }
    if (!invoiceData.civico.trim()) {
      newErrors.invoiceErrors.civico = "Il civico è obbligatorio.";
      valid = false;
    }
    if (!invoiceData.cap.trim()) {
      newErrors.invoiceErrors.cap = "Il CAP è obbligatorio.";
      valid = false;
    }
    if (!invoiceData.comune.trim()) {
      newErrors.invoiceErrors.comune = "Il comune è obbligatorio.";
      valid = false;
    }
    if (!invoiceData.provincia.trim()) {
      newErrors.invoiceErrors.provincia = "La provincia è obbligatoria.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const jsonData = {
      ...invoiceData,
      ticket: ticketData.map((ticket) => ({
        nome: ticket.nome,
        cognome: ticket.cognome,
        data_nascita: ticket.data_nascita,
        postoASedere: {
          fila: ticket.postoASedere.split(" ")[0],
          numeroPosto: ticket.postoASedere.split(" ")[1],
        },
      })),
    };

    try {
      const response = await postInvoice(
        jsonData,
        selectedProiezione.id_proiezione
      );
      setSuccessMessage("Acquisto completato con successo!");
      dispatch(filmsArray());
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setErrorMessage(error.message || "Errore durante l'acquisto.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Col className="col-3">
        <h2 className="text-light">Dettagli dei Tickets</h2>

        {ticketData.map((ticket, index) => (
          <div key={index} className="mb-4">
            <h4 className="text-light">
              Fila: {ticket.postoASedere.split(" ")[0]} - Posto:{" "}
              {ticket.postoASedere.split(" ")[1]} - Prezzo: €{" "}
              {ticket.prezzo.toFixed(2)}
            </h4>
            <Form>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Nome"
                  name="nome"
                  value={ticket.nome}
                  onChange={(e) => handleTicketChange(index, e)}
                  className={`rounded-4 px-4 py-2 text-light bg-black border-0 placeholder-light mb-2 ${
                    errors.ticketErrors[index].nome ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.ticketErrors[index].nome}
                </div>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Cognome"
                  name="cognome"
                  value={ticket.cognome}
                  onChange={(e) => handleTicketChange(index, e)}
                  className={`rounded-4 px-4 py-2 text-light bg-black border-0 placeholder-light mb-2 ${
                    errors.ticketErrors[index].cognome ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.ticketErrors[index].cognome}
                </div>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="date"
                  name="data_nascita"
                  value={ticket.data_nascita}
                  onChange={(e) => handleTicketChange(index, e)}
                  className={`rounded-4 px-4 py-2 bg-black border-0 placeholder-light text-secondary ${
                    errors.ticketErrors[index].data_nascita ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.ticketErrors[index].data_nascita}
                </div>
              </Form.Group>
            </Form>
          </div>
        ))}

        <h2 className="text-light">Totale: €{totalAmount.toFixed(2)}</h2>

        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="btn btn-primary mt-4"
        >
          {isLoading ? "Caricamento..." : "Acquista"}
        </Button>
      </Col>

      <Col className="col-3 mb-5">
        <h2 className="text-light">Dati di Fatturazione</h2>
        <Form>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              placeholder="Via"
              name="via"
              value={invoiceData.via}
              onChange={handleInvoiceChange}
              className={`rounded-4 px-4 py-2 bg-black border-0 placeholder-light text-light ${
                errors.invoiceErrors.via ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.invoiceErrors.via}
            </div>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              placeholder="Civico"
              name="civico"
              value={invoiceData.civico}
              onChange={handleInvoiceChange}
              className={`rounded-4 px-4 py-2 bg-black border-0 placeholder-light text-light ${
                errors.invoiceErrors.civico ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.invoiceErrors.civico}
            </div>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              placeholder="CAP"
              name="cap"
              value={invoiceData.cap}
              onChange={handleInvoiceChange}
              className={`rounded-4 px-4 py-2 bg-black border-0 placeholder-light text-light ${
                errors.invoiceErrors.cap ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.invoiceErrors.cap}
            </div>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              placeholder="Comune"
              name="comune"
              value={invoiceData.comune}
              onChange={handleInvoiceChange}
              className={`rounded-4 px-4 py-2 bg-black border-0 placeholder-light text-light ${
                errors.invoiceErrors.comune ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.invoiceErrors.comune}
            </div>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              placeholder="Provincia"
              name="provincia"
              value={invoiceData.provincia}
              onChange={handleInvoiceChange}
              className={`rounded-4 px-4 py-2 bg-black border-0 placeholder-light text-light ${
                errors.invoiceErrors.provincia ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.invoiceErrors.provincia}
            </div>
          </Form.Group>
        </Form>
      </Col>
    </>
  );
};

export default MyCheck;
