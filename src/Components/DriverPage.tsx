import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom';
import {ApiResponse, Driver} from "../models/Responses";
import DriverResultGrid from "./DriverResultGrid";
import "./DriverPage.css";

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
                    <p>{driver.birthday ? (driver.birthday.toString()) : "uwu"}</p>
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