

import React from "react";
import useFetch from "./src/hooks/useFetch"
import Search from "./src/component/Search";
import { View, TextInput } from "react-native";

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
  return (
    <View style={{inline: 1, alignItems: "left", justifyContent: "left", padding: '5%'}}>
      <TextInput
        type="text"
        placeholder="Search Spotify"
        value={data.slug}
        onChange={(e) => setData({ ...data, slug: e.target.value })}
      />
      {Object.keys(data.results).length > 0 ? <Search searchQuery={data.results.data} /> : null } 
      {/* <Search searchQuery={dummyData} />} */}
    </View>
  );
}