// @src/hooks/getUserPreferences.js

import { useState, useEffect } from "react";

import troubadour from "../../api/troubadour";

const getUserPreferences = ( argUserId ) => {
	const [userPreferences, setUserPreferences] = useState({
		prefs: []
	});


	useEffect(() => {
		if (argUserId != "") {
			const timeoutId = setTimeout(() => {
				const fetch = async () => {
					try {
						const res = await troubadour.get(`preferences`, 
							{
								headers: { "X-USER-ID": argUserId }
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
	}, [userPreferences.userId]);

	return { userPreferences, setUserPreferences };
};

export default getUserPreferences;
