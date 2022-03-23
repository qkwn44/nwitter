import React from "react";
import { dbService } from "fbase";
import { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
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
          <button onClick={toggleEditig}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text} </h4>
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
