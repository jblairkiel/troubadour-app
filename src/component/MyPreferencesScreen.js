import React from "react";
import getUserPreferences from "../hooks/userPreferences/getUserPreferences"
import Search from "../component/Search";
import {ScrollView, View} from "react-native";
import { Button} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { TroubadourContext } from "../context/troubadourContext";
//import PropTypes from 'prop-types';
//import { StackActions, NavigationActions, withNavigation } from '@react-navigation/native';


// eslint-disable-next-line react/prop-types
function MyPreferencesScreen({navigation}) {

	//Props validation
	// MyPreferencesScreen.propTypes = {
	// 	navigation.push: PropTypes.fun.isRequired
	// };
	
	// eslint-disable-next-line no-unused-vars
	const { userId, setUserId } = React.useContext(TroubadourContext);
	// eslint-disable-next-line no-unused-vars
	const {userPreferences, setUserPreferences } = getUserPreferences(userId.id);
	
	return (
		<View style={{flex:1,  alignItems: "left", justifyContent: "left", padding: "1%"}}>

			<Button 
				variant="primary" 
				style={{"float": "right"}}
				// eslint-disable-next-line react/prop-types
				onClick={() => navigation.push("PreferencesSearchScreen")}
			> Add</Button>
			{Object.keys(userPreferences.prefs).length   ?
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}> 
					<Search searchQuery={userPreferences.prefs.data} /> 
				</ScrollView>
				: null } 
		</View>
	);
}
export default MyPreferencesScreen;