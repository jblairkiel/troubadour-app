import React, { useEffect, useState, useCallback } from "react";
import getUserPreferences from "../hooks/userPreferences/getUserPreferences"
import Search from "../component/Search";
import { ScrollView, View } from "react-native";
import { Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { TroubadourContext } from "../context/troubadourContext";
//import PropTypes from 'prop-types';
//import { StackActions, NavigationActions, withNavigation } from '@react-navigation/native';


// eslint-disable-next-line react/prop-types
function MyPreferencesScreen({ navigation }) {

	//Props validation
	// MyPreferencesScreen.propTypes = {
	// 	navigation.push: PropTypes.fun.isRequired
	// };

	// eslint-disable-next-line no-unused-vars
	const { userId, setUserId } = React.useContext(TroubadourContext);
	// eslint-disable-next-line no-unused-vars

	// eslint-disable-next-line no-unused-vars
	const [userPreferences, setUserPreferences] = useState({
		prefs: [],
		doLoad: false
	});

	const setUserPreferencesCallback = useCallback((newPrefdata) => {

		setUserPreferences({ ...userPreferences, prefs: newPrefdata })
	} )

	const loadData = async function () {
		// eslint-disable-next-line no-unused-vars
		await getUserPreferences(userId.id, setUserPreferencesCallback);
	}


	useEffect(() => {
		loadData();
		return () => {};
	},[]);
	return (

		<View style={{ flex: 1, alignItems: "left", justifyContent: "left", padding: "1%" }}>

			{Object.keys(userPreferences.prefs).length > 0 ?
				<View>
					<Button
						variant="primary"
						style={{ "marginLeft": "80%", "float": "right", "width": "14rem" }}
						// eslint-disable-next-line react/prop-types
						onClick={() => navigation.push("PreferencesSearchScreen", {
							userId: userId
						})}
					> Add</Button>
					<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
						<Search searchQuery={userPreferences.prefs.data} userPreferences={userPreferences} triggerReloadFunction={setUserPreferencesCallback} searchType={"removeOnly"} />
					</ScrollView>
				</View>
				:
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			}
		</View>
	);

}
export default MyPreferencesScreen;