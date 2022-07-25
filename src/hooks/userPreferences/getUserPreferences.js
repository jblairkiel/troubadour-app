// @src/hooks/getUserPreferences.js

import troubadour from "../../api/troubadour";

export default async function getUserPreferences( argUserId, callback ){
	if (argUserId != "") {
		const fetch = async () => {
			try {
				await troubadour.get(`preferences`, 
					{
						headers: { "X-USER-ID": argUserId }
					}).then((res)=> {
					callback(res.data);
				});
			} catch (err) {
				console.error(err);
			}
		};
		
		fetch();
	}
}