import React from "react";
import SideNavigation from "../../components/SideNavigation/SideNavigation";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import GenerateCertificate from "./GenerateCertificate/GenerateCertificate.js";
import CertificatesList from "./CertificatesList/CertificatesList.js";
import MobileNaigation from "../../components/MobileNavigation/MobileNavigation";

const MainScreen = () => {
  return (
    <div>
      <div className="container-fluid p-0 m-0 mainscreen">
        <div className="d-block d-md-none">
          <MobileNaigation />
        </div>
        <div className="row m-0 p-0">
          <div
            className="d-none d-md-block col-md-4 col-lg-2 m-0 p-0 sidebar"
            style={{ height: "100vh" }}
          >
            <SideNavigation />
          </div>
          <div
            className="col-md-8 col-lg-10 m-0 p-4"
            style={{ height: "100vh", overflowY: "auto" }}
          >
            <Routes>
              <Route path="/*" element={<Dashboard />} />
              <Route path="/:event_id" element={<CertificatesList />} />
              <Route
                path="/generate-certificate"
                element={<GenerateCertificate />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
