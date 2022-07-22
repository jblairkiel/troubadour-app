// @src/components/SearchQuery.jsx

import React from "react";
import { Card } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup"
//import ListGroupItem from "react-bootstrap/ListGroupItem";
import PropTypes from 'prop-types';

export default function SearchQuery({ searchQuery }) {

	//Props validation
	SearchQuery.propTypes = {
		searchQuery: PropTypes.array.isRequired
	};

	//let colCount = 5
	//let mdVar = 1

	//Index is needed to keep track of the current element that we are one.
	//let index = 0

	const Item = props => {

		//Props validation
		Item.propTypes = {
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			src: PropTypes.array.isRequired
		};

		// return (
		// 	<ListGroupItem key={props.id}>{props.title}</ListGroupItem>
		// )
		return (
			<ListGroup.Item key={props.id}>
				<Card>
					{props.src.length > 0 ?
						<Card.Img variant='top' style={{ maxHeight: "12rem", maxWidth: "12rem" }} src={props.src[0].url} /> : null
					}
					<Card.Body>
						<a>{props.title}</a>
					</Card.Body>
				</Card>
			</ListGroup.Item>
		)
	}


	return (
		<ListGroup key={0}>
			{searchQuery.top_result != undefined
				? <ListGroup.Item key={1} ><h4>Top Result</h4></ListGroup.Item>
				: null}
			{searchQuery.top_result != undefined
				? searchQuery.top_result.map(item => <Item key={item.spotify_id + "topresult"} id={item.spotify_id + "topresult"} title={item.name} src={item.images} />)
				: null}

			{searchQuery.albums.length > 0 ?
				<ListGroup.Item key={2}><h4>Albums</h4></ListGroup.Item>
				: null}
			{searchQuery.albums.length > 0
				? searchQuery.albums.map(item => <Item key={item.spotify_id + "album"} id={item.spotify_id + "album"} title={item.name} src={item.images} />)
				: [null]}

			{searchQuery.artists.length > 0 ?
				<ListGroup.Item key={3}><h4>Artists</h4></ListGroup.Item>
				: null}
			{searchQuery.artists.length > 0
				? searchQuery.artists.map(item => <Item key={item.spotify_id + "album"} id={item.spotify_id + "album"} title={item.name} src={item.images} />)
				: [null]}


			{searchQuery.genres.length > 0 ?
				<ListGroup.Item key={4}><h4>Genres</h4></ListGroup.Item>
				: null}
			{searchQuery.genres.length > 0
				? searchQuery.genres.map(item => <Item key={item.spotify_id + "album"} id={item.spotify_id + "album"} title={item.name} src={item.images} />)
				: [null]}


			{searchQuery.tracks.length > 0 ?
				<ListGroup.Item key={5}><h4>Tracks</h4></ListGroup.Item>
				: null}
			{searchQuery.tracks.length > 0
				? searchQuery.tracks.map(item => <Item key={item.spotify_id + "album"} id={item.spotify_id + "album"} title={item.name} src={item.images} />)
				: [null]}
		</ListGroup>

	)
}