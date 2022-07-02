

import React from "react";
import useFetch from "./src/hooks/useFetch"
import Search from "./src/component/Search";
import TroubadourNavbar from './src/component/TroubadourNavbar'
import {Form, Card, TextInput} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
  const { data, setData } = useFetch();
  const dummyData = {
          "albums": [
              {
                  "spotify_id": "6vr32hctMBvABv8wlVd4iX",
                  "images": [
                      {
                          "height": 640,
                          "url": "https://i.scdn.co/image/ab67616d0000b2739144f24deb01def6346704f5",
                          "width": 640
                      },
                      {
                          "height": 300,
                          "url": "https://i.scdn.co/image/ab67616d00001e029144f24deb01def6346704f5",
                          "width": 300
                      }
                    ],
                  "name": "Metallica"
              }
            ],
          "artists": [],
          "genres": [],
          "tracks": [],
  }

  const handleSubmit = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };
  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };
  return (
	<div>
		<TroubadourNavbar></TroubadourNavbar>
		<Card style={{inline: 1, alignItems: "left", justifyContent: "left", padding: '5%'}}>
		<Form onSubmit={(e)=> handleSubmit(e)}  onKeyDown={(e) => checkKeyDown(e)} >
			<Form.Control
			type="text"
			placeholder="Search Spotify"
			value={data.slug}
			onChange={(e) => setData({ ...data, slug: e.target.value })}
			/>
		</Form>
		
		{Object.keys(data.results).length > 0 ? <Search searchQuery={data.results.data} /> : null } 
		{/* <Search searchQuery={dummyData} />} */}
		</Card>
	</div>
  );
}