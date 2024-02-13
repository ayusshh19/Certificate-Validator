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

  return (
    <div className="auth-certi">
      <div className="certificate">
        <img src={Certificate} alt="" className="img-fluid" />
        <p id="name">{certificateData?.name}</p>
        <p id="desc">
          has achieved the 1st position at the ABC Event organized by CSI DMCE
          at Datta Meghe College of Engineering.
        </p>
        {/* <p>Position: {certificateData?.position}</p>
        <p>Date: {certificateData?.date}</p> */}
      </div>
    </div>
  );
};

export default VerifyCertificate;
