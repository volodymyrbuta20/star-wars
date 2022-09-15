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

import "./Vehicles.scss";

const Vehicles = () => {

    const [vehiclesList, setVehiclesList] = useState ([]);
    const [data, setData] = useState({});
    const [page, setPage] = useState(1);
    const [inputSearch, setInputSearch] = useState('');

    const {_apiBase, _transformVehicle, request, loading, error} = StarWarsService();

    const getData = useCallback(async () => {
        const response = await request(`${_apiBase}vehicles/?page=${page}`);
        setData(response);
        setVehiclesList(response.results.map(_transformVehicle));
    }, [page])

    const getFilteredData = useCallback(async () => {
        const response = await request(`${_apiBase}vehicles/?search=${inputSearch}`);
        setVehiclesList(response.results.map(_transformVehicle));
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
        <div className="vehicles">
            <div className="vehicles__header">
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
                <ul className="vehicles__list">
                    {vehiclesList.map(vehicle => (
                        <li className="vehicles__list-item" key={vehicle.name}>
                            <Link to={`/vehicles/${vehicle.id}`}>
                                <ReactImageFallback 
                                    src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.id}.jpg`} 
                                    fallbackImage={ErrorImg}
                                    alt={vehicle.name} />
                                <div className="vehicles__name">{vehicle.name}</div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )

}

export default Vehicles;