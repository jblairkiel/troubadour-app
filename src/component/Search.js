// @src/components/search.jsx

import React from "react";
import SearchQuery from "./SearchQuery";
import PropTypes from 'prop-types';

export default function Search({ searchQuery }) {

	//Props validation
	Search.propTypes = {
		searchQuery: PropTypes.isRequired
	};

	return (
		<SearchQuery searchQuery={searchQuery}></SearchQuery>
	)
}