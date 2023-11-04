import { jwtDecode } from "jwt-decode";
import moment from "moment";

export const getTokenData = (token : string) => {
    if (!token) 
        return null;
    try {
        const decoded: any = jwtDecode(token);
        return decoded;
    } catch (error) { // console.log(error);
        return null;
    }
};

// humanize date from now
export const humanizeDate = (date : string | Date) => {
    return moment(date).fromNow();
};
