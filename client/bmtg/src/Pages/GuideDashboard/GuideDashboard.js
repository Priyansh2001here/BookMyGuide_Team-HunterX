import React, {useEffect, useState} from "react";
import EditIcon from "@mui/icons-material/Edit";
import "./GuideDashboard.css";
import PageHeader from "../../Components/PageHeader/PageHeader";
import {Link} from "react-router-dom";
import {makeGetRequest} from "../../makeGetRequest";
import DJANGO_URL from "../../constants";
import Slot from "../../Components/Slot/Slot";

function GuideDashboard() {
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [open, setOpen] = React.useState(false);
    const [dashBoardData, setDashBoardData] = useState();
    const [timings, setTimings] = useState([]);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDateChange = async (e) => {
        setDate(e.target.value);
        const url = DJANGO_URL + "/booking/get-appointments?date=" + e.target.value;
        const timingAppointmentsViewData = await makeGetRequest(url);
        setTimings(timingAppointmentsViewData.data);
    }

    useEffect(() => {
        const url1 = DJANGO_URL + "/guide/dashboard"
        const url2 = DJANGO_URL + "/booking/get-appointments?date=" + date

        const topViewData = makeGetRequest(url1);
        const timingAppointmentsViewData = makeGetRequest(url2);

        Promise.all([topViewData, timingAppointmentsViewData])
            .then(values => {
                console.log(values[0].data)
                setDashBoardData(values[0].data)
                setTimings(values[1].data)
            })

    }, []);

    const checkSlot = () => {
        handleOpen();
    };

    return (
        <>{dashBoardData && (
            <div className="guideDashboard">
                <PageHeader
                    pageTitle={
                        <>
                            Nmn's <span style={{color: "#f78383"}}>Dashboard</span>
                        </>
                    }
                />
                <div
                    className="guideDashboard__details"
                    style={{marginLeft: "10px", marginRight: "10px"}}
                >
                    <div className="guideDashboard__guide">
                        <img
                            src={dashBoardData.user.image}
                            alt={dashBoardData.user.name}
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
                            <h2 style={{marginTop: "0px"}}>{dashBoardData.user.name}</h2>
                            <p style={{color: "gray", marginBottom: "2px"}}>
                                <span style={{
                                    color: "#f78383",
                                    fontWeight: "bold"
                                }}>{dashBoardData.appointments_data.count}</span>{" "}
                                tours completed
                            </p>
                            <p style={{color: "gray", marginBottom: "2px"}}>
                                <i className="fa fa-map-marker-alt"/> {dashBoardData.place.place_name}, {dashBoardData.place.location.city}
                            </p>
                            <p style={{color: "gray"}}>{dashBoardData.contact_num}</p>
                        </div>
                    </div>
                    <div className="guideDashboard__work">
                        <div className="guideDashboard__money">
                            <p style={{marginTop: "5px"}}>Total Money Earned</p>
                            <h2 style={{
                                color: "#f78383",
                                marginTop: "5px"
                            }}>₹ {dashBoardData.appointments_data.money_earned}</h2>
                        </div>
                        <Link
                            to={"/guide/dashboard/" + dashBoardData.id + "/reviews"}
                            style={{textDecoration: "none"}}
                            className="guideDashboard__rating"
                        >
                            <div className="star">{dashBoardData.rating}</div>
                            <i
                                className="fa fa-angle-right"
                                style={{
                                    marginTop: "18px",
                                    color: "#f78383",
                                    fontSize: "1.6rem",
                                }}
                            />
                        </Link>
                    </div>
                </div>
                <div className="guideDashboard__tour">
                    <div className="guideDashboard__tourHeading">
                        <h2>{dashBoardData.package.title}</h2>

                        <div
                            className="imageBackground flex flex-center"
                            style={{
                                left: "15px",
                                zIndex: 10,
                            }}
                        >
                            <EditIcon style={{color: "#f78383"}}/>
                        </div>
                    </div>
                    <div className="guideDashboard__tourAbout">
                        <p id="tourDescDash">
                            {dashBoardData.package.description}
                        </p>
                    </div>
                </div>
                <div
                    className="guideDashboard__bookings"
                    style={{background: "white", margin: "10px", padding: "15px"}}
                >
                    <div className="guideDashboard__bookingsDate">
                        <h3 style={{fontSize: "1rem", marginLeft: "5px"}}>Bookings of </h3>
                        <input
                            type="date"
                            name="bookingsDate"
                            className="guideDashboard__bookingsDateTime"
                            value={date}
                            onChange={handleDateChange}
                        />
                    </div>
                    <div className="guideDashboard__slots">

                        {timings.map(timing => {
                            return (
                                <Slot id={timing.timing.id} key={timing.timing.id} timing={timing.timing} date={date}/>
                            )
                        })}

                    </div>
                </div>
            </div>
        )}</>
    );
}

export default GuideDashboard;
