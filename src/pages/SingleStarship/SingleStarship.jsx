import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import StarWarsService from '../../services/StarWarsService';
import useStarship from "../../hooks/useStarship";
import Spinner from "../../components/Spinner/Spinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { GiCharacter, GiFilmProjector } from "react-icons/gi";

import "./SingleStarship.scss";

const SingleStarship = () => {

    const {starshipId} = useParams();

    const [starship, setStarship] = useState({});

    const {getStarship, loading, error} = StarWarsService();

    const updateStarship = () => {
        getStarship(starshipId)
            .then(onStarshipLoaded)
    };

    const onStarshipLoaded = (starship) => {
        setStarship(starship);
    }

    useEffect(() => {
        updateStarship()
    },[]);

    return (
        <div className="singlestarship">
            {loading ? <Spinner/> : (
                <div className="singlestarship__wrapper">
                    <div className="singlestarship__data">
                        <Details starship={starship}/>
                        <Others starship={starship}/>
                    </div>
                    <div className="singlestarship__image">
                        <img src={`https://starwars-visualguide.com/assets/img/starships/${starshipId}.jpg`} alt="" />
                    </div>
                </div>
            )}
        </div>
    )
}

const Details = ({starship}) => {
    const {name, model, manufacturer, shipClass, price, speed, mglt, length, crew, passengers} = starship;

    return (
        <div className="singlestarship__details">
            <h2 className="singlestarship__details-name">{name}</h2>
            <p>Model: <span>{model}</span> </p>
            <p>Manufacturer: <span>{manufacturer}</span></p>
            <p>Class: <span>{shipClass}</span></p>
            <p>Price: <span>{price}</span></p>
            <p>Speed: <span>{speed}</span></p>
            <p>MGLT: <span>{mglt}</span></p>
            <p>length: <span>{length}</span></p>
            <p>Crew: <span>{crew}</span></p>
            <p>Passengers: <span>{passengers}</span></p>
        </div>
    )
}

const Others = ({starship}) => {

    const {films, pilots} = useStarship(starship);
    const getUrlId = (url) => {
        return url.split('/').splice(-2, 1)[0];
    }

    return (
        <div className="singlestarship__others">
            <div className="singlestarship__others-data">
                <h2 className="singlestarship__others-data-name">Films</h2>
                <ul className="singlestarship__others-data-list">
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
            <div className="singlestarship__others-data">
                <h2 className="singlestarship__others-data-name">Pilots</h2>
                {pilots.length > 0 ? (
                    <ul className="singlestarship__others-data-list">
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

export default SingleStarship;