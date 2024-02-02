import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { StateContext } from "../../../context/StateContext";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { set } from "mongoose";

const positionOptions = ["1st", "2nd", "3rd", "Participation"];

const GenerateCertificate = () => {
  const { events, generateYearOptions } = useContext(StateContext);
  const [register, setRegister] = useState({
    name: "",
    year: new Date().getFullYear(),
    position: "",
    event: "",
    nameError: false,
    positionError: false,
    eventError: false,
  });

  const [generatedDate, setGeneratedDate] = useState(null);

  const handleEventNameChange = (event) => {
    const name = event.target.value;
    setRegister({ ...register, name: name, nameError: !name.trim() });
  };

  const handleYearChange = (event) => {
    setRegister({ ...register, year: event.target.value });
  };

  const handlePositionChange = (event) => {
    const position = event.target.value;
    setRegister({
      ...register,
      position: position,
      positionError: !position.trim(),
    });
  };

  const [selectedEvent, setSelectedEvent] = useState("");
  const [date, setDate] = useState(
    dayjs(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      )
    )
  );

  const handleEventChange = (event) => {
    const selectedEventValue = event.target.value;
    setRegister({
      ...register,
      event: selectedEventValue,
      eventError: !selectedEventValue.trim(),
    });
    setSelectedEvent(selectedEventValue);
  };

  const handleSubmit = () => {
    const { name, position, event } = register;

    if (!name.trim()) {
      setRegister({ ...register, nameError: true });
      return;
    }

    if (!position.trim()) {
      alert("Position cannot be empty");
      setRegister({ ...register, positionError: true });
      return;
    }

    if (!event.trim()) {
      alert("Event cannot be empty");
      setRegister({ ...register, eventError: true });
      return;
    }

    const currentDate = new Date();
    setGeneratedDate(currentDate);

    console.log("Certificate Details:", {
      ...register,
      generatedDate: currentDate,
    });

    setRegister({
      name: "",
      year: new Date().getFullYear(),
      position: "",
      event: "",
      nameError: false,
      positionError: false,
      eventError: false,
    });
    alert("Certificate Generated Successfully! Check console for details.");
    // Add your logic for generating the certificate here
  };

  return (
    <div className="generate">
      <h3>Create Certificate</h3>
      <div className="container-fluid my-3">
        <Box component="form" noValidate autoComplete="off">
          <div className="row gy-4">
            <div className="col-md-6 col-lg-8 d-flex align-items-end">
              <TextField
                style={{ width: "100%" }}
                id="standard-basic"
                label="Certified to (Name)"
                variant="standard"
                value={register.name}
                onChange={handleEventNameChange}
                error={register.nameError}
                helperText={register.nameError ? "Name cannot be empty" : ""}
              />
            </div>
            <div className="col-md-6 col-lg-4 d-flex align-items-end">
              <FormControl
                variant="standard"
                sx={{ minWidth: 120, width: "100%" }}
                className="mt-3"
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Year
                </InputLabel>
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
            </div>

            <div className="col-md-6 col-lg-4 d-flex align-items-end">
              <FormControl
                variant="standard"
                sx={{ minWidth: 120, width: "100%" }}
                className="mt-3"
              >
                <InputLabel id="event-label">Event</InputLabel>
                <Select
                  labelId="event-label"
                  id="event-select"
                  value={selectedEvent}
                  onChange={handleEventChange}
                  label="Event"
                  error={register.eventError}
                  helperText={
                    register.eventError ? "Event cannot be empty" : ""
                  }
                >
                  {events
                    ?.filter((year) => year.year === register.year)
                    .map((year) => {
                      return year.events.map((event) => (
                        <MenuItem key={event._id} value={event.name}>
                          {event.name}
                        </MenuItem>
                      ));
                    })}
                </Select>
              </FormControl>
            </div>
            <div className="col-md-6 col-lg-4 d-flex align-items-end">
              <FormControl
                variant="standard"
                sx={{ minWidth: 120, width: "100%" }}
                className="mt-3"
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Position
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={register.position}
                  onChange={handlePositionChange}
                  label="Position"
                  error={register.positionError}
                  helperText={
                    register.positionError ? "Position cannot be empty" : ""
                  }
                >
                  {positionOptions.map((pos) => (
                    <MenuItem key={pos} value={pos}>
                      {pos}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="col-md-6 col-lg-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    variant="standard"
                    className="w-100 custom-date-picker"
                    label="Certificate Date"
                    format="DD/MM/YYYY"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </div>
        </Box>
      </div>
      <div className="mt-5 w-100 d-flex align-items-center justify-content-center">
        <Button
          variant="contained"
          style={{ borderRadius: "12px", padding: "10px 50px" }}
          onClick={handleSubmit}
        >
          Generate Certificate
        </Button>
      </div>
    </div>
  );
};

export default GenerateCertificate;
