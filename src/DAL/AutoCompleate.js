import axios from "axios"

const AutoCompleateDL = async (obj) => {
    let resp = await axios.get(process.env.REACT_APP_WEATHER_API_URL + '/locations/v1/cities/autocomplete?apikey=' + process.env.REACT_APP_WEATHER_API_KEY + '&q=' + obj)
    return resp
}
export default AutoCompleateDL