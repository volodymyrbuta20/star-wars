import { useCallback, useEffect, useState } from 'react';

const useCharacter = (data) => {
    const [films, setFilms] = useState([]);
    const [starships, setStarships] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [planet, setPlanet] = useState({
        name: '',
        url: '',
    });
    const [isLoading, setIsLoading] = useState(true);

    const getFilms = useCallback(async () => {
        try {
            data.films.forEach(async (film) => {
                const response = await fetch(film);
                const filmData = await response.json();
    
                setFilms((prevState) => {
                    if (prevState.includes(filmData.title)) return prevState;
                    return [
                        ...prevState,
                        {
                            title: filmData.title,
                            url: filmData.url,
                        },
                    ];
                });
            });
        } catch {
        } finally {
            setIsLoading(false);
        }
    }, [data.films])

    const getStarships = useCallback(async () => {
        try {
            data.starships.forEach(async (starship) => {
                const response = await fetch(starship);
                const starshipData = await response.json();
    
                setStarships((prevstate) => {
                    if (prevstate.includes(starshipData.name)) return;
                    return [
                        ...prevstate,
                        {
                            name: starshipData.name,
                            url: starshipData.url,
                        }
                    ];
                });
            });
        } catch {
        } finally {
            setIsLoading(false);
        }
    }, [data.starships])

    const getVehicles = useCallback(async () => {
        try {
            data.vehicles.forEach(async (vehicle) => {
                const response = await fetch(vehicle);
                const vehicleData = await response.json();
    
                setVehicles((prevstate) => {
                    if (prevstate.includes(vehicleData.name)) return;
                    return [
                        ...prevstate,
                        {
                            name: vehicleData.name,
                            url: vehicleData.url,
                        }
                    ];
                });
            });
        } catch {
        } finally {
            setIsLoading(false);
        }
    }, [data.vehicles]);

    const getPlanet = useCallback(async () => {
        if (!data.planet) return;
        const response = await fetch(data.planet);
        const planetData = await response.json();
        setPlanet({
            name: planetData.name,
            url: planetData.url,
        })
    }, [data.planet])

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

    return {films, starships, vehicles, planet, isLoading}

}

export default useCharacter;

