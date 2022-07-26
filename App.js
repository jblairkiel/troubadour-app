

import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./src/component/HomeScreen"
//import SearchScreen from "./src/component/SearchScreen.js"
import MyPreferencesScreen from "./src/component/MyPreferencesScreen.js"
import PreferencesSearchScreen from "./src/component/PreferencesSearchScreen.js"
import { TroubadourContextProvider, TroubadourContext } from "./src/context/troubadourContext";
import 'bootstrap/dist/css/bootstrap.min.css';

function Root() {

	const Tab = createBottomTabNavigator();
	// eslint-disable-next-line no-unused-vars
	const { userId, setUserId } = React.useContext(TroubadourContext);

	return (
		<Tab.Navigator >
			<Tab.Screen name="Home" component={HomeScreen} />
			{userId.id != undefined 
				?  (<Tab.Screen name="My Preferences" component={MyPreferencesScreen}  />)
				: null
			}
		</Tab.Navigator>
	);
}

export default function App() {

	const Stack = createNativeStackNavigator();
	const { userId, setUserId } = React.useContext(TroubadourContext);

	return (
		<NavigationContainer>
			<TroubadourContextProvider initialUserId={{userId, setUserId}}>
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