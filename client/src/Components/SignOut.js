import { useContext } from "react";
import styled from "styled-components";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

const SignOut = () => {
  const { setCurrentUser, setAuthenticated } = useContext();
  const navigate = useNavigate();

  const signoutHandler = async (e) => {
    await setCurrentUser("");
    await setAuthenticated(false);

    navigate("/");
  };

  return (
    <MainWrapper onClick={signoutHandler}>
      <FaSignOutAlt fontSize="x-large" />
      <p>Sign out</p>
    </MainWrapper>
  );
};

const MainWrapper = styled(Link)`
  color: white;
  display: flex;
  align-items: center;
  padding-right: 1em;
  padding-top: 1em;
  text-decoration: none;
  &:visited {
    color: white;
  }
`;

export default SignOut;
