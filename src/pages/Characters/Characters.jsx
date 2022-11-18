import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ReactImageFallback from "react-image-fallback";
import InputSearch from '../../components/InputSearch/InputSearch';
import Spinner from "../../UI/Spinner/Spinner";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Pagination from '../../UI/Pagination/Pagination';
import ErrorImg from "../../services/images/no-image-icon-21.png"
import getUrlId from '../../utils/getUrlId';
import { _apiBase } from '../../utils/baseUrl';
import useHttp from '../../hooks/http.hook';

import "./Characters.scss"

const Characters = () => {

    const [charList, setCharList] = useState([]);
    const [data, setData] = useState({});
    const [page, setPage] = useState(1);
    const [inputSearch, setInputSearch] = useState('');

    const {request, loading, error} = useHttp();

    const getData = useCallback(async () => {
        const response = await request(`${_apiBase}people/?page=${page}`);
        setData(response);
        setCharList(response.results);
    }, [page])

    const getFilteredData = useCallback(async () => {
        const response = await request(`${_apiBase}people/?search=${inputSearch}`);

        setData(response);
        setCharList(response.results);
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

    const pageCount = Math.ceil(data.count / 10);

    const spinner = loading ? <Spinner/> : <View charList={charList}/>;

    return (
        <div className="characters">
            <div className="characters__wrapper">
                <div className="characters__header">
                    <InputSearch onChange={(e) => handleInputChange(e)}/>
                    {data.count > 10 ? <Pagination pages={pageCount} changePage={setPage}/> : null}
                </div>

                {error ? <ErrorMessage/> : spinner}
            </div>
        </div>
    )
}

const View = ({charList}) => {
    return (
        <ul className="characters__list">
            {charList.map(item => (
                <li className="characters__list-item" key={getUrlId(item.url)}>
                    <Link to={`/characters/${getUrlId(item.url)}`}>
                        <ReactImageFallback 
                            src={`https://starwars-visualguide.com/assets/img/characters/${getUrlId(item.url)}.jpg`} 
                            fallbackImage={ErrorImg}
                            alt={item.name} />
                        <div className="characters__name">{item.name}</div>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default Characters;