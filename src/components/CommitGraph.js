import React from 'react';
import vis from 'vis';

const canvasId = 'commitGraph';
const visConfig = {
  nodes: {
    shape: 'circle',
  },
  physics: {
    enabled: false,
  },
  interaction: {
    dragNodes: false, // do not allow dragging nodes
    zoomView: true, // allow zooming
    dragView: true, // allow dragging
  },
  layout: {
    hierarchical: {
      direction: 'LR',
      sortMethod: 'directed',
    },
  },
};

class CommitGraph extends React.Component {
  constructor(props) {
    super(props);
    this._renderGraph = this._renderGraph.bind(this);
  }

  _renderGraph(graphData) {
    const { edges, nodes } = graphData;
    const container = document.getElementById(canvasId);
    const data = {
      nodes: new vis.DataSet(nodes),
      edges: new vis.DataSet(edges),
    };
    new vis.Network(container, data, visConfig);
  }

  componentDidMount() {
    this._renderGraph(this.props.graphData);
  }

  shouldComponentUpdate(nextProps) {
    this._renderGraph(nextProps.graphData);
    return false;
  }

  render() {
    return (
      <div className="col-lg-9 col-sm-12">
        <h4>Commit Graph</h4>
        <div id={canvasId} className="commit-graph" />
      </div>
    );
  }
}

export default CommitGraph;
