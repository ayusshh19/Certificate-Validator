import React from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { NavLink } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = [
  { field: "serialNumber", headerName: "Serial No.", width: 100 },
  { field: "date", headerName: "Date", width: 130, sortable: false },
  { field: "name", headerName: "Name", width: 250 },
  { field: "position", headerName: "Position", width: 100, type: "number" },
  { field: "id", headerName: "Certificate ID", width: 200, sortable: false },
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

const handleDelete = (certificateId) => {
  alert(`Deleting certificate with ID: ${certificateId}`);
};

const generateRowsWithSerialNumber = (rows) => {
  return rows?.map((row, index) => ({
    ...row,
    serialNumber: index + 1,
  }));
};

const rows = [
  {
    id: "213AWGDB13Z",
    name: "John Mathew",
    position: "1",
    date: "20/01/2024",
  },
  {
    id: "213AWG13AAZ",
    name: "Karandeep",
    position: "3",
    date: "20/01/2024",
  },
  {
    id: "213AWGDB1ZSS",
    name: "Sudharma",
    position: "2",
    date: "20/01/2024",
  },
  {
    id: "213AWGDBSS1Z",
    name: "Jane Doe",
    position: "4",
    date: "20/01/2024",
  },
  {
    id: "213AWGDB1ZO",
    name: "Michael Smith",
    position: "5",
    date: "20/01/2024",
  },
  {
    id: "987XYZ456",
    name: "Alice Johnson",
    position: "6",
    date: "22/01/2024",
  },
  {
    id: "456ABC789",
    name: "Bob Williams",
    position: "7",
    date: "25/01/2024",
  },
  {
    id: "123DEF987",
    name: "Eva Davis",
    position: "8",
    date: "30/01/2024",
  },
  {
    id: "XYZ789ABC",
    name: "Tom Wilson",
    position: "9",
    date: "01/02/2024",
  },
  {
    id: "789GHI123",
    name: "Olivia Brown",
    position: "10",
    date: "05/02/2024",
  },
  // Additional 10 rows
  {
    id: "456JKL321",
    name: "Chris Taylor",
    position: "11",
    date: "10/02/2024",
  },
  {
    id: "321MNO654",
    name: "Sophia Garcia",
    position: "12",
    date: "15/02/2024",
  },
  {
    id: "654PQR987",
    name: "Daniel Robinson",
    position: "13",
    date: "20/02/2024",
  },
  {
    id: "987STU321",
    name: "Emily White",
    position: "14",
    date: "25/02/2024",
  },
  {
    id: "321UVW654",
    name: "Isaac Hall",
    position: "15",
    date: "01/03/2024",
  },
  {
    id: "654XYZ987",
    name: "Grace Lewis",
    position: "16",
    date: "05/03/2024",
  },
  {
    id: "987ABC321",
    name: "Ryan Turner",
    position: "17",
    date: "10/03/2024",
  },
  {
    id: "321DEF654",
    name: "Mia Anderson",
    position: "18",
    date: "15/03/2024",
  },
  {
    id: "654GHI987",
    name: "Jake Miller",
    position: "19",
    date: "20/03/2024",
  },
  {
    id: "987JKL321",
    name: "Zoe Martinez",
    position: "20",
    date: "25/03/2024",
  },
];

const CertificatesList = () => {
  const { id } = useParams();
  const rowsWithSerialNumber = generateRowsWithSerialNumber(rows);

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
        <h2>{id} Code-A-Thon</h2>
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
