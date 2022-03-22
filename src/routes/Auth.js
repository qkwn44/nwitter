import React from "react";
import { useState } from "react";
import { authService, firebaseInstance } from "../fbase";
import {
  createUserWithEmailAndPassword,
  signInWithPopUp,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    // console.log(event.target.name);
    //input 값이 변경될 때 마다 onChange함수 호출
    //input의 value는 state에 저장
    //input이 바뀌는 매 순간마다 state도 변경된다
    const {
      target: { name, value },
    } = event;
    //target 안에는 name, value가 들어있음
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        //create account
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        //log in
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  //   newAccout의 이전 값 가져와서 그 값에 반대되는 것 리턴

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    // console.log(event.target.name);
    const {
      target: { name },
    } = event;

    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="E-mail"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={onChange}
        />
        {error}
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
      </form>
      {/* 만약 새로운 계정이 아니라면 */}
      <span onClick={toggleAccount}>
        {newAccount ? "Sign in" : "Create Account"}
      </span>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};
export default Auth;
