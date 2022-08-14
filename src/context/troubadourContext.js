import React, {useState} from "react";
export const TroubadourContext = React.createContext({
	// eslint-disable-next-line no-unused-vars
	setUserId: (at) => { },
	userId: {
		id: "",
		display_name: "", 
		token: ""
	},
});

// eslint-disable-next-line react/prop-types
export const TroubadourContextProvider = ({ children, initialUserId }) => {
	const [userId, setUserId] = useState(initialUserId);
	return (
		<TroubadourContext.Provider
			value={{
				userId,
				setUserId
			}}
		>
			{children}
		</TroubadourContext.Provider>
	);
};