import React from "react"
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "../Components/Home";
import { Favorites } from './../Components/Favorites';


const InternalRouter = () => {
    return (
        <Router>
            {/* <Router basename={process.env.PUBLIC_URL}> */}
            {console.log(process.env.PUBLIC_URL)}
            <Routes>
                {/* <Route path='*' element={<Home />} /> */}
                <Route exact path='/' element={<Home />} />
                <Route exact path={'/:key/:name'} element={<Home />} />
                <Route exact path={'/favorites'} element={<Favorites />} />
            </Routes>
        </Router>
    );
}

export default InternalRouter;