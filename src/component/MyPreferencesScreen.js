import React, { useEffect, useState, useCallback } from "react";
import getUserPreferences from "../hooks/userPreferences/getUserPreferences"
import PreferencesListMaster from "../component/PreferencesListMaster";
import { ScrollView, View } from "react-native";
import { Button, Spinner } from "react-bootstrap";
import { useIsFocused } from '@react-navigation/native';
import { Dimensions } from "react-native";
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

	const isFocused = useIsFocused();

	// eslint-disable-next-line no-unused-vars
	const { userId, setUserId } = React.useContext(TroubadourContext);
	// eslint-disable-next-line no-unused-vars

	// eslint-disable-next-line no-unused-vars
	const [userPreferences, setUserPreferences] = useState({
		prefs: [],
		doLoad: false
	});

	const getUserPreferencesCallback = useCallback(() => {

		getUserPreferences(userId.id, setUserPreferencesCallback);
	})

	const setUserPreferencesCallback = useCallback((newPrefdata) => {

		setUserPreferences({ ...userPreferences, prefs: newPrefdata })
	})

	const loadData = async function () {
		// eslint-disable-next-line no-unused-vars
		await getUserPreferences(userId.id, setUserPreferencesCallback);
	}


	useEffect(() => {
		if (isFocused){
			loadData()
		}
		return () => { };
	}, [isFocused]);
	return (
		<div style={{flex: 1}}>
			{Object.keys(userPreferences.prefs).length > 0 ?

				<View style={{ flex: 1, alignItems: "left", justifyContent: "left", padding: "1%" }}>

					<Button
						variant="primary"
						style={{ "marginLeft": "80%", "float": "right", "width": "14rem" }}
						// eslint-disable-next-line react/prop-types
						onClick={() => navigation.push("PreferencesSearchScreen", {
							userId: userId
						})}
					> Add</Button>
					<ScrollView contentContainerStyle={{ flexGrow: 1,  height: Dimensions.get('window').height}}>
						<PreferencesListMaster preferences={userPreferences.prefs.data} userPreferencesObject={userPreferences} triggerReloadFunction={getUserPreferencesCallback} searchType={"removeOnly"} />
					</ScrollView>
				</View>
				: 
				<div style={{width: "100%", height: "100%"}}>
					<Spinner style={{marginTop: "200px", marginLeft: "50%"}} animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</div>
			}

		</div>
	);

}
export default MyPreferencesScreen;