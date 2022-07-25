// @src/hooks/getSearch.js

import {useEffect, useState} from "react";
import troubadour from "../../api/troubadour";

export default async function getSearch(callback){

	const [searchResults, setSearchResults] = useState({
		slug: "",
		results: {},
	  });
	  
	useEffect(()=> {

		if (searchResults.slug !== "") {
			try{
	
				const timeoutId = setTimeout(() => {
					const fetch = async () => {
						try {
		
							 await troubadour.get(`search?q=/${searchResults.slug}`).then((res)=>{
								callback(res.data)
								setSearch({...search, results: res.data})
							})
						} catch (err) {
							console.error(err);
						}
					};
					fetch();
				  }, 1000);
				  return () => clearTimeout(timeoutId);
			} catch (err) {
				console.error(err);
			}
		}
	}, [searchResults.slug])
	return { searchResults, setSearchResults };
}