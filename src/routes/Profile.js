import React, { useEffect } from "react";
import { authService } from "fbase";
import { useNavigate } from "react-router-dom";
import { dbService } from "../fbase";
import { useState } from "react";

/*
useObj prop로 넘겨받음
*/
const Profile = ({ refreshUser, userObj }) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
    // history.push("/")
  };
  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
    console.log(nweets.docs.map((doc) => doc.data()));
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  useEffect(() => {
    getMyNweets();
  }, [userObj]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={newDisplayName}
          type="text"
          placeholder="display name"
        />
        <input type="submit" value="update profile" />
      </form>

      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};
export default Profile;
