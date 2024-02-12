import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const VerifyCertificate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>Verify Certificate</h1>
      <p>Certificate ID: {id}</p>
    </div>
  );
};

export default VerifyCertificate;
