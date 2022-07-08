// @src/components/SearchQuery.jsx

import React from "react";
import { ListViewBase, ScrollView } from "react-native";
import {Card} from 'react-bootstrap';
import {
    Row,
    Col,
    Container,
	ListGroup,
	ListGroupItem
} from 'react-bootstrap'

export default function SearchQuery({ searchQuery}) {

	let colCount = 5
	let mdVar = 1

	//Index is needed to keep track of the current element that we are one.
	let index = 0

	const Item = props => {
		const { propName, srcProps } = props
		/* Card style below for squarestyle={{"height": "18vw", "width": "18vw"}} */
		return (
			<Card key={props.id}>
				{props.src.length > 0 ? 
				<Card.Img variant='top' style={{"maxHeight": "14rem", "maxWidth": "14rem", "minHeight": "8rem", "minHeight": "8rem", "alignSelf": "center", "marginTop": "5%"}} src={props.src[0].url} />  
				: <Card.Img variant='top' style={{"maxHeight": "14rem", "maxWidth": "14rem","minHeight": "14rem", "minHeight": "14rem"}} />
				}
				<Card.Body style={{"whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis", "maxWidth": "14rem"}}>
					{props.title}
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
			<h4 key={titleName+"Header"}>{titleName}</h4>
		)
		let queryResults = renderRows(titleData, colCount, rowCount)

		return (
			<div key={titleData+ "titleContents"}>
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
				<Row className='Row' key={searchQuery[row].key+"renderRows"} >
					{
						renderResults.cols
					}
				</Row>
			)
			index = renderResults.index
		}
		let container = (
			<Container key={searchQuery[0].spotify_id + "renderRowsContainer"}>
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
                    <Col className='Col' key={queryResults[index].key + "renderCols"}  >
						{queryResults[index]}
                    </Col>
                )
                index++
            }
        }
        
        return {index, cols}
    }

	return (
		children[0].type == "p" ? 

		<Container key={searchTitle + "buildResults"} className='Container'>
			<p key={searchTitle + "noResults"}>No albums are found.</p>
		</Container>
		:
		<Container key={searchTitle + "buildResults"} className='Container'>
			{
				buildResults(colCount, children, searchTitle)
			}
		</Container>
	);
}


	return (
		<div>
			<GridSystem key={1} colCount={colCount} md={mdVar} searchTitle={'Top Result'}>
			{ [searchQuery.top_result].length > 0 
			? [searchQuery.top_result].map(item => <Item key={item.spotify_id} id={item.spotify_id} title={item.name} src={item.images}/>) 
			: [<p key={11}>No Top Result</p>] }
			</GridSystem>
			<GridSystem key={2} colCount={colCount} md={mdVar} searchTitle={'Albums'}>
			{ searchQuery.albums.length > 0 
			? searchQuery.albums.map(item => <Item key={item.spotify_id} id={item.spotify_id} title={item.name} src={item.images}/>) 
			: [<p key={22}>No albums are found.</p>] }
			</GridSystem>
			<GridSystem key={3} colCount={colCount} md={mdVar} searchTitle={'Artists'}>
			{ searchQuery.artists.length > 0 
			? searchQuery.artists.map(item => <Item key={item.spotify_id} id={item.spotify_id} title={item.name} src={item.images} />) 
			: [<p key={33}>No artists are found.</p>] }
			</GridSystem>
			<GridSystem key={4} colCount={colCount} md={mdVar} searchTitle={'Genres'}>
			{ searchQuery.genres.length > 0 
			? searchQuery.genres.map(item => <Item key={item.spotify_id} id={item.spotify_id} title={item.name} src={item.images} />) 
			: [<p key={44} >No genres are found.</p>] }
			</GridSystem>
			<GridSystem key={5} colCount={colCount} md={mdVar} searchTitle={'Tracks'}>
			{ searchQuery.tracks.length > 0 
			? searchQuery.tracks.map(item => <Item key={item.spotify_id} id={item.spotify_id} title={item.name} src={item.images} />) 
			: [<p key={55}>No tracks are found.</p>] }
			</GridSystem>
		</div>
	)
}