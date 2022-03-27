import React from "react";
import { useState, useEffect } from "react";
import { dbService, storageService } from "../fbase";
import Nweet from "components/Nweet";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

// export default () => <span>Home </span>;
const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState(""); // form을 위한 state
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState();
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
    let attachmentUrl = ""; //lexical scope 방지를 위해 if문 밖에 변수 선언 후 마지막에 대입
    if (attachment != "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`); // image path
      const response = await attachmentRef.putString(attachment, "data_url"); //data, data의 형식(attachment의 string = 이미지 전체) 필요
      attachmentUrl = await response.ref.getDownloadURL();
      //비어있는 string(attachmentUrl)은 storage에서 다운로드 받은 url로 업데이트
    }
    const nwwetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("nweets").add(nwwetObj);
    //nweet는 attachmentUrl을 가짐
    setNweet("");
    setAttachment("");
    // 사진 업로드 -> 사진 있다면 사진의 url받아 nweet에 추가
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  const onFileChange = (event) => {
    //event안에서 target안으로 가서 파일을 받아오는 것을 의미
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => {
    setAttachment(null);
    fileInput.current.value = null;
  };
  const fileInput = useRef();
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
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInput}
        />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" heigth="50px" />
            <button type="button" onClick={onClearAttachment}>
              Clear
            </button>
          </div>
        )}
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
