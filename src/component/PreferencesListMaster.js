/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
// @src/components/search.jsx

import React from "react";
import {View} from "react-native";
import PreferencesList from "./PreferencesList";
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';

export default function PreferencesListMaster(props) {

	//Props validation
	// Search.propTypes = {
	// 	searchQuery: PropTypes.isRequired,
	// 	searchType: PropTypes.isRequired
	// };

	return (
		<View>
			{
				props != undefined 
					? 
					<PreferencesList preferences={props.preferences} userPreferencesObject={props.userPreferencesObject} triggerReloadFunction={props.triggerReloadFunction} searchType={props.searchType}></PreferencesList>
					: null
			}
		</View>
		
	)
}