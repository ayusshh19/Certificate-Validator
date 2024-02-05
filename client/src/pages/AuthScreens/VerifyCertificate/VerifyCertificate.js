import React from "react";
import { useParams } from "react-router-dom";

const VerifyCertificate = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Verify Certificate</h1>
      <p>Certificate ID: {id}</p>
    </div>
  );
};

export default VerifyCertificate;
