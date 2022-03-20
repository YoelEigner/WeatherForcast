import React, { useEffect, useState } from 'react'
import { Col, Card, Row } from 'react-bootstrap';
import { NavBar } from './NavBar';
import { useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './../Utils/ErrorFallback';
import { useNavigate } from "react-router-dom";

export const Favorites = () => {
    const storeData = useSelector(state => state)
    const [temperature, setTemperature] = useState("Metric")
    const navigate = useNavigate();

    useEffect(() => {
        setTemperature(storeData.Temperature)
    }, [storeData.Temperature.length])

    const clicked = (x) => {
        navigate('/' + x.id + '/' + x.name)
    }
    return (
        <NavBar>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                Favorites
                <br />
                <br />
                <br />
                <br />
                <Row>
                    {storeData.Favorites.map((x, index) => {
                        return (
                            <Col key={index} >
                                <Card style={{ width: '10rem', marginLeft: 'auto', marginRight: 'auto' }} onClick={() => clicked(x)}>
                                    <Card.Body><b>City:</b> {x.name}</Card.Body>
                                    <Card.Body><b>Temperature: </b>{x.weather.data[0].Temperature[temperature].Value}'
                                        {" " + x.weather.data[0].Temperature[temperature].Unit}</Card.Body>
                                    <Card.Body>{ }</Card.Body>
                                </Card>
                            </Col>

                        )
                    })}
                </Row>
            </ErrorBoundary>
        </NavBar>
    )
}
