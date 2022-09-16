import { GiStarfighter, GiFilmProjector, GiSpaceship} from "react-icons/gi";
import { useParams, Link } from 'react-router-dom';
import StarWarsService from '../../services/StarWarsService';
import { useCallback, useState, useEffect } from "react";
import useCharacter from "../../hooks/useCharacter";
import Spinner from "../../components/Spinner/Spinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import "./SingleCharacter.scss";

const SingleCharacter = () => {

    const {characterId} = useParams();

    const [character, setCharacter] = useState({});

    const { getCharacter, loading, error} = StarWarsService();

    const updateCharacter = () => {
        getCharacter(characterId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (character) => {
        setCharacter(character)
    }

    useEffect(() => {
        updateCharacter()
    }, []);

    const {loading: characterLoading} = useCharacter(character)

    return (
        <div className="character">
            {loading ? <Spinner/> : (
                <div className="character__wrapper">
                    <div className="character__data">
                        {characterLoading ? <Spinner/> : (
                            <>
                                <Details character={character}/>
                                <Others character={character}/>
                            </>
                        )}
                    </div>
                    <div className="character__image">
                        <img src={`https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`} alt={character.name} />
                    </div>
                </div>
            )}
        </div>
    )
}

const Details = ({character}) => {

    const {name, birthYear, gender, height, weight, skin, hair, eye} = character;
    const {planet} = useCharacter(character)

    return (
        <div className="character__details">
            <h1 className="character__details-name">{name}</h1>
            <p>Home planet: <span>{planet.name}</span> </p>
            <p>Born date: <span>{birthYear === "n/a" ? "unknown" : birthYear}</span> </p>
            <p>Gender: <span>{gender === "n/a" ? "unknown" : gender}</span> </p>
            <p>Height: <span>{height === "n/a" ? "unknown" : height}</span> </p>
            <p>Weight: <span>{weight === "n/a" ? "unknown" : weight}</span> </p>
            <p>Skin color: <span>{skin === "n/a" ? "unknown" : skin}</span> </p>
            <p>Hair color: <span>{hair === "n/a" ? "unknown" : hair}</span> </p>
            <p>Eye color: <span>{eye}</span> </p>
        </div>
    )
}

const Others = ({character}) => {

    const {films, starships, vehicles} = useCharacter(character);
    const getUrlId = (url) => {
        return url.split('/').splice(-2, 1)[0];
    }

    return (
        <div className="character__others">
            <div className="character__others-data">
                <h2 className="character__others-title">Starships</h2>
                {starships.length > 0 ? (
                        <ul>
                        {starships.map(starship => (
                            <li key={starship.url}>
                                <Link to={`/starships/${getUrlId(starship.url)}`} className="character__others-link">
                                    <GiStarfighter/>
                                    {starship.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (<span>There is no starships for this character</span>)}
            </div>
            <div className="character__others-data">
                <h2 className="character__others-title">Vehicles</h2>
                {vehicles.length > 0 ? (
                    <ul>
                        {vehicles.map(vehicle => (
                            <li key={vehicle.url}>
                                <Link to={`/vehicles/${getUrlId(vehicle.url)}`} className="character__others-link">
                                    <GiSpaceship/>
                                    {vehicle.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (<span>There is no vehicles for this character</span>)}
            </div>
            <div className="character__others-data">
                <h2 className="character__others-title">Films</h2>
                    <ul>
                        {films.map(film => (
                            <li key={film.title}>
                                <Link to={`/films/${getUrlId(film.url)}`} className="character__others-link">
                                    <GiFilmProjector/>
                                    {film.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
            </div>
        </div>
    )
}

export default SingleCharacter;