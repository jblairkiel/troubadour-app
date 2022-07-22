// @src/hooks/getUserPreferences.js

import { useState, useEffect } from "react";

import troubadour from "../../api/troubadour";

const getUserPreferences = () => {
	const [userPreferences, setUserPreferences] = useState({
		slug: "",
		results: {},
	});

	useEffect(() => {
		if (data.slug !== "") {
			const timeoutId = setTimeout(() => {
				const fetch = async () => {
					try {
						const res = await troubadour.put(`preferences`, 
							{"X-USER-ID": data.slug});
						setData({ ...data, results: res.data });
					} catch (err) {
						console.error(err);
					}
				};
				fetch();
			}, 1000);
			return () => clearTimeout(timeoutId);
		}
	}, [data.slug]);

	return { userPreferences, setUserPreferences };
};

export default getUserPreferences;
