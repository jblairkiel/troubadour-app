

import {React, useEffect, useState} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useFetch from "./src/hooks/useFetch"
import getUserData from "./src/hooks/getUserData"
import Search from "./src/component/Search";
import {ScrollView, View} from 'react-native';
import TroubadourNavbar from './src/component/TroubadourNavbar'
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomeScreen({navigation}) {
	const CLIENT_ID = "a9fc8ed15eeb4790b184ab648dd4ebf5"
	const REDIRECT_URI = "http://localhost:19006"
	const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
	const RESPONSE_TYPE = "token"

	const [token, setToken] = useState("")
	const [hash, setHash] = useState("")
	const [userData, setUserData] = useState([])

	const getUserData = async (e) => {
		const {data} = await axios.get("https://api.spotify.com/v1/me", {
			headers: {
				Authorization: `Bearer ${e}`
			}
		})
	
		setUserData(data)
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
    }

	const renderUserData = () => {
		return (
			<div>
				{ userData != [] ? <h3>{userData.display_name}</h3> : <div>No Data</div>}
				
			</div>
		)
	}

	return (
		<View style={{flex:1,  alignItems: "left", justifyContent: "left", padding: '1%'}}>

			{!token ?
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

function MyPreferencesScreen({navigation}) {

	const { data, setData } = useFetch();


	return (
		<View style={{flex:1,  alignItems: "left", justifyContent: "left", padding: '1%'}}>

			<Button 
			variant="primary" 
			style={{"float": "right"}}
			onClick={() => navigation.push('PreferencesSearchScreen')}
			> Add</Button>

			{Object.keys(data.results).length > 0 ?
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}> 
				<Search searchQuery={data.results.data} /> 
			</ScrollView>
			: null } 
		</View>
	);
}

function SearchScreen({navigation}) {

	const { data, setData } = useFetch();

	const handleSubmit = (e) => {
    	if (e.code === 'Enter') e.preventDefault();
  	};
  	const checkKeyDown = (e) => {
    	if (e.code === 'Enter') e.preventDefault();
  	};

	return (
		<View style={{flex:1,  alignItems: "left", justifyContent: "left", padding: '1%'}}>

			<Form style={{padding: '1%'}} onSubmit={(e)=> handleSubmit(e)}  onKeyDown={(e) => checkKeyDown(e)} >
				<Form.Control
				type="text"
				placeholder="Search Spotify"
				value={data.slug}
				onChange={(e) => setData({ ...data, slug: e.target.value })}
				/>
			</Form>
			
			{Object.keys(data.results).length > 0 ?
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}> 
				<Search searchQuery={data.results.data} /> 
			</ScrollView>
			: null } 
		</View>
	);
}

function Root() {

	const Tab = createBottomTabNavigator();

	return (
	  <Tab.Navigator>
	  	<Tab.Screen name="Home" component={HomeScreen} />
		<Tab.Screen name="My Preferences" component={MyPreferencesScreen} />
	  </Tab.Navigator>
	);
  }

export default function App() {

	const Stack = createNativeStackNavigator();

	return (
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
					name="Root"
					component={Root}
					options={{ headerShown: false }}
					/>
					<Stack.Screen name="PreferencesSearchScreen" component={SearchScreen} />
				</Stack.Navigator>
			</NavigationContainer>
	);
}