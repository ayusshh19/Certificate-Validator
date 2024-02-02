import React from "react";
import { NavLink } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./SideNavigation.css";
import FolderIcon from "@mui/icons-material/Folder";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

const SideNavigation = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <h4 className="px-4 my-3">CSI DMCE</h4>
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
          to="/"
        />

        <Tab
          icon={<NoteAddIcon />}
          iconPosition="start"
          label="Generate Certificate"
          component={NavLink}
          to="/generate-certificate"
        />
      </Tabs>
    </div>
  );
};

export default SideNavigation;
