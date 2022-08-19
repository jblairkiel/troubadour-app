import React, {useEffect, useState} from "react";
import { View} from "react-native";
import {Button} from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { TroubadourContext } from "../context/troubadourContext";


function LoginComponent() {

	//Props validation
	// HomeScreen.propTypes = {
	// 	navigation: PropTypes.isRequired
	// };

	const { userId, setUserId} = React.useContext(TroubadourContext);
	//const { userId, setUserId } = React.useContext(TroubadourContext);

	const CLIENT_ID = "a9fc8ed15eeb4790b184ab648dd4ebf5"
	if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
	
		REDIRECT_URI = "http://localhost:19006"
	} else {
	
		REDIRECT_URI = "http://troubadour.jblairkiel.com"
	}

	const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
	const RESPONSE_TYPE = "token"

	const [token, setToken] = useState("")

	const getUserData = async (e) => {
		const {data} = await axios.get("https://api.spotify.com/v1/me", {
			headers: {
				Authorization: `Bearer ${e}`
			}
		})
	
		setUserId(data)
	}
	
	  
	useEffect(() => {
		const hash = window.location.hash
		let token = window.localStorage.getItem("token")

		if (!token && hash) {
			token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

			window.location.hash = ""
			window.localStorage.setItem("token", token)
		}

		setToken(token)
		if (token) {
			getUserData(token)
		}

	}, [])

	const logout = () => {
		setToken("")
		window.localStorage.removeItem("token")
		window.location.reload(false);
	}

	const renderUserData = () => {
		return (
			<div>
				{ userId.id != "" ? <h3>{userId.display_name}</h3> : <div>No Data</div>}
				
			</div>
		)
	}

	return (
		<View style={{maxHeight: '10rem', flex:1,  alignItems: "left", justifyContent: "left", padding: "1%"}}>

			{!token&& userId.display_name != "" ?
				<Button 
					variant="primary"
					href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
				>Login</Button>
				: 
				<Button 
					variant="secondary"
					onClick={logout}>Log Out</Button>
			}
			{renderUserData()}
			
			
		</View>
	);
}
export default LoginComponent;