import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthCertificate } from "../../../utils/Certificate";
import { StateContext } from "../../../context/StateContext";
import Certificate from "../../../assets/certificate.png";
import dayjs from "dayjs";

const VerifyCertificate = () => {
  const { uid } = useParams();
  const { toggleLoading } = useContext(StateContext);

  const [certificateData, setCertificateData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    AuthCertificate(controller, uid, toggleLoading, setCertificateData);
    return () => controller.abort();
  }, [uid]);

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
              organized by CSI DMCE on{" "}
              {dayjs(certificateData?.date).format("DD MMMM YYYY")}, at Datta
              Meghe College of Engineering, Airoli.
            </p>
          ) : (
            <p id="desc">
              for achieving the{" "}
              <b>{getPositionText(certificateData?.position)} position</b> at{" "}
              <b>{certificateData?.event}</b> organized by CSI DMCE on{" "}
              {dayjs(certificateData?.date).format("DD MMMM YYYY")}, at Datta
              Meghe College of Engineering, Airoli.
            </p>
          )}
          <p id="uid">Certificate ID : {certificateData?.uid}</p>
        </div>
      )}
    </div>
  );
};

export default VerifyCertificate;
