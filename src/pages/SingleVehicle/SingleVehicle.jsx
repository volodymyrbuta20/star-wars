import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import StarWarsService from '../../services/StarWarsService';
import useStarship from "../../hooks/useStarship";
import Spinner from "../../components/Spinner/Spinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { GiCharacter, GiFilmProjector } from "react-icons/gi";

import "./SingleVehicle.scss";

const SingleVehicle = () => {

    const {vehicleId} = useParams();

    const [vehicle, setVehicle] = useState({});

    const {getVehicle, loading, error} = StarWarsService();

    const updateVehicle = () => {
        getVehicle(vehicleId)
            .then(onVehicleLoaded)
    };

    const onVehicleLoaded = (vehicle) => {
        setVehicle(vehicle);
    }

    useEffect(() => {
        updateVehicle()
    },[]);

    return (
        <div className="singlevehicle">
            {loading ? <Spinner/> : (
                <div className="singlevehicle__wrapper">
                    <div className="singlevehicle__data">
                        <Details vehicle={vehicle}/>
                        <Others vehicle={vehicle}/>
                    </div>
                    <div className="singlevehicle__image">
                        <img src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicleId}.jpg`} alt="" />
                    </div>
                </div>
            )}
        </div>
    )
}

const Details = ({vehicle}) => {
    const {name, model, manufacturer, vehicleClass, price, speed, length, crew, passengers} = vehicle;

    return (
        <div className="singlevehicle__details">
            <h2 className="singlevehicle__details-name">{name}</h2>
            <p>Model: <span>{model}</span> </p>
            <p>Manufacturer: <span>{manufacturer}</span></p>
            <p>Class: <span>{vehicleClass}</span></p>
            <p>Price: <span>{price}</span></p>
            <p>Speed: <span>{speed}</span></p>
            <p>length: <span>{length}</span></p>
            <p>Crew: <span>{crew}</span></p>
            <p>Passengers: <span>{passengers}</span></p>
        </div>
    )
}

const Others = ({vehicle}) => {

    const {films, pilots} = useStarship(vehicle);
    const getUrlId = (url) => {
        return url.split('/').splice(-2, 1)[0];
    }

    return (
        <div className="singlevehicle__others">
            <div className="singlevehicle__others-data">
                <h2 className="singlevehicle__others-data-name">Films</h2>
                <ul className="singlevehicle__others-data-list">
                    {films.map(film => (
                        <li key={film.title}>
                            <Link to={`/films/${getUrlId(film.url)}`}>
                                <GiFilmProjector/>
                                {film.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="singlevehicle__others-data">
                <h2 className="singlevehicle__others-data-name">Pilots</h2>
                {pilots.length > 0 ? (
                    <ul className="singlevehicle__others-data-list">
                        {pilots.map(pilot => (
                            <li key={pilot.name}>
                                <Link to={`/${getUrlId(pilot.url)}`}>
                                    <GiCharacter/>
                                    {pilot.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (<span>Unknown</span>)}
            </div>
        </div>
    )
}

export default SingleVehicle;