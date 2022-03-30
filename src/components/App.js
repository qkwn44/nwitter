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
        //전체 obj가 아닌 필요한 정보만 가져오기
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        }); //만약 authService가 바뀌면 user에 userObj넣기
      } else {
        setUserObj(null);
      }
      setInit(true);
      //만약 init이 false라면 router를 숨기게 됨
    });
  }, []);
  //props로 전달 , router로 전달

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <>
      {/* 만약 초기화 되면 router(login됨) or initalizing */}
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "initalizing..."
      )}
    </>
  );
}

/*
Profile.js의 updateProfile을 사용하면
firebase쪽에 있는 user를 새로고침 해주게 됨

만약 userObj를 바꿔주면 결과적으로 전부 다시 렌더링 됨.
userObj는 App.js에서 시작
-> userObj에만 변화를 주면 전부 리렌더링 할 필요가 없음
*/

export default App;
