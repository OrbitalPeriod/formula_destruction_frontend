import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom';
import {ApiResponse, Driver} from "../models/Responses";
import DriverResultGrid from "./DriverResultGrid";
import "./DriverPage.css";
import calculateAge from "../utils";


const DriverPage : React.FC = () => {
    const {id} = useParams();

    const [driver, setDriver] = useState<Driver| null>();

    useEffect(() => {
        fetch(`http://localhost:8080/driver/${id}/info`)
            .then((result) => result.json())
            .then((result : ApiResponse<Driver>) => setDriver(result.data))
            .catch((error) => console.log(error));
    }, [id]);

    return (
        <div>
            <img className="banner" src="/Banners/image.png" alt="Banner"/>
            {driver ? (
                <div>
                    <img src={driver.driver_image_url} alt="Driver profile"/>
                    <p>{driver.username}</p>
                    <p>{driver.birthday ? (driver.birthday.toString()) : "9 september 2001"}</p>
                    <p>Driver nationality: {driver.country}</p>
                    {driver.birthday ? (<p> Age: {calculateAge(new Date(driver.birthday))}</p>) : null}
                    {driver.birthday ? (<p>Birthday: {driver.birthday.toString()}</p>) : null}

                    <div>
                        <h1>Driver stats:</h1>
                        Races started: {driver.seats.flatMap((x) => x.results).filter((x) => x.position !== 100).length}
                        Driver championships: {driver.season_results.filter((x) => x.driver_result == 1).length}
                        Constructor championships : {driver.season_results.filter((x) => x.team_result == 1).length}
                    </div>

                    <div>
                        <DriverResultGrid races={driver.seats.flatMap((x) => x.results)}></DriverResultGrid>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}



export default DriverPage;