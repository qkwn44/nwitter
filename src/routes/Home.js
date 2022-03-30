/*
1. 만약 attachmentUrl을 firebase의 method인
  refFromURL에 넘긴다면 해당 오브젝트에 대한 reference에 접근 할 수 있다.
*/

import React from "react";
import { useState, useEffect } from "react";
import { dbService, storageService } from "../fbase";
import Nweet from "components/Nweet";
import { useRef } from "react";
import NweetFactroy from "../components/NweetFactory";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);
  //async사용하기 위해 개별함수 사용

  //component가 mount 될때 getNweets 실행
  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        //모든 doc은 object 반환
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
      console.log(userObj);
    });
  }, []);

  return (
    <div>
      <NweetFactroy userObj={userObj} />
      {nweets.map((nweet) => (
        <Nweet
          key={nweet.id}
          nweetObj={nweet} //전체의 obj props로 nweet를 넘겨줌
          isOwner={nweet.creatorId === userObj.uid}
        />
      ))}
    </div>
  );
};
export default Home;
