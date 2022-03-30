import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

//인증(로그인)여부에 따라 달라짐
const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  //전달받은 props
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route
              path="/profile"
              element={<Profile userObj={userObj} refreshUser={refreshUser} />}
            />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
