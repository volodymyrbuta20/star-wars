import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ReactImageFallback from "react-image-fallback";
import StarWarsService from '../../services/StarWarsService';
import ReactPaginate from "react-paginate";
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import InputSearch from '../../components/InputSearch/InputSearch';
import Spinner from "../../components/Spinner/Spinner";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import ErrorImg from "../../services/images/no-image-icon-21.png"

import "./Starships.scss";

const Starships = () => {

    const [starshipsList, setStarshipsList] = useState ([]);
    const [data, setData] = useState({});
    const [page, setPage] = useState(1);
    const [inputSearch, setInputSearch] = useState('');

    const {_apiBase, _transformStarship, request, loading, error} = StarWarsService();

    const getData = useCallback(async () => {
        const response = await request(`${_apiBase}starships/?page=${page}`);
        setData(response);
        setStarshipsList(response.results.map(_transformStarship));
    }, [page])

    const getFilteredData = useCallback(async () => {
        const response = await request(`${_apiBase}starships/?search=${inputSearch}`);
        setStarshipsList(response.results.map(_transformStarship));
        setData(response);
    }, [inputSearch])

    useEffect(() => {
        getData()
    }, [getData]);

    useEffect(() => {
        getFilteredData()
    }, [getFilteredData]);

    const pageCount = Math.ceil(data.count / 10);
    const changePage = ({ selected }) => {
        setPage(selected + 1);
    };

    const handleInputChange = (e) => {
        setInputSearch(e.target.value);
    }

    return (
        <div className="starships">
            <div className="starships__header">
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

            {loading ? <Spinner/> : (
                <ul className="starships__list">
                    {starshipsList.map(starship => (
                        <li className="starships__list-item" key={starship.name}>
                            <Link to={`/starships/${starship.id}`}>
                                <ReactImageFallback 
                                    src={`https://starwars-visualguide.com/assets/img/starships/${starship.id}.jpg`} 
                                    fallbackImage={ErrorImg}
                                    alt={starship.name} />
                                <div className="starships__name">{starship.name}</div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Starships;