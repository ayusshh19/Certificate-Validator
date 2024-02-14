import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { AuthCertificate } from "../../../utils/Certificate";
import { StateContext } from "../../../context/StateContext";
import Certificate from "../../../assets/certificate.png";
import dayjs from "dayjs";
import QRCode from "react-qr-code";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti"; // Import canvas-confetti

const VerifyCertificate = () => {
  const { uid } = useParams();
  const { toggleLoading } = useContext(StateContext);
  const navigate = useNavigate();

  const [certificateData, setCertificateData] = useState(null);
  const qr_code = useRef(null);
  const url = useRef(`${window.location.origin}/verify-certificate/${uid}`);

  useEffect(() => {
    const controller = new AbortController();
    AuthCertificate(
      controller,
      uid,
      toggleLoading,
      setCertificateData,
      navigate,
      startConfetti
    );

    return () => {
      controller.abort();
    };
  }, [uid]);

  function startConfetti() {
    const startTime = Date.now();
    const duration = 2 * 1000;

    const interval = setInterval(() => {
      const timePassed = Date.now() - startTime;
      if (timePassed < duration) {
        const randomX = Math.random();
        const randomY = Math.random();
        confetti({
          particleCount: 50,
          origin: { x: randomX, y: randomY },
        });
      } else {
        clearInterval(interval);
      }
    }, 250);

    setTimeout(() => {
      clearInterval(interval);
    }, duration);
  }

  const getPositionText = (position) => {
    if (position === 0) {
      return "participation";
    } else if (position === 1) {
      return "1st";
    } else if (position === 2) {
      return "2nd";
    } else if (position === 3) {
      return "3rd";
    } else {
      return "";
    }
  };

  return (
    <div className="auth-certi">
      <button
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          border: "none",
        }}
        onClick={() => navigate("/verify-certificate")}
      >
        <ChevronLeftIcon
          style={{
            fontSize: "2rem",
          }}
        />
      </button>

      {certificateData && (
        <div className="certificate">
          <img
            src={Certificate}
            alt=""
            className="img-fluid"
            style={{ userSelect: "none" }}
          />
          <p
            id="title"
            style={{
              fontSize: `min(3.5vw, 40px)`,
            }}
          >
            Certificate of{" "}
            {certificateData?.position === 0 ? "Participation" : "Achievement"}
          </p>
          <p id="name">{certificateData?.name}</p>
          {certificateData?.position === 0 ? (
            <p id="desc">
              for participation in the <b>{certificateData?.event_id}</b>{" "}
              organized by CSI-CATT DMCE on{" "}
              {dayjs(certificateData?.date).format("DD MMMM YYYY")}, at Datta
              Meghe College of Engineering, Airoli.
            </p>
          ) : (
            <p id="desc">
              for achieving the{" "}
              <b>{getPositionText(certificateData?.position)} position</b> at{" "}
              <b>{certificateData?.event}</b> organized by CSI-CATT DMCE on{" "}
              {dayjs(certificateData?.date).format("DD MMMM YYYY")}, at Datta
              Meghe College of Engineering, Airoli.
            </p>
          )}
          <p id="uid">Certificate ID : {certificateData?.uid}</p>
          <p id="position-tag">
            {certificateData?.position === 0
              ? ""
              : getPositionText(certificateData?.position)}{" "}
          </p>
          <div id="qr_code_id" ref={qr_code}>
            <QRCode
              size={200}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={url.current || ""}
              viewBox={`0 0 200 200`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyCertificate;
