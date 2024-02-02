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
import { SERVER_URL } from "../../../config";

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

  const [open, setOpen] = useState(false);
  const [register, setRegister] = useState({
    name: "",
    year: new Date().getFullYear(),
    nameError: false,
  });

  useEffect(() => {
    const controller = new AbortController();
    console.log("fetching events");
    (async () => {
      try {
        const { data } = await axios.get(`${SERVER_URL}/api/event/fetch`, {
          signal: controller.signal,
        });
        setEvents(data);
      } catch (err) {
        if (err.name === "CanceledError") return;
        console.log(err);
        alert(err.response?.data.error || err.message || err);
      }
    })();
    return () => controller.abort();
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
    setRegister({ ...register, year: event.target.value });
  };

  const handleEventNameChange = (event) => {
    setRegister({ ...register, name: event.target.value, nameError: false });
  };

  const handleMoreIconClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alert("MoreIcon Clicked!");
  };

  const handleAddEvent = async () => {
    if (!register.name.trim()) {
      setRegister({ ...register, nameError: true });
      return;
    }
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/api/event/register`,
        register
      );
      console.log(data);
      handleClose();
    } catch (err) {
      console.log(err);
      alert(err.response?.data.error || err.message || err);
    }
  };

  const handleClose = () => {
    setRegister({
      name: "",
      year: new Date().getFullYear(),
      nameError: false,
    });
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
            setRegister({
              ...register,
              name: "",
            });
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
                    {year?.events?.map((event) => {
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
              value={register.name}
              onChange={handleEventNameChange}
              error={register.nameError}
              helperText={register.nameError ? "Event Name is required" : ""}
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
              value={register.year}
              onChange={handleYearChange}
              label="Year"
            >
              {generateYearOptions()?.map((year) => (
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
