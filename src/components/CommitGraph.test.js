import React from 'react';
import CommitGraph from './CommitGraph';
import { initialState, getGraphFromState } from '../redux/modules/commitGraph';

describe('CommitGraph Component', () => {
  it('renders correctly', () => {
    let wrapper = shallow(
      <CommitGraph
        graphData={getGraphFromState({
          commitGraph: initialState,
        })}
      />,
      {
        disableLifecycleMethods: true,
      }
    );
    expect(wrapper).toMatchSnapshot();
  });
});
