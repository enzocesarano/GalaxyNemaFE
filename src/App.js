import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-multi-carousel/lib/styles.css";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import MyHome from "./components/MyHome";
import MyRegister from "./components/MyRegister";
import { Col, Container, Row } from "react-bootstrap";
import MyNav from "./components/MyNav";
import MyLogin from "./components/MyLogin";
import MyProfNav from "./components/MyProfNav";
import MyDaily from "./components/MyDaily";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  filmsArray,
  filmsWhitoutProiezioni,
  meLogin,
  newsCinema,
} from "./redux/actions";
import MyFilmSingle from "./components/MyFilmSingle";
import MyCheck from "./components/MyCheck";
import MyNews from "./components/MyNews";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      dispatch(meLogin());
    } else {
      setIsAuthenticated(false);
    }

    dispatch(filmsArray())
    dispatch(filmsWhitoutProiezioni())
    dispatch(newsCinema())
    
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const location = useLocation();

  return (
    <Container fluid className="vh-100 p-5 bg-black">
      <Row className="bg-dark h-100 rounded-5 p-4">
        <Col className="col-2 pe-5 d-flex flex-column justify-content-between">
          <MyNav />
          {!isAuthenticated && <MyLogin onLoginSuccess={handleLoginSuccess} />}
          {isAuthenticated && <MyProfNav onLogout={handleLogout} />}
        </Col>
        <Routes>
          <Route path="/" element={<MyHome />} />
          {!isAuthenticated && (
            <Route path="/register" element={<MyRegister />} />
          )}
          <Route path="/film/:id" element={<MyFilmSingle />} />
          <Route path="/checkout" element={<MyCheck />} />
        </Routes>
          {!(
            location.pathname.includes("/film/") ||
            location.pathname.includes("/checkout")
          ) && <Col className="col-4 ps-5 d-flex flex-column justify-content-between h-100 overflow-card"><MyNews /></Col>}
      </Row>
    </Container>
  );
}

export default App;
