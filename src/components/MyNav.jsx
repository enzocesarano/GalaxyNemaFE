import { Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const MyNav = () => {
  const location = useLocation(); // Ottieni la posizione corrente

  const isActive = (path) => location.pathname === path; // Verifica se il percorso è attivo

  return (
    <Navbar
      expand="lg"
      className="d-flex flex-column align-items-start p-0 mb-5"
    >
      <div className="w-100 mb-5">
        <img src="/logo.svg" alt="Galaxynema Logo" className="img-fluid w-75" />
      </div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse
        id="basic-navbar-nav"
        className="d-flex flex-column w-100"
      >
        <Link
          to="/"
          className={`nav-link fw-bold w-100 p-2 px-3 rounded-4 ${
            isActive("/") ? "active text-white" : "text-secondary"
          }`}
        >
          <i className="bi bi-house-fill me-2"></i>Home
        </Link>
        <Link
          to="/movies"
          className={`nav-link fw-bold w-100 p-2 px-3 rounded-4 ${
            isActive("/movies") ? "active text-white" : "text-secondary"
          }`}
        >
          <i className="bi bi-film me-2"></i>Movies
        </Link>
        <Link
          to="/favorites"
          className={`nav-link fw-bold w-100 p-2 px-3 rounded-4 ${
            isActive("/favorites") ? "active text-white" : "text-secondary"
          }`}
        >
          <i className="bi bi-star-fill me-2"></i>Preferiti
        </Link>
        <Link
          to="/tickets"
          className={`nav-link fw-bold w-100 p-2 px-3 rounded-4 ${
            isActive("/tickets") ? "active text-white" : "text-secondary"
          }`}
        >
          <i className="bi bi-ticket-perforated-fill me-2"></i>Ticket
        </Link>
        <Link
          to="/news"
          className={`nav-link fw-bold w-100 p-2 px-3 rounded-4 ${
            isActive("/news") ? "active text-white" : "text-secondary"
          }`}
        >
          <i className="bi bi-newspaper me-2"></i>News
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNav;
