

import {React} from "react";
import useFetch from "../hooks/useFetch"
import Search from "../component/Search";
import {ScrollView, View} from "react-native";
import { Button} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


function MyPreferencesScreen({navigation}) {

	//Props validation
	MyPreferencesScreen.propTypes = {
		navigation: PropTypes.isRequired
	};

	const { data } = useFetch();
	return (
		<View style={{flex:1,  alignItems: "left", justifyContent: "left", padding: "1%"}}>

			<Button 
				variant="primary" 
				style={{"float": "right"}}
				onClick={() => navigation.push("PreferencesSearchScreen")}
			> Add</Button>

			{Object.keys(data.results).length > 0 ?
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}> 
					<Search searchQuery={data.results.data} /> 
				</ScrollView>
				: null } 
		</View>
	);
}
export default MyPreferencesScreen;