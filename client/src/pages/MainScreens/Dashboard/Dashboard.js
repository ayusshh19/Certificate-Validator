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
import axios from "axios";

import "./Dashboard.css";

const Dashboard = () => {
  const [events, setEvents] = useState([]);

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

  const handleMoreIconClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alert("MoreIcon Clicked!");
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
    </div>
  );
};

export default Dashboard;
