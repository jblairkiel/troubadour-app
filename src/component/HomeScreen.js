import axios from 'axios';
import {View} from 'react-native';
import {Button} from 'react-bootstrap';
import {React, useEffect, useState} from 'react';

function HomeScreen() {
	const CLIENT_ID = 'a9fc8ed15eeb4790b184ab648dd4ebf5';
	const REDIRECT_URI = 'http://localhost:19006';
	const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
	const RESPONSE_TYPE = 'token';

	const [token, setToken] = useState('');
	const [userData, setUserData] = useState([]);

	const getUserData = async (e) => {
		const {data} = await axios.get('https://api.spotify.com/v1/me', {
			headers: {
				Authorization: `Bearer ${e}`
			}
		});
	
		setUserData(data);
	};

	useEffect(() => {
		const hash = window.location.hash;
		let token = window.localStorage.getItem('token');

		if (!token && hash) {
			token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1];

			window.location.hash = '';
			window.localStorage.setItem('token', token);
		}

		setToken(token);
		if (token) {
			getUserData(token);
		}

	}, []);

	const logout = () => {
		setToken('');
		window.localStorage.removeItem('token');
	};

	const renderUserData = () => {
		return (
			<div>
				{ userData != [] ? <h3>{userData.display_name}</h3> : <div>No Data</div>}
				
			</div>
		);
	};

	return (
		<View style={{flex:1,  alignItems: 'left', justifyContent: 'left', padding: '1%'}}>

			{!token ?
				<Button 
					style={{'width': '12rem'}}
					variant="primary"
					href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
				>Login</Button>
				: 
				<Button 
					style={{'width': '12rem'}}
					variant="secondary"
					onClick={logout}>Log Out</Button>
			}
			{renderUserData()}
			
			
		</View>
	);
}
export default HomeScreen;