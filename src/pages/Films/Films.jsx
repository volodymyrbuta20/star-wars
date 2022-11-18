import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ReactImageFallback from "react-image-fallback";
import StarWarsService from '../../services/StarWarsService';
import InputSearch from '../../components/InputSearch/InputSearch';
import Spinner from '../../UI/Spinner/Spinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import ErrorImg from "../../services/images/no-image-icon-21.png"

import "./Films.scss"

const Films = () => {

    const [filmList, setFilmList] = useState([]);
    const [inputSearch, setInputSearch] = useState('');

    const {_apiBase, _transformFilm, request, loading, error} = StarWarsService();

    const getData = useCallback(async () => {
        const response = await request(`${_apiBase}films/`);
        setFilmList(response.results.map(_transformFilm));
    }, [])

    const getFilteredData = useCallback(async () => {
        const response = await request(`${_apiBase}films/?search=${inputSearch}`);
        setFilmList(response.results.map(_transformFilm));
    }, [inputSearch])

    useEffect(() => {
        getData()
    }, [getData]);

    useEffect(() => {
        getFilteredData()
    }, [getFilteredData]);

    const handleInputChange = (e) => {
        setInputSearch(e.target.value);
    }

    return (
        <div className="films">
            <div className="films__header">
                <InputSearch onChange={(e) => handleInputChange(e)}/>
            </div>

            {loading ? <Spinner/> : (
                <ul className="films__list">
                    {filmList.map(film => (
                        <li className="films__list-item" key={film.name}>
                            <Link to={`/films/${film.id}`}>
                                <ReactImageFallback 
                                    src={`https://starwars-visualguide.com/assets/img/films/${film.id}.jpg`} 
                                    fallbackImage={ErrorImg}
                                    alt={film.name} />
                                <div className="films__name">{film.name}</div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Films;