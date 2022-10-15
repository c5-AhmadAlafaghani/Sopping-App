import "./App.css";
import react,{useState,useEffect} from "react"
import { Login } from "./component/Login";
import { Register } from "./component/Register";
import { Navbar } from "./component/Navbar";
import { Home } from "./component/Home/index";
import { Favorite } from "./component/Favorite";
import { Basket } from "./component/Basket";
import { Dashboard } from "./component/Dashboard";
import { Product } from "./component/Product";
import { Update } from "./component/Update";
import { Route, Routes } from "react-router-dom";
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
const [isLog, setIslog] = useState(false)

useEffect(() => {
  if (localStorage.getItem("token")){
    setIslog(true)
  }
}, [])

  return (
    <div className="App">
      <Navbar setIslog={setIslog} isLog={isLog} />
      <Routes>
        <Route path={"/product/:id"} element={<Product />} />
        <Route path={"/update/:id"} element={<Update />} />
        <Route path={"/home"} element={<Home />} />
        <Route path={"/favorite"} element={<Favorite />} />
        <Route path={"/basket"} element={<Basket />} />
        <Route path={"/login"} element={<Login setIslog={setIslog} />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"*"} element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
