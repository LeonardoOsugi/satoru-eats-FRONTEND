import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import { useState } from "react";
import ProductIdPage from "./pages/ProductIdPage/ProductIdPage";
import NameContext from "./context/NameContext";

export function App() {
  const[name, setName] = useState("");
  return (
    <NameContext.Provider value={{name, setName}}>
        <BrowserRouter>
          <Routes>
            <Route path="/homepage" element={<HomePage/>}/>
            <Route path="*" element={<Navigate to="/homepage"/>}/>
            <Route path="/product/:id" element={<ProductIdPage/>}/>
            <Route path="/your-orderpage"/>
          </Routes>
        </BrowserRouter>
    </NameContext.Provider>
  );
}

export default App;

