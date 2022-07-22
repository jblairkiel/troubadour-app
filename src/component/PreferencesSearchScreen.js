

import {React} from "react";
import getSearch from "../hooks/search/getSearch"
import Search from "../component/Search";
import {ScrollView, View} from "react-native";
import {Form} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


function SearchScreen({}) {

	//Props validation
	// SearchScreen.propTypes = {
	// 	navigation: PropTypes.component.isRequired
	// };
	const { data, setData } = getSearch();

	const handleSubmit = (e) => {
    	if (e.code === "Enter") e.preventDefault();
  	};
  	const checkKeyDown = (e) => {
    	if (e.code === "Enter") e.preventDefault();
  	};
	// eslint-disable-next-line no-unused-vars
	let token = window.localStorage.getItem("token")

	return (
		<View style={{flex:1,  alignItems: "left", justifyContent: "left", padding: "1%"}}>

			<Form style={{padding: "1%"}} onSubmit={(e)=> handleSubmit(e)}  onKeyDown={(e) => checkKeyDown(e)} >
				<Form.Control
					type="text"
					placeholder="Search Spotify"
					value={data.slug}
					onChange={(e) => setData({ ...data, slug: e.target.value })}
				/>
			</Form>
			
			{Object.keys(data.results).length > 0 ?
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}> 
					<Search searchQuery={data.results.data}  searchType={"editable"} /> 
				</ScrollView>
				: null } 
		</View>
	);
}
export default SearchScreen;