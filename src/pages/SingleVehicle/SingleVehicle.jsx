import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import Spinner from "../../UI/Spinner/Spinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { GiCharacter, GiFilmProjector } from "react-icons/gi";
import getUrlId from '../../utils/getUrlId';
import { _apiBase } from '../../utils/baseUrl';
import useHttp from '../../hooks/http.hook';

import "./SingleVehicle.scss";

const SingleVehicle = () => {

    const {vehicleId} = useParams();

    const [vehicle, setVehicle] = useState({});
    const [films, setFilms] = useState([]);
    const [pilots, setPilots] = useState([]);

    const {loading, error, request} = useHttp();

    const retrieveList = async (array) => {

        let dataList = []
        for (let url of array) {
          dataList = [...dataList, await request(url)]
        }
        return dataList
    }

    useEffect(() => {
        const getVehicle = async () => {
            const dataVehicle = await request(`${_apiBase}vehicles/${vehicleId}`)
            setVehicle(dataVehicle)
            const dataFilms = await retrieveList(dataVehicle.films)
            setFilms(dataFilms)
            const dataPilots = await retrieveList(dataVehicle.pilots)
            setPilots(dataPilots)
        }
        getVehicle()
    },[]);

    return (
        <div className="singlevehicle">
            {loading ? <Spinner/> : (
                <div className="singlevehicle__wrapper">
                    <div className="singlevehicle__data">
                        <Details vehicle={vehicle}/>
                        <Others films={films} pilots={pilots} />
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
    const {name, model, manufacturer, vehicle_class, cost_in_credits, max_atmosphering_speed, length, crew, passengers} = vehicle;

    return (
        <div className="singlevehicle__details">
            <h2 className="singlevehicle__details-name">{name}</h2>
            <p>Model: <span>{model}</span> </p>
            <p>Manufacturer: <span>{manufacturer}</span></p>
            <p>Class: <span>{vehicle_class}</span></p>
            <p>Price: <span>{cost_in_credits}</span></p>
            <p>Speed: <span>{max_atmosphering_speed}</span></p>
            <p>length: <span>{length}</span></p>
            <p>Crew: <span>{crew}</span></p>
            <p>Passengers: <span>{passengers}</span></p>
        </div>
    )
}

const Others = ({films, pilots} ) => {

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
                                <Link to={`/characters/${getUrlId(pilot.url)}`}>
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