// @src/hooks/getSearch.js

import {useEffect, useState} from "react";
import troubadour from "../../api/troubadour";

const getSearch = () => {

	const [searchResults, setSearchResults] = useState({
		slug: "",
		results: {},
	  });
	  
	useEffect(()=> {
		if (searchResults.slug !== "") {
			const timeoutId = setTimeout(() => {
				const fetch = async () => {
					try {
	
						const res = await troubadour.get(`search?q=/${searchResults.slug}`);
						setSearchResults({...searchResults, results: res.data});
					} catch (err) {
						console.error(err);
					}
				};
				fetch();
			}, 1000);
			return () => clearTimeout(timeoutId);
		}
	}, [searchResults.slug])
	return { searchResults, setSearchResults };
}
export default getSearch;