import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import StarWarsService from '../../services/StarWarsService';
import Spinner from "../../components/Spinner/Spinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { GiStarfighter, GiCharacter, GiSpaceship, GiRingedPlanet} from "react-icons/gi";
import useFilm from "../../hooks/useFilm";

import "./SingleFilm.scss";

const SingleFilm = () => {

    const {filmId} = useParams();

    const [film, setFilm] = useState({})

    const { getFilm, loading, error} = StarWarsService();

    const updateFilm = () => {
        getFilm(filmId)
            .then(onFilmLoaded)
    };

    const onFilmLoaded = (film) => {
        setFilm(film)
    }

    useEffect(() => {
        updateFilm()
    }, []);

    const {loading: filmLoading} = useFilm(film);

    return (
        <div className="singlefilm">
            {loading ? <Spinner/> : (
                <div className="singlefilm__wrapper">
                    <div className="singlefilm__data">
                        {filmLoading ? <Spinner/> : (
                            <>
                                <Details film={film}/>
                                <Characters film={film}/>
                                <Others film={film}/>
                            </>
                        )}
                    </div>
                    <div className="singlefilm__image">
                        <img src={`https://starwars-visualguide.com/assets/img/films/${filmId}.jpg`} alt="" />
                    </div>
                </div>
            )}
        </div>
    )
}

const Details = ({film}) => {
    const {name, date, director, producer, sinopse} = film;

    return (
        <div className="singlefilm__details">
            <h2 className="singlefilm__details-name">{name}</h2>
            <p>Release date: <span>{date}</span> </p>
            <p>Director: <span>{director}</span> </p>
            <p>Producer: <span>{producer}</span> </p>
            <p>Opening crawl: <span>{sinopse}</span> </p>
        </div>
    )
}

const Characters = ({film}) => {
    const {characters} = useFilm(film);
    const getUrlId = (url) => {
        return url.split('/').splice(-2, 1)[0];
    }

    return (
        <div className="singlefilm__characters">
            <h2 className="singlefilm__characters-name">Characters</h2>
            <ul className="singlefilm__characters-list">
                {characters.map(character => (
                    <li key={character.name}>
                        <Link to={`/${getUrlId(character.url)}`}>
                            <GiCharacter/>
                            {character.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const Others = ({film}) => {
    const {starships, vehicles, planets, species} = useFilm(film);
    const getUrlId = (url) => {
        return url.split('/').splice(-2, 1)[0];
    }

    return (
        <div className="singlefilm__others">
            <div className="singlefilm__others-data">
                <h3 className="singlefilm__others-data-title">Planets</h3>
                <ul className="singlefilm__others-data-list">
                    {planets.map(planet => (
                        <li key={planet.url}>
                            {/* <Link to={`/${getUrlId(planet.url)}`}> */}
                                <GiRingedPlanet/>
                                {planet.name}
                            {/* </Link> */}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="singlefilm__others-data">
                <h3 className="singlefilm__others-data-title">Vehicles</h3>
                <ul className="singlefilm__others-data-list">
                    {vehicles.map(vehicle => (
                        <li key={vehicle.url}>
                            <Link to={`/vehicles/${getUrlId(vehicle.url)}`}>
                                <GiSpaceship/>
                                {vehicle.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="singlefilm__others-data">
                <h3 className="singlefilm__others-data-title">Starships</h3>
                <ul className="singlefilm__others-data-list">
                    {starships.map(starship => (
                        <li key={starship.url}>
                            <Link to={`/starships/${getUrlId(starship.url)}`}>
                                <GiStarfighter/>
                                {starship.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="singlefilm__others-data">
                <h3 className="singlefilm__others-data-title">Species</h3>
                <ul className="singlefilm__others-data-list">
                    {species.map(specie => (
                        <li key={specie.url}>
                            {/* <Link to={`/${getUrlId(specie.url)}`}> */}
                                <GiCharacter/>
                                {specie.name}
                            {/* </Link> */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SingleFilm;