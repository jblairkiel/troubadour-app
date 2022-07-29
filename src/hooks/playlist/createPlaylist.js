// @src/hooks/getUserPreferences.js

import { useState, useEffect } from "react";

import troubadour from "../../api/troubadour";

const createPlaylist = ( callback, argUserId, argToken, lat, long ) => {
	const [data, setData] = useState({
		playlistUrl: []
	});


	useEffect(() => {
		if (argUserId != undefined && argToken != undefined && lat != undefined && long != undefined) {
			const timeoutId = setTimeout(() => {
				const fetch = async () => {
					try {
						const res = await troubadour.create(`preferences?lat=/${lat}&long=/${long}`, 
							{
								headers: { 
									"X-USER-ID": argUserId ,
									"X-API-KEY": argToken,
								}
							});
						callback(res.data);
					} catch (err) {
						console.error(err);
					}
				};
				fetch();
			}, 1000);
			return () => clearTimeout(timeoutId);
		}
	}, []);

	return { data, setData };
};

export default createPlaylist;
