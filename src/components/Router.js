import React from "react";
import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Auth from "../routes/Auth";
import Home from "../routes/Home";

//인증(로그인)여부에 따라 달라짐
const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <Route exact path="/" element={<Home />} />
        ) : (
          <Route exact path="/" element={<Auth />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
