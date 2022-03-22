import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { dbService } from "../fbase";

// export default () => <span>Home </span>;
const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  //async사용하기 위해 개별함수 사용
  const getNweets = async () => {
    //getNweets: dbService를 불러와 collection("nweets") 정보를 얻는다

    const dbnweets = await dbService.collection("nweets").get();
    dbnweets.forEach((document) => {
      // 값 대신 함수 전달, 함수 전달 시 이전값에 접근 가능
      const nweetObject = {
        ...document.data(),
        id: document.id,
      };
      setNweets((prev) => [nweetObject, ...prev]); //새로 작성한 트윗+이전트윗
    });
  };
  //component가 mount 될때 getNweets 실행
  //getNweets는 dbService를 불러와
  useEffect(() => {
    //getNweets 호출
    getNweets();
  }, []);
  const onSubmit = async (event) => {
    //submit 할때마다 document 생성하고    event.preventDefault();
    await dbService.collection("nweets").add({
      //document key
      nweet,
      createdAt: Date.now(),
    });
    // setNweet 리셋시키기
    setNweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
    // setNweet(event.target.value)
    //event안에 있는 target안에 있는 value get.
  };
  console.log(nweets);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What
        s on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      {nweets.map((nweet) => (
        <div key={nweet.id}>
          <h4>{nweet.nweet}</h4>
        </div>
      ))}
    </div>
  );
};
export default Home;
