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

  // Add HEAD
  graphData.nodes = [
    ...graphData.nodes,
    {
      id: 'HEAD',
      label: 'HEAD',
      color: 'gray',
    },
  ];

  graphData.edges = [
    ...graphData.edges,
    {
      from: state.head,
      to: 'HEAD',
      arrows: 'from',
    },
  ];

  return graphData;
};

export default grapher;
