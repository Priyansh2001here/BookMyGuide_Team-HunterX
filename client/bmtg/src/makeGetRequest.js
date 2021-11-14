import axios from "axios";
import {getAccessToken} from "./jwtparser";

export const makeGetRequest = async (url) => {
    const accessToken = getAccessToken()
    const res = await axios.get(url, {
        headers: {
            'Authorization': 'Bearer ' + accessToken

        }
    })
    return res
}