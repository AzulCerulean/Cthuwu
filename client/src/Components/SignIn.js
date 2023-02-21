import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/userContext";

const SignIn = () => {
  const { setCurrentUser, setAuthenticated, authenticated } =
    useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };
  const passHandler = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //fetch user logging in
    await fetch("/api/login", {
      method: "PATCH",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data);
        if (data.status !== 200) {
          return setAuthenticated(false);
        }
        setAuthenticated(true);
      })
      .catch((err) => console.log(err));

    if (!authenticated) {
      return;
    } else {
      window.alert("Signed in!");
      return navigate("/main");
    }
  };
  return (
    <MainWrapper>
      <form onSubmit={handleSubmit}>
        <h1>Sign in~ !! ^.^</h1>
        <p>Username:</p>
        <input
          type="text"
          placeholder="Username"
          onChange={usernameHandler}
          required
        />
        <p>Password:</p>
        <input
          type="password"
          placeholder="Password"
          onChange={passHandler}
          required
        />
        <button>
          <p>Log In</p>
        </button>
      </form>
      <div>
        <p>Not a member?</p>
        <Link to="/signup">
          <p>Sign Up</p>
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

export default SignIn;
