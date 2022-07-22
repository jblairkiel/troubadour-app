// @src/hooks/getUserPreferences.js

import { useState, useEffect } from "react";

import troubadour from "../../api/troubadour";

const addUserPreferences = ( argUserId ) => {
	const [userPreferences, setUserPreferences] = useState({
		prefs: []
	});


	useEffect(() => {
		if (argUserId != "") {
			const timeoutId = setTimeout(() => {
				const fetch = async () => {
					try {
						const res = await troubadour.put(`preferences`, 
							{
								headers: { 
									"X-USER-ID": argUserId ,
									"preferences": userPreferences.prefs,
								}
							});
						setUserPreferences({ ...userPreferences, prefs: res.data });
					} catch (err) {
						console.error(err);
					}
				};
				fetch();
			}, 1000);
			return () => clearTimeout(timeoutId);
		}
	}, [userPreferences.prefs, userPreferences.type]);

	return { userPreferences, setUserPreferences };
};

export default addUserPreferences;
