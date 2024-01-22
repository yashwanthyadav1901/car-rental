import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;

const setAuthToken = () => {
  const token = Cookies.get("token");
  console.log(token);
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
