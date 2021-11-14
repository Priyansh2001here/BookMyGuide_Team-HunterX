import React, {useEffect, useState} from "react";
import CardTypeTwo from "../../Components/CardTypeTwo/CardTypeTwo";
import PageHeader from "../../Components/PageHeader/PageHeader";
import "./GuidesList.css";
import axios from "axios";
import {useParams} from "react-router-dom";

function GuidesList() {
  const [guides, setGuides] = useState([]);
  const [loader, setLoader] = useState(false);
  const {id} = useParams();

  useEffect(() => {
    const source = axios.CancelToken.source();
    async function fetchGuides() {
      setLoader(true);
      try {
        const response = await axios.get(
          "http://localhost:8000/guide/all-guides?place=" + id
        );
        setLoader(false);
        console.log(response.data)
        setGuides(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          throw error;
        }
      }
    }
    fetchGuides();
    return () => {
      source.cancel();
    };
  }, []);
  return (
    <div
    style={
      loader
        ? {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }
        : {}
    }
    >

      {loader ? (<img
              src="/loaderHome.gif"
              style={{ width: "100px", height: "100px" }}
            ></img>): (<div className="guidePageWrapper">
        <PageHeader pageTitle={<>Available <span style={{color:"#f78383"}}>Guides</span></>} rightIcon="fa fa-filter"/>
        <div className="tourGuidesList" style={{ marginTop: "50px" }}>
          {guides.map(guide => <CardTypeTwo key={guide.id} link={guide.id + "/book"} data={guide}/>)}
        </div>
      </div>)}
    </div>
  );
}

export default GuidesList;