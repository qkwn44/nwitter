import React, { useState } from "react";
import { Router } from "react-router-dom";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { useEffect } from "react";

function App() {
  //유저의 로그인 여부 파악
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(authService.currentUser);
  useEffect(() => {
    //사용자의 로그인 상태의 변화를 관찰하는 관찰자 추가, 이벤트리스너를 가지고 유저 상태에 변화가 있을 때 그 변화 감지
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
      //만약 init이 false라면 router를 숨기게 됨
    });
  }, []);
  //props로 전달 , router로 전달
  return (
    <>
      {/* 만약 초기화 되면 router(login됨) or initalizing */}
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "initalizing..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter </footer>
    </>
  );
}

export default App;
