import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { StateContext } from "../../../context/StateContext";

const positionOptions = ["1st", "2nd", "3rd", "Participation"];

const initialState = {
  name: "",
  year: new Date().getFullYear(),
  position: "",
  event: "",
  nameError: false,
  positionError: false,
  eventError: false,
};

const GenerateCertificate = () => {
  const { events, generateYearOptions } = useContext(StateContext);
  const [register, setRegister] = useState(initialState);
  const [generatedDate, setGeneratedDate] = useState(null);
  const [date, setDate] = useState(
    dayjs(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      )
    )
  );

  const handleInputChange = (field, value) => {
    if (typeof value === "string") {
      setRegister({
        ...register,
        [field]: value,
        [`${field}Error`]: !value.trim(),
      });
    } else {
      // Handle the case when the value is not a string (e.g., handle other data types)
      setRegister({
        ...register,
        [field]: value,
        [`${field}Error`]: true, // You might want to handle this differently based on your requirements
      });
    }
  };

  const handleYearChange = (event) => {
    handleInputChange("year", event.target.value);
  };

  const handleEventChange = (event) => {
    const selectedEventValue = event.target.value;
    handleInputChange("event", selectedEventValue);
  };

  const handlePositionChange = (event) => {
    handleInputChange("position", event.target.value);
  };

  const handleEventNameChange = (event) => {
    handleInputChange("name", event.target.value);
  };

  const handleDatePickerChange = (newValue) => {
    setDate(newValue);
  };

  const handleSubmit = () => {
    const { name, position, event } = register;

    if (!name.trim() || !position.trim() || !event.trim()) {
      alert("All fields are required");
      setRegister({
        ...register,
        nameError: !name.trim(),
        positionError: !position.trim(),
        eventError: !event.trim(),
      });
      return;
    }

    const currentDate = new Date();
    setGeneratedDate(currentDate);

    console.log("Certificate Details:", {
      ...register,
      generatedDate: currentDate,
    });

    setRegister(initialState);
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
                  Event Year
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
                  value={register.event}
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
                    sx={{
                      ".css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                    }}
                    variant="standard"
                    className="w-100 custom-date-picker"
                    label="Certificate Date"
                    format="DD/MM/YYYY"
                    value={date}
                    onChange={handleDatePickerChange}
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
