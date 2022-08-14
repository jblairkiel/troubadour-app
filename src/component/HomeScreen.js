import React from "react";
import { View } from "react-native";
import LoginComponent from "./LoginComponent";
import { TroubadourContext } from "../context/troubadourContext";
import GeneratePlaylistComponent from "./GeneratePlaylistComponent";


function HomeScreen() {

	// eslint-disable-next-line no-unused-vars
	const { userId, setUserId } = React.useContext(TroubadourContext);

	return (
		<View style={{ flex: 1, alignItems: "left", justifyContent: "left", padding: "1%" }}>
			{userId != undefined ?
				<LoginComponent />
				: <div>Error Getting Login, Server Might be down</div>
			}

			<GeneratePlaylistComponent userId={userId} />
		</View>
	);
}
export default HomeScreen;