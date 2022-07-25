

import React, {useState, useEffect, useCallback} from "react";
import getSearch from "../hooks/search/getSearch"
import Search from "../component/Search";
import {ScrollView, View} from "react-native";
import {Form} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import getUserPreferences from "../hooks/userPreferences/getUserPreferences";
import { TroubadourContext } from "../context/troubadourContext";


function SearchScreen({}) {

	//Props validation
	// SearchScreen.propTypes = {
	// 	navigation: PropTypes.component.isRequired
	// };

	const { userId, setUserId } = React.useContext(TroubadourContext);

	const [userPreferences, setUserPreferences] = useState({
		prefs: [],
		doLoad: false
	});

	const handleSubmit = (e) => {
    	if (e.code === "Enter") e.preventDefault();
  	};
  	const checkKeyDown = (e) => {
    	if (e.code === "Enter") e.preventDefault();
  	};
	// eslint-disable-next-line no-unused-vars
	let token = window.localStorage.getItem("token")

	const setUserPreferencesCallback = useCallback((newPrefdata) => {

		setUserPreferences({ ...userPreferences, prefs: newPrefdata })
	} )


	// eslint-disable-next-line no-unused-vars
	const {searchResults, setSearchResults} = getSearch();
	const loadData = async function () {
		// eslint-disable-next-line no-unused-vars
		await getUserPreferences(userId.id, setUserPreferencesCallback);
	}


	useEffect(() => {
		loadData();
		return () => {};
	},[]);
	//const loadSearchResult = async function(){

	//	await getSearch(userPreferences.text, setUserPreferencesCallback);
	//}


	//useEffect(() => {
	//	loadSearchResult();
	//	return () => {};
	//},[userPreferences.text]);
	return (
		<View style={{flex:1,  alignItems: "left", justifyContent: "left", padding: "1%"}}>

			<Form style={{padding: "1%"}} onSubmit={(e)=> handleSubmit(e)}  onKeyDown={(e) => checkKeyDown(e)} >
				<Form.Control
					type="text"
					placeholder="Search Spotify"
					value={userPreferences.text}
					onChange={(e) => setUserPreferences({ ...userPreferences, slug: e.target.value })}
				/>
			</Form>
			
			{Object.keys(searchResults.prefs).length > 0 ?
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}> 
					<Search searchQuery={userPreferences.refs.data} userPreferences={userPreferences} triggerReloadFunction={setUserPreferencesCallback}  searchType={"addOnly"} /> 
				</ScrollView>
				: null } 
		</View>
	);
}
export default SearchScreen;