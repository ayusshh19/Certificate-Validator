import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { NavLink } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import QRCode from "react-qr-code";
import {
  DeleteCertificate,
  fetchCertificates,
} from "../../../utils/Certificate";
import dayjs from "dayjs";
import { toPng } from "html-to-image";
import EditIcon from "@mui/icons-material/Edit";
import { StateContext } from "../../../context/StateContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  maxWidth: "800px",
  minWidth: "300px",
};

const columns = [
  { field: "serialNumber", headerName: "Serial No.", width: 100 },
  {
    field: "uid",
    headerName: "Certificate Number",
    width: 150,
    sortable: false,
  },
  { field: "name", headerName: "Name", width: 200 },
  { field: "position", headerName: "Position", width: 150 },
  {
    field: "date",
    headerName: "Date",
    width: 130,
    sortable: false,
    valueFormatter: (params) => {
      return dayjs(params.value).format("DD-MM-YYYY");
    },
  },
  {
    field: "qrCode",
    headerName: "QR Code",
    sortable: false,
    filterable: false,
    width: 120,
    renderCell: (params) => (
      <IconButton aria-label="qr-code" color="default">
        <QrCode2Icon />
      </IconButton>
    ),
  },
  {
    field: "edit",
    headerName: "Edit",
    sortable: false,
    filterable: false,
    width: 60,
    renderCell: (params) => (
      <IconButton aria-label="edit" color="primary" className="ms-2">
        <EditIcon />
      </IconButton>
    ),
  },
  {
    field: "delete",
    headerName: "Delete",
    sortable: false,
    filterable: false,
    width: 60,
    renderCell: (params) => (
      <IconButton aria-label="delete" color="error">
        <DeleteIcon />
      </IconButton>
    ),
  },
];

const generateRowsWithSerialNumber = (rows, positionOption) => {
  return rows?.map((row, index) => ({
    ...row,
    serialNumber: index + 1,
    id: row._id,
    position: positionOption[row.position].name,
  }));
};

const htmlToImageConvert = (qr_code, certificate) => {
  toPng(qr_code.current, {
    cacheBust: false,
    width: 200, // Adjust the width to match QR code size
    height: 200, // Adjust the height to match QR code size
    style: {
      transform: "none", // Reset any transform styles
    },
  })
    .then((dataUrl) => {
      const link = document.createElement("a");
      link.download = certificate?.name + "-" + certificate?.uid + ".png";
      link.href = dataUrl;
      link.click();
    })
    .catch((err) => {
      alert(err.message || "Something went wrong");
    });
};

const CertificatesList = () => {
  const { event_id } = useParams();

  const { toggleLoading, positionOption, removeToken } =
    useContext(StateContext);

  const [certificates, setCertificates] = useState([]);
  const [event, setEvent] = useState("");
  const [fetchFlag, setFetchFlag] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [certificate, setCertificate] = useState(null);

  const qr_code = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchCertificates(
      event_id,
      controller,
      setCertificates,
      setEvent,
      toggleLoading,
      removeToken
    );
    return () => controller.abort();
  }, [event_id, fetchFlag]);

  const refreshFlag = () => {
    setFetchFlag((prev) => !prev);
  };

  return (
    <div>
      <div className="d-flex align-items-center">
        <NavLink to="/dashboard">
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
            rows={generateRowsWithSerialNumber(certificates, positionOption)}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            localeText={{
              noRowsLabel: "No certificates generated yet!",
            }}
            pageSizeOptions={[10, 20]}
            onCellClick={(params) => {
              if (params.field === "qrCode") {
                setCertificate({
                  ...params.row,
                  url: `${window.location.origin}/verify-certificate/${params.row.uid}`,
                });
                setOpen(true);
              } else if (params.field === "edit") {
                setCertificate({
                  ...params.row,
                });
                setEditModal(true); // Open the edit modal
              } else if (params.field === "delete") {
                (async () => {
                  const confirmed = window.confirm(
                    "Are you sure you want to delete this certificate?"
                  );
                  if (confirmed) {
                    await DeleteCertificate(
                      params.row.id,
                      certificates,
                      setCertificates,
                      refreshFlag
                    );
                  }
                })();
              }
            }}
          />
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style} className="event-modal p-0">
          <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-center h-100 p-4">
            <div className="text-md-start">
              <h4 className="mb-3">CSI DMCE</h4>
              <h6 className="my-2" style={{ textTransform: "capitalize" }}>
                Name : {certificate?.name}
              </h6>
              <h6 className="my-2">
                Date : {dayjs(certificate?.date).format("DD-MM-YYYY")}
              </h6>
              <h6 className="my-2">Event : {event}</h6>
              <h6>Position : {certificate?.position}</h6>
            </div>
            <div
              className="ms-md-3 mt-4 mt-md-0 p-md-2"
              ref={qr_code}
              style={{
                width: "100%",
                maxWidth: "200px",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <QRCode
                size={200} // Adjust the size as needed
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={certificate?.url || ""}
                viewBox={`0 0 200 200`} // Adjust the viewBox dimensions
              />

              <h6 className="mt-2 text-center">{certificate?.uid}</h6>
            </div>
          </div>{" "}
          <div className="mt-3 text-center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => htmlToImageConvert(qr_code, certificate)}
            >
              Download QR Code
            </Button>
          </div>
          <section class="spikes"></section>
        </div>
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        open={editModal}
        onClose={() => setEditModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style} className="event-modal p-3">
          <h4>Edit Certificate</h4>
          <h1>{certificate?.name}</h1>
        </div>
      </Modal>
    </div>
  );
};

export default CertificatesList;
