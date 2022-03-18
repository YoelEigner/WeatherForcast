
import GetByLocationDL from './../DAL/GetByLocationDL';

const GetByLocationService = async (geoLocation) => {
    if (geoLocation !== ",") {
        let resp = await GetByLocationDL(geoLocation)
        return resp.data.Key
    }

}
export default GetByLocationService