import React, { useState } from "react";
import styled from "styled-components";
import { BsPersonFill } from "react-icons/bs";
import { ImMenu } from "react-icons/im";
import Cthuwu from "../assets/cthulhu-gcc92f20b0_640.png";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { SidebarData } from "../assets/SidebarData";

const Header = () => {
  const [sidebar, setSidebar] = useState(false);

  //toggle for the sidebar
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <Wrapper>
      <Button to="#">
        <Menu onClick={showSidebar} />
      </Button>

      {sidebar && (
        <NavMenu>
          <ul onClick={showSidebar}>
            <Li>
              <LiLink to="#">
                <AiOutlineClose fontSize="x-large" />
              </LiLink>
            </Li>
            {
              //mapping over the SidebarData file,
              // no matter how many menu items, just need this lil' bit
              SidebarData.map((item, index) => {
                return (
                  <Li key={index}>
                    <LiLink to={item.path}>
                      {item.icon}
                      <p>{item.title}</p>
                    </LiLink>
                  </Li>
                );
              })
            }
          </ul>
        </NavMenu>
      )}

      <Link to="/main">
        <CthuwuIcon src={Cthuwu} alt="Cthuwu logo" />
      </Link>

      <Button to="#">
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
const Button = styled(Link)`
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

const NavMenu = styled.nav`
  display: flex;
  justify-content: flex-end;
  border: 1px lightgray;
  z-index: 1000;
  height: 100vh;
  width: 50vw;
  background-color: salmon;
  color: white;
  top: 0;
  /* left: -100%; */
  position: fixed;
  transition: 850ms;

  &:active {
    /* transform: translate(100%); */
    transition: 300ms;
  }
`;

const Li = styled.li`
  display: flex;
`;

const LiLink = styled(Link)`
  display: flex;
  padding-right: 1em;
  padding-top: 1em;
  text-decoration: none;
  align-items: center;
  &:visited {
    color: white;
  }
`;

const Profile = styled(BsPersonFill)`
  font-size: x-large;
  padding: 0.75em;
`;

export default Header;
