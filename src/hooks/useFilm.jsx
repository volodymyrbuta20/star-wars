import { useCallback, useEffect, useState } from 'react';

const useFilm = (data) => {

    const [characters, setCharacters] = useState([]);
    const [starships, setStarships] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [species, setSpecies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getCharacters = useCallback(async () => {
        try {
            data.characters.forEach((character) => {
                fetch(character)
                    .then((responseData) => responseData.json())
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
    }, [data.characters]);

    const getStarships = useCallback(async () => {
        try {
            data.starships.forEach((starship) => {
                fetch(starship)
                    .then((responseData) => responseData.json())
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
    }, [data.starships]);

    const getVehicles = useCallback(async () => {
        try {
            data.vehicles.forEach((vehicle) => {
                fetch(vehicle)
                    .then((responseData) => responseData.json())
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
    }, [data.vehicles]);

    const getPlanets = useCallback(async () => {
        try {
            data.planets.forEach((planet) => {
                fetch(planet)
                    .then((responseData) => responseData.json())
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
    }, [data.planets]);

    const getSpecies = useCallback(async () => {
        try {
            data.species.forEach((specie) => {
                fetch(specie)
                    .then((responseData) => responseData.json())
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
    }, [data.species]);

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

    return {characters, starships, vehicles, planets, species, isLoading}
}

export default useFilm;