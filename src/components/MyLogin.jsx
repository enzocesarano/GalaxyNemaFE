import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyLogin = () => {
  return (
    <div className="flex-grow-1">
      <p className="text-secondary fw-bold px-3 w-100 rounded-4 fs-4 m-0 mb-3">
        Login<i className="bi bi-arrow-right-circle-fill ms-3 fs-5"></i>
      </p>
      <Form className="mb-2">
        <Form.Control
          type="text"
          placeholder="Username..."
          className="rounded-4 px-4 py-2 text-light bg-black border-0 placeholder-light mb-2"
          aria-label="Search"
        />
        <Form.Control
          type="password"
          placeholder="Password..."
          className="rounded-4 px-4 py-2 text-light bg-black border-0 placeholder-light"
          aria-label="Search"
        />
      </Form>

      <Link className="nav-link text-secondary fw-bold w-100 p-2 px-3 rounded-4">
        <i className="bi bi-cursor-fill me-2"></i>Oppure registrati
      </Link>
    </div>
  );
};

export default MyLogin;
