

import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useFetch from "./src/hooks/useFetch"
import Search from "./src/component/Search";
import TroubadourNavbar from './src/component/TroubadourNavbar'
import {Form, Card, TextInput} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function SearchScreen() {

	const { data, setData } = useFetch();

	const handleSubmit = (e) => {
    	if (e.code === 'Enter') e.preventDefault();
  	};
  	const checkKeyDown = (e) => {
    	if (e.code === 'Enter') e.preventDefault();
  	};

	return (
		<div className="App">
			<div style={{inline: 1, alignItems: "left", justifyContent: "left", padding: '1%'}}>
			<Form onSubmit={(e)=> handleSubmit(e)}  onKeyDown={(e) => checkKeyDown(e)} >
				<Form.Control
				type="text"
				placeholder="Search Spotify"
				value={data.slug}
				onChange={(e) => setData({ ...data, slug: e.target.value })}
				/>
			</Form>
			
			{Object.keys(data.results).length > 0 ?
			<div > 
				<Search searchQuery={data.results.data} /> 
			</div>
			: null } 
			{/* <Search searchQuery={dummyData} />} */}
			</div>
		</div>
	);
}

function Root() {

	const Tab = createBottomTabNavigator();

	return (
	  <Tab.Navigator>
		<Tab.Screen name="Search" component={SearchScreen} />
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
				</Stack.Navigator>
			</NavigationContainer>
	);
}