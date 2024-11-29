import { Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const MyNav = () => {
  const location = useLocation(); // Ottieni la posizione corrente

  const isActive = (path) => location.pathname === path;

  return (
    <Navbar expand="xl" className="d-flex flex-row flex-xl-column p-0 mb-3 text-center text-xl-start ">
      <div className="w-100 mb-5 d-none d-xl-block">
        <img
          src="/logo.svg"
          alt="Galaxynema Logo"
          className="img-fluid w-75 "
        />
      </div>
      <div className="d-flex flex-row flex-xl-column justify-content-evenly p-3 p-xl-0 justify-content-xl-start w-100">
        <Link
          to="/"
          className={`nav-link fw-bold p-2 px-3 rounded-4 w-auto ${
            isActive("/") ? "active text-white" : "text-secondary"
          }`}
        >
          <i className="bi bi-house-fill m-0 me-xl-2"></i>
          <span className="d-none d-xl-inline">Home</span>
        </Link>
        <Link
          to="/movies"
          className={`nav-link fw-bold p-2 px-3 rounded-4 w-auto ${
            isActive("/movies") ? "active text-white" : "text-secondary"
          }`}
        >
          <i className="bi bi-film m-0 me-xl-2"></i>
          <span className="d-none d-xl-inline">Movies</span>
        </Link>
        <Link
          to="/favorites"
          className={`nav-link fw-bold p-2 px-3 rounded-4 w-auto ${
            isActive("/favorites") ? "active text-white" : "text-secondary"
          }`}
        >
          <i className="bi bi-star-fill m-0 me-xl-2"></i>
          <span className="d-none d-xl-inline">Preferiti</span>
        </Link>
        <Link
          to="/tickets"
          className={`nav-link fw-bold p-2 px-3 rounded-4 w-auto ${
            isActive("/tickets") ? "active text-white" : "text-secondary"
          }`}
        >
          <i className="bi bi-ticket-perforated-fill m-0 me-xl-2"></i>
          <span className="d-none d-xl-inline">Ticket</span>
        </Link>
        <Link
          to="/news"
          className={`nav-link fw-bold p-2 px-3 rounded-4 w-auto ${
            isActive("/news") ? "active text-white" : "text-secondary"
          }`}
        >
          <i className="bi bi-newspaper m-0 me-xl-2"></i>
          <span className="d-none d-xl-inline">News</span>
        </Link>
      </div>
    </Navbar>
  );
};

export default MyNav;
