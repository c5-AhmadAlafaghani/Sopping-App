import "./App.css";
import { Login } from "./component/Login";
import { Register } from "./component/Register";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
