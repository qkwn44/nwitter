import React from "react";
import { useState, useEffect } from "react";
import { dbService } from "../fbase";
import Nweet from "components/Nweet";

// export default () => <span>Home </span>;
const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  //async사용하기 위해 개별함수 사용

  //component가 mount 될때 getNweets 실행
  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      //   console.log("something happen");
      //   console.log(snapshot.docs);
      const nweetArray = snapshot.docs.map((doc) => ({
        //모든 doc은 object 반환
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();

    //submit 할때마다 document 생성하고    event.preventDefault();
    await dbService.collection("nweets").add({
      //document key
      text: nweet, //nweet는 state인 nweet의 valuedls rjtdmf rldjr
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    // setNweet 리셋시키기
    setNweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="What
        s on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
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
