import React, { useState } from 'react'
import { Container, Form, Nav, Navbar } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { Theme } from '../Utils/Theam';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

export const NavBar = ({ children }) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const storeData = useSelector(state => state)
    const [checked, setChecked] = useState(storeData.Theme === 'theme-dark' ? true : false)

    const changeTemp = (value) => {
        setTimeout(() => {
            dispatch({ type: "TEMPERATURE", payload: value })
        }, 1000);
    }


    const isActive = (path) => {
        let temp = path === location.pathname ? "active" : ""
        return temp
    }

    const handleOnClick = (e) => {
        if (e === true) {
            Theme.setTheme('theme-dark')
            dispatch({ type: "THEME", payload: "theme-dark" })
        }
        else {
            Theme.setTheme('theme-light')
            dispatch({ type: "THEME", payload: "theme-light" })

        }
        // e === true ? Theme.setTheme('theme-dark') : Theme.setTheme('theme-light');
    }

    return (
        <React.Fragment>
            <Navbar bg="dark" variant="dark">

                <Container>
                    <Navbar.Brand href="/" >Home</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/#/favorites" active={isActive("/favorites")}>Favorites</Nav.Link>
                        <Nav.Link href="#" active={isActive("/#C")} onClick={() => changeTemp("Metric")}>C</Nav.Link>
                        <Navbar.Text>/</Navbar.Text>
                        <Nav.Link href="#" active={isActive("/#F")} onClick={() => changeTemp("Imperial")}>F</Nav.Link>
                    </Nav>
                    <BootstrapSwitchButton
                        checked={storeData.Theme === 'theme-dark' ? true : false}
                        onlabel='Dark'
                        offlabel='Light'
                        width={100}
                        onChange={(e) => handleOnClick(e)}
                    />

                </Container>
            </Navbar>

            {children}
        </React.Fragment>
    )

}
