import { useCallback, useEffect, useState } from 'react';

const useStarship = (data) => {

    const [films, setFilms] = useState([]);
    const [pilots, setpilots] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getFilms = useCallback(async () => {
        try {
            data.films.forEach((film) => {
                fetch(film)
                    .then((responseData) => responseData.json())
                    .then((filmData) => setFilms((prevstate) => {
                        if (prevstate.includes(filmData.title)) return prevstate;
                        return [
                            ...prevstate,
                            {
                                title: filmData.title,
                                url: filmData.url,
                            }
                        ]
                    }))
            })
        } catch {
        } finally {
            setIsLoading(false)
        }
    }, [data.films]);

    const getPilots = useCallback(async () => {
        try {
            data.pilots.forEach((pilot) => {
                fetch(pilot)
                    .then((responseData) => responseData.json())
                    .then((pilotData) => setpilots((prevstate) => {
                        if (prevstate.includes(pilotData.name)) return prevstate;
                        return [
                            ...prevstate,
                            {
                                name: pilotData.name,
                                url: pilotData.url,
                            }
                        ]
                    }));
            });
        } catch {
        } finally {
            setIsLoading(false)
        }
    }, [data.pilots])

    useEffect(() => {
        getFilms();
    }, [getFilms])

    useEffect(() => {
        getPilots()
    }, [getPilots])

    return {films, pilots, isLoading}
}

export default useStarship;