import {Routes, Route} from "react-router-dom";

import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import Dashboard from "./pages/admin/Dashboard";
import Product from "./pages/admin/Product";
import Warehouse from "./pages/admin/Warehouse";
import Transaction from "./pages/admin/Transaction";

function App() {
  return (
    <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/product" element={<Product/>}/>
        <Route path="/warehouse" element={<Warehouse/>}/>
        <Route path="/transaction" element={<Transaction/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
    </Routes>
  );
}

export default App;
