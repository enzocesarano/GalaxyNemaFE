import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-multi-carousel/lib/styles.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyHome from "./components/MyHome";
import MyRegister from "./components/MyRegister";
import { Col, Container, Row } from "react-bootstrap";
import MyNav from "./components/MyNav";
import MyLogin from "./components/MyLogin";
import MyProfNav from "./components/MyProfNav";
import MyDaily from "./components/MyDaily";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { filmsArray, meLogin, proiezioniArray } from "./redux/actions";


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
    dispatch(proiezioniArray())
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Container fluid className="vh-100 p-5 bg-black overflow-hidden">
        <Row className="bg-dark h-100 rounded-5 p-4">
          <Col className="col-2 pe-5 d-flex flex-column justify-content-between">
            <MyNav />
            {!isAuthenticated && <MyLogin onLoginSuccess={handleLoginSuccess} />}
            {isAuthenticated && <MyProfNav onLogout={handleLogout} />}
          </Col>
          <Routes>
            <Route path="/" element={<MyHome />} />
            {!isAuthenticated && <Route path="/register" element={<MyRegister />} />}
          </Routes>
          <Col className="col-4 ps-5 d-flex flex-column justify-content-between">
            <MyDaily />
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;
