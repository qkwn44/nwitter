import React from "react";
import { dbService } from "fbase";

const Nweet = ({ nweetObj, isOwner }) => {
  return (
    <div>
      <h4>{nweetObj.text} </h4>
      {isOwner && ( //내가 글 쓴 주인공 일 때만 버튼 노출
        <>
          <button>Delete Nweet</button>
          <button>Edit Nweet</button>
        </>
      )}
    </div>
  );
};
export default Nweet;
