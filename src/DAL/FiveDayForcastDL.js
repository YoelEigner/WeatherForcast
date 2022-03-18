import axios from "axios"

const FiveDayForcastDL = async (obj, temperature) => {
    let resp = await axios.get(process.env.REACT_APP_WEATHER_API_URL + '/forecasts/v1/daily/5day/' + obj + '?apikey=' + process.env.REACT_APP_WEATHER_API_KEY + '&metric=' + temperature)
    return resp
}
export default FiveDayForcastDL
