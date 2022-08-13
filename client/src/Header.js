import React, { useState } from "react";
import styled from "styled-components";
import { BsPersonFill } from "react-icons/bs";
import { ImMenu } from "react-icons/im";
import Cthuwu from "./assets/cthulhu-gcc92f20b0_640.png";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { SidebarData } from "./assets/SidebarData";

const Header = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <Wrapper>

      <Button to="#">
        <Menu onClick={showSidebar} />
      </Button>

      <NavMenu className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <Link to="#" className="menu-close">
              <AiOutlineClose />
            </Link>
          </li>
          {
            //mapping over the SidebarData file,
            // no matter how many menu items, just need this lil' bit
            SidebarData.map((item, index) => {
              return (
                <li key={index}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })
          }
        </ul>
      </NavMenu>

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

`;

const Profile = styled(BsPersonFill)`
  font-size: x-large;
  padding: 0.75em;
`;

export default Header;
