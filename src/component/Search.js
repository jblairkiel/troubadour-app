/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
// @src/components/search.jsx

import React from "react";
import {View} from "react-native";
import SearchQuery from "./SearchQuery";
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';

export default function Search(props) {

	//Props validation
	// Search.propTypes = {
	// 	searchQuery: PropTypes.isRequired,
	// 	searchType: PropTypes.isRequired
	// };

	return (
		<View>
			{
				props != undefined 
					? <SearchQuery searchQuery={props.searchQuery} searchType={props.searchType}></SearchQuery>
					: null
			}
		</View>
		
	)
}