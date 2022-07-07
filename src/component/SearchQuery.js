// @src/components/SearchQuery.jsx

import React from "react";
import {Card} from 'react-bootstrap';
import GridSystem from "./GridSystem";

class SearchQuery extends React.Component {


	constructor(props) {
		let colCount = 5
		let mdVar = 1
		let searchQuery = props.searchQuery
		super(props);
		
		this.state = {
			heightSet: 0,
		};
		this.updateDimensions = this.updateDimensions.bind(this);
	}

	componentDidMount() {
		this.updateDimensions();
		window.addEventListener('resize', this.updateDimensions);
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

	updateDimensions() {
		this.setState({ heightSet: document.body.scrollHeight });
		console.log(document.body.scrollHeight);
	}

			rows.push(
				<Row className='Row' key={searchQuery[row].key+"renderRows"} >
					{
						renderResults.cols
					}
					<Card.Body>
						<a>{props.title}</a>
					</Card.Body>
				</Card>
			)
		}
		let container = (
			<Container key={searchQuery[0].spotify_id + "renderRowsContainer"}>
				{rows}
			</Container>
		)
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
