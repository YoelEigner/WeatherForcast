import axios from "axios"

const GetConditionsDL = async (obj) => {
    let resp = await axios.get(process.env.REACT_APP_WEATHER_API_URL + '/currentconditions/v1/' + obj + '?apikey=' + process.env.REACT_APP_WEATHER_API_KEY)
    return resp
}
export default GetConditionsDL