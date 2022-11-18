import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import Spinner from "../../UI/Spinner/Spinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { GiStarfighter, GiCharacter, GiSpaceship, GiRingedPlanet} from "react-icons/gi";
import useHttp from "../../hooks/http.hook";
import getUrlId from "../../utils/getUrlId";
import { _apiBase } from "../../utils/baseUrl";

import "./SingleFilm.scss";

const SingleFilm = () => {

    const {filmId} = useParams();

    const [film, setFilm] = useState({});
    const [characters, setCharacters] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [starships, setStarships] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [species, setSpecies] = useState([]);

    const { loading, error, request} = useHttp();

    const retrieveList = async (array) => {

        let dataList = []
        for (let url of array) {
          dataList = [...dataList, await request(url)]
        }
        return dataList
      
    }

    useEffect(() => {
        const getFilm = async () => {
            const dataFilm = await request(`${_apiBase}films/${filmId}`)
            setFilm(dataFilm)
            const dataCharacters = await retrieveList(dataFilm.characters)
            setCharacters(dataCharacters)
            const dataPlanets = await retrieveList(dataFilm.planets)
            setPlanets(dataPlanets)
            const dataStarships = await retrieveList(dataFilm.starships)
            setStarships(dataStarships)
            const dataVehicles = await retrieveList(dataFilm.vehicles)
            setVehicles(dataVehicles)
            const dataSpecies = await retrieveList(dataFilm.species)
            setSpecies(dataSpecies)
        }
        getFilm()
    }, []);

    return (
        <div className="singlefilm">
            {loading ? <Spinner/> : (
                <div className="singlefilm__wrapper">
                    <div className="singlefilm__data">
                        <Details film={film}/>
                        <Characters characters={characters}/>
                        <Others starships={starships} vehicles={vehicles} planets={planets} species={species}/>
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
    const {title, release_date, director, producer, opening_crawl} = film;

    return (
        <div className="singlefilm__details">
            <h2 className="singlefilm__details-name">{title}</h2>
            <p>Release date: <span>{release_date}</span> </p>
            <p>Director: <span>{director}</span> </p>
            <p>Producer: <span>{producer}</span> </p>
            <p>Opening crawl: <span>{opening_crawl}</span> </p>
        </div>
    )
}

const Characters = ({characters}) => {

    return (
        <div className="singlefilm__characters">
            <h2 className="singlefilm__characters-name">Characters</h2>
            <ul className="singlefilm__characters-list">
                {characters.map(character => (
                    <li key={character.name}>
                        <Link to={`/characters/${getUrlId(character.url)}`}>
                            <GiCharacter/>
                            {character.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const Others = ({starships, vehicles, planets, species}) => {

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