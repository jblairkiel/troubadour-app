

import {React} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./src/component/HomeScreen"
import SearchScreen from "./src/component/SearchScreen.js"
import MyPreferencesScreen from "./src/component/MyPreferencesScreen.js"
import 'bootstrap/dist/css/bootstrap.min.css';

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