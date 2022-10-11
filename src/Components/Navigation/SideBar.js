import "./SideBar.css";
import { getAuth, signOut } from "firebase/auth";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  FaStar,
  FaCog,
  FaChartPie,
  FaChartBar,
  FaDoorOpen,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import logo from "../../flamelogo.png";

function SideBar() {
  /**
   * Logs the user out
   */
  function Logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Signout successful");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <ProSidebar>
      <Link to="/" className="title-link">
        <img src={logo} alt="logo" width="158" height="85" className="logo" />
        <h2 className="navigation-title">Calorie Tracker</h2>
      </Link>
      <Menu iconShape="circle">
        <MenuItem icon={<FaChartPie />} className="menuItem">
          <Link to="/" className="link">
            Dashboard
          </Link>
        </MenuItem>
        <MenuItem icon={<FaChartBar />} className="menuItem">
          <Link to="/progress" className="link">
            Progress
          </Link>
        </MenuItem>
        <MenuItem icon={<FaStar />} className="menuItem">
          <Link to="/Goals" className="link">
            Goals
          </Link>
        </MenuItem>
        <MenuItem icon={<FaCog />} className="menuItem">
          <Link to="/account" className="link">
            Account
          </Link>
        </MenuItem>

        <MenuItem icon={<FaDoorOpen />} className="menuItem">
          <Button variant="none" className="logout-button" onClick={Logout}>
            <Link to="/login" className="link">
              Log out
            </Link>
          </Button>
        </MenuItem>
      </Menu>
    </ProSidebar>
  );
}

export default SideBar;
