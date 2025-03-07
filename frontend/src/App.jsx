import React from "react";
import { Routes, Route } from "react-router";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Canvas from "./components/Canvas";
import LoginToggle from "./components/LoginToggle";
import TicTac from './Games/TicTac/TicTac';
import Playzone from "./Games/Playzone/Playzone";
import PricingCards from './components/PricingCards';
import "./App.css";
import SnakeLadder from "./Games/Snake/SnakeLadder";

const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<LoginToggle />} />
        <Route path ="profile" element={<Profile/>}/>
        <Route path ="register" element={<Register/>}/>
        <Route path ="navbar" element={<Navbar/>}/>
        <Route path ="canvas" element={<Canvas/>}/>
        <Route path ="tictactoe" element={<TicTac />} />
        <Route path ="playzone" element={<Playzone />} />
        <Route path ="pricing" element={<PricingCards />} />
        <Route path ="snake" element={<SnakeLadder />} />
      </Routes>
    </>
  )
}

export default App

