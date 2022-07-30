/* eslint-disable react/prop-types */


import React, {useCallback, useEffect} from "react";
import { View} from "react-native";
import createPlaylist from "../hooks/playlist/createPlaylist";
import logo from '../../assets/troubadour_logo_text_dark_stroke_highlight.png';


function GeneratePlaylistComponent(props) {

	//Props validation
	// SearchScreen.propTypes = {
	// 	navigation: PropTypes.component.isRequired
	// };
	const userId = props.userId;
	const { data, setData } = createPlaylist();
	// eslint-disable-next-line no-unused-vars
	//const { userId, setUserId } = React.useContext(TroubadourContext);

	const createPlaylistCallback = useCallback((playlistUrlVal) => {

		setData({...data, playlistUrl: playlistUrlVal});
	})

	const generatePlaylist = async function () {
		// eslint-disable-next-line no-unused-vars
		await createPlaylist(createPlaylistCallback, userId.id, userId.token, "32.4", "-86.4");
	}

	//call this url http://open.spotify.com/user/spotify/playlist/1GQLlzxBxKTb6tJsD4RxHI


	  useEffect(() => {
		if (data.playlistUrl != ""){
			loadData() //prompt here
		}
		return () => { };
	}, [data.playlistUrl]);

	return (
		<View style={{flex:1,  alignItems: "left", alignItems: "center", padding: "1%"}}>
			<img src={logo} style={{maxHeight: "40rem", maxWidth: "40rem"}} onClick={() => {
				generatePlaylist();
			}} />
		</View>
	);
}
export default GeneratePlaylistComponent;