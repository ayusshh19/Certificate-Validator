import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { NavLink } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

import "./Dashboard.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  maxWidth: "500px",
};

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [eventName, setEventName] = React.useState("");
  const [selectedYear, setSelectedYear] = React.useState(
    new Date().getFullYear()
  );
  const [eventNameError, setEventNameError] = React.useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/event/fetch");
        setEvents(data);
      } catch (err) {
        console.log(err);
        alert(err.response.data.error || err.message || err);
      }
    })();
  }, []);

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 10; i <= currentYear + 2; i++) {
      years.push(i);
    }
    return years;
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleEventNameChange = (event) => {
    setEventName(event.target.value);
    setEventNameError(false);
  };

  const handleMoreIconClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alert("MoreIcon Clicked!");
  };

  const handleAddEvent = () => {
    if (!eventName.trim()) {
      setEventNameError(true);
      return;
    }

    console.log("Selected Year:", selectedYear);
    console.log("Event Name:", eventName);

    handleClose();
  };

  const handleClose = () => {
    setEventName("");
    setEventNameError(false);
    setSelectedYear(new Date().getFullYear());
    setOpen(false);
  };

  return (
    <div className="dashboard">
      <div className="d-flex align-items-center justify-content-between">
        <h2>Dashboard</h2>
        <Button
          disableElevation
          variant="contained"
          startIcon={<AddIcon />}
          style={{ borderRadius: "10px", textTransform: "capitalize" }}
          onClick={() => {
            setEventName(""); // Reset event name when opening the modal
            setOpen(true);
          }}
        >
          Add Event
        </Button>
      </div>
      <div className="mt-3">
        {events?.map((year, index) => {
          return (
            <Accordion
              key={index}
              defaultExpanded={index === 0}
              style={{
                boxShadow: "none",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index + 1}-content`}
                id={`panel${index + 1}-header`}
              >
                <p className="title">{year.year}</p>
              </AccordionSummary>
              <Divider
                variant="middle"
                style={{
                  backgroundColor: "#000000",
                  opacity: "0.1",
                  marginBottom: "6px",
                }}
              />

              <AccordionDetails>
                <div className="accordion-details">
                  <div className="row ">
                    {year.events.map((event) => {
                      return (
                        <div
                          key={event._id}
                          className="accordion-details-item col-6 col-md-3 col-lg-2"
                        >
                          <NavLink to={`/${event._id}`}>
                            <div className="folder-cover">
                              <MoreVertIcon
                                className="more-icon"
                                onClick={handleMoreIconClick}
                              />
                              <FolderRoundedIcon className="folder-icon" />
                              <p className="accordion-details-item-title">
                                {event.name}
                              </p>
                              {/* <p className="accordion-details-item-date">
                                {event.date}
                              </p> */}
                            </div>
                          </NavLink>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="event-modal">
          <h4>Add Event</h4>
          <FormControl sx={{ minWidth: 120, width: "100%" }} className="mt-3">
            <TextField
              autoComplete="off"
              id="event-name"
              label="Event Name"
              variant="standard"
              sx={{ width: "100%" }}
              value={eventName}
              onChange={handleEventNameChange}
              error={eventNameError}
              helperText={eventNameError ? "Event Name is required" : ""}
            />
          </FormControl>
          <FormControl
            variant="standard"
            sx={{ minWidth: 120, width: "100%" }}
            className="mt-3"
          >
            <InputLabel id="demo-simple-select-standard-label">Year</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedYear}
              onChange={handleYearChange}
              label="Year"
            >
              {generateYearOptions().map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            className="mt-4"
            disableElevation
            variant="contained"
            style={{ borderRadius: "10px", textTransform: "capitalize" }}
            onClick={handleAddEvent}
          >
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Dashboard;
