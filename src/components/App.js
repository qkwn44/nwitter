import React, { useState } from "react";
import { Router } from "react-router-dom";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  //유저의 로그인 여부 파악
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUse);
  //props로 전달 , router로 전달
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Nwitter </footer>
    </>
  );
}

export default App;
