import axios from 'axios';
import {View} from 'react-native';
import {Button} from 'react-bootstrap';
import {React, useEffect, useState} from 'react';


function MyPreferencesScreen({navigation}) {

	const { data, setData } = useFetch();


	return (
		<View style={{flex:1,  alignItems: 'left', justifyContent: 'left', padding: '1%'}}>

			<Button 
				variant="primary" 
				style={{'float': 'right'}}
				onClick={() => navigation.push('PreferencesSearchScreen')}
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