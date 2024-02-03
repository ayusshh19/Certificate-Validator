import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  maxWidth: "500px",
};

const columns = [
  { field: "serialNumber", headerName: "Serial No.", width: 100 },
  {
    field: "uid",
    headerName: "Certificate Number",
    width: 200,
    sortable: false,
  },
  { field: "name", headerName: "Name", width: 200 },
  { field: "position", headerName: "Position", width: 100 },
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
      <IconButton aria-label="qr-code" color="primary">
        <QrCode2Icon />
      </IconButton>
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    filterable: false,
    width: 120,
    renderCell: (params) => (
      <IconButton aria-label="delete" color="error">
        <DeleteIcon />
      </IconButton>
    ),
  },
];

const generateRowsWithSerialNumber = (rows) => {
  return rows?.map((row, index) => ({
    ...row,
    serialNumber: index + 1,
    id: row._id,
  }));
};

const htmlToImageConvert = (qr_code, certificate) => {
  toPng(qr_code.current, { cacheBust: false })
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
  const [certificates, setCertificates] = useState([]);
  const [event, setEvent] = useState("");
  const [open, setOpen] = useState(false);
  const [certificate, setCertificate] = useState(null);
  const [refCerti, setRefCerti] = useState(false);

  const qr_code = useRef(null);

  const refreshCertificates = () => {
    setRefCerti((prev) => !prev);
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchCertificates(event_id, controller, setCertificates, setEvent);
    return () => controller.abort();
  }, [refCerti]);

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
            rows={generateRowsWithSerialNumber(certificates)}
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
              } else if (params.field === "actions") {
                (async () => {
                  await DeleteCertificate(params.row.id, refreshCertificates);
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
        <Box sx={style} className="event-modal">
          <h4>QR Code</h4>
          <div
            ref={qr_code}
            style={{
              borderRadius: "10px",
              boxShadow: "0px 0px 10px 0px #000000",
              width: "100%",
              maxWidth: "200px",
              padding: "10px 20px",
              margin: "20px auto 0 auto",
              backgroundColor: "white",
            }}
          >
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={certificate?.url || ""}
              viewBox={`0 0 256 256`}
            />
            <h6>{certificate?.uid}</h6>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CertificatesList;
