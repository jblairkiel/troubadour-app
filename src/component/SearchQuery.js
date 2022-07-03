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

	let colCount = 5
	let mdVar = 2

	//Index is needed to keep track of the current element that we are one.
	let index = 0

	const Item = props => {
		const { propName, srcProps } = props
		return (
			<Card key={props.id}>
				{props.src.length > 0 ? 
				<Card.Img variant='top' style={{ width: '11rem' }} src={props.src[0].url} />  : null
				}
				<Card.Body>
					<Card.Title>{props.title}</Card.Title>
				</Card.Body>
			</Card>
		)
	}
	
const GridSystem = ({ colCount, children, searchTitle }) => {

	let index = 0
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
			<div>
				{header}
				{queryResults}
			</div>
		)
	}

	//Returns For example, we can have a row with 2 columns inside it.
	const renderRows = (searchQuery, colCount, rowCount) => {

		let rows = []
		for(let row = 0; row < rowCount; row++) {
			let renderResults = renderCols(searchQuery, colCount, rowCount, index)

			rows.push(
				<Row className='Row' key={searchQuery[index]+row.toString()} >
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
                    <Col className='Col' key={queryResults[index].spotify_id} sm={mdVar} >
						{queryResults[index]}
                    </Col>
                )
                index++
            }
        }
        
        return {index, cols}
    }

	return (
		<Container className='Container'>
			{
				buildResults(colCount, children, searchTitle)
			}
		</Container>
	);
}


	


	

	return (
		<div>
			<GridSystem  style={{ overflowY: true}} colCount={colCount} md={mdVar} searchTitle={'Albums'}>
			{ searchQuery.albums.length > 0 
			? searchQuery.albums.map(item => <Item key={item.spotify_id} id={item.spotify_id} title={item.name} src={item.images}/>) 
			: [<p>No albums are found.</p>] }
			</GridSystem>
			<GridSystem  style={{ overflowY: true}} colCount={colCount} md={mdVar} searchTitle={'Albums'}>

			{ searchQuery.artists.length > 0 
			? searchQuery.artists.map(item => <Item key={item.spotify_id} id={item.spotify_id} title={item.name} src={item.images} />) 
			: [<p>No artists are found.</p>] }
			</GridSystem>
			<GridSystem  style={{ overflowY: true}} colCount={colCount} md={mdVar} searchTitle={'Albums'}>
			{ searchQuery.genres.length > 0 
			? searchQuery.genres.map(item => <Item key={item.spotify_id} id={item.spotify_id} title={item.name} src={item.images} />) 
			: [<p>No genres are found.</p>] }
			</GridSystem>
			<GridSystem  style={{ overflowY: true}} colCount={colCount} md={mdVar} searchTitle={'Albums'}>
			{ searchQuery.tracks.length > 0 
			? searchQuery.tracks.map(item => <Item key={item.spotify_id} id={item.spotify_id} title={item.name} src={item.images} />) 
			: [<p>No tracks are found.</p>] }
			</GridSystem>
		</div>
	)
}