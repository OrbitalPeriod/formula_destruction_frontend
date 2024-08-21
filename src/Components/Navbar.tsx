import React, {useEffect, useState} from 'react';
import "./Navbar.css";
import {ApiResponse, DriverInfo, Season as SeasonObj} from "../models/Responses";
import {Link} from "react-router-dom";
import Popup from "./Popup";

const Navbar: React.FC = () => {
    const [seasons, setSeasons] = useState<SeasonObj[]>([]);
    const [drivers, setDrivers] = useState<DriverInfo[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupMessage, setShowPopupMessage] = useState("");

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const [driver_response, season_response] = await Promise.all([
                    fetch("http://localhost:8080/driver/all_drivers"),
                    fetch("http://localhost:8080/season/all_seasons"),
                ]);

                const season_response_data: ApiResponse<SeasonObj[]> = await season_response.json();
                const driver_response_data: ApiResponse<DriverInfo[]> = await driver_response.json();

                const season_data: SeasonObj[] | null = season_response_data.data;
                const driver_data: DriverInfo[] | null = driver_response_data.data;

                if (season_data === null || driver_data === null) {
                    setShowPopupMessage("data was undefined: " + season_response_data.message + "/n" + driver_response_data.message);
                    setShowPopup(true);
                } else {
                    setSeasons(season_data);
                    setDrivers(driver_data);
                }
            } catch (error) {
                setShowPopupMessage("error fetching data!");
                setShowPopup(true);
            }
        };

        fetchItems();
    }, []);


    return (
        <div className="navbar">
            {showPopup && <Popup message={showPopupMessage} onClose={() => setShowPopup(false)}/>}
            <Link to="/home">Home</Link>
            <div className="dropdown">
                <button className="dropdown-btn">Seasons
                    <i className="fa fa-caret-down"></i></button>
                <div className="dropdown-content">
                    {
                        seasons.map((season) => (
                            <Link to={"/Season/" + season.season}>{season.season_name}</Link>
                        ))
                    }
                </div>
            </div>
            <div className="dropdown">
                <button className="dropdown-btn">Drivers
                    <i className="fa fa-caret-down"></i></button>
                <div className="dropdown-content">
                    {drivers.map((driver) => (
                        <Link to={"/Driver/" + driver.driver_id}>{driver.username}</Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Navbar;