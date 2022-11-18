import { useState, useEffect} from "react";
import { useParams, Link } from 'react-router-dom';
import ReactImageFallback from "react-image-fallback";
import Spinner from "../../UI/Spinner/Spinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { GiCharacter, GiFilmProjector } from "react-icons/gi";
import ErrorImg from "../../services/images/no-image-icon-21.png";
import getUrlId from '../../utils/getUrlId';
import { _apiBase } from '../../utils/baseUrl';
import useHttp from '../../hooks/http.hook';

import "./SingleStarship.scss";

const SingleStarship = () => {

    const {starshipId} = useParams();

    const [starship, setStarship] = useState({});
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
        const getStarship = async () => {
            const dataStarship = await request (`${_apiBase}starships/${starshipId}`)
            setStarship(dataStarship)
            const dataFilms = await retrieveList(dataStarship.films)
            setFilms(dataFilms)
            const dataPilots = await retrieveList(dataStarship.pilots)
            setPilots(dataPilots)
        }
        getStarship()
    },[]);

    return (
        <div className="singlestarship">
            {loading ? <Spinner/> : (
                <div className="singlestarship__wrapper">
                    <div className="singlestarship__data">
                        <Details starship={starship}/>
                        <Others films={films} pilots={pilots}/>
                    </div>
                    <ReactImageFallback 
                        className="singlestarship__image"
                        src={`https://starwars-visualguide.com/assets/img/starships/${starshipId}.jpg`} 
                        fallbackImage={ErrorImg}
                        alt={starship.name}/>
                </div>
            )}
        </div>
    )
}

const Details = ({starship}) => {
    const {name, model, manufacturer, starship_class, cost_in_credits, max_atmosphering_speed, MGLT, length, crew, passengers} = starship;

    return (
        <div className="singlestarship__details">
            <h2 className="singlestarship__details-name">{name}</h2>
            <p>Model: <span>{model}</span> </p>
            <p>Manufacturer: <span>{manufacturer}</span></p>
            <p>Class: <span>{starship_class}</span></p>
            <p>Price: <span>{cost_in_credits}</span></p>
            <p>Speed: <span>{max_atmosphering_speed}</span></p>
            <p>MGLT: <span>{MGLT}</span></p>
            <p>length: <span>{length}</span></p>
            <p>Crew: <span>{crew}</span></p>
            <p>Passengers: <span>{passengers}</span></p>
        </div>
    )
}

const Others = ({films, pilots}) => {

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

export default SingleStarship;