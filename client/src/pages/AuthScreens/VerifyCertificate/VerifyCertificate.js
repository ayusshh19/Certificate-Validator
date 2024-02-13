import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthCertificate } from "../../../utils/Certificate";
import { StateContext } from "../../../context/StateContext";
import Certificate from "../../../assets/certificate.png";

const VerifyCertificate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleLoading } = React.useContext(StateContext);
  const [certificateData, setCertificateData] = useState();

  useEffect(() => {
    AuthCertificate(id, toggleLoading, setCertificateData);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

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
      return ``;
    }
  };

  return (
    <div className="auth-certi">
      {certificateData && (
        <div className="certificate">
          <img src={Certificate} alt="" className="img-fluid" />
          <p
            id="title"
            style={{
              fontSize: `min(4vw, 45px)`,
            }}
          >
            Certificate of{" "}
            {certificateData?.position === 0 ? "Participation" : "Achievement"}
          </p>
          <p id="name">{certificateData?.name}</p>
          {certificateData?.position === 0 ? (
            <p id="desc">
              for participation in the <b>{certificateData?.event_id}</b>{" "}
              organized by CSI DMCE on {formatDate(certificateData?.date)}, at
              Datta Meghe College of Engineering, Airoli.
            </p>
          ) : (
            <p id="desc">
              for achieving the{" "}
              <b>{getPositionText(certificateData?.position)} position</b> at{" "}
              <b>{certificateData?.event_name}</b> organized by CSI DMCE on{" "}
              {formatDate(certificateData?.date)}, at Datta Meghe College of
              Engineering, Airoli.
            </p>
          )}
          <p id="uid">Certificate ID : {certificateData?.uid}</p>
        </div>
      )}
    </div>
  );
};

export default VerifyCertificate;
