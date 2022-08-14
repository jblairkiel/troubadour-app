/* eslint-disable react/prop-types */
// @src/components/SearchQuery.jsx

import React from "react";
import * as Location from 'expo-location';

export default function GeoLocationServiceComponent() {

	//Props validation
	// SearchQuery.propTypes = {
	// 	props.searchQuery: PropTypes.array.isRequired,
	// 	props.searchType: PropTypes.string.isRequired,
	// };

	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
  
	useEffect(() => {
	  (async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
		  setErrorMsg('Permission to access location was denied');
		  return;
		}
  
		let location = await Location.getCurrentPositionAsync({});
		setLocation(location);
	  })();
	}, []);

	return {location, setLocation}
}