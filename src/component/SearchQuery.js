/* eslint-disable react/prop-types */
// @src/components/SearchQuery.jsx

import React from "react";
import { View } from "react-native";
import { Card, Spinner } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup"
//import ListGroupItem from "react-bootstrap/ListGroupItem";
import PropTypes from 'prop-types';
import { PlusCircleFill, DashCircleFill } from 'react-bootstrap-icons';
import getUserPreferences from "../hooks/userPreferences/getUserPreferences";
import troubadour from "../api/troubadour";
//import addUserPreference from "../hooks/userPreferences/addUserPreference";
import { TroubadourContext } from "../context/troubadourContext";

export default function SearchQuery(props) {

	//Props validation
	// SearchQuery.propTypes = {
	// 	props.searchQuery: PropTypes.array.isRequired,
	// 	props.searchType: PropTypes.string.isRequired,
	// };
	const searchQuery = props.searchQuery;
	const searchType = props.searchType;
	// eslint-disable-next-line no-unused-vars
	const { userId, setUserId } = React.useContext(TroubadourContext);
	const { userPreferences, setUserPreferences } = getUserPreferences(userId.id);
	//const userPrefRef = React.useRef();
	//userPrefRef.getUserPreferences(userId.id) = count;

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
		output = output.concat(getFieldsHelper(input.data.artists, 'artists'))
		output = output.concat(getFieldsHelper(input.data.albums, 'albums'))
		output = output.concat(getFieldsHelper(input.data.genres, 'genres'))
		output = output.concat(getFieldsHelper(input.data.tracks, 'tracks'))
		return output;
	}
	async function handleAddClick(props) {
		const newPrefs = getPrefsAsFlatArray(props.userPrefs.prefs);
		newPrefs.push({ spotify_uri: props.spotify_uri, name: props.name });
		props.setPrefs({ ...props.userPrefs, prefs: newPrefs })
		//props.userPrefs.setUserPreferences(...props.userPrefs.userPreferences, newPrefs)

		const fetch = async () => {
			try {
				await troubadour.put(`preferences`, newPrevs,
					{
						headers: {
							"X-USER-ID": userId.id
						}
					}).then((res) => {
					return res;
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
					return res;
				});
			} catch (err) {
				console.error(err);
			}
		};
		fetch();
	}
	//let colCount = 5
	//let mdVar = 1

	//Index is needed to keep track of the current element that we are one.
	//let index = 0

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
			<ListGroup.Item key={props.id}>
				<Card>
					{props.searchType == "addOnly"
						? <PlusCircleFill color="green" size={22} onClick={() => {
							handleAddClick(props).then(() => {
								getUserPreferences(userId.id);
							});
						}} />
						: props.searchType == "removeOnly"
							? <DashCircleFill color="red" size={22} onClick={() => {
								handleRemoveClick(props).then(() => {
									getUserPreferences(userId.id);
								});
							}} />
							: null
					}
					{props.src.length > 0 ?
						<Card.Img variant='top' style={{ maxHeight: "6rem", maxWidth: "6rem" }} src={props.src[0].url} /> : null
					}
					<Card.Body>
						<a>{props.name}</a>
					</Card.Body>
				</Card>
			</ListGroup.Item>
		)
	}


	return (
		<View>
			{searchQuery != undefined
				?

				<ListGroup key={0}>
					{searchQuery.top_result != undefined
						? <ListGroup.Item key={1} ><h4>Top Result</h4></ListGroup.Item>
						: null}
					{searchQuery.top_result != undefined
						? <Item key={searchQuery.top_result.spotify_id + "topresult"} userPrefs={userPreferences} setPrefs={setUserPreferences} searchType={searchType} id={searchQuery.top_result.spotify_id + "topresult"} name={searchQuery.top_result.name} spotify_uri={searchQuery.top_result.uri} src={searchQuery.top_result.images} images={searchQuery.top_result.images} />
						: null}

					{searchQuery.albums.length > 0 ?
						<ListGroup.Item key={2}><h4>Albums</h4></ListGroup.Item>
						: null}
					{searchQuery.albums.length > 0
						? searchQuery.albums.map(item => <Item key={item.spotify_id + "album"} userPrefs={userPreferences} setPrefs={setUserPreferences} searchType={searchType} id={item.spotify_id + "album"} name={item.name} spotify_uri={item.uri} src={item.images} images={item.images} />)
						: [null]}

					{searchQuery.artists.length > 0 ?
						<ListGroup.Item key={3}><h4>Artists</h4></ListGroup.Item>
						: null}
					{searchQuery.artists.length > 0
						? searchQuery.artists.map(item => <Item key={item.spotify_id + "album"} userPrefs={userPreferences} setPrefs={setUserPreferences} searchType={searchType} id={item.spotify_id + "album"} name={item.name} spotify_uri={item.uri} src={item.images} images={item.images} />)
						: [null]}


					{searchQuery.genres.length > 0 ?
						<ListGroup.Item key={4}><h4>Genres</h4></ListGroup.Item>
						: null}
					{searchQuery.genres.length > 0
						? searchQuery.genres.map(item => <Item key={item.spotify_id + "album"} userPrefs={userPreferences} setPrefs={setUserPreferences} searchType={searchType} id={item.spotify_id + "album"} name={item.name} spotify_uri={item.uri} src={item.images} images={item.images} />)
						: [null]}


					{searchQuery.tracks.length > 0 ?
						<ListGroup.Item key={5}><h4>Tracks</h4></ListGroup.Item>
						: null}
					{searchQuery.tracks.length > 0
						? searchQuery.tracks.map(item => <Item key={item.spotify_id + "album"} userPrefs={userPreferences} setPrefs={setUserPreferences} searchType={searchType} id={item.spotify_id + "album"} name={item.name} spotify_uri={item.uri} src={item.images} images={item.images} />)
						: [null]}
				</ListGroup>
				:
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			}
		</View>

	)
}