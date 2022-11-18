import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ReactImageFallback from "react-image-fallback";
import InputSearch from '../../components/InputSearch/InputSearch';
import Spinner from "../../UI/Spinner/Spinner";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Pagination from '../../UI/Pagination/Pagination';
import ErrorImg from "../../services/images/no-image-icon-21.png";
import { _apiBase } from '../../utils/baseUrl';
import useHttp from '../../hooks/http.hook';
import getUrlId from '../../utils/getUrlId';

import "./Starships.scss";

const Starships = () => {

    const [starshipsList, setStarshipsList] = useState ([]);
    const [data, setData] = useState({});
    const [page, setPage] = useState(1);
    const [inputSearch, setInputSearch] = useState('');

    const {request, loading, error} = useHttp();

    const getData = useCallback(async () => {
        const response = await request(`${_apiBase}starships/?page=${page}`);
        setData(response);
        setStarshipsList(response.results);
    }, [page])

    const getFilteredData = useCallback(async () => {
        const response = await request(`${_apiBase}starships/?search=${inputSearch}`);
        setStarshipsList(response.results);
        setData(response);
    }, [inputSearch])

    useEffect(() => {
        getData()
    }, [getData]);

    useEffect(() => {
        getFilteredData()
    }, [getFilteredData]);

    const pageCount = Math.ceil(data.count / 10);

    const handleInputChange = (e) => {
        setInputSearch(e.target.value);
    }

    const spinner = loading ? <Spinner/> : <View starshipsList={starshipsList}/>

    return (
        <div className="starships">
            <div className="starships__wrapper">
                <div className="starships__header">
                    <InputSearch onChange={(e) => handleInputChange(e)}/>
                    {data.count > 10 ? <Pagination pages={pageCount} changePage={setPage}/> : null}
                </div>

                {error ? <ErrorMessage/> : spinner}
            </div>
        </div>
    )
}

const View = ({starshipsList}) => {
    return (
        <ul className="starships__list">
            {starshipsList.map(starship => (
                <li className="starships__list-item" key={starship.name}>
                    <Link to={`/starships/${getUrlId(starship.url)}`}>
                        <ReactImageFallback 
                            src={`https://starwars-visualguide.com/assets/img/starships/${getUrlId(starship.url)}.jpg`} 
                            fallbackImage={ErrorImg}
                            alt={starship.name} />
                        <div className="starships__name">{starship.name}</div>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default Starships;