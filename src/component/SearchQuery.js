// @src/components/SearchQuery.jsx

import React from 'react';
import { ListViewBase, ScrollView } from 'react-native';
import {Card} from 'react-bootstrap';
import {
	Row,
	Col,
	Container,
	ListGroup,
	ListGroupItem
} from 'react-bootstrap';

export default function SearchQuery({ searchQuery}) {

	let colCount = 5;
	let mdVar = 1;

	//Index is needed to keep track of the current element that we are one.
	let index = 0;

	const Item = props => {
		const { propName, srcProps } = props;
		// return (
		// 	<ListGroupItem key={props.id}>{props.title}</ListGroupItem>
		// )
		return (
			<ListGroup.Item key={props.id}>
				<Card>
					{props.src.length > 0 ? 
						<Card.Img variant='top' style={{maxHeight: '12rem', maxWidth: '12rem'}} src={props.src[0].url} />  : null
					}
					<Card.Body>
						<a>{props.title}</a>
					</Card.Body>
				</Card>
			</ListGroup.Item>
		);
	};
	

	return (
		<ListGroup key={0}>
		
			<ListGroup.Item key={1} ><h4>Top Result</h4></ListGroup.Item>
			{ searchQuery.top_result.length > 0 
				? searchQuery.top_result.map(item => <Item key={item.spotify_id + 'topresult'} id={item.spotify_id + 'topresult'} title={item.name} src={item.images}/>) 
				: [<p key={11}>No Top Result</p>] }
 

			<ListGroup.Item key={2}><h4>Albums</h4></ListGroup.Item>
			{ searchQuery.albums.length > 0 
				? searchQuery.albums.map(item => <Item key={item.spotify_id + 'album'} id={item.spotify_id + 'album'} title={item.name} src={item.images}/>) 
				: [<p key={22}>No Album Results</p>] }

			<ListGroup.Item key={3}><h4>Artists</h4></ListGroup.Item>
			{ searchQuery.artists.length > 0 
				? searchQuery.artists.map(item => <Item key={item.spotify_id + 'album'} id={item.spotify_id + 'album'} title={item.name} src={item.images}/>) 
				: [<p key={33} >No Artist Results</p>] }


			<ListGroup.Item key={4}><h4>Genres</h4></ListGroup.Item>
			{ searchQuery.genres.length > 0 
				? searchQuery.genres.map(item => <Item key={item.spotify_id + 'album'} id={item.spotify_id + 'album'} title={item.name} src={item.images}/>) 
				: [<p key={44} >No Genre Results</p>] }


			<ListGroup.Item key={5}><h4>Tracks</h4></ListGroup.Item>
			{ searchQuery.tracks.length > 0 
				? searchQuery.tracks.map(item => <Item key={item.spotify_id + 'album'} id={item.spotify_id + 'album'} title={item.name} src={item.images}/>) 
				: [<p key={55} >No Track Results</p>] }
		</ListGroup>
			
	);
}