/* eslint-disable react/prop-types */
// @src/components/SearchQuery.jsx

import React from "react";
import {
	Card,
	Row,
	Col,
	Container,
	ListGroup
} from "react-bootstrap";
//import ListGroupItem from "react-bootstrap/ListGroupItem";
import PropTypes from 'prop-types';
import { PlusCircleFill, DashCircleFill } from 'react-bootstrap-icons';
//import getUserPreferences from "../hooks/userPreferences/getUserPreferences";
import troubadour from "../api/troubadour";
//import addUserPreference from "../hooks/userPreferences/addUserPreference";
import { TroubadourContext } from "../context/troubadourContext";

export default function SearchQuery(props) {

	//Props validation
	// SearchQuery.propTypes = {
	// 	props.searchQuery: PropTypes.array.isRequired,
	// 	props.searchType: PropTypes.string.isRequired,
	// };

	let colCount = 5
	let mdVar = 1

	//Index is needed to keep track of the current element that we are one.
	// eslint-disable-next-line no-unused-vars
	let index = 0

	const searchType = props.searchType;
	const userPreferences = props.userPreferences;
	const searchQuery = props.searchQuery;
	const triggerReloadFunction = props.triggerReloadFunction;
	// eslint-disable-next-line no-unused-vars
	const { userId, setUserId } = React.useContext(TroubadourContext);
	//const { userPreferences, setUserPreferences } = getUserPreferences(userId.id);

	const GridSystem = ({ colCount, children, searchTitle }) => {

		if (children == undefined) {
			return null;
		}

		let index = 0
		const buildResults = (colCount, searchQuery, searchTitle) => {
			let rowCount = Math.floor(searchQuery.length / colCount) + 1
			let results = []
			results.push(buildGrid(searchTitle, searchQuery, colCount, rowCount))
			return (
				results
			)
		}
		//This is the driver function for building the grid system.
		const buildGrid = (titleName, titleData, colCount, rowCount) => {
			let header = (
				<h4 key={titleName + "Header"}>{titleName}</h4>
			)
			let queryResults = renderRows(titleData, colCount, rowCount)

			return (
				<div key={titleData + "titleContents"}>
					{header}
					{queryResults}
				</div>
			)
		}
		//Returns For example, we can have a row with 2 columns inside it.
		const renderRows = (searchQuery, colCount, rowCount) => {

			let rows = []
			for (let row = 0; row < rowCount; row++) {
				let renderResults = renderCols(searchQuery, colCount, rowCount, index)

				rows.push(
					<Row className='Row' key={searchQuery[row].key + "renderRows"} >
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
			for (let col = 0; col < colCount; col++) {
				if (index < queryResults.length) {
					cols.push(
						<Col className='Col' style={{textAlign: "center"}} key={queryResults[index].key + "renderCols"}  >
							{queryResults[index]}
						</Col>
					)
					index++
				}
			}

			return { index, cols }
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

	function getFieldsHelper(input) {

		var output = [];
		for (var i = 0; i < input.length; ++i) {
			var newItem = {}
			newItem["spotify_uri"] = input[i]["uri"];
			newItem["name"] = input[i]["name"];
			output.push(newItem);
		}
		return output;
	}

	function getPrefsAsFlatArray(input) {
		var output = [];
		output = output.concat(getFieldsHelper(input.artists, 'artists'))
		output = output.concat(getFieldsHelper(input.albums, 'albums'))
		output = output.concat(getFieldsHelper(input.genres, 'genres'))
		output = output.concat(getFieldsHelper(input.tracks, 'tracks'))
		return output;
	}
	async function handleAddClick(props) {
		const newPrefs = getPrefsAsFlatArray(props.userPrefs.prefs);
		newPrefs.push({ spotify_uri: props.spotify_uri, name: props.name });
		//props.userPrefs.setUserPreferences(...props.userPrefs.userPreferences, newPrefs)

		const fetch = async () => {
			try {
				await troubadour.put(`preferences`, newPrefs,
					{
						headers: {
							"X-USER-ID": userId.id
						}
					}).then((res) => {

					//TimingHere?
					props.triggerReloadFunction(res.data);
				});
			} catch (err) {
				console.error(err);
			}
		};
		fetch();
	}

	async function handleRemoveClick(props) {
		//const newPrefs = {ids: }
		//props.userPrefs.setUserPreferences(...props.userPrefs.userPreferences, newPrefs)

		const fetch = async () => {
			try {
				await troubadour.delete(`preferences?ids=` + props.spotify_uri,
					{
						headers: {
							"X-USER-ID": userId.id
						}

					}).then((res) => {
					//TimingHere?
					props.triggerReloadFunction(res.data);
				});
			} catch (err) {
				console.error(err);
			}
		};
		fetch();
	}

	const Item = props => {

		//Props validation
		Item.propTypes = {
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			src: PropTypes.array.isRequired,
			searchType: PropTypes.string.isRequired
		};

		// return (
		// 	<ListGroupItem key={props.id}>{props.title}</ListGroupItem>
		// )
		return (
			<ListGroup.Item style={{ border: "none", background: "none", display: "inline-block" }} key={props.id}>
				<Card  style={{maxWidth: "16rem", minWidth: "12rem"}}>
					{props.searchType == "addOnly"
						? <PlusCircleFill style={{ margin: "1%" }} color="green" size={22} onClick={() => {
							handleAddClick(props);
						}} />
						: props.searchType == "removeOnly"
							? <DashCircleFill style={{ margin: "1%" }} color="red" size={22} onClick={() => {
								handleRemoveClick(props);
							}} />
							: null
					}
					{props.src.length > 0 ?
						<Card.Img variant='top' style={{ "maxHeight": "11rem", "maxWidth": "11rem", "minHeight": "8rem", "minWidth": "8rem", "alignSelf": "center", "marginTop": "5%" }} src={props.src[0].url} />
						: <Card.Img variant='top' style={{ "maxHeight": "11rem", "maxWidth": "11rem", "minHeight": "11rem", "minWidth": "11rem", "alignSelf": "center", "marginTop": "5%"  }} />
					}
					<Card.Body style={{ "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis", "maxWidth": "11rem" }}>
						<a>{props.name}</a>
					</Card.Body>
				</Card>
			</ListGroup.Item>
		)
	}


	return (
		<div style={{ paddingBottom: "200px" }} key={0}>

			<GridSystem key={1} colCount={colCount} md={mdVar} searchTitle={'Top Result'}>
				{searchQuery.top_result != undefined
					? [searchQuery.top_result].map(item =>
						<Item key={item.spotify_id + "topresult"}
							userPrefs={userPreferences} triggerReloadFunction={triggerReloadFunction}
							searchType={searchType} id={item.spotify_id + "topresult"}
							name={item.name} spotify_uri={item.uri}
							src={item.images} images={item.images} />)
					: null}
			</GridSystem>
			<GridSystem key={2} colCount={colCount} md={mdVar} searchTitle={'Albums'}>
				{searchQuery.albums.length > 0
					? searchQuery.albums.map(item =>
						<Item key={item.spotify_id + "album"} userPrefs={userPreferences}
							triggerReloadFunction={triggerReloadFunction} searchType={searchType}
							id={item.spotify_id + "album"} name={item.name} spotify_uri={item.uri}
							src={item.images} images={item.images} />)
					: null}
			</GridSystem>
			<GridSystem key={3} colCount={colCount} md={mdVar} searchTitle={'Artists'}>
				{searchQuery.artists.length > 0
					? searchQuery.artists.map(item =>
						<Item key={item.spotify_id + "artists"} userPrefs={userPreferences}
							triggerReloadFunction={triggerReloadFunction} searchType={searchType}
							id={item.spotify_id + "artists"} name={item.name} spotify_uri={item.uri}
							src={item.images} images={item.images} />)
					: null}
			</GridSystem>
			<GridSystem key={4} colCount={colCount} md={mdVar} searchTitle={'Genres'}>
				{searchQuery.genres.length > 0
					? searchQuery.genres.map(item =>
						<Item key={item.spotify_id + "genres"} userPrefs={userPreferences}
							triggerReloadFunction={triggerReloadFunction} searchType={searchType}
							id={item.spotify_id + "genres"} name={item.name} spotify_uri={item.uri}
							src={item.images} images={item.images} />)
					: null}
			</GridSystem>
			<GridSystem key={5} colCount={colCount} md={mdVar} searchTitle={'Tracks'}>
				{searchQuery.tracks.length > 0
					? searchQuery.tracks.map(item =>
						<Item key={item.spotify_id + "tracks"} userPrefs={userPreferences}
							triggerReloadFunction={triggerReloadFunction} searchType={searchType}
							id={item.spotify_id + "tracks"} name={item.name} spotify_uri={item.uri}
							src={item.images} images={item.images} />)
					: null}
			</GridSystem>
		</div>

	)
}