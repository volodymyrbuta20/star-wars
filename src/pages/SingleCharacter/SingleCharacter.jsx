import { GiStarfighter, GiFilmProjector, GiSpaceship} from "react-icons/gi";
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import Spinner from "../../UI/Spinner/Spinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import useHttp from "../../hooks/http.hook";
import getUrlId from "../../utils/getUrlId";
import { _apiBase } from "../../utils/baseUrl";

import "./SingleCharacter.scss";

const SingleCharacter = () => {

    const {characterId} = useParams();

    const [character, setCharacter] = useState({});
    const [starships, setStarships] = useState([]);
    const [films, setFilms] = useState([])
    const [vehicles, setVehicles] = useState([])
    const [planet, setPlanet] = useState({})

    const { loading, error, request} = useHttp();

    const retrieveList = async (array) => {

        let dataList = []
        for (let url of array) {
          dataList = [...dataList, await request(url)]
        }
        return dataList
      
    }

    useEffect(() => {
        const getCharacter = async () => {
            const dataCharacter = await request (`${_apiBase}people/${characterId}`)
            setCharacter(dataCharacter)
            const dataStarships = await retrieveList(dataCharacter.starships)
            setStarships(dataStarships)
            const dataFilms = await retrieveList(dataCharacter.films)
            setFilms(dataFilms)
            const dataVehicles = await retrieveList(dataCharacter.vehicles)
            setVehicles(dataVehicles)
            const dataPlanet = await request(dataCharacter.homeworld)
            setPlanet(dataPlanet)
        }

        getCharacter()
    }, []);

    return (
        <div className="character">
            {loading ? <Spinner/> : (
                <div className="character__wrapper">
                    <div className="character__data">
                        <Details character={character} homeworld={planet}/>
                        <div className="character__others">
                            <Starships starships={starships}/>
                            <Vehicles vehicles={vehicles}/>
                            <Films films={films}/>
                        </div>
                    </div>
                    <div className="character__image">
                        <img src={`https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`} alt={character.name} />
                    </div>
                </div>
            )}
        </div>
    )
}

const Details = ({ character, homeworld }) => {

    const {birth_year, gender, height, mass, skin_color, hair_color, eye_color} = character;
    const {name} = homeworld

    return (
        <div className="character__details">
            <h1 className="character__details-name">{character.name}</h1>
            <p>Home planet: <span>{name}</span> </p>
            <p>Born date: <span>{birth_year === "n/a" ? "unknown" : birth_year}</span> </p>
            <p>Gender: <span>{gender === "n/a" ? "unknown" : gender}</span> </p>
            <p>Height: <span>{height === "n/a" ? "unknown" : height}</span> </p>
            <p>Weight: <span>{mass === "n/a" ? "unknown" : mass}</span> </p>
            <p>Skin color: <span>{skin_color === "n/a" ? "unknown" : skin_color}</span> </p>
            <p>Hair color: <span>{hair_color === "n/a" ? "unknown" : hair_color}</span> </p>
            <p>Eye color: <span>{eye_color}</span> </p>
        </div>
    )
}

const Starships = ({starships}) => {

    return (
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
    )
}

const Vehicles = ({vehicles}) => {

    return (
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
    )
}

const Films = ({films}) => {

    return (
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
    )
}

export default SingleCharacter;