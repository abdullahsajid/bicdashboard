import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { lazy } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Model = lazy(() => import('../views/ui/Model.js'))

const navigation = [
  {
    title: "Dashboard",
    href: "/bi/starter",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Users",
    href: "#",
    icon: "bi bi-people",
  },
];

const Sidebar = () => {
  const navigation = useNavigate()
  const user = JSON.parse(localStorage.getItem('bicuserData'))
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  // let location = useLocation();
  const navigateToEvaluation  = () =>{
    navigation('/bi/agentform')
    window.location.reload();
  }
  const navigateToEscalation  = () =>{
    navigation('/bi/escalationform')
    window.location.reload();
  }
  const navigateToPPC = () => {
    navigation('/bi/ppcform');
    window.location.reload();
  }
  return (
    <div className="p-3 position-fixed" style={{width:'260px'}}>
      <div className="d-flex align-items-center" style={{cursor:'pointer'}}>
        <Logo />
        <span className="ms-auto d-lg-none">
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav gap-3">
            {/* <div class="d-grid gap-2 d-md-flex justify-content-md-end"> */}
                <NavItem className="btn btn-outline-success" onClick={() => navigateToEvaluation()}> Evaluation</NavItem>
                <NavItem className="btn btn-outline-danger" onClick={() => navigateToEscalation()}> Escalation</NavItem>
                <NavItem className="btn btn-outline-danger" onClick={() => navigateToPPC()}> PPC</NavItem>
                {user?.role === 'admin' && <Model/>}
            {/* </div> */}
          {/* {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))} */}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
