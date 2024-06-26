import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import Cookies from "universal-cookie";
import { logoutApi } from "../features/userApis";
import { ReactComponent as LogoWhite } from "../assets/images/logos/bi2.svg";
import user2 from "../assets/images/users/avatar.jpg";
const cookie = new Cookies();
const Header = () => {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem('bicuserData'))
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const handlerLogout = async () => {
    const res = await logoutApi();
    if (res.data.success === true) {
      localStorage.removeItem("bicuserData");
      cookie.remove("bictoken");
      nav("/");
      window.location.reload();
    }
  };

  // const handlernav = () => {
  //     nav('/bi/profile')
  //     window.location.reload();
  // }  
  
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  return (
    <Navbar color="light" font="dark" expand="md" >
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          <LogoWhite />
        </NavbarBrand>
        <Button
          color="primary"
          className=" d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen} style={{backgroundColor:'#1B1B29 !important'}}>
        <Nav className="me-auto" navbar>
          {/* <NavItem>
            <div className="nav-link" onClick={handlernav}>
              Starter
            </div>
          </NavItem>
          <NavItem>
            <div className="nav-link" onClick={handlernav}>
              About
            </div>
          </NavItem> */}
          {/* <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
              Quality Assurance
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            <img
              src={user2}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Role: {user?.role}</DropdownItem>
            <DropdownItem>{user?.email}</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={handlerLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
