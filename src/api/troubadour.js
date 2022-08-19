// @src/api/got.js

import axios from "axios";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
export default axios.create({
	baseURL: "http://localhost:3000/api",
	responseType: "json"
});