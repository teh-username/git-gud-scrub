const grapher = state => {
  const graphData = state.commits.reduce(
    (acc, commit) => ({
      nodes: [
        ...acc.nodes,
        {
          id: commit,
          label: commit,
          title: state.lookup[commit].message,
        },
      ],
      edges: [
        ...acc.edges,
        ...state.lookup[commit].children.map(child => ({
          from: commit,
          to: child,
          arrows: 'from',
        })),
      ],
    }),
    { nodes: [], edges: [] }
  );

  // Collect Branch Nodes
  const branchNodes = Object.entries(state.branches).map(
    ([branchName, commitRef]) => ({
      id: branchName,
      label: branchName,
      color: '#39AA56',
    })
  );

  // Add ref nodes
  graphData.nodes = [
    ...graphData.nodes,
    ...branchNodes,
    {
      id: 'HEAD',
      label: 'HEAD',
      color: '#B94947',
    },
  ];

  // Collect Branch Edges
  const branchEdges = Object.entries(state.branches).map(
    ([branchName, commitRef]) => ({
      from: commitRef,
      to: branchName,
      arrows: 'from',
    })
  );

  // Add ref edges
  graphData.edges = [
    ...graphData.edges,
    ...branchEdges,
    {
      from: state.head,
      to: 'HEAD',
      arrows: 'from',
    },
  ];

  return graphData;
};

export default grapher;
