import "./App.css";
import { Login } from "./component/Login";
import { Register } from "./component/Register";
import { Navbar } from "./component/Navbar";
import { Home } from "./component/Home/index";
import { Favorite } from "./component/Favorite";
import { Basket } from "./component/Basket";
import { Dashboard } from "./component/Dashboard";
import { Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path={"/home"} element={<Home />} />
        <Route path={"/favorite"} element={<Favorite />} />
        <Route path={"/basket"} element={<Basket />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
