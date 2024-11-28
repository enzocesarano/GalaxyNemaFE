import React, { useState } from "react";
import {
  Form,
  Button,
  Col,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { register } from "../redux/actions";

const MyRegister = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    username: "",
    email: "",
    password: "",
    telefono: "",
    data_nascita: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+\d{1,3}\d{9,15}$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.nome.trim()) newErrors.nome = "Il nome è obbligatorio.";
    if (!formData.cognome.trim())
      newErrors.cognome = "Il cognome è obbligatorio.";
    if (!formData.username.trim())
      newErrors.username = "Il username è obbligatorio.";
    if (!formData.email.trim() || !emailRegex.test(formData.email))
      newErrors.email = "Inserisci un'email valida.";
    if (!formData.password || !passwordRegex.test(formData.password))
      newErrors.password =
        "La password deve contenere almeno 8 caratteri, una maiuscola, un numero e un carattere speciale.";
    if (!formData.telefono.trim() || !phoneRegex.test(formData.telefono))
      newErrors.telefono =
        "Inserisci un numero di telefono valido (es. +393470757363).";
    if (!formData.data_nascita)
      newErrors.data_nascita = "La data di nascita è obbligatoria.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      try {
        await register(formData);
        setSuccessMessage("Registrazione completata con successo!");
        setFormData({
          nome: "",
          cognome: "",
          username: "",
          email: "",
          password: "",
          telefono: "",
          data_nascita: "",
        });

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } catch (error) {
        setGeneralError(error.message);
      }
    }
  };

  return (
    <>
      <Col className="col-6 px-3 h-100 overflow-card">
        <Form noValidate onSubmit={handleSubmit} className="mt-2">
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formNome">
              <Form.Control
                type="text"
                placeholder="Inserisci il tuo nome"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                className={`rounded-4 px-4 py-2 text-light bg-black border-0 placeholder-light mb-2 ${
                  errors.nome ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.nome}</div>
            </Form.Group>

            <Form.Group as={Col} controlId="formCognome">
              <Form.Control
                type="text"
                placeholder="Inserisci il tuo cognome"
                name="cognome"
                value={formData.cognome}
                onChange={handleInputChange}
                className={`rounded-4 px-4 py-2 text-light bg-black border-0 placeholder-light mb-2 ${
                  errors.cognome ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.cognome}</div>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Control
              type="text"
              placeholder="Inserisci il tuo username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={`rounded-4 px-4 py-2 text-light bg-black border-0 placeholder-light mb-2 ${
                errors.username ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">{errors.username}</div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Control
              type="email"
              placeholder="Inserisci la tua email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`rounded-4 px-4 py-2 text-light bg-black border-0 placeholder-light mb-2 ${
                errors.email ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">{errors.email}</div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Control
              type="password"
              placeholder="Inserisci la tua password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`rounded-4 px-4 py-2 text-light bg-black border-0 placeholder-light mb-2 ${
                errors.password ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">{errors.password}</div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTelefono">
            <Form.Control
              type="text"
              placeholder="Inserisci il tuo numero di telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              className={`rounded-4 px-4 py-2 text-light bg-black border-0 placeholder-light mb-2 ${
                errors.telefono ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">{errors.telefono}</div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDataNascita">
            <Form.Control
              type="date"
              name="data_nascita"
              value={formData.data_nascita}
              onChange={handleInputChange}
              className={`rounded-4 px-4 py-2 text-secondary placeholder-light bg-black border-0 mb-2 ${
                errors.data_nascita ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">{errors.data_nascita}</div>
          </Form.Group>

          {successMessage && (
            <p className="text-success fs-6 mt-2">{successMessage}</p>
          )}

          {generalError && (
            <p className="text-danger fs-6 mt-2">{generalError}</p>
          )}

          <Button
            className="botton-check border-0 rounded-4 text-black fw-bold"
            type="submit"
          >
            Registrati
          </Button>
        </Form>
      </Col>
    </>
  );
};

export default MyRegister;
