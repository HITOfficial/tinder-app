import React from "react";
import "./App.css";
import "router";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Matches from "./pages/Matches/Matches";
import Profile from "./pages/Profile/Profile";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Chat from "./pages/Chat/Chat";
import ChatBox from "./pages/Chat/components/ChatBox";
import ChatList from "./pages/Chat/components/ChatList";
import LoginT from "./pages/Login/login";
import Signup from "./pages/Signup/Signup";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header></Header>
    
        <Routes>
          <Route path="/" element={<Matches />} />
          <Route path="profile" element={<Profile />} />
          <Route path="matches" element={<Matches />} />
          <Route path="chat" element={<Chat />}>
            <Route path="list" element={<ChatList />} />
            <Route path="room:id" element={<ChatBox />} />
          
          </Route>
          <Route path="logint" element={<LoginT />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
