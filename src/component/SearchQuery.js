// @src/components/SearchQuery.jsx

import React from "react";
import { View, StyleSheet, Image, SafeAreaView, SectionList, Text } from "react-native";
import { StatusBar } from 'expo-status-bar';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';


export default function SearchQuery({ searchQuery}) {

	const bootstrapStyleSheet = new BootstrapStyleSheet();
	const { s, c } = bootstrapStyleSheet;
	const styles = StyleSheet.create({
		tinyLogo: {
			width: '50px',
			height: '50px',
			display: "inline-block"
		},
	  });


	return (
		<View>			
			<SectionList 
			sections={[
				{title: 'Albums', data: searchQuery.albums},
				{title: 'Artists', data: searchQuery.artists},
				{title: 'Genres', data: searchQuery.genres},
				{title: 'Tracks', data: searchQuery.tracks},
			]}
			//renderItem={({ item }) => <Item title={item} />}

			renderItem={({item})=>(
				<View  style={[s.card]}>
					<View style={[s.cardBody]}>
						{item.images.length > 0 ? <Image style={styles.tinyLogo} source={{uri: item.images[0].url}} /> : null}
						<Text style={[s.text]}>{item.name}</Text>
					</View>
				</View>
			)}
			//renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
			
			renderSectionHeader={({section})=>(
				<Text style={[s.textPrimary]}>{section.title}</Text>
			  )}
			keyExtractor={(item, index) => item.spotify_id}
			/>
		</View>
	)
}