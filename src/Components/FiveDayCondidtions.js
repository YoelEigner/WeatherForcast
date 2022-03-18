import React, { useEffect } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import FiveDayForcastDL from '../DAL/FiveDayForcastDL'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../Utils/ErrorFallback';
import IsMetric from './../Utils/IsMetric';

export const FiveDayCondidtions = ({ selectedCity, temperature }) => {
    const [forcast, setForcast] = useState([])
    const storeData = useSelector(state => state)

    const getFiveDay = async () => {
        let resp = await FiveDayForcastDL(selectedCity, IsMetric(storeData.Temperature))
        setForcast(resp.data.DailyForecasts)
    }
    useEffect(() => {
        getFiveDay()
    }, [temperature,selectedCity])

    return (
        <Container>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <b>5 Day Forcast</b>
                <br />
                <br />
                <br />
                <br />
                <Row >
                    {forcast.map((x, index) => {
                        return (
                            <Col key={index} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                <Card style={{ width: '10rem' }}>
                                    <Card.Body>{x.Day.IconPhrase}</Card.Body>
                                    <Card.Body>{x.Temperature.Minimum.Value + ":" + x.Temperature.Maximum.Unit}</Card.Body>
                                    <Card.Body>{x.Temperature.Maximum.Value + ":" + x.Temperature.Maximum.Unit}</Card.Body>
                                    <Card.Body>{ }</Card.Body>
                                </Card>
                            </Col>

                        )
                    })}
                </Row>
            </ErrorBoundary>
        </Container>
    )
}
