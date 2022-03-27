import React from "react";
import { dbService } from "fbase";
import { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false); //수정 유무
  const [newNweet, setNewNweet] = useState(nweetObj.text); //input에 입력된 text 업데이트
  const onDeleteClick = async () => {
    const ok = window.confirm("R you sure want to delete this nweet?");
    if (ok) {
      //delete nweet
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
    }
  };
  const toggleEditig = () => setEditing((prev) => !prev);
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(nweetObj, "newNweet", newNweet);
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    }); //update한 후에 편집 모드 false로 설정
    setEditing(false);
  };
  // asycn await 사용하는 이유
  //삭제함수가 비동기 함수이기 때문에 동기적으로 실행시켜 빠른 처리를 하기 위함
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewNweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Edit your Nweet"
                  value={newNweet}
                  required
                  onChange={onChange}
                />
                <input type="submit" value="Update Nweet" />
              </form>
              <button onClick={toggleEditig}>Cancel</button>{" "}
            </>
          )}
        </>
      ) : (
        <>
          <h4>{nweetObj.text} </h4>
          {/* attchmentUrl이 없는 경우도 있음 */}
          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} width="150px" heigth="50px" />
          )}
          {isOwner && ( //내가 글 쓴 주인공 일 때만 버튼 노출
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditig}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Nweet;
