import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { dbService } from "../fbase";

const Home2 = () => {
  const [nweet, setNweet] = useState("");

  const onSubmit = (event) => {
    dbService.collection("nweets").add({
      text: nweet,
      createdAt: Date.now(),
    });
    setNweet("");
    //submit , db에 필드 생성 및 인풋값의 vlaue 추가
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

export default Home2;
