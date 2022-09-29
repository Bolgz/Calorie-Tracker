import "./SideBar.css";
import { getAuth, signOut } from "firebase/auth";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FaGem } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

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
      <Menu iconShape="square">
        <h2 className="navigation-title">Calorie Tracker</h2>
        <MenuItem icon={<FaGem />}>
          <Link to="/" className="link">
            Dashboard
          </Link>
        </MenuItem>
        <MenuItem icon={<FaGem />}>
          <Link to="/progress" className="link">
            Progress
          </Link>
        </MenuItem>
        <MenuItem icon={<FaGem />}>
          <Link to="/Goals" className="link">
            Goals
          </Link>
        </MenuItem>
        <MenuItem icon={<FaGem />}>
          <Link to="/account" className="link">
            Account
          </Link>
        </MenuItem>
        <MenuItem icon={<FaGem />}>
          <Button variant="none" className="logout-button" onClick={Logout}>
            Log out
          </Button>
        </MenuItem>
      </Menu>
    </ProSidebar>
  );
}

export default SideBar;
