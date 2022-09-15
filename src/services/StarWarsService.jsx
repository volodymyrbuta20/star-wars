import useHttp from "../hooks/http.hook";

const StarWarsService = () => {

    const _apiBase = "https://swapi.dev/api/";

    const {loading, error, request, clearError} = useHttp();

    const getCharacter = async (id) => {
        const response = await request(`${_apiBase}people/${id}`);
        return _transformCharacter(response)
    }

    const getFilm = async (id) => {
        const response = await request(`${_apiBase}films/${id}`)
        return _transformFilm(response)
    }

    const getStarship = async (id) => {
        const response = await request(`${_apiBase}starships/${id}`)
        return _transformStarship(response)
    }

    const getVehicle = async (id) => {
        const response = await request(`${_apiBase}vehicles/${id}`)
        return _transformVehicle(response)
    }

    const _transformCharacter = (char) => {
        return {
            id: char.url.split('/').splice(-2, 1)[0],
            planet: char.homeworld,
            height: char.height || "unknown",
            weight: char.weight || "unknown",
            name: char.name,
            birthYear: char.birth_year,
            gender: char.gender,
            films: char.films,
            starships: char.starships,
            vehicles: char.vehicles,
            species: char.species,
            skin: char.skin_color || "unknown",
            hair: char.hair_color || "unknown",
            eye: char.eye_color || "unknown",
            url: char.url,
        }
    }

    const _transformFilm = (film) => {
        return {
            id: film.url.split('/').splice(-2, 1)[0],
            name: film.title,
            characters: film.characters,
            director: film.director,
            sinopse: film.opening_crawl,
            producer: film.producer,
            planets: film.planets,
            starships: film.starships,
            vehicles: film.vehicles,
            date: film.release_date,
            species: film.species,
            url: film.url,
        }
    }

    const _transformStarship = (starship) => {
        return {
            id: starship.url.split('/').splice(-2, 1)[0],
            model: starship.model,
            name: starship.name,
            shipClass: starship.starship_class,
            mglt: starship.MGLT,
            length: starship.length,
            manufacturer: starship.manufacturer,
            url: starship.url,
            price: starship.cost_in_credits,
            passengers: starship.passengers,
            crew: starship.crew,
            films: starship.films,
            pilots: starship.pilots,
            speed: starship.max_atmosphering_speed,
        }
    }

    const _transformVehicle = (vehicle) => {
        return {
            id: vehicle.url.split('/').splice(-2, 1)[0],
            name: vehicle.name,
            model: vehicle.model,
            vehicleClass: vehicle.vehicle_class,
            length: vehicle.length,
            manufacturer: vehicle.manufacturer,
            url: vehicle.url,
            price: vehicle.cost_in_credits,
            passengers: vehicle.passengers,
            crew: vehicle.crew,
            films: vehicle.films,
            pilots: vehicle.pilots,
            speed: vehicle.max_atmosphering_speed,
        }
    }

    return {
        request, 
        _transformCharacter, 
        _apiBase, 
        getCharacter, 
        _transformFilm, 
        loading, 
        error, 
        clearError, 
        getFilm,
        getStarship,
        _transformStarship,
        _transformVehicle,
        getVehicle,
    };

}

export default StarWarsService;
