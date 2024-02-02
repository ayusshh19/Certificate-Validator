import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const GenerateCertificate = () => {
  // Updated function name
  const [date, setDate] = useState(
    dayjs(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      )
    )
  );

  return (
    <div className="generate">
      <h3>Create Certificate</h3>
      <div className="container-fluid my-3">
        <Box component="form" noValidate autoComplete="off">
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <TextField
                className="mb-4"
                style={{ width: "100%" }}
                id="standard-basic"
                label="Certified to (Name)"
                variant="standard"
              />
            </div>
            <div className="col-md-6 col-lg-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Certificate Date"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="col-md-6 col-lg-4">
              <TextField
                className="mb-3"
                style={{ width: "100%" }}
                id="standard-basic"
                label="Standard"
                variant="standard"
              />
            </div>
            <div className="col-md-6 col-lg-4">
              <TextField
                className="mb-4"
                style={{ width: "100%" }}
                id="standard-basic"
                label="Standard"
                variant="standard"
              />
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default GenerateCertificate;
