import AutoCompleateDL from "../DAL/AutoCompleate";

const LoadAsyncCities = async (val) => {
    let resp
    try {
        resp = await AutoCompleateDL(val)

    } catch (error) {
        return error
    }
    let data = resp.data.map(x => { return ({ 'value': x.LocalizedName, 'label': x.LocalizedName, key: x.Key }) })

    if (data === []) {
        return [];
    } else {
        return data;
    }

}
export default LoadAsyncCities