import React from "react";
import {NavLink} from "react-router-dom";
import "./BottomNav.css";

function BottomNav() {
    return (
        <div className="bottomBar flex flex-sa flex-alignCenter">
            <NavLink
                to="/app"
                style={{textDecoration: "none"}}
                activeClassName="active"
                className="flex flex-center bottomBarIcon"
            >
                <i className="fa fa-home"/>
            </NavLink>
            <NavLink
                to="/designtour"
                style={{textDecoration: "none"}}
                activeClassName="active"
                className="flex flex-center bottomBarIcon"
            >
                <i className="fa fa-gift"/>
            </NavLink>

            <NavLink
                to="/beapartner"
                style={{textDecoration: "none"}}
                activeClassName="active"
                className="flex flex-center bottomBarIcon "
            >
                <i className="fa fa-handshake"/>
            </NavLink>


            <div
                style={{textDecoration: "none"}}
                className="flex flex-center bottomBarIcon"
                onClick={() => {
                    window.localStorage.clear();
                    window.location.replace("/")
                }}
            >
                <i className="fa fa-sign-in-alt"/>
            </div>

        </div>
    );
}

export default BottomNav;
