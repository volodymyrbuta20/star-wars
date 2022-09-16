import { useCallback, useEffect, useState } from 'react';
import useHttp from './http.hook';

const useFilm = (data) => {

    const [characters, setCharacters] = useState([]);
    const [starships, setStarships] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [species, setSpecies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const {request, loading} = useHttp();

    const getCharacters = useCallback(async () => {
        try {
            data.characters.forEach((character) => {
                request(character)
                    .then((characterData) => setCharacters((prevstate) => {
                        if (prevstate.includes(characterData.name)) return prevstate;
                        return [
                            ...prevstate,
                            {
                                name: characterData.name,
                                url: characterData.url,
                            }
                        ]
                    }));
            });
        } catch {
        } finally {
            setIsLoading(false);
        }
    }, [data.characters, request]);

    const getStarships = useCallback(async () => {
        try {
            data.starships.forEach((starship) => {
                request(starship)
                    .then((starshipsData) => setStarships((prevstate) => {
                        if (prevstate.includes(starshipsData.name)) return prevstate;
                        return [
                            ...prevstate,
                            {
                                name: starshipsData.name,
                                url: starshipsData.url,
                            }
                        ]
                    }));
            });
        } catch {
        } finally {
            setIsLoading(false);
        }
    }, [data.starships, request]);

    const getVehicles = useCallback(async () => {
        try {
            data.vehicles.forEach((vehicle) => {
                request(vehicle)
                    .then((vehiclesData) => setVehicles((prevstate) => {
                        if (prevstate.includes(vehiclesData.name)) return prevstate;
                        return [
                            ...prevstate,
                            {
                                name: vehiclesData.name,
                                url: vehiclesData.url,
                            }
                        ]
                    }));
            });
        } catch {
        } finally {
            setIsLoading(false);
        }
    }, [data.vehicles, request]);

    const getPlanets = useCallback(async () => {
        try {
            data.planets.forEach((planet) => {
                request(planet)
                    .then((planetsData) => setPlanets((prevstate) => {
                        if (prevstate.includes(planetsData.name)) return prevstate;
                        return [
                            ...prevstate,
                            {
                                name: planetsData.name,
                                url: planetsData.url,
                            }
                        ]
                    }));
            });
        } catch {
        } finally {
            setIsLoading(false);
        }
    }, [data.planets, request]);

    const getSpecies = useCallback(async () => {
        try {
            data.species.forEach((specie) => {
                request(specie)
                    .then((speciesData) => setSpecies((prevstate) => {
                        if (prevstate.includes(speciesData.name)) return prevstate;
                        return [
                            ...prevstate,
                            {
                                name: speciesData.name,
                                url: speciesData.url,
                            }
                        ]
                    }));
            });
        } catch {
        } finally {
            setIsLoading(false);
        }
    }, [data.species, request]);

    useEffect(() => {
        getCharacters()
    }, [getCharacters])

    useEffect(() => {
        getStarships()
    }, [getStarships])

    useEffect(() => {
        getVehicles()
    }, [getVehicles])

    useEffect(() => {
        getPlanets()
    }, [getPlanets])

    useEffect(() => {
        getSpecies()
    }, [getSpecies])

    return {characters, starships, vehicles, planets, species, isLoading, loading}
}

export default useFilm;