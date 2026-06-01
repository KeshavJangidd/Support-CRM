import axios from "axios";

// this is the base url for our backend api
// deployed on render
export default axios.create({
  baseURL: "https://support-crm-nva3.onrender.com",
});
