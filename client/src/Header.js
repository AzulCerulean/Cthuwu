import React from "react";
import styled from "styled-components";
import { BsPersonFill } from "react-icons/bs";
import { ImMenu } from "react-icons/im";
import Cthuwu from "./assets/cthulhu-gcc92f20b0_640.png";

const Header = () => {
  return (
    <Wrapper>
      <Button>
        <Menu fontSize="large" />
      </Button>

      <CthuwuIcon src={Cthuwu} alt="Cthuwu logo" />

      <Button>
        <Profile fontSize="large" />
      </Button>
    </Wrapper>
  );
};

//styled components
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f9f9f9;
  align-items: center;
`;

const CthuwuIcon = styled.img`
  width: 4.5em;
  object-fit: contain;
  cursor: pointer;
`;

//https://css-tricks.com/how-to-recreate-the-ripple-effect-of-material-design-buttons/
const Button = styled.button`
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: black;
  background-color: white;
  outline: none;
  background-position: center;
  transition: background 0.3s;

  &:hover {
    background: lightgray radial-gradient(circle, transparent 1%, gray 1%)
      center/15000%;
  }
  &:active {
    background-color: lightgray;
    background-size: 100%;
    transition: background 0s;
  }
`;

const Menu = styled(ImMenu)`
  font-size: x-large;
  padding: 0.75em;
`;

const Profile = styled(BsPersonFill)`
  font-size: x-large;
  padding: 0.75em;
`;

export default Header;
