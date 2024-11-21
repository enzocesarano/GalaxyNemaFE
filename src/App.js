
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyHome from './components/MyHome'
import MyRegister from "./components/MyRegister";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyHome />} />
          <Route path="/register" element={<MyRegister />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
