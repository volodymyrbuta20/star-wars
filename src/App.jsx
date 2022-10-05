import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import {MainPage, Characters, Films, Starships, Vehicles, SingleCharacter, SingleFilm, SingleStarship, SingleVehicle} from "./pages";
import Modal from "./components/Modal/Modal";
import FormLogin from "./components/FormLogin/FormLogin";
import FormRegister from "./components/Formregister/FormRegister";

function App() {
    const [loginModal, setLoginModal] = useState(false)
    const [registerModal, setRegisterModal] = useState(false)

    return (
        <BrowserRouter>
            <div className="app">
                {loginModal && <Modal active={loginModal} setActive={setLoginModal}>
                    <FormLogin 
                        openModal={setRegisterModal}
                        closeModal={setLoginModal}/>
                </Modal>}
                {registerModal && <Modal active={registerModal} setActive={setRegisterModal}>
                    <FormRegister 
                        openModal={setLoginModal} 
                        closeModal={setRegisterModal}/>
                </Modal>}
                <Header openLoginModal={setLoginModal} openRegisterModal={setRegisterModal}/>
                <Navigation/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/characters" element={<Characters/>}/>
                        <Route path="/characters/:characterId" element={<SingleCharacter/>}/>
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
