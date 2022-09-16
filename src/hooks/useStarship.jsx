import { useCallback, useEffect, useState } from 'react';
import useHttp from './http.hook';

const useStarship = (data) => {

    const [films, setFilms] = useState([]);
    const [pilots, setpilots] = useState([]);
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
                            }
                        ]
                    }))
            })
        } catch {
        } finally {
            setIsLoading(false)
        }
    }, [data.films, request]);

    const getPilots = useCallback(async () => {
        try {
            data.pilots.forEach((pilot) => {
                request(pilot)
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
    }, [data.pilots, request])

    useEffect(() => {
        getFilms();
    }, [getFilms])

    useEffect(() => {
        getPilots()
    }, [getPilots])

    return {films, pilots, isLoading, loading}
}

export default useStarship;