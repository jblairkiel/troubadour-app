// @src/components/SearchQuery.jsx

import React from "react";
//import { View, StyleSheet, Image, SafeAreaView, SectionList, Text } from "react-native";
import {Card, ListGroup} from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Figure from 'react-bootstrap/Figure';

export default function SearchQuery({ searchQuery}) {

	// const styles = StyleSheet.create({
	// 	tinyLogo: {
	// 		width: '50px',
	// 		height: '50px',
	// 		display: "inline-block"
	// 	},
	//   });


	return (
		<Card>	
			<h2>Albums</h2>
			<ListGroup>
				{
					searchQuery.albums.map(function(d, idx){
						return (
						<ListGroup.Item key={idx}>
							<Card>
								{d.images.length > 0 ? 
								<Figure>
									<Figure.Image variant='top' width={50} height={50} src={d.images[0].url} />
								</Figure>  : null
								}
								<Card.Title>{d.name}</Card.Title>
							</Card>
						</ListGroup.Item>
						)
					  })
					
				}
			</ListGroup>

			{/* 
			Object.entries().map(([key, value]) => (
						<ListGroup.Item key={key}>{value.name}</ListGroup.Item>
					));	
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
			/> */}
		</Card>
	)
}