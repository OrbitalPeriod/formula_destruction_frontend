import React, {useEffect, useState} from 'react';
import "./Navbar.css";
import {ApiResponse, DriverInfo, Season as SeasonObj, Team} from "../models/Responses";
import {Link} from "react-router-dom";
import Popup from "./Popup";
import FdLogo from "../Images/logo512.png";

const Navbar: React.FC = () => {
    const [seasons, setSeasons] = useState<SeasonObj[]>([]);
    const [drivers, setDrivers] = useState<DriverInfo[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupMessage, setShowPopupMessage] = useState("");

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const [driver_response, season_response, team_response] = await Promise.all([
                    fetch("http://localhost:8080/driver/all_drivers"),
                    fetch("http://localhost:8080/season/all_seasons"),
                    fetch("http://localhost:8080/team/all_teams"),
                ]);

                const season_response_data: ApiResponse<SeasonObj[]> = await season_response.json();
                const driver_response_data: ApiResponse<DriverInfo[]> = await driver_response.json();
                const team_response_data : ApiResponse<Team[]> = await team_response.json();

                const season_data: SeasonObj[] | null = season_response_data.data;
                const driver_data: DriverInfo[] | null = driver_response_data.data;
                const team_data : Team[] | null = team_response_data.data;

                if (season_data === null || driver_data === null || team_data === null) {
                    setShowPopupMessage("data was undefined: " + season_response_data.message + "/n" + driver_response_data.message);
                    setShowPopup(true);
                } else {
                    setSeasons(season_data);
                    setDrivers(driver_data);
                    setTeams(team_data);
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
            <Link to="/home"><img className="navbar_image" src={FdLogo} alt="home icon"/></Link>
            <div className="dropdown">
                <button className="dropdown-btn">Drivers
                    <i className="fa fa-caret-down"></i></button>
                <div className="dropdown-content">
                    {drivers.map((driver) => (
                        <Link to={"/Driver/" + driver.driver_id}>{driver.username}</Link>
                    ))}
                </div>
            </div>
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
                <button className="dropdown-btn">Teams
                    <i className="fa fa-caret-down"></i></button>
                <div className="dropdown-content">
                    {
                        teams.map((team) => (
                            <Link to={"/Season/" + team.team_id}>{team.name}</Link>
                        ))
                    }
                </div>
            </div>
            <div className="dropdown">
                <button className="dropdown-btn">News
                    <i className="fa fa-caret-down"></i></button>
            </div>
        </div>
    )
}

export default Navbar;