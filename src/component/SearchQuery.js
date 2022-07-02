// @src/components/SearchQuery.jsx

import React from "react";
//import { View, StyleSheet, Image, SafeAreaView, SectionList, Text } from "react-native";
import {Card, ListGroup} from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Figure from 'react-bootstrap/Figure';
import {
    Row,
    Col,
    Container
} from 'react-bootstrap'

export default function SearchQuery({ searchQuery}) {

	// const styles = StyleSheet.create({
	// 	tinyLogo: {
	// 		width: '50px',
	// 		height: '50px',
	// 		display: "inline-block"
	// 	},
	//   });
	let colCount = 5
	let mdVar = 6

	//Index is needed to keep track of the current element that we are one.
	let index = 0

	const Item = props => {
		
		return (
			<Card>
				{props.images.length > 0 ? 
				<Card.Img variant='top' style={{ width: '18rem' }} src={props.images[0].url} />  : null
				}
				<Card.Body>
					<Card.Title>{props.name}</Card.Title>
				</Card.Body>
			</Card>
		)
	}
	
	const GridSystem = ({ colCount, children, searchTitle }) => {
		return (
			<Container className='Container'>
				{
					buildResults(colCount, children, searchTitle)
				}
			</Container>
		);
	}

	const buildResults = (colCount, searchQuery, searchTitle) => {
		let rowCount = Math.floor(searchQuery.length / colCount) + 1
		let results = []
		results.push(buildGrid(searchTitle, searchQuery, colCount, rowCount))
		return(
			results
		)
	}
	//This is the driver function for building the grid system.
	const buildGrid = (titleName, titleData, colCount, rowCount) => {
		let header = (
			<h2>{titleName}</h2>
		)
		let queryResults = renderRows(titleData, colCount, rowCount)

		return (
			<div >
				{header}
				{queryResults}
			</div>
		)
	}
	//Returns For example, we can have a row with 2 columns inside it.
	const renderRows = (searchQuery, colCount, rowCount) => {

		let rows = []
		let index = 0
		for(let row = 0; row < rowCount; row++) {
			let renderResults = renderCols(searchQuery, colCount, rowCount, index)

			rows.push(
				<Row className='Row'>
					{
						renderResults.cols
					}
				</Row>
			)
			index = renderResults.index
		}
		let container = (
			<Container>
				{rows}
			</Container>
		)
		return container
	}

	//Returns an array of columns with the children inside.
	const renderCols = (queryResults, colCount, rowCount, index) => {
        let cols = []
        
        //If you want to add more bootstrap breakpoints you can pass them as props here.
        for(let col = 0; col < colCount; col++) {
            if(index < queryResults.length) {
                cols.push(
                    <Col className='Col' md={mdVar} key={queryResults[index].spotify_id}>
						{queryResults[index]}
                    </Col>
                )
                index++
            }
        }
        
        return {index, cols}
    }

	return (

		<Container>
			<GridSystem colCount={2} md={mdVar} searchTitle={'Albums'}>
			{ searchQuery.albums.length > 0 
			? searchQuery.albums.map(item => <Item key={item.spotify_id} id={item.spotify_id} title={item.name} />) 
			: [<p>No tracks are found.</p>] }
			</GridSystem>
			{/* <GridSystem colCount={2} md={6} searchTitle={'Artists'}>
			{ searchQuery.artists.length > 0 
			? searchQuery.artists.map(item => <Item key={item.spotify_id} id={item.spotify_id} title={item.name} />) 
			: [<p>No tracks are found.</p>] }
			</GridSystem>
			<GridSystem colCount={2} md={6} searchTitle={'Genres'}>
			{ searchQuery.genres.length > 0 
			? searchQuery.genres.map(item => <Item key={item.spotify_id} id={item.spotify_id} title={item.name} />) 
			: [<p>No tracks are found.</p>] }
			</GridSystem>
			<GridSystem colCount={2} md={6} searchTitle={'Tracks'}>
			{ searchQuery.tracks.length > 0 
			? searchQuery.tracks.map(item => <Item key={item.spotify_id} id={item.spotify_id} title={item.name} />) 
			: [<p>No tracks are found.</p>] }
			</GridSystem> */}
		</Container>
	)
}