import React from 'react';
import './App.css';
import "router"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Matches from "./pages/Matches/Matches";
import Profile from "./pages/Profile/Profile";
import Chat from "./pages/Chat/Chat";

function App() {
  return (
    <BrowserRouter>
        <Header></Header>
        <Routes>
            <Route path="/" element={<Matches/>}/>
            <Route path="profile" element={<Profile/>}/>
            <Route path="matches" element={<Matches/>}/>
            <Route path="chat" element={<Chat/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
