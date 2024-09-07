import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom';
import {ApiResponse, Driver} from "../models/Responses";
import DriverResultGrid from "./DriverResultGrid";
import "./DriverPage.css";

const DriverPage : React.FC = () => {
    const {id} = useParams();

    const [driver, setDriver] = useState<Driver| null>();
    const [image_path, setImagePath] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8080/driver/${id}/info`)
            .then((result) => result.json())
            .then((result : ApiResponse<Driver>) => setDriver(result.data))
            .catch((error) => console.log(error));
    }, [id]);

    return (
        <div>
            <img className="banner" src="/Banners/image.png" alt="profile_picture"/>
            {driver ? (
                <div>
                    <DriverResultGrid races={driver.seats.flatMap((x) => x.results)}></DriverResultGrid>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default DriverPage;