import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import logo from "./assets/logo.png";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <header className="sm:px-8">
        <Link to="/">
          <img src={logo} alt="logo" className="w-32 object-contain" />
        </Link>
      </header>
      <main className="sm:p-8">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
