import React from "react";
import { View} from "react-native";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginComponent from "./LoginComponent";
import { TroubadourContext } from "../context/troubadourContext";


function HomeScreen() {

	// eslint-disable-next-line no-unused-vars
	const { userId, setUserId } = React.useContext(TroubadourContext);

	return (
		<View style={{flex:1,  alignItems: "left", justifyContent: "left", padding: "1%"}}>
			<LoginComponent/>
		</View>
	);
}
export default HomeScreen;