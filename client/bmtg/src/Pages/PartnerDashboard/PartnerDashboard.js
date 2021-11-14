import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../Components/PageHeader/PageHeader";
import "./PartnerDashboard.css";

function PartnerDashboard() {
  return (
    <div className="partnerDashboard">
      <PageHeader
        pageTitle={
          <p>
            Partner's <span style={{ color: "#f78383" }}>View</span>
          </p>
        }
      />
      <div className="partnerDashboard guideDashboard__details"  style={{
            height: "150px"
        }}>
        <div className="guideDashboard__guide">
          <img
            src="https://lh3.googleusercontent.com/ogw/ADea4I6LLtwRYq6xegx50MNFvHXJ1PHRfuwTDxrq6edH=s83-c-mo"
            alt=""
            style={{
              height: "100px",
              marginRight: "12px",
              width: "100px",
              objectFit: "cover",
              objectPosition: "center top",
              borderRadius: "15px",
              filter: "drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.4))",
            }}
          />
          <div className="guideDashboard__about">
            <h2 style={{ marginTop: "0px", marginBottom: "5px" }}>Creative Thinking</h2>

            <p style={{ color: "gray" }}>9027138976</p>
          </div>
        </div>
      </div>
      <div className="partnerDashboard__second">
        <div className="partnerDashboard__guideDashboard">
          <Link to={"/tourguideregister"} style={{
              textDecoration: 'none',
              color: 'white',
              marginLeft: '14px'

          }} className={"flex flex-center"}>
              Register<br/> As a TourGuide{" "}
          </Link>
          <img
            src="https://st2.depositphotos.com/1874273/6290/v/950/depositphotos_62907815-stock-illustration-tourist-guide-logo.jpg"
            alt="tour-guide"
          />
        </div>
        <div className="partnerDashboard__createPackage">
          <div>Create a Package</div>
          <img
            src="https://www.middleweb.com/wp-content/uploads/2017/06/tour-guide-teacher-feature.png"
            alt="site-seeing"
          />
        </div>
      </div>
    </div>
  );
}

export default PartnerDashboard;
