import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ReactImageFallback from "react-image-fallback";
import StarWarsService from '../../services/StarWarsService';
import InputSearch from '../../components/InputSearch/InputSearch';
import ReactPaginate from "react-paginate";
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import Spinner from "../../components/Spinner/Spinner";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import ErrorImg from "../../services/images/no-image-icon-21.png"

import "./Characters.scss"

const Characters = () => {

    const [charList, setCharList] = useState([]);
    const [data, setData] = useState({});
    const [page, setPage] = useState(1);
    const [inputSearch, setInputSearch] = useState('');

    const {_apiBase, _transformCharacter, request, loading, error} = StarWarsService();

    const getData = useCallback(async () => {
        const response = await request(`${_apiBase}people/?page=${page}`);
        setData(response);
        setCharList(response.results.map(_transformCharacter));
    }, [page])

    const getFilteredData = useCallback(async () => {
        const response = await request(`${_apiBase}people/?search=${inputSearch}`);

        setData(response);
        setCharList(response.results.map(_transformCharacter));
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
    const changePage = ({ selected }) => {
        setPage(selected + 1);
    };

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    return (
        <div className="characters">
            <div className="characters__header">
                <InputSearch onChange={(e) => handleInputChange(e)}/>
                <ReactPaginate
                    previousLabel={<MdArrowBackIosNew/>}
                    nextLabel={<MdArrowForwardIos/>}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    activeClassName={"paginationActive"}
                    containerClassName={"pagination"}
                    marginPagesDisplayed={1}
                />
            </div>

            {errorMessage}
            {spinner}
            <ul className="characters__list">
                {charList.map(item => (
                    <li className="characters__list-item" key={item.id}>
                        <Link to={`/${item.id}`}>
                            <ReactImageFallback 
                                src={`https://starwars-visualguide.com/assets/img/characters/${item.id}.jpg`} 
                                fallbackImage={ErrorImg}
                                alt={item.name} />
                            <div className="characters__name">{item.name}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Characters;