import React from 'react';
import { act, renderer } from 'react-test-renderer';
import App from '../App'

jest.mock("expo", () => ({
	AppLoading: "AppLoading",
	Linking: {
		makeUrl: () => "/"
	}
}));
//jest.mock("../navigation/BottomTabNavigator", () => "BottomTabNavigator");

describe('<App />', () => {
	it('has 1 child', () => {

		act(() => {
			tree = renderer.create(<App />).toJSON();
		  });
		expect(tree.children.length).toBe(1);
	});
});