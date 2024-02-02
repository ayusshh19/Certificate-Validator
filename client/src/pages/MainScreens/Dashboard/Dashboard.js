import React, { useState, useContext } from "react";
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
import { StateContext } from "../../../context/StateContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const { events, generateYearOptions, refreshFlag } = useContext(StateContext);

  const [open, setOpen] = useState(false);
  const [register, setRegister] = useState({
    name: "",
    year: new Date().getFullYear(),
    nameError: false,
  });
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleYearChange = (event) => {
    setRegister({ ...register, year: event.target.value });
  };

  const handleEventNameChange = (event) => {
    setRegister({ ...register, name: event.target.value, nameError: false });
  };

  const handleMoreIconMouseEnter = (id) => {
    setSelectedEvent(id);
  };

  const handleMoreIconMouseLeave = () => {
    setSelectedEvent(null);
  };

  const handleMoreIconClick = (e, eventId) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedEvent(eventId);
  };

  const handleEditEvent = (e, eventId) => {
    e.preventDefault();
    e.stopPropagation();
    alert(`Edit Clicked for Event ID: ${eventId}`);
  };

  const handleClose = () => {
    setRegister({
      name: "",
      year: new Date().getFullYear(),
      nameError: false,
    });
    setOpen(false);
  };

  const handleDelete = async (e, eventId) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`/api/event/delete/${eventId}`);
        refreshFlag();
      } catch (err) {
        console.log(err);
        alert(err.response?.data.error || err.message || err);
      }
    }
  };

  const handleAddEvent = async () => {
    if (!register.name.trim()) {
      setRegister({ ...register, nameError: true });
      return;
    }
    try {
      const { data } = await axios.post("/api/event/register", register);
      refreshFlag();
      handleClose();
    } catch (err) {
      console.log(err);
      alert(err.response?.data.error || err.message || err);
    }
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
        {events?.map((year, index) => (
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
                <div className="row">
                  {year?.events?.map((event) => (
                    <div
                      key={event._id}
                      className="accordion-details-item col-6 col-md-3 col-lg-2"
                    >
                      <NavLink to={`/${event._id}`}>
                        <div
                          className="folder-cover"
                          onMouseLeave={handleMoreIconMouseLeave}
                        >
                          <MoreVertIcon
                            className="more-icon"
                            onClick={(e) => handleMoreIconClick(e, event._id)}
                            onMouseEnter={() =>
                              handleMoreIconMouseEnter(event._id)
                            }
                          />
                          {selectedEvent === event._id && (
                            <div
                              className="acc-menu"
                              onMouseLeave={handleMoreIconMouseLeave}
                              onClick={(e) => handleEditEvent(e, event._id)}
                            >
                              <button className="d-flex align-items-center justify-content-center">
                                Edit{" "}
                                <EditIcon
                                  style={{
                                    fontSize: "0.8rem",
                                    marginLeft: "4px",
                                  }}
                                />
                              </button>
                              <button
                                className="d-flex align-items-center justify-content-center"
                                onClick={(e) => handleDelete(e, event._id)}
                              >
                                Delete{" "}
                                <DeleteIcon
                                  style={{
                                    fontSize: "0.8rem",
                                    marginLeft: "4px",
                                  }}
                                />
                              </button>
                            </div>
                          )}

                          <FolderRoundedIcon className="folder-icon" />
                          <p className="accordion-details-item-title">
                            {event.name}
                          </p>
                        </div>
                      </NavLink>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
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
