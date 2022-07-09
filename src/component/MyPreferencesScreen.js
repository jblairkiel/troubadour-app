import {React} from "react";
import getUserPreferences from "../hooks/getUserPreferences"
import Search from "../component/Search";
import {ScrollView, View} from "react-native";
import { Button} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//import PropTypes from 'prop-types';
//import { StackActions, NavigationActions, withNavigation } from '@react-navigation/native';


// eslint-disable-next-line react/prop-types
function MyPreferencesScreen({navigation}) {

	//Props validation
	// MyPreferencesScreen.propTypes = {
	// 	navigation.push: PropTypes.fun.isRequired
	// };

	//const [userPreferences, setUserPreferences] = useState([])
	//const { userPreferences, setUserPreferences } = getSearch();
	
	// 	setUserData(data)
	// }

	const { data } = getUserPreferences();
	return (
		<View style={{flex:1,  alignItems: "left", justifyContent: "left", padding: "1%"}}>

			<Button 
				variant="primary" 
				style={{"float": "right"}}
				// eslint-disable-next-line react/prop-types
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