import React from "react";
import { useState } from "react";

const Auth = () => {
  const [eamil, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="E-mail"
          required
          value={eamil}
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
        <input type="submit" value="Log in" />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};
export default Auth;
