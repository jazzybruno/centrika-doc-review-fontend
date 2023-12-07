import { jwtDecode } from "jwt-decode";
import moment from "moment";

export const getTokenData = (token: string) => {
  if (!token) return null;
  try {
    const decoded: any = jwtDecode(token);
    return decoded;
  } catch (error) {
    // console.log(error);
    return null;
  }
};

// humanize date from now
export const humanizeDate = (date: string | Date) => {
  return moment(date).fromNow();
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "#F29339";
    case "APPROVED":
      return "green";
    case "APPROVE":
      return "green";
    case "REJECTED":
      return "#D11A2A";
    case "RETURNED":
      return "red";
    case "FORWARDED":
      return "#3A974C";
    case "FORWARD":
      return "orange";
    default:
      return "blue";
  }
};
