// @src/components/search.jsx

import React from "react";
import { View } from "react-native";
import SearchQuery from "./SearchQuery";


//<SearchQuery searchQuery={ searchQuery != null ? searchQuery : ['']}/>
export default function Search({ searchQuery }) {
    return ( 
      <View>
        <SearchQuery searchQuery={ searchQuery}/>
      </View>
    );
}