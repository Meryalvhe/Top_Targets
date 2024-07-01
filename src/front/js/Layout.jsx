import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";
// Custom Component
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
// Custom Pages
import { Home } from "./pages/Home.jsx";
import Login from "./pages/Login.jsx"
import Signup from "./pages/signup.jsx";
import { Criminals} from "./pages/Criminals.jsx";
import { MissingPersons } from "./pages/MissingPersons.jsx";
import { CurrentCriminal } from "./pages/CurrentCriminals.jsx";
import { Contact } from "./pages/Contact.jsx";
import {About} from "./pages/About.jsx";
import { CreateStory } from "./pages/CreateStory.jsx";
import { Stories } from "./pages/Stories.jsx";
import { Profile } from "./pages/Profile.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div >
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Signup />} path = "/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Criminals />} path="/criminals" />
                        <Route element={<MissingPersons />} path="/missing-persons" />
                        <Route element={<CurrentCriminal />} path="/current-criminal" />
                        <Route element={<Contact />} path="/contact" />
                        <Route element={<About />} path="/about" />
                        <Route element={<CreateStory />} path="/create-story" />
                        <Route element={<Stories />} path="/stories" />
                        <Route element={<Profile />} path="/profile" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
                
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
