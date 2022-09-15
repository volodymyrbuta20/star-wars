import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import {Characters, Films, Starships, Vehicles, SingleCharacter, SingleFilm, SingleStarship, SingleVehicle} from "./pages";

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Header/>
                <Navigation/>
                <main>
                    <Routes>
                        <Route path="/" element={<Characters/>}/>
                        <Route path="/:characterId" element={<SingleCharacter/>}/>
                        <Route path="/films" element={<Films/>}/>
                        <Route path="/films/:filmId" element={<SingleFilm/>}/>
                        <Route path="/starships" element={<Starships/>}/>
                        <Route path="/starships/:starshipId" element={<SingleStarship/>}/>
                        <Route path="/vehicles" element={<Vehicles/>}/>
                        <Route path="/vehicles/:vehicleId" element={<SingleVehicle/>}/>
                    </Routes>
                </main>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
