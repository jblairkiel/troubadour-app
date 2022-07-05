// @src/components/search.jsx

import React from "react";
import {
    Row,
    Col,
    Container
} from 'react-bootstrap'

export default function GridSystem({ colCount, children, searchTitle }) {
  

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
			<h4>{titleName}</h4>
		)
		let queryResults = renderRows(titleData, colCount, rowCount)

		return (
			<div key={titleData[0].spotify_id}>
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
			<Container  key={searchQuery[0].spotify_id}>
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
					<Col className='Col' key={queryResults[index].spotify_id}  >
						{queryResults[index]}
					</Col>
				)
				index++
			}
		}
		
		return {index, cols}
	}

    return (
        <Container key={children[0].spotify_id} className='Container'>
            {
                buildResults(colCount, children, searchTitle)
            }
        </Container>
    );

	
}