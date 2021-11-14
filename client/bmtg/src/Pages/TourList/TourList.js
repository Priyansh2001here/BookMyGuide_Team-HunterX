import React, {useEffect, useRef, useState} from "react";
import PageHeader from "../../Components/PageHeader/PageHeader";
import "./TourList.css";
import PlaceCard from "../../Components/PlaceCard/PlaceCard";
import axios from "axios";

function TourList() {
  const myref = useRef();
  const secondRef = useRef();
  const [places, setPlaces] = useState([]);
  const [loader, setLoader] = useState(false);
  const [cuCity,setCucity] = useState(window.localStorage.getItem('currentCity'))
  useEffect(() => {
    function fadeText() {
      if (myref && myref.current) {
        const { y } = myref.current.getBoundingClientRect();
        if (y > 320) {
          secondRef.current.style.opacity = "1";
          myref.current.classList.remove("active");
        } else if (y >= 300 && y <= 320) {
            myref.current.classList.add("active");
          secondRef.current.style.opacity = "0.65";
        } else if (y >= 285 && y < 300) {
          secondRef.current.style.opacity = "0.6";
          myref.current.classList.add("active");
        } else if (y >= 260 && y < 285) {
          secondRef.current.style.opacity = "0.55";
          myref.current.classList.add("active");
        } else if (y > 245 && y < 260) {
          secondRef.current.style.opacity = "0.5";
          myref.current.classList.add("active");
        } else if (y > 245 && y < 260) {
            myref.current.classList.add("active");
          secondRef.current.style.opacity = "0.45";
        } else if (y > 230 && y < 245) {
          secondRef.current.style.opacity = "0.45";
          myref.current.classList.add("active");
        } else if (y > 215 && y < 230) {
          secondRef.current.style.opacity = "0.4";
        } else if (y > 200 && y < 215) {
          secondRef.current.style.opacity = "0.35";
        } else if (y > 185 && y < 200) {
          secondRef.current.style.opacity = "0.3";
        } else if (y > 160 && y < 185) {
          secondRef.current.style.opacity = "0.25";
          myref.current.classList.add("active");
        } else if (y > 145 && y < 160) {
          secondRef.current.style.opacity = "0.2";
        } else if (y > 130 && y < 145) {
          secondRef.current.style.opacity = "0.15";
        } else if (y > 115 && y < 130) {
          secondRef.current.style.opacity = "0.1";
          myref.current.classList.add("active");
        } else if (y > 100 && y < 115) {
            myref.current.classList.add("active");
          secondRef.current.style.opacity = "0";
        }
      }
    }
    const currentCity = window.localStorage.getItem('currentCity')
    window.addEventListener("scroll", fadeText);
    const source = axios.CancelToken.source();
    async function fetchPlaces() {
      setLoader(true);
      try {
        const response = await axios.get(
          "http://localhost:8000/guide/all-places?location__state=&location__city=" + currentCity
        );

        setLoader(false);
        setPlaces(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          throw error;
        }
      }
    }
    fetchPlaces();
    return () => {
      window.removeEventListener("scroll", fadeText);
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
              src="loaderHome.gif"
              style={{ width: "100px", height: "100px" }}
            ></img>) : (<><div className="tourListPageWrapper">
        <PageHeader pageTitle={<>{cuCity}'s <span style={{color:"#f78383"}}>Tourlist</span></>} />
        <div
          className="aboutPlace2"
          style={{
            marginTop: "65px",
            height: "auto",
            zIndex: "-10",
            position: "fixed",
          }}
        >
          <p ref={secondRef}>
            Agra is a city in the northern state of Uttar Pradesh, India. The city is famous for being the capital of the Mughal emperors from 1526 to 1658. It is a major tourist destination for its many Mughal-era buildings such as Tāj Mahal, Agra Fort and Fatehpūr Sikrī, all three of which are UNESCO World Heritage Sites.Agra has a rich history, seen in the monuments around the city. Though the heritage of Agra city is linked with the Mughal dynasty, many other rulers also contributed to the rich past of this city.
          </p>
        </div>
      </div>
      <div
        className="tourLists"
        ref={myref}
        style={{ marginTop: "280px", flexWrap: "wrap", padding: "20px" }}
      >
          {places.map((place) => <PlaceCard key={place.id} data={place}/>)}
      </div></>)}
    </div>
  );
}

export default TourList;