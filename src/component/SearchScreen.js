import axios from 'axios';
import {View} from 'react-native';
import {Button} from 'react-bootstrap';
import {React, useEffect, useState} from 'react';

function SearchScreen({navigation}) {

	const { data, setData } = useFetch();

	const handleSubmit = (e) => {
    	if (e.code === 'Enter') e.preventDefault();
  	};
  	const checkKeyDown = (e) => {
    	if (e.code === 'Enter') e.preventDefault();
  	};

	return (
		<View style={{flex:1,  alignItems: 'left', justifyContent: 'left', padding: '1%'}}>

			<Form style={{padding: '1%'}} onSubmit={(e)=> handleSubmit(e)}  onKeyDown={(e) => checkKeyDown(e)} >
				<Form.Control
					type="text"
					placeholder="Search Spotify"
					value={data.slug}
					onChange={(e) => setData({ ...data, slug: e.target.value })}
				/>
			</Form>
			
			{Object.keys(data.results).length > 0 ?
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}> 
					<Search searchQuery={data.results.data} /> 
				</ScrollView>
				: null } 
		</View>
	);
}
export default SearchScreen;