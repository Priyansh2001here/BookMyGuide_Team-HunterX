import React, {useEffect, useState} from "react";
import "./BookingSuccessful.css";
import {Link} from "react-router-dom";

function BookingSuccessful() {



    return (
        <div className="bookingSuccessful">
            <div className="bookingSuccessful__main">
                <img
                    src="https://ak.picdn.net/shutterstock/videos/1068883754/thumb/11.jpg?ip=x480"
                    alt="green-tick"
                />
                <h3>Booking Successfully done!</h3>
            </div>
            <Link to={"/profile"}>
                <button className="bookingSuccessful__btn">View your Booking</button>
            </Link>
        </div>
    );
}

export default BookingSuccessful;
