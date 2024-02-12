import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./MobileNavigation.css";
import FolderIcon from "@mui/icons-material/Folder";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { StateContext } from "../../context/StateContext";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { Logout } from "../../utils/Index";

const SideNavigation = () => {
  const [value, setValue] = React.useState(0);
  const { mobileNav, toggleMobileNav } = useContext(StateContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={`mobileNav ${mobileNav === true ? "active" : ""}`}>
      <div
        className="d-flex w-100 align-items-center justify-content-between px-3 mb-3"
        style={{
          backgroundColor: "#1876D1",
          color: "#fff",
        }}
      >
        <h4 className="my-3">CSI DMCE</h4>
        <IconButton
          aria-label="delete"
          size="large"
          className="close"
          onClick={() => toggleMobileNav(false)}
        >
          <CloseIcon style={{ color: "#fff" }} />
        </IconButton>
      </div>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        className="navs"
      >
        <Tab
          icon={<FolderIcon />}
          iconPosition="start"
          label="Dashboard"
          component={NavLink}
          to="/dashboard"
          onClick={() => toggleMobileNav(false)}
        />

        <Tab
          icon={<NoteAddIcon />}
          iconPosition="start"
          label="Generate Certificate"
          component={NavLink}
          to="/generate-certificate"
          onClick={() => toggleMobileNav(false)}
        />
      </Tabs>

      <div
        className="logout"
        style={{ position: "fixed", bottom: 0, width: "100%" }}
      >
        <button onClick={Logout}>Logout</button>
      </div>
    </div>
  );
};

export default SideNavigation;
