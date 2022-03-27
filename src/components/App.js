import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  //유저의 로그인 여부 파악
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    //사용자의 로그인 상태의 변화를 관찰하는 관찰자 추가, 이벤트리스너를 가지고 유저 상태에 변화가 있을 때 그 변화 감지
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user); //만약 authService가 바뀌면 user에 userObj넣기
      } else {
      }
      setInit(true);
      //만약 init이 false라면 router를 숨기게 됨
    });
  }, []);
  //props로 전달 , router로 전달
  return (
    <>
      {/* 만약 초기화 되면 router(login됨) or initalizing */}
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "initalizing..."
      )}
    </>
  );
}

export default App;
