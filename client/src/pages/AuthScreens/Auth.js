import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import VerifyCertificate from "./VerifyCertificate/VerifyCertificate";
import Login from "./Login/Login";

const Auth = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/verify-certificate" />} />
        <Route path="/verify-certificate" element={<VerifyCertificate />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/verify-certificate" />} />
      </Routes>
    </>
  );
};

export default Auth;
