import { useCallback, useEffect, useState } from 'react';
import useHttp from './http.hook';

const useCharacter = (data) => {
    const [films, setFilms] = useState([]);
    const [starships, setStarships] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [planet, setPlanet] = useState({
        name: '',
        url: '',
    });
    const [isLoading, setIsLoading] = useState(true);

    const {request, loading} = useHttp();

    const getFilms = useCallback(async () => {
        try {
            data.films.forEach((film) => {
                request(film)
                    .then((filmData) => setFilms((prevstate) => {
                        if (prevstate.includes(filmData.title)) return prevstate;
                        return [
                            ...prevstate,
                            {
                                title: filmData.title,
                                url: filmData.url,
                            },
                        ];
                    }));
            });
        } catch {
        } finally {
            setIsLoading(false);
        }
    }, [data.films, request])

    const getStarships = useCallback(async () => {
        try {
            data.starships.forEach(async (starship) => {
                request(starship)
                    .then((starshipData) => setStarships((prevstate) => {
                    if (prevstate.includes(starshipData.name)) return;
                    return [
                        ...prevstate,
                        {
                            name: starshipData.name,
                            url: starshipData.url,
                        }
                    ];
                }));
            });
        } catch {
        } finally {
            setIsLoading(false);
        }
    }, [data.starships, request])

    const getVehicles = useCallback(async () => {
        try {
            data.vehicles.forEach(async (vehicle) => {
                request(vehicle)
                    .then((vehicleData) => setVehicles((prevstate) => {
                    if (prevstate.includes(vehicleData.name)) return;
                    return [
                        ...prevstate,
                        {
                            name: vehicleData.name,
                            url: vehicleData.url,
                        }
                    ];
                }));
            });
        } catch {
        } finally {
            setIsLoading(false);
        }
    }, [data.vehicles, request]);

    const getPlanet = useCallback(async () => {
        if (!data.planet) return;
        request(data.planet)
            .then((planetData) => setPlanet({
            name: planetData.name,
            url: planetData.url,
        }))
    }, [data.planet, request])

    useEffect(() => {
        getFilms()
    }, [getFilms])

    useEffect(() => {
        getStarships()
    }, [getStarships])

    useEffect(() => {
        getVehicles()
    }, [getVehicles])

    useEffect(() =>{
        getPlanet()
    }, [getPlanet])

    return {films, starships, vehicles, planet, isLoading, loading}

}

export default useCharacter;

