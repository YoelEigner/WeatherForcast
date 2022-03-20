import React, { useEffect, useState } from "react"
import { NavBar } from "./NavBar"
import AsyncSelect from 'react-select/async';
import LoadAsyncCities from "../Utils/LoadAsyncCities";
import { FiveDayCondidtions } from "./FiveDayCondidtions";
import GetConditionsDL from './../DAL/GetConditionsDL';
import { useSelector, useDispatch } from 'react-redux';
import { ErrorFallback } from "../Utils/ErrorFallback";
import { FaStar } from 'react-icons/fa';
import { Button } from "react-bootstrap";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";
import GetByLocationService from './../Services/GetByLocationService';



export const Home = () => {
    const [selectedCity, setSelectedCity] = useState("")
    const [currentWeather, setCurrentWeather] = useState("")
    const storeData = useSelector(state => state)
    const [temperature, setTemperature] = useState("Metric")
    const [faveBtn, setFaveBtn] = useState("Click To Add Favorites")
    const dispatch = useDispatch()
    const { key, name } = useParams();
    const [disabled, setDisabled] = useState(false)
    const [defaultCity, setDefaultCity] = useState({ 'value': "Tel Aviv", 'label': "Tel Aviv" })
    const [geoLocation, setGeoLocation] = useState({ lat: "", long: "" })

    const geo = navigator.geolocation
    const loadOptions = async (e) => {
        return await LoadAsyncCities(e)
    };
    useEffect(() => {
        setTemperature(storeData.Temperature)
    }, [storeData.Temperature, storeData.Temperature.length])

    const isFave = (e) => {
        let temp = storeData.Favorites.find(x => x.name == e)
        if (temp !== undefined) {
            setFaveBtn("Added To Favorites")
            setDisabled(true)
        }
        else {
            setFaveBtn("Click To Add Favorites")
            setDisabled(false)

        }
    }
    const handleChange = async (e) => {
        e.value && isFave(e.value)
        setSelectedCity(e)
        let resp = await GetConditionsDL(e.key)
        e.value && setDefaultCity({ "value": e.value, "label": e.label })
        setCurrentWeather(resp.data[0])

    }

    const addToFave = async () => {
        let temp = await GetConditionsDL(selectedCity.key)
        let payload = selectedCity.value !== undefined ? selectedCity.value : "Tel Aviv"
        dispatch({ type: "FAVORITES", payload: { name: payload, id: selectedCity.key, weather: temp } })

        setFaveBtn("Added To Favorites")
        setDisabled(true)
    }
    useEffect(() => {
        const fetchData = async () => {
            let resp = await GetByLocationService(geoLocation.lat + "," + geoLocation.long)
            resp !== undefined && handleChange({ key: resp })
            resp !== undefined && setSelectedCity({ key: resp })
            dispatch({ type: "LOCATION", payload: geoLocation })
        }
        fetchData();
    }, [geoLocation]);

    useEffect(() => {
        storeData.Location.lat === '' &&
            navigator.geolocation.getCurrentPosition((success, error) => {
                if (error) { console.log(error) }
                else {
                    console.log(storeData.Location)
                    setGeoLocation({ lat: success.coords.latitude, long: success.coords.longitude })
                }
            })
        if (name !== undefined) {
            setDefaultCity({ "value": name, "label": name })
            isFave(name)
            handleChange({ key: key })
            setSelectedCity({ "value": name, "label": name, key: key })

        }
        else {
            setDefaultCity({ "value": "Tel Aviv", "label": "Tel Aviv" })
            isFave("Tel Aviv")
            handleChange({ key: "215854" })
            setSelectedCity({ key: "215854" })
        }
    }, [])

    return (
        <NavBar>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <br />
                <Button disabled={disabled} variant="secondary" onClick={addToFave}>{faveBtn}</Button>
                <br />
                <br />
                <br />
                <div style={{ width: '20rem', marginLeft: 'auto', marginRight: 'auto' }}>
                    <AsyncSelect
                        loadOptions={loadOptions}
                        onChange={(e) => { handleChange(e) }}
                        value={defaultCity}

                    />
                </div>
                <br />
                <br />
                <br />
                <h3> {currentWeather.Temperature && currentWeather.Temperature[temperature].Value +
                    "' " + currentWeather.Temperature[temperature].Unit + " | "}
                    {currentWeather.WeatherText}</h3>
                <br />
                <br />
                <br />
                {selectedCity !== "" && <FiveDayCondidtions selectedCity={selectedCity.key} temperature={temperature} />}

            </ErrorBoundary>
        </NavBar>
    )
}