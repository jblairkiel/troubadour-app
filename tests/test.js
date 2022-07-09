import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';

describe('<NavigationContainer />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<Stack.Navigator />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});