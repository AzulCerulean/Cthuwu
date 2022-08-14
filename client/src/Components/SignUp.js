import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";

const SignUp = () => {
  return (
    <MainWrapper>
      <form>
        <h1>Sign Up~ !!</h1>
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

const MainWrapper = styled.div``;

export default SignUp;
