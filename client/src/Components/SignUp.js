import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({});

  const navigate = useNavigate();

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passHandler = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //fetch user logging in
    await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(err));

    if (data.message !== "user created") {
      return;
    } else {
      navigate("/signin");
      window.alert(
        "User Created! Now you can sign in with your username and password"
      );
    }
  };

  return (
    <MainWrapper>
      <form>
        <h1>Sign Up~ !!</h1>
        <p>Username:</p>
        <input type="text" placeholder="Username" onChange={usernameHandler} />
        <p>Email:</p>
        <input
          type={email}
          placeholder="Email@domain.com"
          onChange={emailHandler}
        />
        <p>Password:</p>
        <input type="password" placeholder="Password" onChange={passHandler} />
        <button type="submit" onClick={handleSubmit}>
          <p>Log In</p>
        </button>
      </form>
      <div>
        <p>Already a member?</p>
        <Link to="/signin">
          <p>Sign In</p>
        </Link>
      </div>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
  margin: 1em;
  border: 1px solid lightskyblue;
  padding: 2em;
`;

export default SignUp;
