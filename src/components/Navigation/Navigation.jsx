import { GiStarfighter, GiCharacter, GiFilmProjector, GiSpaceship, GiHouse } from "react-icons/gi";
import { NavLink } from 'react-router-dom';

import "./Navigation.scss"

const Navigation = () => {
    return (
        <nav className="navigation">
            <NavLink to="/" className={({isActive}) => isActive ? "navigation__link active" : "navigation__link"}>
                <GiHouse size={20}/>
                Home
            </NavLink>
            <NavLink to="/characters" className={({isActive}) => isActive ? "navigation__link active" : "navigation__link"}>
                <GiCharacter size={20}/>
                Characters
            </NavLink>
            <NavLink to="/films" className={({isActive}) => isActive ? "navigation__link active" : "navigation__link"}>
                <GiFilmProjector size={20}/>
                Films
            </NavLink>
            <NavLink to="/starships" className={({isActive}) => isActive ? "navigation__link active" : "navigation__link"}>
                <GiStarfighter size={20}/>
                Starships
            </NavLink>
            <NavLink to="/vehicles" className={({isActive}) => isActive ? "navigation__link active" : "navigation__link"}>
                <GiSpaceship size={20}/>
                Vehicles
            </NavLink>
        </nav>
    )
}

export default Navigation;