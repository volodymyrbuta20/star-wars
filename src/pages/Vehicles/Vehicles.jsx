import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ReactImageFallback from "react-image-fallback";
import InputSearch from '../../components/InputSearch/InputSearch';
import Spinner from "../../UI/Spinner/Spinner";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import ErrorImg from "../../services/images/no-image-icon-21.png";
import { _apiBase } from '../../utils/baseUrl';
import useHttp from '../../hooks/http.hook';
import Pagination from '../../UI/Pagination/Pagination';
import getUrlId from '../../utils/getUrlId';

import "./Vehicles.scss";

const Vehicles = () => {

    const [vehiclesList, setVehiclesList] = useState ([]);
    const [data, setData] = useState({});
    const [page, setPage] = useState(1);
    const [inputSearch, setInputSearch] = useState('');

    const {request, loading, error} = useHttp();

    const getData = useCallback(async () => {
        const response = await request(`${_apiBase}vehicles/?page=${page}`);
        setData(response);
        setVehiclesList(response.results);
    }, [page])

    const getFilteredData = useCallback(async () => {
        const response = await request(`${_apiBase}vehicles/?search=${inputSearch}`);
        setVehiclesList(response.results);
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

    const spinner = loading ? <Spinner/> : <View vehiclesList={vehiclesList}/>

    return (
        <div className="vehicles">
            <div className="vehicles__wrapper">

                <div className="vehicles__header">
                    <InputSearch onChange={(e) => handleInputChange(e)}/>
                    {data.count > 10 ? <Pagination pages={pageCount} changePage={setPage}/> : null}
                </div>

                {error ? <ErrorMessage/> : spinner}
                
            </div>
        </div>
    )
}

const View = ({vehiclesList}) => {
    return (
        <ul className="vehicles__list">
            {vehiclesList.map(vehicle => (
                <li className="vehicles__list-item" key={vehicle.name}>
                    <Link to={`/vehicles/${getUrlId(vehicle.url)}`}>
                        <ReactImageFallback 
                            src={`https://starwars-visualguide.com/assets/img/vehicles/${getUrlId(vehicle.url)}.jpg`} 
                            fallbackImage={ErrorImg}
                            alt={vehicle.name} />
                        <div className="vehicles__name">{vehicle.name}</div>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default Vehicles;