

import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./src/component/HomeScreen"
//import SearchScreen from "./src/component/SearchScreen.js"
import MyPreferencesScreen from "./src/component/MyPreferencesScreen.js"
import PreferencesSearchScreen from "./src/component/PreferencesSearchScreen.js"
import { TroubadourContextProvider, TroubadourContext } from "./src/context/troubadourContext";
import { House, HouseFill, BookmarkHeart, BookmarkHeartFill } from "react-bootstrap-icons";

function Root() {

	const Tab = createBottomTabNavigator();
	// eslint-disable-next-line no-unused-vars
	const { userId, setUserId } = React.useContext(TroubadourContext);

	return (
		<div>
			<Tab.Navigator
				tabBarOptions={{ showLabel: false }}
				screenOptions={({ route }) => ({
					// eslint-disable-next-line no-unused-vars
					tabBarIcon: ({ focused, color, size }) => {
						if (route.name === 'Home') {
							if (focused) {
								return <HouseFill color="limegreen" size={24} />
							} else {
								return <House color="limegreen" size={24} />
							}
						} else if (route.name === 'My Preferences') {
							if (focused) {
								return <BookmarkHeartFill color="limegreen" size={24} />
							} else {
								return <BookmarkHeart color="limegreen" size={24} />
							}
						}

						// You can return any component that you like here!
						return;
					},
					tabBarActiveTintColor: 'limegreen',
					tabBarInactiveTintColor: 'limegreen',
				})} >
				<Tab.Screen name="Home" component={HomeScreen} />
				{userId.id != undefined
					? (<Tab.Screen name="My Preferences" component={MyPreferencesScreen} />)
					: null
				}
			</Tab.Navigator>
			<link
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
				integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
				crossOrigin="anonymous"
			/>
		</div>

	);
}

export default function App() {

	const Stack = createNativeStackNavigator();
	const { userId, setUserId } = React.useContext(TroubadourContext);

	return (
		<NavigationContainer>
			<TroubadourContextProvider initialUserId={{ userId, setUserId }}>
				<Stack.Navigator>
					<Stack.Screen
						name="Root"
						component={Root}
						options={{ headerShown: false }}
					/>
					<Stack.Screen name="PreferencesSearchScreen" component={PreferencesSearchScreen} />
				</Stack.Navigator>
			</TroubadourContextProvider>
		</NavigationContainer>
	);
}