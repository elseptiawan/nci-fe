import {Routes, Route} from "react-router-dom";

import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
// import Dashboard from "./pages/admin/Dashboard";
import Product from "./pages/admin/Product";
import Warehouse from "./pages/admin/Warehouse";
import Transaction from "./pages/admin/Transaction";
import Stock from "./pages/admin/Stock";
import RequireAuth from './utils/RequireAuth';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/product" element={
          <RequireAuth>
            <Product/>
          </RequireAuth>
          }
        />
        <Route path="/warehouse" element={
          <RequireAuth>
            <Warehouse/>
          </RequireAuth>
          }
        />
        <Route path="/transaction" element={
          <RequireAuth>
            <Transaction/>
          </RequireAuth>
          }
        />
        <Route path="/stock" element={
          <RequireAuth>
            <Stock/>
          </RequireAuth>
          }
        />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
    </Routes>
  );
}

export default App;
