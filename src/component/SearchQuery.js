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

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions);
	}

	updateDimensions() {
		this.setState({ heightSet: document.body.scrollHeight });
		console.log(document.body.scrollHeight);
	}

	render() {
		const divStyle = {
			height: this.state.heightSet + 'px',
		};

		const Item = props => {
			const { propName, srcProps } = props
			return (
				<Card key={props.id}>
					{props.src.length > 0 ? 
					<Card.Img variant='top' src={props.src[0].url} style={{maxHeight: '18rem', maxWidth: '18rem'}}/>  : null
					}
					<Card.Body>
						<a>{props.title}</a>
					</Card.Body>
				</Card>
			)
		}
		return (
			<div key={1} style={divStyle}>
				<GridSystem key={1} colCount={this.colCount} md={this.mdVar} searchTitle={'Top Result'}>
				{ [this.props.searchQuery.top_result].length > 0 
				? [this.props.searchQuery.top_result].map(item => <Item key={item.spotify_id} id={item.spotify_id} title={item.name} src={item.images}/>) 
				: [<p key={1}></p>] }
				</GridSystem>
				<GridSystem key={2} colCount={this.colCount} md={this.mdVar} searchTitle={'Albums'}>
				{ this.props.searchQuery.albums.length > 0 
				? this.props.searchQuery.albums.map(item => <Item key={item.spotify_id} id={item.spotify_id} title={item.name} src={item.images}/>) 
				: [<p key={2}>No albums are found.</p>] }
				</GridSystem>
				<GridSystem key={3}  colCount={this.colCount} md={this.mdVar} searchTitle={'Artists'}>
				{ this.props.searchQuery.artists.length > 0 
				? this.props.searchQuery.artists.map(item => <Item key={item.spotify_id} id={item.spotify_id} title={item.name} src={item.images} />) 
				: [<p key={4} >No artists are found.</p>] }
				</GridSystem>
				<GridSystem key={4} colCount={this.colCount} md={this.mdVar} searchTitle={'Genres'}>
				{ this.props.searchQuery.genres.length > 0 
				? this.props.searchQuery.genres.map(item => <Item key={item.spotify_id} id={item.spotify_id} title={item.name} src={item.images} />) 
				: [<p>No genres are found.</p>] }
				</GridSystem>
				<GridSystem key={5} colCount={this.colCount} md={this.mdVar} searchTitle={'Tracks'}>
				{ this.props.searchQuery.tracks.length > 0 
				? this.props.searchQuery.tracks.map(item => <Item key={item.spotify_id} id={item.spotify_id} title={item.name} src={item.images} />) 
				: [<p key={5} >No tracks are found.</p>] }
				</GridSystem>
			</div>
		)
	}

}

export default SearchQuery;