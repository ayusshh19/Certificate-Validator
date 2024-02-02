import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { NavLink } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { SERVER_URL } from "../../../config";

const columns = [
  { field: "serialNumber", headerName: "Serial No.", width: 100 },
  { field: "date", headerName: "Date", width: 130, sortable: false },
  { field: "name", headerName: "Name", width: 200 },
  { field: "position", headerName: "Position", width: 100 },
  { field: "uid", headerName: "Certificate ID", width: 200, sortable: false },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    filterable: false,
    width: 120,
    renderCell: (params) => (
      <IconButton
        aria-label="delete"
        color="error"
        onClick={() => handleDelete(params.row.id)}
      >
        <DeleteIcon />
      </IconButton>
    ),
  },
];

const handleDelete = async (certificate_id) => {
  try {
    const { data } = await axios.delete(
      `${SERVER_URL}/api/certificate/delete/${certificate_id}`
    );
    console.log(data);
  } catch (err) {
    console.log(err);
    alert(err.response?.data.error || err.message || err);
  }
};

const generateRowsWithSerialNumber = (rows) => {
  return rows?.map((row, index) => ({
    ...row,
    serialNumber: index + 1,
    id: row._id,
  }));
};

const CertificatesList = () => {
  const { event_id } = useParams();
  const [certificates, setCertificates] = useState([]);
  const [event, setEvent] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    console.log("fetching certificates");
    (async () => {
      try {
        const { data } = await axios.get(
          `${SERVER_URL}/api/certificate/fetch/event/${event_id}`,
          {
            signal: controller.signal,
          }
        );
        setCertificates(data.certificates || []);
        setEvent(data.event || "");
      } catch (err) {
        if (err.name === "CanceledError") return;
        console.log(err);
        alert(err.response?.data.error || err.message || err);
      }
    })();
    return () => controller.abort();
  }, []);

  const rowsWithSerialNumber = generateRowsWithSerialNumber(certificates);

  return (
    <div>
      <div className="d-flex align-items-center">
        <NavLink to="/">
          <Button
            variant="outlined"
            style={{
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              minWidth: "40px",
              marginRight: "20px",
              padding: "0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ChevronLeftIcon />
          </Button>
        </NavLink>
        <h2>{event}</h2>
      </div>

      <div className="container-fluid mt-4">
        <div style={{ height: "80vh", width: "100%" }}>
          <DataGrid
            style={{
              borderRadius: "18px",
            }}
            rows={rowsWithSerialNumber}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 20]}
          />
        </div>
      </div>
    </div>
  );
};

export default CertificatesList;
