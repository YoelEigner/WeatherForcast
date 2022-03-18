import axios from "axios"

const GetByLocationDL = async (obj) => {
    let resp = await axios.get(process.env.REACT_APP_WEATHER_API_URL + '/locations/v1/cities/geoposition/search?apikey=' + process.env.REACT_APP_WEATHER_API_KEY + '&q=' + obj)
    return resp
}
export default GetByLocationDL