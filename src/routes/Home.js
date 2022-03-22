import React from "react";
import { useState } from "react";
import { dbService } from "../fbase";

// export default () => <span>Home </span>;
const Home = () => {
  const [nweet, setNweet] = useState("");
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
    </div>
  );
};
export default Home;
